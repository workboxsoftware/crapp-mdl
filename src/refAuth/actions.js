import { browserHistory } from 'react-router';
import firebase from 'firebase';
import {firebaseDatabase, firebaseAuth} from '../index';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR';
export const SET_CONNECTED_STATUS = 'SET_CONNECTED';

/*
import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAIE_-SJY-q9hJxokq61bORcqubyMOUfV8',
  authDomain: 'workbox-dev.firebaseapp.com',
  databaseURL: 'https://workbox-dev.firebaseio.com',
  storageBucket: 'workbox-dev.appspot.com'
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth;
export const firebaseUsersRef = firebase.database().ref("users");

var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    alert("connected");
  } else {
    alert("not connected");
  }
});
*/

export function setConnectedtatus(status) {

  return {
    type:SET_CONNECTED_STATUS,
    status
  }
};

export function authClearError() {
  return {
    type: AUTH_CLEAR_ERROR
  };
};

export function signUpUser(credentials) {
  return function(dispatch) {
    firebaseAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        firebaseDatabase.ref('users/' + response.uid).set({
          username: credentials.username,
          email: credentials.email
        });
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}


export function signInUser(credentials) {
  return function(dispatch) {
    firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/refDataEntry');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}

export function signOutUser() {
  firebaseAuth.signOut();
  browserHistory.push('/');

  return {
    type: SIGN_OUT_USER
  }
}

export function verifyAuth() {
  return function (dispatch) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}

export function authUser() {
  return {
    type: AUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
