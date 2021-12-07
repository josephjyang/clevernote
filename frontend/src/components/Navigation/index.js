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
                <NavLink to="/notes">
                    <button id="new-note-btn">
                        <i class="fas fa-plus"/>
                        <span>New Note</span>
                    </button>
                </NavLink>
                <div id="navbar-links">
                    <NavLink to="/dashboard">
                        <i class="fas fa-home"/>
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/notes">
                        <i className="fas fa-file-alt" />
                        <span>Notes</span>
                    </NavLink>
                    <NavLink to="/notebooks">
                        <i class="fas fa-book" />
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