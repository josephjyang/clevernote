import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton'
import DemoLoginButton from '../DemoLoginButton'
import LoginFormModal from '../LoginFormModal';
import { usePage } from '../../context/ClevernoteContext';
import './Navigation.css'

function Navigation({ isLoaded, setShowPage }) {
    const { setPage, setNoteId, setNotebookId, setScratchContent } = usePage();
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
                        setNotebookId("select");
                        setScratchContent();
                        }}>
                        <button id="new-note-btn">
                            <i className="fas fa-plus"/>
                            <span>New Note</span>
                        </button>
                    </div>
                    <div id="navbar-links">
                        <div className="navbar-link" onClick={() => {
                            setNoteId(false);
                            setNotebookId("select");
                            setPage("dashboard");
                            setScratchContent();
                            }
                            }>
                            <i className="fas fa-home"/>
                            <span>Home</span>
                        </div>
                        <div className="navbar-link" onClick={() => {
                            setPage("notes");
                            setNoteId(false);
                            setNotebookId("select");
                            setScratchContent();
                        }}>
                            <i className="fas fa-file-alt" />
                            <span>Notes</span>
                        </div>
                        <div className="navbar-link" onClick={() => {
                            setPage("notebooks");
                            setNotebookId("select");
                            setNoteId(false);
                            setScratchContent();
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
                        <NavLink exact to="/" onClick={() => setShowPage(false)}>
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
                                <NavLink exact to="/" id="home-link" onClick={() => setShowPage(false)}>Home</NavLink>
                            </li>
                            <li>
                                <LoginFormModal />
                            </li>
                            <li>
                                <button onClick={() => setShowPage("signup")} id="signup">Sign Up</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="homepage-footer">
                    <span id="about" onClick={() => setShowPage("about")}>ABOUT CLEVERNOTE</span>
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