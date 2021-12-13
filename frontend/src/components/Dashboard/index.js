import React from 'react';
import { useSelector } from 'react-redux';
import Notes from '../Notes';
import Notebooks from '../Notebooks';
import Navigation from '../Navigation';
import UserDashBoard from '../UserDashboard';
import AccountInfo from '../AccountInfo';
import { usePage } from '../../context/ClevernoteContext'

function Dashboard({ isLoaded }) {
    const { page, setPage } = usePage();
    
    const notes = useSelector(state => state.notes)
    const userNotes = Object.values(notes);
    userNotes.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    
    const notebooks = useSelector(state => state.notebooks)
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })

    return (
        <div id="content">
            <Navigation isLoaded={isLoaded} />
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