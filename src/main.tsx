import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Structured logger bootstrap (replaces old side-effect import)
import { appLogger } from './lib/logger';
appLogger.info('OpenClaw Desktop starting');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
