import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form'
import { addLocaleData } from 'react-intl';
import applicationReducer from './application/applicationReducer'
import en from 'react-intl/lib/locale-data/en'
import fr from 'react-intl/lib/locale-data/fr'
// import es from 'react-intl/lib/locale-data/es'
import de from 'react-intl/lib/locale-data/de'
import ConnectedIntlProvider from './utils/connectedIntlProvider';
import * as i18n from './i18n'
addLocaleData(en)
addLocaleData(fr)
addLocaleData(de)

const rootReducer = combineReducers({
  form: reduxFormReducer,
  application: applicationReducer
})

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
  if (! language ) {
    locale = 'en-US';
    language = 'en';
  }
 

// set initial state of store.  check to see if user has already set
// a specific locale.If not, use best possible default from above.
const initialState = {
  application: {
    token: null,
    locale,
    messages: i18n[language],
    user: {
      permissions: []
    },
    error: null
  }
}

const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
