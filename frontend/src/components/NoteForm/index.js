import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './NoteForm.css'

function NoteForm({ isLoaded, onSubmit, deleteNote, errors, setErrors, name, setName, content, setContent, notebookId, setNotebookId }) {
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const [showActions, setShowActions] = useState(false);
    
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

export default NoteForm