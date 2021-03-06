import React, { useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './NotebookFormNew.css'

function NotebookFormNew({ isLoaded, hideForm }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return (
        <Redirect to="/" />
    )

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            name,
            userId: sessionUser.id
        }

        const newNotebook = await dispatch(notebookActions.createNotebook(payload))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        if (newNotebook) hideForm();
    }

    return (
        <>
            {isLoaded && (
                <div className="notebook-form">
                    <form onSubmit={onSubmit}>
                        <ul className="error-list-notebook" hidden={errors.length === 0}>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                        <p>Enter Notebook Name:</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter name"
                        />
                        <button type="submit">Create Notebook</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default NotebookFormNew