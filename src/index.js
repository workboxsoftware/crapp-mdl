import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/routes';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form'

const rootReducer = combineReducers({
  form: reduxFormReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Styles
import './styles/index.css';
import './styles/material.css';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.querySelector('#root')
);