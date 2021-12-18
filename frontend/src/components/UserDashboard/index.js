import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { usePage } from '../../context/ClevernoteContext';
import { loadNotes } from '../../store/notes'
import { Modal } from '../../context/Modal';
import NotebookFormNew from '../NotebookFormNew';
import './UserDashboard.css'

function UserDashBoard({ isLoaded, setPage }) {
    const { setNoteId, setNotebookId, scratchContent, setScratchContent } = usePage()
    const [showButtons, setShowButtons] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    const notebooks = useSelector(state => state.notebooks);
    const userNotebooks = Object.values(notebooks);
    
    const userNotes = Object.values(notes);
    userNotes.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (sessionUser) dispatch(loadNotes(sessionUser));
        else return;
    }, [dispatch, sessionUser]);
    
    const openActions = () => {
        if (showButtons) return;
        return setShowButtons(true);
    }

    useEffect(() => {
        if (!showButtons) return;

        const closeActions = () => {
            setShowButtons(false);
        }

        document.addEventListener("click", closeActions)

        return () => document.removeEventListener("click", closeActions)
    }, [showButtons])

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
            <img alt="background" src="https://www.nawpic.com/media/2020/mountain-nawpic-5.jpg" />
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
                    {userNotes.length > 0 ? userNotes.map(note => {
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
                    }) : (
                    <div onClick={() => {
                        setPage("notes")
                        setNoteId()
                    }} className="note">
                        <div id="first-note">
                            <h3>
                                Write your first Clevernote!
                            </h3>
                        </div>
                    </div>
                        )}
                </div>
            </div>
        <div id="bottom-container">
            <div id="notebooks-container">
                <h3>NOTEBOOKS</h3>
                {userNotebooks.length > 0 ? userNotebooks.map(notebook => {
                    const date = new Date(notebook.updatedAt);
                    const options = { year: 'numeric', month: 'short', day: 'numeric' };
                    return (
                        <div onClick={() => {
                            setPage("notebooks")
                            setNotebookId(notebook.id)
                        }} key={notebook.id} className="notebook">
                            <p className="notebook-notecount">
                                {notebook.name}
                            </p>
                            <p className="update-time">
                                {`${date.toLocaleDateString('en-US', options)}`}
                            </p>
                        </div>
                    )
                }) : <div onClick = {() => setShowForm(true)
                } className="notebook">
                        <p className="notebook-notecount">
                            Create your first notebook!
                        </p>
                    </div>
                    }
                    {showForm && (
                        <Modal onClose={() => setShowForm(false)}>
                            <NotebookFormNew hideForm={() => setShowForm(false)} />
                        </Modal>
                    )}
            </div>
            <div id="scratchpad-container">
                <div id="scratchpad-header">
                    <h3>SCRATCH PAD</h3>
                    <i onClick={() => openActions()} className="fas fa-ellipsis-h"></i>
                    {showButtons &&
                        <div id="scratchpad-actions-dropdown">
                            <button onClick={() => setPage("notes")}>Convert to note</button>
                            <button onClick={() => setScratchContent('')}>Clear scratch pad</button>
                        </div>
                    }
                </div>
                <textarea
                value={scratchContent}
                onChange={(e) => setScratchContent(e.target.value)}
                placeholder="Start writing..."
                ></textarea>
            </div>

        </div>
        </div>
    );
}

export default UserDashBoard