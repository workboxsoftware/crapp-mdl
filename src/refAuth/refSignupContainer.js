import {reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux'
import RefSignupForm from './refSignupForm';
import {browserHistory} from 'react-router';
import {errorNotificationInsert, errorNotificationDelete} from '../utils/redux';
import {signUpUser, authClearError} from './actions';
import authAPI  from '../authAPI';
const {authServices}  = authAPI;


// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function asyncValidate(values) {

  if (values.username && values.username.length < 4) {
    return;
  }

  let p = new Promise((resolve, reject) => {
    authServices.isUsernameUnique(values.username)
      .then(function (value) {
        console.log("back in signup success", value);
        resolve; // Success!
      }, function (err) {
        console.log("back in signup rejected", err);
        reject(err);
      });
  });

  return p;
}
//   return new Promise((resolve, reject) => {
//     if (values.username && values.username.length > 3) {
//       var q = firebaseDatabase.ref('users').orderByChild('username').equalTo(values.username);
//       q.once('value')
//        .then(function (snapshot) {
//         if (snapshot.val()) {
//           reject({username: 'That username is taken'});
//         } else {
//           resolve(console.log("all ok"));  // fulfilled successfully
//         }
//       }, function (err) {
//         reject({username: `${err.code}.  Please try again later `});
//       });
//     }
//   }).catch(function (err) {
//       return Promise.reject(err);
//     }
//   );
// }
// synchronous validation on keystroke
function validate(values) {
  let errors = {};

  if (values.email && values.email.trim().length > 0) {
    const re = /^\S+@\S+$/;
    if (!re.test(values.email)) {
      errors.email = "invalid-email: Invalid Email";
    }
  }

  if (values.username && values.username.trim().length > 0) {
    if (values.username.length < 4) {
      errors.username = "username-4chars: Username must at least 4 characters";
    }
  }

  return errors;
}

// update the database
const validateAndUpdateSignup = (values, dispatch) => {

  // return sleep(1000) // simulate server latency
  //   .then(() => {
  let errors = [];

  if (!values.username || values.username.trim() === '') {
    errors.push({username: "no-username: Username required"});
  }

  if (!values.username || values.username.trim().length < 3) {
    errors.push({username: "Username must be at least 3 characters"});
  }

  if (!values.email || values.email.trim() === '') {
    errors.push({email: "no-email: Email required"});
  } else {
    const re = /^\S+@\S+$/;
    if (!re.test(values.email)) {
      errors.push({email: "invalid-email: Invalid Email"});
    }
  }

  if (!values.password || values.password.trim() === '') {
    errors.push({password: "no-password: Password required"});
  } else if (values.password.length < 8) {
    errors.push({password: "password-8: Password must be at least 8 characters"});
  }

  if (errors.length > 0) {
    throw new SubmissionError(errors);
  }

  dispatch(signUpUser(values));
}

// updates some additional optional info
// company name, user first and last name, language, etc.
const validateAndUpdateInfo = (values, dispatch) => {

  browserHistory.push('/refdataentry');

};

const formName = 'signupForm';

function mapStateToProps(state) {
  let items = state.notif.filter(err => err.form === formName);
  const errorNotif = (items.length > 0) ? items[0] : undefined;
  return {
    auth: state.auth,
    application: state.application,
    errorNotif,
    validateAndUpdateSignup,
    validateAndUpdateInfo
  };
}

let form = reduxForm({
  form: 'signupForm', // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: ['username']
  // onSubmitFail: (errors, dispatch) => {
  //   dispatch(errorNotificationInsert(formName, errors))
  // }
})(RefSignupForm);

export default connect(mapStateToProps, {errorNotificationDelete, authClearError})(form)