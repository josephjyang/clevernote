import React, { useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './NotebookFormDelete.css'

function NotebookFormDelete({ isLoaded, id, hideForm }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks)
    const notebook = notebooks[id]
    const [errors, setErrors] = useState([]);


    if (!sessionUser) return (
        <Redirect to="/" />
    )

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        await dispatch(notebookActions.removeNotebook(notebook))

        hideForm();
        history.push("/notebooks");
    }

    return (
        <>
            {isLoaded && (
                <div className="notebook-delete-form">
                    <form onSubmit={onSubmit}>
                        <ul hidden={errors.length === 0}>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                        <p>Are you sure you want to delete "{notebook.name}"?</p>
                        <button type="submit">Delete Notebook</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default NotebookFormDelete