import * as t from './actionTypes';
import {browserHistory} from 'react-router';
import * as authServices  from './services';

export function setConnectedStatus(status) {
  return {
    type: t.SET_CONNECTED_STATUS,
    status
  }
};


export function authClearError() {
  return {
    type: t.AUTH_CLEAR_ERROR
  };
};


export function logInUser(credentials) {
  return function (dispatch) {
    const password = credentials.password;
    const usernameEmail = credentials.usernameEmail;

    /*
    Log-in process
      1.  See if username found in fb profile
      2.  If yes, try logging in with the email found in profile
      3.  If loogged, we're done.
      4.  If we're here, then we have 2 choices
      5a. UsernameEmail has "@" so it's a potential email, try logging in with that
      5b. UsernameEmail has NO "@" so they were only trying to login with username (which failed above) so we're done.
      6.  Try logging in with usernameEmail.
      7.  Logged in - we're done or failure give error message
     */

    const promise = authServices.getProfileForUsername(usernameEmail);
    promise
      .then(
        profile => {return authServices.logInUserWithEmailAndPassword(profile.email, password)},
        error => { throw new Error('progress": "no username - try email')} )
      .then(
         response => { return "all ok" },
         err => {
          if (usernameEmail.indexOf("@") > -1) {
            return authServices.logInUserWithEmailAndPassword(usernameEmail, password)
          } else {
            throw new Error('Invalid Username or Password')
          }
        })
      .then(
        response => {return "all ok"},
        err => {dispatch(authError("Username or Password not found"))}
      )
      .catch(
        message => {console.log("Caught unexpected login mssage", message)}
      )
    }
  }

  export function signUpUser(credentials) {
    return function (dispatch) {
      const promise = authServices.createUserWithEmailAndPassword(credentials);
      promise
        .then(
          response => {return authServices.createUserProfile(credentials.username, credentials.email)},
          error => { dispatch(authError(error.message));
                      throw new Error('create user failed')})
        .then(
          response => {console.log("created user profile ok (even if offline it's ok")})
        .catch(
          response => {console.log("caught err SIU", response)})
    }
  }


// user unAuthenticated - either manually signed out
// or was timed out by Firebase and forced out
  export function unAuthUser() {
    console.log("user logged out");
    browserHistory.push('/');
    return {
      type: t.SIGN_OUT_USER
    }
  }

  export function authUser() {
    console.log("user logged in")
    return {
      type: t.AUTH_USER
    }
  }

  export function authError(error) {
    return {
      type: t.AUTH_ERROR,
      payload: error
    }
  }

