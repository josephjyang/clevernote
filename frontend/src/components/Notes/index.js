import React from 'react';
import NotesSidebar from '../NotesSidebar';
import NewNote from '../NewNote';
import UpdateNote from '../UpdateNote';
import { usePage } from '../../context/ClevernoteContext';
import './Notes.css'

function Notes({ isLoaded }) {
    const { noteId } = usePage();

    return (
        <>
            {isLoaded && (
                <div id="notes-content">
                    <NotesSidebar isLoaded={isLoaded} />
                    {!noteId && <NewNote isLoaded={isLoaded} />}
                    {noteId && <UpdateNote isLoaded={isLoaded} />}
                </div>
            )}
        </>
    );
}

export default Notes