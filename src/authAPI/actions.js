import * as t from './actionTypes';
import { signOut } from './services';



export function authUser() {
  return {
    type: t.AUTH_USER
  }
}

export function setConnectedtatus(status) {

  return {
    type:t.SET_CONNECTED_STATUS,
    status
  }
};

export function signOutUser() {
  signOut();
  // browserHistory.push('/');

  return {
    type: t.SIGN_OUT_USER
  }
}