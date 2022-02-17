import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton'
import DemoLoginButton from '../DemoLoginButton'
import LoginFormModal from '../LoginFormModal';
import { usePage } from '../../context/ClevernoteContext';
import logo from '../LoginFormModal/logo.png'
import './Navigation.css'

function Navigation({ isLoaded, setShowSignup }) {
    const { setScratchContent } = usePage();
    const sessionUser = useSelector(state => state.session.user); 
    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <div id="left-navbar">
                    <div id="user-header">
                        <ProfileButton user={sessionUser} />
                    </div>
                    <NavLink id="new-button" to="/notes/new" onClick={() => setScratchContent("")}>

                        <button id="new-note-btn">
                            <i className="fas fa-plus"/>
                            <span>New Note</span>
                        </button>
                    </NavLink>
                    <div id="navbar-links">
                        <NavLink className="navbar-link" to="/dashboard">
                            <i className="fas fa-home"/>
                            <span>Home</span>
                        </NavLink>
                        <NavLink className="navbar-link" exact to="/notes/new" onClick={() => setScratchContent("")}>
                            <i className="fas fa-file-alt" />
                            <span>Notes</span>
                        </NavLink>
                        <NavLink className="navbar-link" to="/notebooks">
                            <i className="fas fa-book" />
                            <span>Notebooks</span>
                        </NavLink>
                        <NavLink className="navbar-link" to="/tags">
                            <i className="fa-solid fa-tag fas"/>
                            <span>Tags</span>
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
                        <NavLink exact to="/">
                            <div id="home-links">
                                <img src={logo} alt="clevernote-logo" id="logo" />
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
                                <NavLink exact to="/" id="home-link" >Home</NavLink>
                            </li>
                            <li>
                                <LoginFormModal />
                            </li>
                            <li>
                                <NavLink to="/signup">
                                    <button id="signup">Sign Up</button>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="homepage-footer">
                    <NavLink id="about" to="/about">ABOUT CLEVERNOTE</NavLink>
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