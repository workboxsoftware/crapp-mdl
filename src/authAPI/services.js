import * as Actions from './actions';
import firebase from 'firebase';
import {browserHistory} from 'react-router';

let fbAuth;
let fbDb;

export const signUpUser = (credentials) => {

}

export const signOut = () => {
  fbAuth.signOut();
}

export const isUsernameUnique = (username) => {

  let p = new Promise((resolve, reject) => {
    var q = fbDb.ref('users').orderByChild('username').equalTo(username);
    q.once('value')
      .then(function (snapshot) {
        if (snapshot.val()) {
          reject({username: 'That username is taken'});
        } else {
          resolve(console.log("username is unique"));  // fulfilled successfully
        }
      }, function (err) {
        reject({username: `${err.code}.  Please try again later `});
      })
  })

  return p;
}
// export const isUsernameUnique = (username) => {
//   return new Promise((resolve, reject) => {
//     var q = fbdb.ref('users').orderByChild('username').equalTo(values.username);
//     q.once('value')
//       .then(function (snapshot) {
//         if (snapshot.val()) {
//           reject({username: 'That username is taken'});
//         } else {
//           resolve(console.log("username is unique"));  // fulfilled successfully
//         }
//       }, function (err) {
//         reject({username: `${err.code}.  Please try again later `});
//       }).catch(function (err) {
//       return Promise.reject(err);
//     }
//   );
// });


export const initializeAuth = dispatch => {

  const config = {
    apiKey: 'AIzaSyAIE_-SJY-q9hJxokq61bORcqubyMOUfV8',
    authDomain: 'workbox-dev.firebaseapp.com',
    databaseURL: 'https://workbox-dev.firebaseio.com',
    storageBucket: 'workbox-dev.appspot.com'
  };

  firebase.initializeApp(config);

  fbAuth = firebase.auth();
  fbDb = firebase.database();

  // dispatch(Actions.verifyAuth());

  fbAuth.onAuthStateChanged(user => {
    if (user) {
      dispatch(Actions.authUser());
    } else {
      dispatch(Actions.signOutUser());
    }
  });

  const connectedRef = firebase.database().ref(".info/connected");
  connectedRef.on("value", function (snap) {
    if (snap.val() === true) {
      dispatch(Actions.setConnectedtatus(true));
    } else {
      dispatch(Actions.setConnectedtatus(false));
    }
  });

}


