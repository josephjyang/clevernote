import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTags } from '../../store/tags';
import { Modal } from '../../context/Modal';
import { NavLink, Redirect } from 'react-router-dom';
import TagFormNew from '../TagFormNew';
import TagFormDelete from '../TagFormDelete';
import TagFormUpdate from '../TagFormUpdate';
import './Tags.css'

function Tags({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const tags = useSelector(state => state.tags);
    const [showButtons, setShowButtons] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const userTags = Object.values(tags);
    userTags.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) dispatch(loadTags(user));
        else return;
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
    
    return (
        <div id="tags-content">
            {<div id="tags-page">
                <h2>Tags</h2>
                <div id="tag-grid-header">
                    <span>{userTags.length} tags
                        </span>
                    <button id="new-tags" onClick={() => setShowForm(true)}><i className="fas fa-plus"></i>New Tag</button>
                    {showForm && (
                        <Modal onClose={() => setShowForm(false)}>
                            <TagFormNew hideForm={() => setShowForm(false)} />
                        </Modal>
                    )}
                </div>
                <div id="tag-grid">
                    <div id="header">
                        <div className="header">TITLE</div>
                        <div className="header">CREATED</div>
                        <div className="header">UPDATED</div>
                        <div className="header">ACTIONS</div>
                    </div>
                    {userTags.map(tag => {
                        const updateDate = new Date(tag.updatedAt);
                        const createDate = new Date(tag.createdAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <div className="tag-row" key={tag.id}>
                                <NavLink to={`/tags/${tag.id}`} className="tag-cell">
                                    {tag.name} ({tag.Notes ? tag.Notes.length : 0})
                                </NavLink>
                                <div className="tag-cell time">
                                    {`${createDate.toLocaleDateString('en-US', options)}`}
                                </div>
                                <div className="tag-cell time">
                                    {`${updateDate.toLocaleDateString('en-US', options)}`}
                                </div>
                                <div onClick={() => openActions(tag.id)} className="tag-cell">
                                    <i className="fas fa-ellipsis-h"></i>
                                    {showButtons === tag.id && 
                                        <div className="tag-actions-dropdown">
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
                        )
                    })}
                </div>
            </div>}
        </div>
    );
}

export default Tags