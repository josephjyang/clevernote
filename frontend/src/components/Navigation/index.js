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
            <>
                <div id="left-navbar">
                    <div id="user-header">
                        <ProfileButton user={sessionUser} />
                    </div>
                </div>
            </>
        )
    } else {
        sessionLinks = (
            <>
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
            </>
        )
    }
    return (
        <nav>
            {isLoaded && sessionLinks}
        </nav>
    );
}

export default Navigation