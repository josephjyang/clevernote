import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotesSidebar from '../NotesSidebar';
import NoteForm from '../NoteForm';
import { loadNotes } from '../../store/notes';
import { loadTags } from '../../store/tags';
import { loadNotebooks } from '../../store/notebooks';
import './Notes.css'

function Notes({ isLoaded }) {
    const [notebookId, setNotebookId] = useState("");
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    useEffect(() => {
        if (sessionUser) {
            dispatch(loadNotes(sessionUser));
            dispatch(loadTags(sessionUser));
            dispatch(loadNotebooks(sessionUser));
        } else return;
    }, [dispatch, sessionUser]);

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