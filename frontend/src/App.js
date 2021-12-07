import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import HomePage from './components/HomePage';
import SignupFormPage from './components/SignupFormPage';
import UserDashBoard from './components/UserDashboard';
import NoteForm from './components/NoteForm';
import UpdateNoteForm from './components/UpdateNoteForm';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
      <>
        {isLoaded && (
          <Switch>
            <Route path="/" exact>
              <HomePage isLoaded={isLoaded}/>
            </Route>
            <Route path="/dashboard">
              <UserDashBoard isLoaded={isLoaded}/>
            </Route>
            <Route path="/signup">
              <SignupFormPage isLoaded={isLoaded}/>
            </Route>
            <Route path="/notes/:noteId">
               <UpdateNoteForm isLoaded={isLoaded}/>
            </Route>
            <Route path="/notes">
              <NoteForm isLoaded={isLoaded}/>
            </Route>
          </Switch>
        )}
      </>
    );
}

export default App;
