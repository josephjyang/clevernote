import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notes from '../Notes';
import Notebooks from '../Notebooks';
import Navigation from '../Navigation';
import UserDashBoard from '../UserDashboard';
import AccountInfo from '../AccountInfo';
import { loadNotes } from '../../store/notes'
import { loadNotebooks } from '../../store/notebooks'
import { usePage } from '../../context/ClevernoteContext'

function Dashboard({ isLoaded }) {
    const { page, setPage } = usePage();
    const user = useSelector(state => state.session.user);
    
    const notes = useSelector(state => state.notes)
    const userNotes = Object.values(notes);
    userNotes.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })

    const dispatch = useDispatch();
    useEffect(() => {
        if (user) dispatch(loadNotes(user));
        else return;
    }, [dispatch, user]);

    const notebooks = useSelector(state => state.notebooks)
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    useEffect(() => {
        if (user) dispatch(loadNotebooks(user));
        else return;
    }, [dispatch, user]);

    return (
        <div id="content">
            <Navigation setPage={setPage} isLoaded={isLoaded} />
            {isLoaded && (
                page === "dashboard" && (
                    <UserDashBoard setPage={setPage} isLoaded={isLoaded} />
                )
            )}
            {isLoaded && (
                page === "notes" && (
                    <Notes setPage={setPage} isLoaded={isLoaded} />
                )
            )}
            {isLoaded && (
                page === "notebooks" && (
                    <Notebooks setPage={setPage} isLoaded={isLoaded} />
                )
            )}
            {isLoaded && (
                page === "account" && (
                    <AccountInfo setPage={setPage} isLoaded={isLoaded} />
                )
            )}
        </div>
    );
}

export default Dashboard