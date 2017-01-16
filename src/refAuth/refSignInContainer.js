import {reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux'
import RefSignInForm from './refSignInForm';
import {browserHistory} from 'react-router';
import {errorNotificationDelete} from '../utils/redux';
import authAPI  from '../authAPI';
const { authActions } = authAPI;

const validateAndUpdateSignIn = (values, dispatch) => {
  let errors = [];

  if (!values.usernameEmail || values.usernameEmail.trim() === '') {
    errors.push({email: "no-email: Email required"});
  }

  if (!values.password || values.password.trim() === '') {
    errors.push({password: "no-password: Password required"});
  } else if (values.password.length < 8) {
    errors.push({password: "password-8: Password must be at least 8 characters"});
  }

  if (errors.length > 0) {
    throw new SubmissionError(errors);
  }

  authActions.signInUser(values)(dispatch);

}


const formName = 'signInForm';

function mapStateToProps(state) {
  let items = state.notif.filter(err => err.form === formName);
  const errorNotif = (items.length > 0) ? items[0] : undefined;
  return {
    auth: state.auth,
    application: state.application,
    errorNotif,
    validateAndUpdateSignIn
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    errorNotificationDelete,
    authClearError: authActions.authClearError
  }
}

let form = reduxForm({
  form: 'signInForm', // a unique identifier for this form
})(RefSignInForm);


export default connect(mapStateToProps, mapDispatchToProps)(form)