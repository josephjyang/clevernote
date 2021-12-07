import React, { useState } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import Navigation from '../Navigation';
import '../NoteForm/NoteForm.css'

function UpdateNoteForm({ isLoaded }) {
    const { noteId } = useParams();
    const notes = useSelector(state => state.notes)
    const note = notes[noteId] || {};
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(note.name);
    const [content, setContent] = useState(note.content);

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    const onSubmit = async e => {
        e.preventDefault();
        
        const payload = {
            ...note,
            name,
            content
        }

        const updatedNote = await dispatch(notesActions.updateNote(payload))
        if (updatedNote) history.push("/dashboard");
    }

    const deleteNote = async e => {
        e.preventDefault()

        await dispatch(notesActions.removeNote(noteId));
        return history.push("/dashboard");
    }

    return (
        <div id="content">
            <Navigation isLoaded={isLoaded} />
            <div className="note-form">
                <h1>Update Note</h1>
                <form id="updateform" onSubmit={onSubmit}>
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
                        rows={10}
                        cols={5}
                    />
                    <button type="submit">Update Note</button>
                    <button onClick={deleteNote}>Delete Note</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateNoteForm