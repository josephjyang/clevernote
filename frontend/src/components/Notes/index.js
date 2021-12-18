import React, { useState } from 'react';
import NotesSidebar from '../NotesSidebar';
import NoteForm from '../NoteForm';
import './Notes.css'

function Notes({ isLoaded }) {
    const [notebookId, setNotebookId] = useState();

    return (
        <>
            {isLoaded && (
                <div id="notes-content">
                    <NotesSidebar isLoaded={isLoaded} />
                    <NoteForm setNotebookId={setNotebookId} notebookId={notebookId} isLoaded={isLoaded}/>
                </div>
            )}
        </>
    );
}

export default Notes