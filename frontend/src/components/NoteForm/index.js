import React, { useState } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { usePage } from '../../context/ClevernoteContext';
import './NoteForm.css'

function NoteForm({ isLoaded }) {
    const { setNoteId, scratchContent, setScratchContent, notebookId, setNotebookId } = usePage();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState(scratchContent);
    
    const history = useHistory();  

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        if (notebookId === "select") {
            const newNote = await dispatch(notesActions.createNote({ name, content, userId: sessionUser.id, notebookId: null }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
            if (newNote) {
                setNoteId(newNote.id);
                setScratchContent();
                history.push("/dashboard")
            }
        } else {
            const newNote = await dispatch(notesActions.createNote({ name, content, userId: sessionUser.id, notebookId }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
            if (newNote) {
                setNoteId(newNote.id);
                setScratchContent();
                history.push("/dashboard")
            }
        }

    }


    return (
        <>
            {isLoaded && (
                <div className="note-form">
                    <form onSubmit={onSubmit}>
                        <ul className="error-list-note" hidden={errors.length === 0}>
                                {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                        <div id="note-form-header">
                            <select
                            id="notebook-select"
                            value={notebookId || "select"}
                            onChange={e => setNotebookId(e.target.value)}
                            >
                                <option value={"select"}>Select a notebook</option>
                                {userNotebooks.map(notebook => {
                                    return <option key={notebook.id} value={notebook.id}>{notebook.name}</option>
                                })}
                            </select>
                        </div>
                        <input
                            id="note-title"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            placeholder="Title"
                        />
                        <textarea
                            id="note-form-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Start writing..."
                        />
                        <div className="footer">
                            <button id="new-note" type="submit">Save Note</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default NoteForm