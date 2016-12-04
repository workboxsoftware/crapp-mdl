
import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux'
import RefDataEntryForm from './refDataEntryForm';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const INITIAL_VALUES = { client: 'john', billingRate:25678.99};

// synchronous validation on keystroke
function validate(values) {
  var errors = {};

  if (!values.client || values.client.trim() === '') {
    errors.client = "noclient: Enter Client";
  }

  if (!values.project || values.project.trim() === '') {
    errors.project = "noproject:Enter Project";
  }

    if (values.client !== 'john') {
      errors.client = "clientjohn:Client must be john";
    }
  
   return errors;
} 

// update the database
const validateAndUpdateTimesheet = (values, dispatch) => {

  return sleep(1000) // simulate server latency
  .then(() => {
      let errors = [];
      if (values.client !== 'john') {
        errors.push({client: "clientjohn:client invalid - must be john"});
      }

      if (values.project !== "100") {
        errors.push({project: "project100:Project does not exist - must be 100"});
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
  form: 'refDataEntryForm', // a unique identifier for this form
  validate
})(RefDataEntryForm)


export default connect(mapStateToProps, mapDispatchToProps)(TsForm)
