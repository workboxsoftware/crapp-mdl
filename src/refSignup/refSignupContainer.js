import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux'
import RefSignupForm from './refSignupForm';
import { setScreenNumber} from './redux'

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
// const INITIAL_VALUES = { client: 'john', billingRate:25678.99};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let screenNumber;

// synchronous validation on keystroke
function validate(values) {
  var errors = {};

  if (!values.email || values.email.trim() === '') {
    errors.email = "signup.email:Enter Email Address";
  }

  if (!values.username || values.username.trim() === '') {
    errors.project = "signup.nousername:Enter a username";
  }

  if (!values.password || values.password.trim() < 8 ) {
    errors.password = "signup.nopassword:Enter a password";
  }
  
   return errors;
} 

// update the database
const validateAndUpdateSignup = (values, dispatch) => {

  return sleep(1000) // simulate server latency
  .then(() => {
      let errors = [];

      if (errors.length > 0) {
        throw new SubmissionError(...errors)
      } else {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      }
  })
};

// pass in the name of the update routine to form.
const mapDispatchToProps = (dispatch) => {
  return {
   validateAndUpdateSignup
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    signup: state.signup,
    application: state.application,
  };

}


// need two HOC's - one for reduxForm and the other for connect
const form = reduxForm({
  form: 'signupForm', // a unique identifier for this form
  validate
})(RefSignupForm)

export default connect(mapStateToProps, mapDispatchToProps)(form)
