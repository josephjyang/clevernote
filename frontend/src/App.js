import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import HomePage from './components/HomePage';
import SignupFormPage from './components/SignupFormPage';
import DashBoard from './components/Dashboard';
import NoteForm from './components/NoteForm';
import UpdateNoteForm from './components/UpdateNoteForm';
import Notes from './components/Notes';
import Notebooks from './components/Notebooks';
import Notebook from './components/Notebook'
import * as sessionActions from './store/session';
import * as notebookActions from './store/notebooks'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])
  
  const sessionUser = useSelector(state => state.session.user);

  return (
      <>
        {isLoaded && (
          <Switch>
            <Route path="/" exact>
              <HomePage isLoaded={isLoaded}/>
            </Route>
            <Route path='/dashboard' exact>
              <DashBoard isLoaded={isLoaded}/>
            </Route>
            <Route path="/signup">
              <SignupFormPage isLoaded={isLoaded}/>
            </Route>
            <Route path="/notes/:noteId">
               <UpdateNoteForm isLoaded={isLoaded}/>
            </Route>
            <Route path='/notes' exact>
              <Notes isLoaded={isLoaded} />
            </Route>
            <Route path='/notebooks' exact>
              <Notebooks isLoaded={isLoaded} />
            </Route>
            <Route path='/notebooks/:notebookId'>
              <Notebook isLoaded={isLoaded} />
            </Route>
          </Switch>
        )}
      </>
    );
}

export default App;
