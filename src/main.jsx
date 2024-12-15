import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router.jsx';
import { ErrorProvider } from './context/ErrorContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorProvider>
      <Router />
    </ErrorProvider>
  </React.StrictMode>
);
