import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as tagsActions from '../../store/tags'
import './NoteForm.css'

function NoteForm({ isLoaded, onSubmit, deleteNote, errors, name, setName, content, setContent, notebookId, setNotebookId, currTags }) {
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const tags = useSelector(state => state.tags);
    const userTags = Object.values(tags);
    const [showTags, setShowTags] = useState(false);
    const [noteTags, setNoteTags] = useState(currTags ? Object.values(currTags) : null);
    const [newTags, setNewTags] = useState(currTags ? userTags.filter(tag => !currTags[tag.id]) : userTags)
    const [newTag, setNewTag] = useState();
    const [showActions, setShowActions] = useState(false);
    const [tagErrors, setTagErrors] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setNoteTags(currTags ? Object.values(currTags) : null)
        setNewTags(currTags ? userTags.filter(tag => !currTags[tag.id]) : userTags)
    }, [currTags, userTags])

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

    const tagSubmit = async e => {
        e.preventDefault();
        setTagErrors([]);
        dispatch(tagsActions.createTag({ name: newTag, userId: sessionUser.id }))
            .catch(async res => {
                console.log(res);
                const data = await res.json();
                if (data && data.errors) setTagErrors(data.errors);
            })
    }


    return (
        <>
            {isLoaded && (
                <>
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
                                <div onClick={() => setShowTags(!showTags)} id="show-tags">Tags</div>
                                {showTags &&
                                    <div id="tags-menu">
                                        {noteTags?.map((tag, i) => {
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
                                                    }} value={tag.id} type="checkbox" id={tag.id} name={tag.name} checked={true} />
                                                </div>
                                            )
                                        })}
                                        {newTags?.map((tag, i) => {
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
            )}
        </>
    )
}

export default NoteForm