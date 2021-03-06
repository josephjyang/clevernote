import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadNotebooks } from '../../store/notebooks';
import { NavLink, Redirect } from 'react-router-dom';
import NotebookFormNew from '../NotebookFormNew';
import { Modal } from '../../context/Modal';
import NotebookFormUpdate from '../NotebookFormUpdate';
import NotebookFormDelete from '../NotebookFormDelete';
import './Notebooks.css'

function Notebooks({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const [showButtons, setShowButtons] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })

    const dispatch = useDispatch();
    useEffect(() => {
        if (user) dispatch(loadNotebooks(user));
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
        <div id="notebooks-content">
            {<div id="notebooks-page">
                <h2>Notebooks</h2>
                <div id="notebook-grid-header">
                    <span>{userNotebooks.length} notebooks
                    </span>
                    <button id="new-notebook" onClick={() => setShowForm(true)}><i className="fas fa-plus"></i>New Notebook</button>
                    {showForm && (
                        <Modal onClose={() => setShowForm(false)}>
                            <NotebookFormNew hideForm={() => setShowForm(false)} isLoaded={isLoaded}/>
                        </Modal>
                    )}
                </div>
                <div id="notebook-grid">
                    <div id="header">
                        <div className="header">TITLE</div>
                        <div className="header">CREATED</div>
                        <div className="header">UPDATED</div>
                        <div className="header">ACTIONS</div>
                    </div>
                    {userNotebooks.map(notebook => {
                        const updateDate = new Date(notebook.updatedAt);
                        const createDate = new Date(notebook.createdAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <div className="notebook-row" key={notebook.id}>
                                <NavLink to={`/notebooks/${notebook.id}/notes/new`} className="notebook-cell">
                                    {notebook.name} ({notebook.Notes ? notebook.Notes.length : 0})
                                </NavLink>
                                <div className="notebook-cell time">
                                    {`${createDate.toLocaleDateString('en-US', options)}`}
                                </div>
                                <div className="notebook-cell time">
                                    {`${updateDate.toLocaleDateString('en-US', options)}`}
                                </div>
                                <div onClick={() => openActions(notebook.id)} className="notebook-cell">
                                    <i className="fas fa-ellipsis-h"></i>
                                    {showButtons === notebook.id &&
                                        <div className="notebook-actions-dropdown">
                                            <button id="edit-notebook-link" onClick={() => setShowForm(notebook.id)}>Rename Notebook</button>
                                            <button id="delete-notebook-link" onClick={() => setShowDelete(notebook.id)}>Delete Notebook</button>
                                        </div>
                                    }
                                </div>
                                {showForm === notebook.id && (
                                    <Modal onClose={() => setShowForm(false)}>
                                        <NotebookFormUpdate id={notebook.id} hideForm={() => setShowForm(false)} isLoaded={isLoaded}/>
                                    </Modal>
                                )}
                                {showDelete === notebook.id && (
                                    <Modal onClose={() => setShowDelete(false)}>
                                        <NotebookFormDelete id={notebook.id} hideForm={() => setShowDelete(false)} isLoaded={isLoaded}/>
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

export default Notebooks