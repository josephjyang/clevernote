import React, { useState, useEffect } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { usePage } from '../../context/ClevernoteContext';
import './NoteForm.css'

function NoteForm({ isLoaded, setNotebookId, notebookId }) {
    const { noteId, setNoteId } = usePage();
    const notes = useSelector(state => state.notes)
    const note = notes[noteId] || {};
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    
    const history = useHistory();  

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const newNote = await dispatch(notesActions.createNote({ name, content, userId: sessionUser.id, notebookId }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        if (newNote) {
            setNoteId(newNote.id);
            history.push("/dashboard")
        }
    }


    return (
        <>
            <div className="note-form">
                <form onSubmit={onSubmit}>
                    {
                        errors.length >= 1 && <ul hidden={errors.length === 0}>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    }
                    <div id="note-form-header">
                        <select
                        id="notebook-select"
                        onChange={e => setNotebookId(e.target.value)}
                        >
                            <option value="">Select a notebook</option>
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
                        placeholder="Start writing"
                    />
                    <div className="footer">
                        <button id="new-note" type="submit">Save Note</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NoteForm