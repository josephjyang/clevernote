import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton'
import DemoLoginButton from '../DemoLoginButton'
import LoginFormModal from '../LoginFormModal';
import { usePage } from '../../context/ClevernoteContext';
import * as notesActions from '../../store/notes'
import logo from '../LoginFormModal/logo.png'
import './Navigation.css'

function Navigation({ isLoaded, setShowSignup }) {
    const sessionUser = useSelector(state => state.session.user); 
    const [searchTerms, setSearchTerms] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { setScratchContent } = usePage();
    let sessionLinks;

    const search = async e => {
        e.preventDefault();
        history.push(`/search?key=${searchTerms}`);
        setErrors([]);

        const notes = await dispatch(notesActions.searchNotes({ user: sessionUser, searchTerms }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        console.log(notes);
    }

    if (sessionUser) {
        sessionLinks = (
            <>
                <div id="left-navbar">
                    <div id="user-header">
                        <ProfileButton user={sessionUser} />
                    </div>
                    <div id="search-form">
                        <form id="search-form" onSubmit={search}>
                            <i class="fas fa-search" />
                            <input onChange={e => setSearchTerms(e.target.value)} type="search" name="term" placeholder="Search for a note" />
                        </form>
                    </div>
                    <NavLink id="new-button" to="/notes/new" onClick={() => setScratchContent("")}>

                        <button id="new-note-btn">
                            <i className="fas fa-plus" />
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