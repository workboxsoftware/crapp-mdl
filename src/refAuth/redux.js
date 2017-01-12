// import { browserHistory } from 'react-router';
/*
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';
export const AUTH_CLEAR_ERROR = 'clear_error';


export function signupUser({ email, username, password }) {
  return function(dispatch) {
    if (email.length === 1) {
      dispatch(authError("Server error - Email failed  - cannot be 1 char"))
    } else if (password.length === 1) {
      dispatch(authError("Server error - Password failed - cannot be 1 char"))
    } else if (username.length === 1) {
      dispatch(authError("Server error - Username failed - cannot be 1 char"))
    } else {
      dispatch({type: AUTH_USER, token:"100"});
      localStorage.setItem('token', "100");
    }
  }
}

export const authClearError = () => {
  return {
    type: AUTH_CLEAR_ERROR
  };
};

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}


export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, token:action.token };
    case UNAUTH_USER:
      return { ...state, authenticated: false, token:'' };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case AUTH_CLEAR_ERROR:
      const newState = {...state, error:''};
      return newState;
    default:
      return state;
  }
}

 */