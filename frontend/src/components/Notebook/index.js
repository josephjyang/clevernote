import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import { loadNotebookNotes } from '../../store/notes';
import { FormModal } from '../../context/FormModal';
import Navigation from '../Navigation';
import NotebookForm from '../NotebookForm';
import NotebookFormDelete from '../NotebookFormDelete';
import * as notebookActions from '../../store/notebooks';
import './Notebook.css'

function Notebook({ isLoaded }) {
    const { notebookId } = useParams();
    const history = useHistory();
    const [showForm, setShowForm] = useState(false);
    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    const notebooks = useSelector(state => state.notebooks)
    const userNotes = Object.values(notes);
    userNotes.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const notebook = notebooks[notebookId]

    const dispatch = useDispatch();
    useEffect(() => {
        if (user && notebook) dispatch(loadNotebookNotes(user, notebook));
        else return;
    }, [dispatch, user, notebook]);

    if (!user) return (
        <Redirect to="/" />
    )

    if(!notebook) return (
        <Redirect to={`/notebooks/${notebookId}`} />
    )

    return (
        <>
            <div id="notebook-content">
                <Navigation isLoaded={isLoaded} />
                <div id="notebook-sidebar" >
                    <div id="sidebar-header">
                        <h2>
                            {notebook.name}
                        </h2>
                        <button id="edit-notebook-link" onClick={() => setShowForm(true)}>Edit</button>
                        {showForm && (
                            <FormModal onClose={() => setShowForm(false)}>
                                <NotebookForm id={notebook.id} hideForm={() => setShowForm(false)}/>
                            </FormModal>
                        )}
                        <button id="delete-notebook-link" onClick={() => setShowForm(true)}>Delete</button>
                        {showForm && (
                            <FormModal onClose={() => setShowForm(false)}>
                                <NotebookFormDelete id={notebook.id} hideForm={() => setShowForm(false)} />
                            </FormModal>
                        )}
                    </div>
                    {userNotes.map(note => {
                        const date = new Date(note.updatedAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <Link key={note.id} to={`/notes/${note.id}`}>
                                <div className="notebook-block">
                                    <h3>
                                        {note.name}
                                    </h3>
                                    <p id="notebook-block-content">
                                        {note.content}
                                    </p>
                                    <p id="notebook-update-time">
                                        {`${date.toLocaleDateString('en-US', options)}`}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Notebook