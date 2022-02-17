import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, Route, useParams } from 'react-router-dom';
import { loadNotes } from '../../store/notes';
import { loadNotebooks } from '../../store/notebooks';
import { loadTags } from '../../store/tags';
import { Modal } from '../../context/Modal';
import NotebookFormUpdate from '../NotebookFormUpdate';
import NotebookFormDelete from '../NotebookFormDelete';
import NoteForm from '../NoteForm';
import './Notebook.css'

function Notebook({ isLoaded }) {
    const { notebookId } = useParams();
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks)
    const userNotes = notebooks[notebookId]?.Notes;
    userNotes?.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const notebook = notebooks[notebookId];
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(loadTags(user));
            dispatch(loadNotes(user));
            dispatch(loadNotebooks(user));
        } else return;
    }, [dispatch, user]);


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

    if (!notebook) return null;

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
                                {userNotes && userNotes.length} notes
                            </p>
                        </div>
                        <div id="notebook-buttons">
                            <i onClick={() => openActions(notebook.id)} className="fas fa-ellipsis-h"></i>
                            {showButtons === notebook.id &&
                                <div className="notebook-actions-dropdown">
                                    <button id="new-note-link">
                                        <NavLink to={`/notebooks/${notebook.id}`}>New Note</NavLink>
                                    </button>
                                    <button id="edit-notebook-link" onClick={() => setShowForm(notebook.id)}>Rename Notebook</button>
                                    <button id="delete-notebook-link" onClick={() => setShowDelete(notebook.id)}>Delete Notebook</button>
                                </div>
                            }
                        </div>
                        {showForm === notebook.id && (
                            <Modal onClose={() => setShowForm(false)}>
                                <NotebookFormUpdate id={notebook.id} hideForm={() => setShowForm(false)} />
                            </Modal>
                        )}
                        {showDelete === notebook.id && (
                            <Modal onClose={() => setShowDelete(false)}>
                                <NotebookFormDelete id={notebook.id} hideForm={() => setShowDelete(false)} />
                            </Modal>
                        )}
                    </div>
                    {userNotes && userNotes.map(note => {
                        const date = new Date(note.updatedAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <NavLink key={note.id} to={`/notebooks/${notebook.id}/notes/${note.id}`} className="notebook-block">
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