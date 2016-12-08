import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/routes';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form'
import {addLocaleData} from 'react-intl';
import applicationReducer from './application/applicationReducer';
import authReducer from './refAuth/redux';
import { AUTH_USER, UNAUTH_USER } from './refAuth/redux'
import en from 'react-intl/lib/locale-data/en'
import fr from 'react-intl/lib/locale-data/fr'
// import es from 'react-intl/lib/locale-data/es'
import de from 'react-intl/lib/locale-data/de'
import ConnectedIntlProvider from './utils/connectedIntlProvider';
import * as i18n from './i18n'
addLocaleData(en);
addLocaleData(fr);
addLocaleData(de);

const rootReducer = combineReducers({
  form: reduxFormReducer,
  application: applicationReducer,
  auth: authReducer
});

// if we've got a saved locale, then use it.
// otherwise, create the best one we can from browser language info
let locale = localStorage.getItem('locale');
if (!locale) {
  locale = navigator.language.split('-')
  locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language;
}

// now just look at the language part and make sure it's supported
// if not, then force in en-US
let language = locale.substring(0, 2);
if (!language) {
  locale = 'en-US';
  language = 'en';
}


// set initial state of store.  check to see if user has already set
// a specific locale. If not, use best possible default from above.
const initialState = {
  application: {
    locale,
    messages: i18n[language],
    user: {
      permissions: []
    },
  },
  auth: {
    authenticated: false
  }
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// TODO:  We need to actually validate the token and see if it's active.  But what to show while validating?
// const token = localStorage.getItem('token');
const token = null;
if (token) {
  store.dispatch({ type: AUTH_USER });
} else {
  store.dispatch({type: UNAUTH_USER});
}

// Styles
import './styles/index.css';
import './styles/material.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <Routes />
    </ConnectedIntlProvider>
  </Provider>,
  document.querySelector('#root')
);
