import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { loadNotebookNotes } from '../../store/notes';
import { Modal } from '../../context/Modal';
import NotebookFormUpdate from '../NotebookFormUpdate';
import NotebookFormDelete from '../NotebookFormDelete';
import NoteFormUpdate from '../NoteFormUpdate';
import NoteForm from '../NoteForm';
import { loadNotes } from '../../store/notes'
import { loadNotebooks } from '../../store/notebooks'
import { usePage } from '../../context/ClevernoteContext';
import './Notebook.css'

function Notebook({ isLoaded }) {
    const { noteId, setNoteId, notebookId, setNotebookId } = usePage();
    const history = useHistory();
    const [showForm, setShowForm] = useState(false);
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
                            <i onClick={() => openActions(notebook.id)} class="fas fa-ellipsis-h"></i>
                            {showButtons === notebook.id &&
                                <div className="notebook-actions-dropdown">
                                    <button id="edit-notebook-link" onClick={() => setShowForm(notebook.id + "edit")}>Rename Notebook</button>
                                    <button id="delete-notebook-link" onClick={() => setShowForm(notebook.id + "delete")}>Delete Notebook</button>
                                </div>
                            }
                        </div>
                        {showForm === (notebook.id + "edit") && (
                            <Modal onClose={() => setShowForm(false)}>
                                <NotebookFormUpdate id={notebook.id} hideForm={() => setShowForm(false)} />
                            </Modal>
                        )}
                        {showForm === (notebook.id + "delete") && (
                            <Modal onClose={() => setShowForm(false)}>
                                <NotebookFormDelete id={notebook.id} hideForm={() => setShowForm(false)} />
                            </Modal>
                        )}
                    </div>
                    {userNotes.map(note => {
                        const date = new Date(note.updatedAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <div key={note.id} onClick={() => setNoteId(note.id)} className={note.id === noteId ? "selected notebook-block" : "notebook-block"}>
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
                {!noteId && <NoteForm />}
            </div>
        </>
    );
}

export default Notebook