import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
import NoteForm from '../NoteForm';
import Navigation from '../Navigation';
import UpdateNoteForm from '../UpdateNoteForm';
import './Notes.css'

function Notebook({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    const userNotes = Object.values(notes);
    userNotes.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })

    const dispatch = useDispatch();
    useEffect(() => {
        if (user) dispatch(loadNotes(user));
        else return;
    }, [dispatch, user]);

    if (!user) return (
        <Redirect to="/" />
    )
    return (
        <>
            <div id="notes-content">
                <Navigation isLoaded={isLoaded} />
                <div id="notes-sidebar" >
                    {userNotes.map(note => {
                        const date = new Date(note.updatedAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <Link key={note.id} to={`/notes/${note.id}`}>
                                <div className="note-block">
                                    <h3>
                                        {note.name}
                                    </h3>
                                    <p id="note-block-content">
                                        {note.content}
                                    </p>
                                    <p id="note-update-time">
                                        {`${date.toLocaleDateString('en-US', options)}`}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <NoteForm />
            </div>
        </>
    );
}

export default Notebook