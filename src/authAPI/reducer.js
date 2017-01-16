import * as t from './actionTypes';

const initialState = {
  authenticated: false,
  error: null
};

export default function auth(state = initialState, action) {

  switch (action.type) {
    case t.AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null
      };
    case t.SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        error: null
      };
    case t.AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case t.AUTH_CLEAR_ERROR:
      const newState = {...state, error: ''};
      return newState;
    case t.SET_CONNECTED_STATUS:
      return {
        ...state,
        connected: action.status
      };
    default:
      return state;
  }
}
