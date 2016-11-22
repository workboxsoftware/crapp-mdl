import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';
import WbxButton from '../wbxWrappers/wbxButton';
import WbxTextfield from '../wbxWrappers/wbxTextfield';


class TimesheetForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="dataEntry">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {submitting && <div className="mdl-spinner mdl-js-spinner is-active" />}
        </div>

        <form onSubmit={handleSubmit(this.props.validateAndUpdateTimesheet.bind(this))}>
          <Field component={WbxTextfield} type="text" name="client"  label="Client" persistentHelpText="This is the client you're going to bill." />
          <Field component={WbxTextfield} type="number" name="project" onLoadHelpText="what's up"/>
          <Field component={WbxTextfield} type="number" name="billingRate" label="Hourly Billing Rate" />
          <Field component={WbxTextfield} type="number" name="hoursWorked"   />
          <Field component={WbxTextfield} type="text" name="invoiceComment" />
          <Field component={WbxTextfield} type="text" name="notes" />
          <br />
          <WbxButton disabled={submitting} type="submit">Submit</WbxButton> 
        </form>
      </div>
    );
  }
}

export default TimesheetForm;