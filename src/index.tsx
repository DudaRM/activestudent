import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase';
import './styles/auth.scss';
import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);