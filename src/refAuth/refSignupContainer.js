import {reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux'
import RefSignupForm from './refSignupForm';
import {signupUser, authClearError} from './redux';
import {browserHistory} from 'react-router';


// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
// const INITIAL_VALUES = { client: 'john', billingRate:25678.99};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// synchronous validation on keystroke
function validate(values) {
  let errors = {};


  if (!values.email || values.email.trim() === '') {
    errors.email = "signup.email:Enter Email Address";
  }

  if (!values.username || values.username.trim() === '') {
    errors.username = "signup.nousername:Enter a username";
  }

  if (!values.password || values.password.trim() < 8) {
    errors.password = "signup.nopassword:Enter a password";
  }

  return errors;
}

// update the database
const validateAndUpdateSignup = (values, dispatch) => {

  return sleep(1000) // simulate server latency
    .then(() => {
      let errors = [];

      if (!values.username || values.username.trim() === '') {
        errors.push({username: "no-username: Username required"});
      }

      if (!values.email || values.email.trim() === '') {
        errors.push({email: "no-email: Email required"});
      }

      if (!values.password || values.password.trim() === '') {
        errors.push({password: "no-password: Password required"});
      } else if (values.password.length < 8) {
        errors.push({password: "password-8: Password must be at least 8 characters"});
      }

      // if errors, then go back and display
      // otherwise, set call action creator to authenticate.
      // if this is good, we'll get called back and can continue
      // to next screen.  Otherwise, we get AUTH_ERROR which
      // causes signup screen to re-display with error.
      if (errors.length > 0) {
        throw new SubmissionError(...errors)
      } else {
        dispatch(signupUser({email: values.email, username: values.username, password: values.password}));
      }
    })
};

// updates some additional optional info
// company name, user first and last name, language, etc.
const validateAndUpdateInfo = (values, dispatch) => {

  browserHistory.push('/refdataentry');

};

// pass in validation for signup and info
// also the action creator for signup user
const mapDispatchToProps = (dispatch) => {
  return {
    validateAndUpdateSignup,
    validateAndUpdateInfo,
    authClearError
  }
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    application: state.application,
  };
}


// need two HOC's - one for reduxForm and the other for connect
const form = reduxForm({
  form: 'signupForm', // a unique identifier for this form
  validate
})(RefSignupForm);

export default connect(mapStateToProps, mapDispatchToProps)(form)
