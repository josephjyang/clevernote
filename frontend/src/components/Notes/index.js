import React, { useState } from 'react';
import NotesSidebar from '../NotesSidebar';
import NoteForm from '../NoteForm';
import NoteFormUpdate from '../NoteFormUpdate';
import { usePage } from '../../context/ClevernoteContext';
import './Notes.css'

function Notes({ isLoaded }) {
    const { noteId } = usePage();
    const [notebookId, setNotebookId] = useState();

    return (
        <>
            {isLoaded && (
                <div id="notes-content">
                    <NotesSidebar isLoaded={isLoaded} />
                    {!noteId && <NoteForm setNotebookId={setNotebookId} notebookId={notebookId} isLoaded={isLoaded}/>}
                    {noteId && <NoteFormUpdate setNotebookId={setNotebookId} notebookId={notebookId} isLoaded={isLoaded}/>}
                </div>
            )}
        </>
    );
}

export default Notes