import React, { useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './NotebookFormUpdate.css'

function NotebookFormUpdate({ id, hideForm }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks)
    const notebook = notebooks[id]
    const [name, setName] = useState(notebook.name);
    const [errors, setErrors] = useState([]);
    

    if (!sessionUser) return (
        <Redirect to="/" />
    )

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            ...notebook,
            name
        }

        const updatedNotebook = await dispatch(notebookActions.updateNotebook(payload))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        
        if (updatedNotebook) hideForm();
    }

    return (
        <div className="notebook-form">
            <form onSubmit={onSubmit}>
                <ul className="error-list-notebook" hidden={errors.length === 0}>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <p>Update Notebook Name:</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // required
                    placeholder="Enter name"
                />
                <button type="submit">Update Notebook</button>
            </form>
        </div>
    )
}

export default NotebookFormUpdate