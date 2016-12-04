/* global __DEVTOOLS__ */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from '../middleware/logger'
// import persistenceStore from './persistence/store'
// import * as reducers from '../reducers'
import { reducer as reduxFormReducer } from 'redux-form'


if (__DEVTOOLS__) {
  const DevTools = require('../application/devToolsForm').default
  storeEnhancers.push(DevTools.instrument())
}

const finalCreateStore = compose(
  applyMiddleware(thunk, logger),
  ...storeEnhancers
)(createStore)

const combinedReducer = combineReducers({
  form: reduxFormReducer,
  application
})

export default function configureStore (initialState) {

  const store = finalCreateStore(combinedReducer, initialState)

  return store
}
