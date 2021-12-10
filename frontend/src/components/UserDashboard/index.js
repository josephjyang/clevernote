import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import { usePage } from '../../context/ClevernoteContext';
import { loadNotes } from '../../store/notes'
import { loadTags } from '../../store/tags';
import Navigation from '../Navigation';
import './UserDashboard.css'

function UserDashBoard({ isLoaded, setPage }) {
    const { setNoteId } = usePage()
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes);
    const tags = useSelector(state => state.tags);
    const notebooks = useSelector(state => state.notebooks);
    const userTags = Object.values(tags);
    const userNotes = Object.values(notes);
    const userNotebooks = Object.values(notebooks);
    userNotes.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (sessionUser) {
            dispatch(loadNotes(sessionUser));
            dispatch(loadTags(sessionUser));
        } else return;
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
            <img src="https://www.nawpic.com/media/2020/mountain-nawpic-5.jpg" />
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
                        <i onClick={() => {
                            setPage("notes");
                            setNoteId(false);
                        }} className="fas fa-file-alt" />
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
            <div id="tags-container">
                <p>TAGS</p>
                {userTags.map(tag => {
                    const date = new Date(tag.updatedAt);
                    const options = { year: 'numeric', month: 'short', day: 'numeric' };
                    return (
                        <div key={tag.id} className="tag">
                            <div className="tag-grid">
                                <h3>
                                    {tag.name} - {tag.Notes.length} notes
                                </h3>
                                <p id="update-time">
                                    {`${date.toLocaleDateString('en-US', options)}`}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div id="notebooks-container">
                <p>Notebooks</p>
                {userNotebooks.map(notebook => {
                    const date = new Date(notebook.updatedAt);
                    const options = { year: 'numeric', month: 'short', day: 'numeric' };
                    return (
                        <div key={notebook.id} className="tag">
                            <div className="tag-grid">
                                <h3>
                                    {notebook.name} - {notebook.Notes.length} notes
                                </h3>
                                <p id="update-time">
                                    {`${date.toLocaleDateString('en-US', options)}`}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default UserDashBoard