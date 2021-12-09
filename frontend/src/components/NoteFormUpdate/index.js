import React, { useState, useEffect } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { usePage } from '../../context/ClevernoteContext';
import '../NoteForm/NoteForm.css'

function NoteFormUpdate({ isLoaded, setNotebookId, notebookId }) {
    const dispatch = useDispatch();
    const { noteId, setNoteId } = usePage();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    const notebooks = useSelector(state => state.notebooks);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const note = notes[noteId] || {};
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(note.name);
    const [content, setContent] = useState(note.content);

    useEffect(() => {
        setName(note.name);
        setContent(note.content);
    }, [note])

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    const onSubmit = async e => {
        e.preventDefault();
        
        const payload = {
            ...note,
            name,
            content
        }

        const updatedNote = await dispatch(notesActions.updateNote(payload))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        if (updatedNote) {
            setNoteId(false);
            history.push("/dashboard")
        }
    }

    const deleteNote = async e => {
        e.preventDefault()

        await dispatch(notesActions.removeNote(noteId));
        setNoteId(false);
        return history.push("/dashboard");
    }

    return (
        <div className="note-form">
            <form id="updateform" onSubmit={onSubmit}>
                {
                errors.length >= 1 && <ul hidden={errors.length === 0}>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                }
                <select
                    id="notebook-select"
                    onChange={e => setNotebookId(e.target.value)}
                >
                    <option value="">Select a notebook</option>
                    {userNotebooks.map(notebook => {
                        if (note.notebookId === notebook.id) return <option key={notebook.id} value={notebook.id} selected>{notebook.name}</option>
                        return <option key={notebook.id} value={notebook.id}>{notebook.name}</option>
                    })}
                </select>
                <input
                    id="note-title"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Enter Name for Note"
                />
                <textarea
                    id="note-context"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    cols={5}
                />
                <div className="action-buttons">
                    <button id="new-note" type="submit">Save Note</button>
                    <button id="delete-note" onClick={deleteNote}>Delete Note</button>
                </div>
            </form>
        </div>
    )
}

export default NoteFormUpdate