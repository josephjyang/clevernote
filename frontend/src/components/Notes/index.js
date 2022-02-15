import React, { useState } from 'react';
import NotesSidebar from '../NotesSidebar';
import NoteForm from '../NoteForm';
import { usePage } from '../../context/ClevernoteContext';
import './Notes.css'

function Notes({ isLoaded, setPage }) {
    const { noteId } = usePage();
    const [notebookId, setNotebookId] = useState("");

    return (
            <div id="notes-content">
                <NotesSidebar />
                <NoteForm setNotebookId={setNotebookId} notebookId={notebookId} isLoaded={isLoaded}/>
                {/* {noteId && <NoteFormUpdate setNotebookId={setNotebookId} notebookId={notebookId} isLoaded={isLoaded}/>} */}
            </div>
    );
}

export default Notes