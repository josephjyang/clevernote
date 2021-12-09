import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import { loadNotebookNotes } from '../../store/notes';
import { FormModal } from '../../context/FormModal';
import { DeleteModal } from '../../context/DeleteModal';
import NotebookFormUpdate from '../NotebookFormUpdate';
import NotebookFormDelete from '../NotebookFormDelete';
import NoteFormUpdate from '../NoteFormUpdate';
import { loadNotes } from '../../store/notes'
import { loadNotebooks } from '../../store/notebooks'
import { usePage } from '../../context/ClevernoteContext';
import './Notebook.css'

function Notebook({ isLoaded }) {
    const { noteId, setNoteId, notebookId, setNotebookId } = usePage();
    const history = useHistory();
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    const notebooks = useSelector(state => state.notebooks)
    const userNotes = Object.values(notes);
    userNotes.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const notebook = notebooks[notebookId];

    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(loadNotes(user));
            dispatch(loadNotebooks(user));
        }
        else return;
    }, [dispatch, user]);

    useEffect(() => {
        if (user && notebook) dispatch(loadNotebookNotes(user, notebook));
        else {
            setNotebookId(false);
            return history.push("/dashboard")
        };
    }, [dispatch, user, notebook, history, setNotebookId]);

    if (!user) return (
        <Redirect to="/" />
    )

    if(!notebook) return null;

    return (
        <>
            <div id="notebook-content">
                <div id="notebook-sidebar" >
                    <div id="sidebar-header">
                        <h2>
                            {notebook.name}
                        </h2>
                        <div id="notebook-buttons">
                            <button id="edit-notebook-link" onClick={() => setShowForm(true)}>Edit</button>
                            {showForm && (
                                <FormModal onClose={() => setShowForm(false)}>
                                    <NotebookFormUpdate id={notebook.id} hideForm={() => setShowForm(false)}/>
                                </FormModal>
                            )}
                            <button id="delete-notebook-link" onClick={() => setShowDelete(true)}>Delete</button>
                            {showDelete && (
                                <DeleteModal onClose={() => setShowDelete(false)}>
                                    <NotebookFormDelete id={notebook.id} hideForm={() => setShowDelete(false)} />
                                </DeleteModal>
                            )}
                        </div>
                    </div>
                    {userNotes.map(note => {
                        const date = new Date(note.updatedAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <div onClick={() => setNoteId(note.id)} className="notebook-block">
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
                        )
                    })}
                </div>
                {noteId && <NoteFormUpdate />}
            </div>
        </>
    );
}

export default Notebook