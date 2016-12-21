import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import WbxButton from '../wbxWrappers/wbxButton';
import WbxTextfield from '../wbxWrappers/wbxTextfield';
import {injectIntl} from 'react-intl';
import {switchLocale} from '../application/applicationActions';
import './refDataEntry.css';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { validateAndUpdateTimesheet } from './refDataEntryContainer';

class RefDataEntryForm extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // };

  constructor(props) {
    super(props);
    // this.focusField = 'client';
    // this.props.handleSubmitFail.bind(this);
    this.errRef = {};


  }

  componentDidUpdate() {
    if (this.props.errorNotif && this.errRef) {
      // errors come back as an array of objects.
      // the object is field: error
      // this takes the key of the first item in the array
      const field = Object.keys(this.props.errorNotif.errors)[0]
      const ref = this.errRef[field];
      if (ref) {
        ref.focus();
        scrollIntoViewIfNeeded(ref, false, {
          duration: 150
        })
      }
      this.props.errorNotificationDelete(this.props.errorNotif.form);
    }
  }


  render() {
    const locale = this.props.application.locale;
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="dataEntry">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {submitting && <div className="mdl-spinner mdl-js-spinner is-active"/>}
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
        <form onSubmit={handleSubmit(validateAndUpdateTimesheet.bind(this))}>
          <Field component={WbxTextfield} errRef={this.errRef} type="text" name="client" label="Client"
                 persistentHelpText="This is the client you're going to bill."/>
          <Field component={WbxTextfield} errRef={this.errRef} type="number" name="project"
                 onFocusHelpText="wazup:what's up"/>
          <Field component={WbxTextfield} focusField={this.focusField} type="currency" name="billingRate"
                 label="Hourly Billing Rate"/>
          <Field component={WbxTextfield} type="number" errRef={this.errRef} name="hoursWorked"
                 focusField={this.focusField}/>
          <Field component={WbxTextfield} type="text" errRef={this.errRef} name="invoiceComment"
                 focusField={this.focusField}/>
          <Field component={WbxTextfield} type="text" errRef={this.errRef} rows={5} name="notes"
                 focusField={this.focusField}/>

          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} errRef={this.errRef} type="text" name="category"
                 focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="text" errRef={this.errRef} name="vendor" focusField={this.focusField}/>
          <Field component={WbxTextfield} type="number" name="hoursWorked" focusField={this.focusField}/>
          <div>
            <WbxButton disabled={submitting} type="submit">Submit</WbxButton>
          </div>
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

const dataEntry = connect(null, mapDispatchToProps)(RefDataEntryForm);
export default injectIntl(dataEntry);
