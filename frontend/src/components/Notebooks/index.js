import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadNotebooks } from '../../store/notebooks';
import { Link, Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import NewNotebookForm from '../NotebookFormNew';
import Notebook from '../Notebook';
import { FormModal } from '../../context/FormModal';
import './Notebooks.css'

function Notebooks({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const [showNotebook, setShowNotebook] = useState(false);
    const notebooks = useSelector(state => state.notebooks);
    const [showForm, setShowForm] = useState(false);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) dispatch(loadNotebooks(user));
        else return;
    }, [dispatch, user]);
    
    if (!user) return (
        <Redirect to="/" />
    )
    
    return (
        <div id="notebooks-content">
            {/* <Navigation isLoaded={isLoaded}/> */}
            {showNotebook && <Notebook isLoaded={isLoaded} id={showNotebook} setShowNotebook={setShowNotebook}/>}
            {!showNotebook && <div id="notebooks-page">
                <h2>Notebooks</h2>
                <div id="notebook-grid-header">
                    <span>{userNotebooks.length} notebooks
                        </span>
                    <button id="new-notebook" onClick={() => setShowForm(true)}>New Notebook</button>
                    {showForm && (
                        <FormModal onClose={() => setShowForm(false)}>
                            <NewNotebookForm hideForm={() => setShowForm(false)} />
                        </FormModal>
                    )}
                </div>
                <div id="notebook-grid">
                    <div id="header">
                        <div className="header">TITLE</div>
                        <div className="header">CREATED</div>
                        <div className="header">UPDATED</div>
                    </div>
                    {userNotebooks.map(notebook => {
                        const updateDate = new Date(notebook.updatedAt);
                        const createDate = new Date(notebook.createdAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <div className="notebook-row" key={notebook.id}>
                                <div onClick={() => setShowNotebook(notebook.id)}className="notebook-cell">
                                    {notebook.name}
                                </div>
                                <div className="notebook-cell time">
                                    {`${updateDate.toLocaleDateString('en-US', options)}`}
                                </div>
                                <div className="notebook-cell time">
                                    {`${createDate.toLocaleDateString('en-US', options)}`}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    );
}

export default Notebooks