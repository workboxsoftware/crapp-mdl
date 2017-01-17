import {reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux'
import SignUpForm from './signUpForm';
import {browserHistory} from 'react-router';
import {errorNotificationDelete} from '../utils/redux';
import authAPI  from '../authAPI';
const { authServices }  = authAPI;
const { authActions } = authAPI;

function asyncValidate(values) {

  // don't bother doing async test if < 4 chars
  if (values.username && values.username.length < 4) {
    return null;
  }

  // asyncValidate gets a promise back
  let p = new Promise((resolve, reject) => {
    authServices.getProfileForUsername(values.username)
      .then(function (value) {
        if (value) {
          reject({username: "This username is already taken"})
        } else {
          resolve(null);
        }
      })
  });

  return p;
}

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

  let errors = [];

  if (!values.username || values.username.trim().length == 0) {
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
    return new Promise(function (resolve, reject) {
      throw new SubmissionError(errors[0]);
    });
  }

  authActions.signUpUser(values)(dispatch);
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

const mapDispatchToProps = (dispatch) => {
  return {
    errorNotificationDelete,
    authClearError: authActions.authClearError
  }
}

let form = reduxForm({
  form: 'signupForm', // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: ['username']
})(SignUpForm);


export default connect(mapStateToProps, mapDispatchToProps)(form)