import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadNotes } from '../../store/notes'
import { Redirect } from "react-router";
import './NotesSidebar.css'

function NotesSidebar() {
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
            <div id="notes-sidebar" >
                <div id="notes-sidebar-header">
                    <h2>
                        <i className="fas fa-file-alt" /> Notes
                    </h2>
                    <p>
                        {userNotes.length} notes
                    </p>
                </div>
                {userNotes.map(note => {
                    const date = new Date(note.updatedAt);
                    const options = { year: 'numeric', month: 'short', day: 'numeric' };
                    return (
                        <NavLink to={`/notes/${note.id}`} key={note.id} className="note-block">
                            <h3>
                                {note.name}
                            </h3>
                            <p id="note-block-content">
                                {note.content}
                            </p>
                            <p id="note-update-time">
                                {`${date.toLocaleDateString('en-US', options)}`}
                            </p>
                        </NavLink>
                    )
                })}
            </div>
        </>
    )
}

export default NotesSidebar
