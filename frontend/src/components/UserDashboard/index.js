import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { loadNotes } from '../../store/notes'
import './UserDashboard.css'

function UserDashBoard() {
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    
    const userNotes = Object.values(notes);
    userNotes.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (sessionUser) dispatch(loadNotes(sessionUser));
        else return;
    }, [dispatch, sessionUser]);
    
    if (!sessionUser) return (
        <Redirect to="/" />
    )

    return (
        <div id="container">
            <h1>Welcome, {sessionUser.firstName} {sessionUser.lastName}</h1>
            <h2>My Notes</h2>
            <div id="notes-container">
                {userNotes.map(note => {
                    const date = new Date(note.updatedAt);
                    let time = '';
                    if (date.getHours() > 12) time += date.getHours() - 12;
                    else time += date.getHours();
                    if (date.getMinutes() < 10) time += ":0" + date.getMinutes()
                    else time += ":" + date.getMinutes();
                    if (date.getHours() > 12) time += " pm"
                    else time += " am"
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    return (
                        <div key={note.id} className="note">
                            <h3>
                                {note.name}
                            </h3>
                            <p>
                                {note.content}
                                {`Updated at: ${date.toLocaleDateString('en-US', options)}, ${time}`}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default UserDashBoard