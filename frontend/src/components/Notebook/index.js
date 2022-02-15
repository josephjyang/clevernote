import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
import { loadNotebookNotes } from '../../store/notes';
import { FormModal } from '../../context/FormModal';
import { DeleteModal } from '../../context/DeleteModal';
import NotebookFormUpdate from '../NotebookFormUpdate';
import NotebookFormDelete from '../NotebookFormDelete';
import NoteForm from '../NoteForm';
import { usePage } from '../../context/ClevernoteContext';
import './Notebook.css'

function Notebook({ isLoaded }) {
    const { noteId, setNoteId, } = usePage();
    const {notebookId} = useParams();
    const history = useHistory();
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
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
        if (user && notebookId > 0) dispatch(loadNotebookNotes(user, notebooks[notebookId]));
        else {
            return history.push("/dashboard")
        };
    }, [dispatch, user, notebook, notebookId, notebooks, history]);

    const openActions = (id) => {
        if (showButtons) return;
        return setShowButtons(id);
    }

    useEffect(() => {
        if (!showButtons) return;

        const closeActions = () => {
            setShowButtons(false);
        }

        document.addEventListener("click", closeActions)

        return () => document.removeEventListener("click", closeActions)
    }, [showButtons])


    if (!user) return (
        <Redirect to="/" />
    )

    if(!notebook) return null;

    return (
        <>
            <div id="notebook-content">
                <div id="notebook-sidebar" >
                    <div id="sidebar-header">
                        <div id="notebook-header">
                            <h2>
                                <i className="fas fa-book" />
                                {notebook.name}
                            </h2>
                            <p>
                                {userNotes.length} notes
                            </p>
                        </div>
                        <div id="notebook-buttons">
                            <i onClick={() => openActions(notebook.id)} className="fas fa-ellipsis-h"></i>
                            {showButtons === notebook.id &&
                                <div className="notebook-actions-dropdown">
                                    <button id="edit-notebook-link" onClick={() => setShowForm(notebook.id)}>Rename Notebook</button>
                                    <button id="delete-notebook-link" onClick={() => setShowDelete(notebook.id)}>Delete Notebook</button>
                                </div>
                            }
                        </div>
                        {showForm === notebook.id && (
                            <FormModal onClose={() => setShowForm(false)}>
                                <NotebookFormUpdate id={notebook.id} hideForm={() => setShowForm(false)} />
                            </FormModal>
                        )}
                        {showDelete === notebook.id && (
                            <DeleteModal onClose={() => setShowDelete(false)}>
                                <NotebookFormDelete id={notebook.id} hideForm={() => setShowDelete(false)} />
                            </DeleteModal>
                        )}
                    </div>
                    {userNotes.map(note => {
                        const date = new Date(note.updatedAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <NavLink key={note.id} to={`/notebooks/${notebook.id}/notes/${note.id}`} className={note.id === noteId ? "selected notebook-block" : "notebook-block"}>
                                <h3>
                                    {note.name}
                                </h3>
                                <p id="notebook-block-content">
                                    {note.content}
                                </p>
                                <p id="notebook-update-time">
                                    {`${date.toLocaleDateString('en-US', options)}`}
                                </p>
                            </NavLink>
                        )
                    })}
                </div>
                <Route path='/notebooks/:notebookId/notes/:noteId'>
                    <NoteForm isLoaded={isLoaded} />
                </Route>
            </div>
        </>
    );
}

export default Notebook