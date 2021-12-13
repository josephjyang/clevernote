import React, { useState } from 'react';
import * as notesActions from '../../store/notes';
import * as tagsActions from '../../store/tags'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { usePage } from '../../context/ClevernoteContext';
import './NoteForm.css'

function NoteForm({ isLoaded }) {
    const { setNoteId, scratchContent, setScratchContent, notebookId, setNotebookId } = usePage();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const tags = useSelector(state => state.tags);
    const userTags = Object.values(tags);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState(scratchContent);
    const [showTags, setShowTags] = useState(false);
    const [noteTags, setNoteTags] = useState({});
    const [newTag, setNewTag] = useState();
    const history = useHistory();  

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    const tagSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        dispatch(tagsActions.createTag({ name: newTag, userId: sessionUser.id }))
            .catch(async res => {
                console.log(res);
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const newNote = await dispatch(notesActions.createNote({ name, content, userId: sessionUser.id, notebookId }))
            .catch(async res => {
                console.log(res);
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        const tagIds = Object.keys(noteTags).map(tag => parseInt(tag, 10));
        const tags = userTags.filter(tag => {
            return tagIds.includes(tag.id);
        });
            
        if (newNote) {
            if (tags.length) {
                tags.forEach(tag => {
                    dispatch(notesActions.createNoteTag(newNote, tag))
                })
            }
            setNoteId(newNote.id);
            setScratchContent();
            history.push("/dashboard")
        }
    }


    return (
        <>
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
                        onClick={() => setShowTags(false)}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing..."
                    />
                    <div className="footer">
                        <div onClick={() => setShowTags(!showTags)} id="show-tags">Tags</div>
                        {showTags && 
                            <div id="tags-menu">
                                {userTags.map((tag, i) => {
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
                                                return {...noteTags }
                                                }
                                            );
                                        }} value={tag.id} type="checkbox" id={tag.id} name={tag.name} />
                                    </div>
                                )})}
                                </div>
                            }
                        <button id="new-note" type="submit">Save Note</button>
                    </div>
                </form>
            </div>
            <form onSubmit={tagSubmit} id="new-tag-form">
                <input id="new-tag"
                    type="text"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    required
                    placeholder="Enter new tag"/>
            </form>
        </>
    )
}

export default NoteForm