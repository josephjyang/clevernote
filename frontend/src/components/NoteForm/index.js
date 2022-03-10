import React, { useState, useEffect, useMemo } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { usePage } from '../../context/ClevernoteContext';
import { loadNotes } from '../../store/notes';
import { loadTags } from '../../store/tags';
import './NoteForm.css'
import { loadNotebooks } from '../../store/notebooks';

function NoteForm({ isLoaded }) {
    const dispatch = useDispatch();
    const { noteId, notebookId, tagId } = useParams();
    const { scratchContent } = usePage();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    const notebooks = useSelector(state => state.notebooks);
    const tags = useSelector(state => state.tags);
    const userTags = Object.values(tags);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const note = useMemo(() => notes[noteId] || {}, [noteId, notes]);

    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(note.name || "");
    const [content, setContent] = useState(note.content || scratchContent || "");
    let [notebook, setNotebook] = useState(note.notebookId || notebookId || "");
    const [showActions, setShowActions] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [noteTags, setNoteTags] = useState({});
    const arr = note.Tags?.map(tag => parseInt(tag.id, 10))
    const availTags = userTags.filter(tag => !arr?.includes(tag.id) && !noteTags[tag.id]);
    const usedTags = userTags.filter(tag => arr?.includes(tag.id) || noteTags[tag.id]);
    
    useEffect(() => {
        const newNotesTags = {}
        if (note.Tags) {
            note.Tags.forEach(tag => {
                newNotesTags[tag.id] = tag;
            });
        }
        if (tagId) newNotesTags[tagId] = tags[tagId];

        setName(note.name || '');
        setContent(note.content || scratchContent || '');
        setNotebook(note.notebookId || notebookId || null);
        setNoteTags(newNotesTags);
    }, [note, setNotebook, scratchContent, notebookId, tagId, tags])

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
        setShowTags(false);
        setErrors([]);


        let newNote;
        if (notebook === "select") notebook = null;

        if (noteId === "new") {
            newNote = await dispatch(notesActions.createNote({ name, content, userId: sessionUser.id, notebookId: notebook }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
            if (Object.keys(noteTags).length > 0) {
                Object.values(noteTags).forEach(async tag => {
                        await dispatch(notesActions.createNoteTag(newNote, tag))
                    })
            }
        } else {
            let payload = {
                ...note,
                name,
                content,
                notebookId: notebook
            }

            newNote = await dispatch(notesActions.updateNote(payload))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })

            if (note.Tags) {
                const arr = note.Tags.map(tag => parseInt(tag.id, 10))

                const removeTags = note.Tags.filter(tag => !noteTags[tag.id])
                if (removeTags.length > 0) {
                    removeTags.forEach(async tag => {
                        await dispatch(notesActions.removeNoteTag(note, tag))
                    })
                }

                const addTags = userTags.filter(tag => {
                    return !arr.includes(tag.id) && noteTags[tag.id];
                });
                if (addTags.length) {
                    addTags.forEach(async tag => {
                        await dispatch(notesActions.createNoteTag(note, tag))
                    })
                }
            } else {
                const tagIds = Object.keys(noteTags).map(tag => parseInt(tag, 10));
                const tags = userTags.filter(tag => {
                    return tagIds.includes(tag.id);
                });
                if (tags.length) {
                    tags.forEach(async tag => {
                        await dispatch(notesActions.createNoteTag(note, tag))
                    })
                }
            }

        }

        setSuccess({name: newNote.name, noteId});
        const timeout = setTimeout(function () {
            setSuccess(false);
        }, 2000);
     
        setTimeout(() => {
            dispatch(loadNotes(sessionUser));
            dispatch(loadTags(sessionUser));
            dispatch(loadNotebooks(sessionUser))
        }, 1000);

        if (notebookId && newNote.notebookId) {
            history.push(`/notebooks/${newNote.notebookId}/notes/${newNote.id}`)
        } else if (tagId && noteTags[tagId]) {
            history.push(`/tags/${tagId}/notes/${newNote.id}`)
        } else if (tagId) {
            history.push(`/tags/${tagId}/notes/new`)
        }
        else history.push(`/notes/${newNote.id}`);

        
        return () => clearTimeout(timeout);

    }

    const deleteNote = async e => {
        e.preventDefault()

        await dispatch(notesActions.removeNote(noteId));
        setTimeout(() => {
            dispatch(loadNotes(sessionUser));
            dispatch(loadTags(sessionUser));
            dispatch(loadNotebooks(sessionUser))
        }, 1000);
        if (notebookId) {
            history.push(`/notebooks/${notebookId}/notes/new`)
        } else if (tagId) {
            history.push(`/tags/${tagId}/notes/new`)
        }
        else history.push(`/notes/new`);
    }

    const handleNoteTags = tag => {
        const key = tag.id;
        if (noteTags[key]) {
            delete noteTags[key]
        }
        else {
            noteTags[key] = tag;
        }
        return { ...noteTags }
    }

    return (
        <>
            <div className="note-form">
                <form id="updateform" onSubmit={onSubmit}>
                    <ul className="error-list-note" hidden={errors.length === 0}>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    {success &&
                        <div id="success-container">
                            <div className="success-message">You have successfully {success.noteId === "new" ? "created" : "updated"} "{success.name}".</div>
                        </div>
                    }
                    <div id="note-form-header">
                        <select
                            id="notebook-select"
                            value={notebook || "select"}
                            onChange={e => { setNotebook(e.target.value) }}
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
                        onClick={() => setShowTags(false)}
                    />
                    <div className="footer">
                        <div onClick={() => setShowTags(!showTags)} id="show-tags">Tags</div>
                        {showTags &&
                            <div id="tags-menu">
                                {availTags.map((tag, i) => {
                                    return (
                                        <div className="tag-box" key={tag.id} >
                                            <label htmlFor={tag.name}>{tag.name}</label>
                                            <input onChange={(e) => setNoteTags(handleNoteTags(tag))} value={tag.id} type="checkbox" id={tag.id} name={tag.name} />
                                        </div>
                                    )
                                })}
                                {usedTags.map((tag, i) => {
                                    return (
                                        <div className="tag-box" key={tag.id} >
                                            <label htmlFor={tag.name}>{tag.name}</label>
                                            <input onChange={(e) => setNoteTags(handleNoteTags(tag))} value={tag.id} type="checkbox" id={tag.id} name={tag.name} checked={noteTags[tag.id] ? true : false} />
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        <button id="new-note" type="submit">Save Note</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NoteForm