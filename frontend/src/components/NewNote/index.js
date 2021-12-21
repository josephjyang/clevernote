import React, { useState } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { usePage } from '../../context/ClevernoteContext';
import NoteForm from '../NoteForm';

function NewNote({ isLoaded }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { setNoteId, scratchContent, setScratchContent, notebookId, setNotebookId } = usePage();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState(scratchContent);
    

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([])
        let newNote
        if (notebookId === "select") {
            newNote = await dispatch(notesActions.createNote({ name, content, userId: sessionUser.id, notebookId: null }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
        } else {
            newNote = await dispatch(notesActions.createNote({ name, content, userId: sessionUser.id, notebookId }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
        }

        if (newNote) {
            setNoteId(newNote.id);
            setScratchContent();
            history.push("/dashboard")
        }
    }

    const deleteNote = e => {
        e.preventDefault()

        setNotebookId("select");
        setContent('');
        setName('')
    }

    return (
        <>
            {isLoaded && (
                <>
                    <NoteForm isLoaded={isLoaded} onSubmit={onSubmit} deleteNote={deleteNote} errors={errors} setErrors={setErrors} name={name} setName={setName} content={content} setContent={setContent} notebookId={notebookId} setNotebookId={setNotebookId}/>
                </>
            )}
        </>
    )
}

export default NewNote