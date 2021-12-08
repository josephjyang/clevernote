import React, { useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './NotebookForm.css'

function NotebookForm({ id, hideForm }) {
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
                <ul hidden={errors.length === 0}>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter a name for your new notebook"
                />
                <button type="submit">Update Notebook</button>
            </form>
        </div>
    )
}

export default NotebookForm