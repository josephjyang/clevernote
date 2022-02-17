import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, Redirect, useParams } from 'react-router-dom';
import { loadTags } from '../../store/tags';
import { loadNotes } from '../../store/notes';
import { loadNotebooks } from '../../store/notebooks';
import { Modal } from '../../context/Modal';
import TagFormDelete from '../TagFormDelete';
import TagFormUpdate from '../TagFormUpdate';
import NoteForm from '../NoteForm';
import './Tag.css'

function Tag({ isLoaded }) {
    const { tagId } = useParams();
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.tags[tagId]?.Notes)
    const tags = useSelector(state => state.tags)
    notes?.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const tag = tags[tagId];
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(loadTags(user));
            dispatch(loadNotes(user));
            dispatch(loadNotebooks(user));
        } else return;
    }, [dispatch, user]);

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

    if(!tag) return null;

    return (
        <>
            <div id="tag-content">
                <div id="tag-sidebar" >
                    <div id="sidebar-header">
                        <div id="tag-header">
                            <h2>
                                <i className="fa-solid fa-tag fas" />
                                {tag.name}
                            </h2>
                            <p>
                                {notes && notes.length} notes
                            </p>
                        </div>
                        <div id="tag-buttons">
                            <i onClick={() => openActions(tag.id)} className="fas fa-ellipsis-h"></i>
                            {showButtons === tag.id &&
                                <div className="tag-actions-dropdown">
                                    <NavLink to={`/tags/${tag.id}/notes/new`}>
                                        <button id="new-note-link">
                                            New Note
                                        </button>
                                    </NavLink>
                                    <button id="edit-tag-link" onClick={() => setShowForm(tag.id)}>Rename Tag</button>
                                    <button id="delete-tag-link" onClick={() => setShowDelete(tag.id)}>Delete Tag</button>
                                </div>
                            }
                        </div>
                        {showForm === tag.id && (
                            <Modal onClose={() => setShowForm(false)}>
                                <TagFormUpdate id={tag.id} hideForm={() => setShowForm(false)} />
                            </Modal>
                        )}
                        {showDelete === tag.id && (
                            <Modal onClose={() => setShowDelete(false)}>
                                <TagFormDelete id={tag.id} hideForm={() => setShowDelete(false)} />
                            </Modal>
                        )}
                    </div>
                    {notes && notes.map(note => {
                        const date = new Date(note.updatedAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <NavLink key={note.id} to={`/tags/${tag.id}/notes/${note.id}`} className="tag-block">
                                <h3>
                                    {note.name}
                                </h3>
                                <p id="tag-block-content">
                                    {note.content}
                                </p>
                                <p id="tag-update-time">
                                    {`${date.toLocaleDateString('en-US', options)}`}
                                </p>
                            </NavLink>
                        )
                    })}
                </div>
                <Route path='/tags/:tagId/notes/:noteId'>
                    <NoteForm isLoaded={isLoaded} />
                </Route>
            </div>
        </>
    );
}

export default Tag