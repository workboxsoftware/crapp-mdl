import firebase from 'firebase';

let fbAuth;
let fbDb;
const usersDir = 'wbx_users';

export const signOut = () => {
  fbAuth.signOut();
}

export const getProfileForUsername = (username) => {

  //TODO: if more than 1 username found, post to some cloud-based logging/crash system
  let p = new Promise((resolve, reject) => {
    const myUsername = username.toLowerCase().trim();
    const q = fbDb.ref(usersDir).orderByChild('username').equalTo(myUsername);
    q.once('value')
      .then(function (snapshot) {
        let profile;
        if (! snapshot.exists) {
          resolve(null);
        } else {
          let ct = 0;
          snapshot.forEach(function(childSnapshot) {
            ct++
            profile = childSnapshot.val();
          });
          if (ct > 1) {
            console.err(`found more than 1 profile for username ${username}`);
            reject()
          }
        }
        resolve(profile);
      })
  })

  return p;
}

export const initializeAuth = (config) => {

  // const config = {
  //   apiKey: 'AIzaSyAIE_-SJY-q9hJxokq61bORcqubyMOUfV8',
  //   authDomain: 'workbox-dev.firebaseapp.com',
  //   databaseURL: 'https://workbox-dev.firebaseio.com',
  //   storageBucket: 'workbox-dev.appspot.com'
  // };

  firebase.initializeApp(config);

  fbAuth = firebase.auth();
  fbDb = firebase.database();
}

export function isAuthenticated () {
  return fbAuth.currentUser;
}
export function logInUserWithEmailAndPassword(email, password) {
  return fbAuth.signInWithEmailAndPassword(email, password)
    .then(
      response => {
        return Promise.resolve(response)
      },
      error => {
        return Promise.reject(error)
      })
}

export function createUserWithEmailAndPassword(credentials) {
  const p = new Promise(function (resolve, reject) {
    fbAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
          console.log("created new user");
          resolve(response)
        },
        error => {
          console.log("create user failed");
          reject(error)
        })
      .catch(err => {
        console.log("error thrown ", err)
        throw err
      });
  })
  return p;
}

export function createUserProfile(username, email) {
  const myUsername = username.toLowerCase().trim();
  return fbDb.ref(usersDir + '/' + fbAuth.currentUser.uid).set({
    username: myUsername,
    email,
    createDate: new Date().toString()
  });
}


export function handleConnectionStatusChanged(connectionAction) {
  return function (dispatch) {
    var connectedRef = fbDb.ref(".info/connected");
    connectedRef.on("value", function (snap) {
      if (snap.val() === true) {
        dispatch(connectionAction(true));
      } else {
        dispatch(connectionAction(false));
      }
    });
  }
}

export function handleAuthStatusChanged(authAction, unAuthAction) {
  return function (dispatch) {
    fbAuth.onAuthStateChanged(user => {
      if (user) {
        dispatch(authAction());
      } else {
        dispatch(unAuthAction());
      }
    });
  }
}
