import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton'
import DemoLoginButton from '../DemoLoginButton'
import LoginFormModal from '../LoginFormModal';
import './Navigation.css'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user); 
    
    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <div id="left-navbar">
                <div id="user-header">
                    <ProfileButton user={sessionUser} />
                </div>
                <NavLink to={`/${sessionUser.username}/notes/new`}>
                    <button id="new-note-btn">
                        <i className="fas fa-plus"/>
                        <span>New Note</span>
                    </button>
                </NavLink>
                <div id="navbar-links">
                    <NavLink to={`/${sessionUser.username}`}>
                        <i className="fas fa-home"/>
                        <span>Home</span>
                    </NavLink>
                    <NavLink to={`/${sessionUser.username}/notes`}>
                        <i className="fas fa-file-alt" />
                        <span>Notes</span>
                    </NavLink>
                    <NavLink to={`/${sessionUser.username}/notebooks`}>
                        <i className="fas fa-book" />
                        <span>Notebooks</span>
                    </NavLink>
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