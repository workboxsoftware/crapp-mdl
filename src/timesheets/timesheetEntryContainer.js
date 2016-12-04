import TimesheetForm from './timesheetEntryForm';
import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const INITIAL_VALUES = { client: 'john', billingRate:25678.99};

// synchronous validation on keystroke
function validate(values) {
  var errors = {};

  if (!values.client || values.client.trim() === '') {
    errors.client = { noclient:'Enter client' };
  }

  if (!values.project || values.project.trim() === '') {
    errors.project = { noproject: 'Enter project' };
  }

    if (values.client !== 'john') {
      errors.client = 'Client must be john(v)';
    }
  
   return errors;
} 

// update the database
const validateAndUpdateTimesheet = (values, dispatch) => {

  return sleep(2000) // simulate server latency
  .then(() => {
      let errors = [];
      if (values.client !== 'john') {
        errors.push({client: 'Client does not exist - must be JOHN', project: 'who knows'});
      }

      if (values.project !== "100") {
        errors.push({project: 'Project does not exist - must be 100'});
      }

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
   validateAndUpdateTimesheet
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    initialValues: INITIAL_VALUES,
    application: state.application
  };
}

// need two HOC's - one for reduxForm and the other for connect
const TsForm = reduxForm({
  form: 'timesheetForm', // a unique identifier for this form
  validate
})(TimesheetForm)

export default connect(mapStateToProps, mapDispatchToProps)(TsForm)
