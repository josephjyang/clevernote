import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton'
import DemoLoginButton from '../DemoLoginButton'
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
                    <NavLink to="/login">Log In</NavLink>
                </li>
                <li>
                    <NavLink to="/signup" id="signup">Sign Up</NavLink>
                </li>
            </>
        )
    }

    return (
        <nav>
            <ul>
                    {isLoaded && sessionLinks}
            </ul>
        </nav>
    )
}

export default Navigation