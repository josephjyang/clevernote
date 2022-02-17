import React from 'react';
import { useSelector } from 'react-redux';
import UserDashBoard from '../UserDashboard';

function Dashboard({ isLoaded }) {
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
        <>
            {isLoaded && (
                    <UserDashBoard isLoaded={isLoaded} />
                )}
        </>
    );
}

export default Dashboard