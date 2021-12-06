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
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
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
            </>
        )
    }

    return (
        <nav>
            <NavLink exact to="/">
                <div id="left">
                        <img src="/images/logo.png" alt="clevernote-logo" id="logo" />
                        <span id="title">Clevernote</span>
                </div>
            </NavLink>
            <div id="right">
                <ul>
                    {isLoaded && sessionLinks}
                </ul>
            </div>
        </nav>
    )
}

export default Navigation