import React from 'react';
import Notes from '../Notes';
import Notebooks from '../Notebooks';
import Navigation from '../Navigation';
import UserDashBoard from '../UserDashboard';
import AccountInfo from '../AccountInfo';
import { usePage } from '../../context/ClevernoteContext'

function Dashboard({ isLoaded }) {
    const { page } = usePage();

    return (
        <>
            {isLoaded && (
                <div id="content">
                    <Navigation isLoaded={isLoaded} />
                    {page === "dashboard" && (
                        <UserDashBoard isLoaded={isLoaded} />)}
                    {page === "notes" && (
                        <Notes isLoaded={isLoaded} />)}
                    {page === "notebooks" && (
                        <Notebooks isLoaded={isLoaded} />)}
                    {page === "account" && (
                        <AccountInfo isLoaded={isLoaded} />)}
                </div>
            )}
        </>
    );
}

export default Dashboard