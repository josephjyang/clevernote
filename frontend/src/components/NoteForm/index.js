import React, { useState } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Navigation from '../Navigation';
import './NoteForm.css'

function NoteForm({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [notebookId, setNotebookId] = useState();
    const history = useHistory();

    if (!sessionUser) return (
        <Redirect to="/" />
    );


    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        await dispatch(notesActions.createNote({ name, content, userId: sessionUser.id, notebookId }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
         history.push("/dashboard")
    }


    return (
        <>
            <div className="note-form">
                <form onSubmit={onSubmit}>
                    {
                        errors.length >= 1 && <ul hidden={errors.length === 0}>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    }
                    <select
                    id="notebook-select"
                    onChange={e => setNotebookId(e.target.value)}
                    >
                        <option value="">Select a notebook</option>
                        {userNotebooks.map(notebook => {
                            return <option key={notebook.id} value={notebook.id}>{notebook.name}</option>
                        })}
                    </select>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        placeholder="Title"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        cols={5}
                    />
                    <button type="submit">Create Note</button>
                </form>
            </div>
        </>
    )
}

export default NoteForm