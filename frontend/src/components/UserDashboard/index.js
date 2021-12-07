import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import { loadNotes } from '../../store/notes'
import Navigation from '../Navigation';
import './UserDashboard.css'

function UserDashBoard({ isLoaded }) {
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
    else if (currTime.getHours() > 12) timePeriod = "afternoon";
    else timePeriod = "morning";

    const options = {year: 'numeric', weekday: 'long', month: 'short', day: 'numeric' };
    currTime = currTime.toLocaleDateString('en-US', options)

    return (
        <div id="content">
            <Navigation isLoaded={isLoaded}/>
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
                        <Link to="/notes">
                            <i className="fas fa-file-alt" />
                        </Link>
                    </div>
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
                                <Link to={`/notes/${note.id}`}>
                                    <h3>
                                        {note.name}
                                    </h3>
                                    <p id="note-content">
                                        {note.content}
                                    </p>
                                    <p id="update-time">
                                        {`Last update: ${date.toLocaleDateString('en-US', options)}, ${time}`}
                                    </p>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default UserDashBoard