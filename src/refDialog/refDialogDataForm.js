import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import WbxButton from '../wbxWrappers/wbxButton';
import WbxTextfield from '../wbxWrappers/wbxTextfield';
import { injectIntl } from 'react-intl';
import { switchLocale } from '../application/applicationActions'


class RefDialogDataForm extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // };

  render() {

    const locale = this.props.application.locale;

    const { handleSubmit, submitting } = this.props;

    return (
      <div className="dataEntry">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {submitting && <div className="mdl-spinner mdl-js-spinner is-active" />}
        </div>
        <fieldset>
          <select ref="langSwitcher" value={locale}
                  onChange={this.props.onLocaleChange}>
            <option value="en-US">English US</option>
            <option value="fr-FR">french-France</option>
            <option value="de">german-Germany</option>
            <option value="en-IN">english - India</option>
            <option value="es-AR">spanish - Argentina</option>
          </select>
        </fieldset>
        <br /><br />
        <form onSubmit={handleSubmit(this.props.validateAndUpdateTimesheet.bind(this))}>
          <Field component={WbxTextfield} type="text" name="client"  label="Client" persistentHelpText="This is the client you're going to bill." />
          <Field component={WbxTextfield} type="number" name="project" onFocusHelpText="wazup:what's up"/>
          <Field component={WbxTextfield} type="currency" name="billingRate" label="Hourly Billing Rate" />
          <Field component={WbxTextfield} type="number" name="hoursWorked"   />
          <Field component={WbxTextfield} type="text" name="invoiceComment" />
          <Field component={WbxTextfield} type="text" rows={5} name="notes" />
          <br />
          <WbxButton disabled={submitting} type="submit">Submit</WbxButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLocaleChange: (evt) => {
      dispatch(switchLocale(evt.target.value))
    }
  }
}
//
// const dataEntry = connect(null, mapDispatchToProps)(RefDialogDataForm);
// export default injectIntl(dataEntry);
export default RefDialogDataForm;