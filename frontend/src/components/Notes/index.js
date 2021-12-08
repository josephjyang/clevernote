import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
// import ProfileButton from './ProfileButton'
// import DemoLoginButton from '../DemoLoginButton'
// import LoginFormModal from '../LoginFormModal';
import NotesSidebar from '../NotesSidebar';
import NoteForm from '../NoteForm';
import Navigation from '../Navigation';
import UpdateNoteForm from '../UpdateNoteForm';
import './Notes.css'

function Notes({ isLoaded, setPage }) {
    const user = useSelector(state => state.session.user);

    return (
            <div id="notes-content">
                <NotesSidebar />
                <NoteForm />
            </div>
    );
}

export default Notes