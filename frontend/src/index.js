import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
// I imported bootstrap from the bootstrap library
import 'bootstrap/dist/css/bootstrap.min.css';
// I imported bootstrap JS plugin from the bootstrap library
import 'bootstrap/dist/js/bootstrap.min.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
