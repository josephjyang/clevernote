import React, { useState } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Navigation from '../Navigation';
import './NoteForm.css'

function NoteForm({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const history = useHistory();

    if (!sessionUser) return (
        <Redirect to="/" />
    );


    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        await dispatch(notesActions.createNote({ name, content, user: sessionUser }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
         history.push("/dashboard")
    }



    return (
        <div id="content">
            <Navigation isLoaded={isLoaded}/>
            <div className="note-form">
                <h1>Write New Note</h1>
                <form onSubmit={onSubmit}>
                    <ul hidden={errors.length === 0}>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        placeholder="Enter Name for Note"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                        cols={5}
                    />
                    <button type="submit">Create Note</button>
                </form>
            </div>
        </div>
    )
}

export default NoteForm