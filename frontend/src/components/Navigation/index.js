import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton'
import DemoLoginButton from '../DemoLoginButton'
import LoginFormModal from '../LoginFormModal';
import { usePage } from '../../context/ClevernoteContext';
import './Navigation.css'

function Navigation({ isLoaded }) {
    const { page, setPage } = usePage();
    const sessionUser = useSelector(state => state.session.user); 
    
    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <div id="left-navbar">
                <div id="user-header">
                    <ProfileButton user={sessionUser} />
                </div>
                <div onClick={() => setPage("notes")}>
                    <button id="new-note-btn">
                        <i className="fas fa-plus"/>
                        <span>New Note</span>
                    </button>
                </div>
                <div id="navbar-links">
                    <div className="navbar-link" onClick={() => setPage("dashboard")}>
                        <i className="fas fa-home"/>
                        <span>Home</span>
                    </div>
                    <div className="navbar-link" onClick={() => setPage("notes")}>
                        <i className="fas fa-file-alt" />
                        <span>Notes</span>
                    </div>
                    <div className="navbar-link" onClick={() => setPage("notebooks")}>
                        <i className="fas fa-book" />
                        <span>Notebooks</span>
                    </div>
                </div>
            </div>
        )
    } else {
        sessionLinks = (
            <div id="homenav">
                <NavLink exact to="/">
                    <div id="left">
                        <img src="/images/logo.png" alt="clevernote-logo" id="logo" />
                        <span id="title">Clevernote</span>
                    </div>
                </NavLink>
                <div id="right">
                    <ul>
                        <li>
                            <DemoLoginButton />
                        </li>
                        <li>
                            <NavLink exact to="/">Home</NavLink>
                        </li>
                        <li>
                            <LoginFormModal />
                        </li>
                        <li>
                            <NavLink to="/signup" id="signup">Sign Up</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    return (
        <>
            {isLoaded && sessionLinks}
        </>
    );
}

export default Navigation