import {connect} from 'react-redux'
import {reduxForm, SubmissionError} from 'redux-form';
import LogInForm from './logInForm';
import {errorNotificationInsert, errorNotificationDelete} from '../utils/redux';
import authAPI  from '../authAPI';
const {authActions} = authAPI;

const validateAndUpdateLogIn = (values, dispatch) => {
  let errors = [];

  if (!values.usernameEmail || values.usernameEmail.trim() === '') {
    errors.push({email: "err/email-req: Email required"});
  }

  if (!values.password || values.password.trim() === '') {
    errors.push({password: "err/password-req: Password required"});
  } else if (values.password.length < 8) {
    errors.push({password: "err/password-8: Password must be at least 8 characters"});
  }

  if (errors.length > 0) {
    return new Promise(function (resolve, reject) {
      throw new SubmissionError(errors[0]);
    });
  }

  authActions.logInUser(values)(dispatch);

}


const formName = 'logInForm';

function mapStateToProps(state) {
  let items = state.notif.filter(err => err.form === formName);
  const errorNotif = (items.length > 0) ? items[0] : undefined;
  return {
    auth: state.auth,
    application: state.application,
    errorNotif,
    validateAndUpdateLogIn
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    errorNotificationDelete,
    authClearError: authActions.authClearError
  }
}

let form = reduxForm({
  form: formName, // a unique identifier for this form
  onSubmitFail:(errors, dispatch) => {
    dispatch(errorNotificationInsert(formName, errors))
  }
})(LogInForm);


export default connect(mapStateToProps, mapDispatchToProps)(form)