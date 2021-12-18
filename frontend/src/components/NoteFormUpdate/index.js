import React, { useState, useEffect, useMemo } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { usePage } from '../../context/ClevernoteContext';
import '../NoteForm/NoteForm.css'

function NoteFormUpdate({ isLoaded }) {
    const dispatch = useDispatch();
    const { noteId, setNoteId, notebookId, setNotebookId } = usePage();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    const notebooks = useSelector(state => state.notebooks);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const note = useMemo(() => notes[noteId] || {}, [noteId, notes]);
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(note.name);
    const [content, setContent] = useState(note.content);
    const [showActions, setShowActions] = useState(false);
    
    useEffect(() => {
        setName(note.name || '');
        setContent(note.content || '');
        setNotebookId(note.notebookId || null);
    }, [note, setNotebookId])

    const openActions = () => {
        if (showActions) return;
        return setShowActions(true)
    }

    useEffect(() => {
        if (!showActions) return;

        const closeActions = () => {
            setShowActions(false);
        }

        document.addEventListener("click", closeActions)

        return () => document.removeEventListener("click", closeActions)
    }, [showActions])

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    const onSubmit = async e => {
        e.preventDefault();
        
        let payload;

        if (notebookId === "select") {
            payload = {
                ...note,
                name,
                content,
                notebookId: null
            }
        } else {
            payload = {
                ...note,
                name,
                content,
                notebookId
            }
        }

        const updatedNote = await dispatch(notesActions.updateNote(payload))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        if (updatedNote) {
            setErrors([])
            history.push("/dashboard")
        }
    }

    const deleteNote = async e => {
        e.preventDefault()

        await dispatch(notesActions.removeNote(noteId));
        setNotebookId("select");
        setNoteId(null);
        return history.push("/dashboard");
    }

    return (
        <>
            {isLoaded && (
                <div className="note-form">
                    <form id="updateform" onSubmit={onSubmit}>
                        <ul className="error-list-note" hidden={errors.length === 0}>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                        <div id="note-form-header">
                            <select
                                id="notebook-select"
                                value={notebookId || "select"}
                                onChange={e => {setNotebookId(e.target.value)}}
                            >
                                <option value={"select"}>Select a notebook</option>
                                {userNotebooks.map(notebook => {
                                    return <option key={notebook.id} value={notebook.id}>{notebook.name}</option>
                                })}
                            </select>
                            <i onClick={() => openActions(true)} className="fas fa-ellipsis-h"></i>
                            {showActions && 
                            <ul className="action-dropdown">
                                <button id="delete-note" onClick={deleteNote}>Delete Note</button>
                            </ul>}
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
                            value={content || ''}
                            onChange={(e) => setContent(e.target.value)}
                            rows={10}
                            cols={5}
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

export default NoteFormUpdate