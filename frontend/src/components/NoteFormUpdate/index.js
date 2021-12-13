import React, { useState, useEffect, useMemo } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { usePage } from '../../context/ClevernoteContext';
import { loadNotes } from '../../store/notes';
import { loadTags } from '../../store/tags';
import '../NoteForm/NoteForm.css'

function NoteFormUpdate({ isLoaded }) {
    const dispatch = useDispatch();
    const { setPage, noteId, setNoteId, notebookId, setNotebookId } = usePage();
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
    const notesTags = {}
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(note.name);
    const [content, setContent] = useState(note.content);
    const [showActions, setShowActions] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [noteTags, setNoteTags] = useState(notesTags);
    const arr = note.Tags?.map(tag => parseInt(tag.id, 10))
    const availTags = userTags.filter(tag => !arr?.includes(tag.id))
    const usedTags = userTags.filter(tag => arr?.includes(tag.id))
    
    useEffect(() => {
        const newNotesTags = {}
        if (note.Tags) {
            note.Tags.forEach(tag => {
                newNotesTags[tag.id] = tag;
            });
        }
        setNoteTags(newNotesTags);
        setName(note.name || '');
        setContent(note.content || '');
        setNotebookId(note.notebookId || null);
    }, [note, setNotebookId])

    useEffect(() => {
        dispatch(loadNotes(sessionUser));
        dispatch(loadTags(sessionUser));
    }, [dispatch, sessionUser])


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

        if (note.Tags) {
            const oldTags = note.Tags;
            const arr = note.Tags.map(tag => parseInt(tag.id, 10))
            const tagIds = Object.keys(noteTags).map(tag => {
                if (noteTags[tag]) return parseInt(tag, 10)
                else return null;
            });
            let removeTags = oldTags.filter(tag => {
                return !tagIds.includes(tag.id)
            })
    
            const addTags = userTags.filter(tag => {
                return !arr.includes(tag.id) && tagIds.includes(tag.id);
            });
            
            if (addTags.length) {
                addTags.forEach(tag => {
                    dispatch(notesActions.createNoteTag(updatedNote, tag))
                })
            }
            if (removeTags.length) {
                removeTags.forEach(tag => {
                    dispatch(notesActions.removeNoteTag(updatedNote, tag))
                })
            }
            dispatch(loadNotes(sessionUser));
        } else {
            const tagIds = Object.keys(noteTags).map(tag => parseInt(tag, 10));
            const tags = userTags.filter(tag => {
                return tagIds.includes(tag.id);
            });
            if (tags.length) {
                tags.forEach(tag => {
                    dispatch(notesActions.createNoteTag(updatedNote, tag))
                })
            }
            dispatch(loadNotes(sessionUser));
        }

        if (updatedNote) {
            setPage('notes')
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
                                        <input onChange={(e) => {
                                            setNoteTags(
                                                noteTags => {
                                                    const key = e.target.value;
                                                    const value = e.target.checked;
                                                    if (value) noteTags[key] = value;
                                                    else delete noteTags[key]
                                                    return { ...noteTags }
                                                }
                                            );
                                        }} value={tag.id} type="checkbox" id={tag.id} name={tag.name} />
                                    </div>
                                )
                            })}
                            {usedTags.map((tag, i) => {
                                return (
                                    <div className="tag-box" key={tag.id} >
                                        <label htmlFor={tag.name}>{tag.name}</label>
                                        <input onChange={(e) => {
                                            setNoteTags(
                                                noteTags => {
                                                    const key = e.target.value;
                                                    const value = e.target.checked;
                                                    if (!value) noteTags[key] = value;
                                                    else delete noteTags[key]
                                                    return { ...noteTags }
                                                }
                                            );
                                        }} value={tag.id} type="checkbox" id={tag.id} name={tag.name} checked={noteTags[tag.id]}/>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <button id="new-note" type="submit">Save Note</button>
                </div>
            </form>
        </div>
    )
}

export default NoteFormUpdate