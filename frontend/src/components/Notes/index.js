import React, { useState } from 'react';
import NotesSidebar from '../NotesSidebar';
import NoteForm from '../NoteForm';
import NoteFormUpdate from '../NoteFormUpdate';
import './Notes.css'

function Notes({ isLoaded, setPage }) {
    const [note, setNote] = useState(false);

    return (
            <div id="notes-content">
                <NotesSidebar setNote={setNote} />
                {!note && <NoteForm />}
                {note && <NoteFormUpdate noteId={note} isLoaded={isLoaded}/>}
            </div>
    );
}

export default Notes