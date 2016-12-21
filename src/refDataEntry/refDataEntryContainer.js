import {reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
// import { bindActionCreators } from 'redux';
import RefDataEntryForm from './refDataEntryForm';
import { errorNotificationInsert, errorNotificationDelete } from '../utils/redux';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const INITIAL_VALUES = {client: 'john', billingRate: 25678.99};

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


  if (! values.vendor || values.vendor.trim() === '') {
    errors.vendor = "no-vendor: Enter Vendor";
  }

  return errors;
}

// update the database
export const updateDatabase = (values, dispatch) => {

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
        console.log("submission error", errors);
        throw new SubmissionError(...errors)
      } else {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      }
    })
};

// pass in the name of the update routine to form.
// const mapDispatchToProps = (dispatch) => {
//   return {
//     validateAndUpdateTimesheet,
//     bindActionCreators (errorNotificationDelete , dispatch)
//   }
// }

const formName = 'refDataEntryForm';

function mapStateToProps(state, ownProps) {
  // get this forms data
  let items = state.notif.filter(err => err.form === formName);
  const errorNotif = (items.length > 0) ? items[0]: undefined;
  return {
    initialValues: INITIAL_VALUES,
    application: state.application,
    updateDatabase,
    errorNotif,
  };
}

// need two HOC's - one for reduxForm and the other for connect

const TsForm = reduxForm({
  form: formName, // a unique identifier for this form
  validate,
  onSubmitFail:(errors, dispatch) => {
    dispatch(errorNotificationInsert(formName, errors))
  }
})(RefDataEntryForm)


export default connect(mapStateToProps, {errorNotificationDelete })(TsForm)
