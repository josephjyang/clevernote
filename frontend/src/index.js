import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { restoreCSRF, csrfFetch } from './store/csrf'
import App from './App';
import * as sessionActions from './store/session'
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { FormModalProvider } from './context/FormModal';
import { DeleteModalProvider } from './context/DeleteModal';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <FormModalProvider>
          <DeleteModalProvider>
            <BrowserRouter>
              <App />      
            </BrowserRouter>
          </DeleteModalProvider>
        </FormModalProvider>
      </ModalProvider>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
