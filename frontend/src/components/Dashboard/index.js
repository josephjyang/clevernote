import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import Notes from '../Notes';
import Notebooks from '../Notebooks';
import Navigation from '../Navigation';
import UserDashBoard from '../UserDashboard';
import { loadNotes } from '../../store/notes'
import { loadNotebooks } from '../../store/notebooks'
// import './Notes.css'

function Dashboard({ isLoaded }) {
    const user = useSelector(state => state.session.user);
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

    const dispatch = useDispatch();
    useEffect(() => {
        if (user) dispatch(loadNotes(user));
        else return;
    }, [dispatch, user]);

    useEffect(() => {
        if (user) dispatch(loadNotebooks(user));
        else return;
    }, [dispatch, user]);

    return (
        <div id="content">
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                // <Switch>
                <>
                    {/* <Route path={`/${user.username}/notes`} exact>
                        <Notes isLoaded={isLoaded} />
                    </Route> */}
                    <Route path={`/${user.username}`} exact>
                        <UserDashBoard isLoaded={isLoaded} />
                    </Route>
                    {/* <Route path={`/${user.username}/notebooks`}>
                        <Notebooks isLoaded={isLoaded} />
                    </Route> */}
                </>
                // </Switch>
            )}
        </div>
    );
}

export default Dashboard