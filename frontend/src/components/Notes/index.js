import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import NotesSidebar from '../NotesSidebar';
import NoteForm from '../NoteForm';
import { usePage } from '../../context/ClevernoteContext';
import './Notes.css'

function Notes({ isLoaded }) {
    const [notebookId, setNotebookId] = useState("");

    return (
            <div id="notes-content">
                <NotesSidebar />
                <Route path='/notes/:noteId'>
                    <NoteForm setNotebookId={setNotebookId} notebookId={notebookId} isLoaded={isLoaded}/>
                </Route>
            </div>
    );
}

export default Notes