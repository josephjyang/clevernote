import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal } from "../../context/Modal"
import LoginForm from '../LoginFormModal/LoginForm';
import { loadNotes } from '../../store/notes'
import './HomePage.css'

function HomePage() {
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    const [showModal, setShowModal] = useState(false);
    const userNotes = Object.values(notes);
    // console.log(sessionUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if(sessionUser) dispatch(loadNotes(sessionUser));
        else return;
    }, [dispatch, sessionUser]);
    
    if (sessionUser) {       
        return (
        <div id="container">
            <h1>Welcome, {sessionUser.firstName} {sessionUser.lastName}</h1>
            <h2>My Notes</h2>
            <div id="notes-container">
                {userNotes.map(note => {
                    return (
                        <div class="note">
                            <h3>
                                {note.name}
                            </h3>
                            <p>
                                {note.content}
                                {note.updatedAt}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
        );
    }

    if (!sessionUser) return (
        <div id="container">
            <div id="homepage">
                <h1>
                    Save your ideas, share your gifts
                </h1>
                <h3>
                    Write down all of your brilliant ideas so that you don't miss out on sharing them with the world.
                <br />
                    Organize your business plans, jokes, solutions, and more all in one place.
                </h3>
                <NavLink to="/signup">
                    <button id="sign-up-btn">
                        Sign up for free
                    </button>
                </NavLink>
                <p id="log-in-text">
                    <button id="log-in-link" onClick={() => setShowModal(true)}>Already have an account? Log in</button>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <LoginForm />
                        </Modal>
                    )}
                </p>
            </div>
        </div>
    );
}

export default HomePage