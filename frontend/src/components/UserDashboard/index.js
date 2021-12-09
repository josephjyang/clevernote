import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import { usePage } from '../../context/ClevernoteContext';
import { loadNotes } from '../../store/notes'
import Navigation from '../Navigation';
import './UserDashboard.css'

function UserDashBoard({ isLoaded, setPage }) {
    const { setNoteId } = usePage()
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

    let currTime = new Date();
    let timePeriod
    if (currTime.getHours() > 17) timePeriod = "evening";
    else if (currTime.getHours() >= 12) timePeriod = "afternoon";
    else timePeriod = "morning";

    const options = {year: 'numeric', weekday: 'long', month: 'short', day: 'numeric' };
    currTime = currTime.toLocaleDateString('en-US', options)

    return (
        <div id="dashboard-container">
            <div id="dash-header">
                <p>Good {timePeriod}, {sessionUser.firstName}!</p>
                <h4>
                    {currTime.toUpperCase()}
                </h4>
            </div>
            <div id="notes-container">
                <div id="notes-header">
                    <p>NOTES</p>
                    <div>
                        <i onClick={() => setPage("notes")}className="fas fa-file-alt" />
                    </div>
                </div>
                <div id="note-container">
                    {userNotes.map(note => {
                        const date = new Date(note.updatedAt);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return (
                            <div onClick={() => {
                                setPage("notes")
                                setNoteId(note.id)
                                }} key={note.id} className="note">
                                <div className="note-grid">
                                    <h3>
                                        {note.name}
                                    </h3>
                                    <p id="note-content">
                                        {note.content}
                                    </p>
                                    <p id="update-time">
                                        {`${date.toLocaleDateString('en-US', options)}`}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default UserDashBoard