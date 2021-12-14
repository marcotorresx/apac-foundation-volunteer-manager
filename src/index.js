import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProvider from "./contexts/UserContext"
import {BrowserRouter as Router} from "react-router-dom"
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);