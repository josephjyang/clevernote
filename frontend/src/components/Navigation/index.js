import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton'
import DemoLoginButton from '../DemoLoginButton'
import LoginFormModal from '../LoginFormModal';
import { usePage } from '../../context/ClevernoteContext';
import * as notesActions from '../../store/notes'
import './Navigation.css'

function Navigation({ isLoaded, setShowSignup }) {
    const { setPage, setNoteId, setNotebookId } = usePage();
    const sessionUser = useSelector(state => state.session.user);
    const [searchTerms, setSearchTerms] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    let sessionLinks;

    const search = async e => {
        e.preventDefault();
        setErrors([]);

        const notes = await dispatch(notesActions.searchNotes({ user: sessionUser, searchTerms }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        if (notes) {
            setPage("notes");
        }
    }

    if (sessionUser) {
        sessionLinks = (
            <>
                <div id="left-navbar">
                    <div id="user-header">
                        <ProfileButton user={sessionUser} />
                    </div>
                    <div id="search-form">
                        <form action="/api/notes/search" class="search-form">
                            <i class="fas fa-search" />
                            <input type="search" name="term" placeholder="Search for a note" />
                            <input type="submit" value="Search" />
                        </form>
                    </div>
                    <div id="new-button" onClick={() => {
                        setPage("notes");
                        setNoteId(false);
                        setNotebookId("select")
                    }}>
                        <button id="new-note-btn">
                            <i className="fas fa-plus" />
                            <span>New Note</span>
                        </button>
                    </div>
                    <div id="navbar-links">
                        <div className="navbar-link" onClick={() => {
                            setNoteId(null);
                            setNotebookId(null);
                            setPage("dashboard");
                        }
                        }>
                            <i className="fas fa-home" />
                            <span>Home</span>
                        </div>
                        <div className="navbar-link" onClick={() => {
                            setPage("notes");
                            setNoteId(null);
                            setNotebookId(null);
                        }}>
                            <i className="fas fa-file-alt" />
                            <span>Notes</span>
                        </div>
                        <div className="navbar-link" onClick={() => {
                            setPage("notebooks");
                            setNotebookId(null);
                            setNoteId(null);
                        }}>
                            <i className="fas fa-book" />
                            <span>Notebooks</span>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        sessionLinks = (
            <>
                <div id="homenav">
                    <div id="left">
                        <NavLink exact to="/" onClick={() => setShowSignup(false)}>
                            <div id="home-links">
                                <img src="/images/logo.png" alt="clevernote-logo" id="logo" />
                                <span id="home-title">Clevernote</span>
                            </div>
                        </NavLink>

                    </div>
                    <div id="right">
                        <ul>
                            <li>
                                <DemoLoginButton />
                            </li>
                            <li>
                                <NavLink exact to="/" id="home-link" onClick={() => setShowSignup(false)}>Home</NavLink>
                            </li>
                            <li>
                                <LoginFormModal />
                            </li>
                            <li>
                                <button onClick={() => setShowSignup("signup")} id="signup">Sign Up</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="homepage-footer">
                    <span id="about" onClick={() => setShowSignup("about")}>ABOUT CLEVERNOTE</span>
                </div>
            </>
        )
    }
    return (
        <>
            {isLoaded && sessionLinks}
        </>
    );
}

export default Navigation