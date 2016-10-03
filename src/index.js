import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/routes';

// Styles
import './styles/index.css';
import './styles/material.css';

ReactDOM.render(
  <Routes />,
  document.querySelector('#root')
);
