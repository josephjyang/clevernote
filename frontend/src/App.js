import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Notes from './components/Notes';
import Notebooks from './components/Notebooks';
import Notebook from './components/Notebook';
import Tags from './components/Tags';
import Tag from './components/Tag';
import Navigation from './components/Navigation';
import AccountInfo from './components/AccountInfo';
import About from './components/About';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);



  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  if (sessionUser) {
    return (
      <div id="content">
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path="/" exact>
              <HomePage isLoaded={isLoaded} />
            </Route>
            <Route path='/dashboard' exact>
              <Dashboard isLoaded={isLoaded} />
            </Route>
            <Route path='/notes'>
              <Notes isLoaded={isLoaded} />
            </Route>
            <Route path='/notebooks' exact>
              <Notebooks isLoaded={isLoaded} />
            </Route>
            <Route path='/notebooks/:notebookId'>
              <Notebook isLoaded={isLoaded} />
            </Route>
            <Route path='/tags' exact>
              <Tags isLoaded={isLoaded} />
            </Route>
            <Route path='/tags/:tagId'>
              <Tag isLoaded={isLoaded} />
            </Route>
            <Route path='/account'>
              <AccountInfo isLoaded={isLoaded} />
            </Route>
          </Switch>
        )}
      </div>
    );
  } else {
    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path="/" exact>
              <HomePage isLoaded={isLoaded} />
            </Route>
            <Route path='/about' exact>
              <About isLoaded={isLoaded} />
            </Route>
            <Route path='/signup'>
              <SignupFormPage isLoaded={isLoaded} />
            </Route>
          </Switch>
        )}
      </>
    )
  }
}

export default App;
