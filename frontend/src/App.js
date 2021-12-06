import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import SignupFormPage from './components/SignupFormPage';
import UserDashBoard from './components/UserDashboard';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/dashboard">
              <UserDashBoard />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
        )}
      </>
    );
}

export default App;
