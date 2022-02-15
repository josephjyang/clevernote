import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton'
import DemoLoginButton from '../DemoLoginButton'
import LoginFormModal from '../LoginFormModal';
import { usePage } from '../../context/ClevernoteContext';
import './Navigation.css'

function Navigation({ isLoaded, setShowSignup }) {
    const { setPage, setNoteId, setNotebookId } = usePage();
    const sessionUser = useSelector(state => state.session.user); 
    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <div id="left-navbar">
                    <div id="user-header">
                        <ProfileButton user={sessionUser} />
                    </div>
                    <div id="new-button" onClick={() => {
                        setPage("notes");
                        setNoteId(false);
                        setNotebookId("select")
                        }}>
                        <button id="new-note-btn">
                            <i className="fas fa-plus"/>
                            <span>New Note</span>
                        </button>
                    </div>
                    <div id="navbar-links">
                        <NavLink className="navbar-link" to="/dashboard">
                            <i className="fas fa-home"/>
                            <span>Home</span>
                        </NavLink>
                        <NavLink className="navbar-link" exact to="/notes">
                            <i className="fas fa-file-alt" />
                            <span>Notes</span>
                        </NavLink>
                        <NavLink className="navbar-link" to="/notebooks">
                            <i className="fas fa-book" />
                            <span>Notebooks</span>
                        </NavLink>
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