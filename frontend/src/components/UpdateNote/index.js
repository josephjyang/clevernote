import React, { useState, useEffect, useMemo } from 'react';
import * as notesActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { usePage } from '../../context/ClevernoteContext';
import NoteForm from '../NoteForm';

function UpdateNote({ isLoaded }) {
    const dispatch = useDispatch();
    const { noteId, setNoteId, setNotebookId } = usePage();
    const notes = useSelector(state => state.notes)
    const notebooks = useSelector(state => state.notebooks);
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    const note = useMemo(() => notes[noteId] || {}, [noteId, notes]);
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(note.name);
    const [content, setContent] = useState(note.content);
    const [thisNotebookId, setThisNotebookId] = useState(note.notebookId);

    useEffect(() => {
        setName(note.name || '');
        setContent(note.content || '');
        setThisNotebookId(note.notebookId || null);
    }, [note, setThisNotebookId])

    const onSubmit = async e => {
        e.preventDefault();

        let payload;

        if (thisNotebookId === "select") {
            payload = {
                ...note,
                name,
                content,
                notebookId: null
            }
        } else {
            payload = {
                ...note,
                name,
                content,
                notebookId: thisNotebookId
            }
        }

        const updatedNote = await dispatch(notesActions.updateNote(payload))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        if (updatedNote) {
            setErrors([]);
            setNotebookId(updatedNote.notebookId);
            history.push("/dashboard")
        }
    }

    const deleteNote = async e => {
        e.preventDefault()

        await dispatch(notesActions.removeNote(noteId));
        setThisNotebookId("select");
        setNoteId(null);
        return history.push("/dashboard");
    }

    return (
        <>
            {isLoaded && (
                
                <NoteForm isLoaded={isLoaded} onSubmit={onSubmit} deleteNote={deleteNote} errors={errors} setErrors={setErrors} name={name} setName={setName} content={content} setContent={setContent} notebookId={thisNotebookId} setNotebookId={setThisNotebookId}/>
            )}
        </>
    )
}

export default UpdateNote