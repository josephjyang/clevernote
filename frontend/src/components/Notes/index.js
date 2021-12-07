import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
// import ProfileButton from './ProfileButton'
// import DemoLoginButton from '../DemoLoginButton'
// import LoginFormModal from '../LoginFormModal';
import NotesSidebar from '../NoteSidebar';
import NoteForm from '../NoteForm';
import Navigation from '../Navigation';
import './Notes.css'

function Notes({ isLoaded }) {
    console.log("test");
    const user = useSelector(state => state.session.user);

    return (
        <div id="notes-content">
            <NotesSidebar />
            <Switch>
                <Route exact path={`/${user.username}/notes/new`}>
                    <NoteForm />    
                </Route>
                <Route exact path={`/${user.username}/notes`}>
                    <NoteForm />
                </Route>
            </Switch>
        </div>
    );
}

export default Notes