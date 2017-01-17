import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import WbxButton from '../wbxWrappers/wbxButton';
import WbxTextfield from '../wbxWrappers/wbxTextfield';
import {injectIntl} from 'react-intl';
import {switchLocale} from '../application/actions';
import './refDataEntry.css';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

class RefDataEntryForm extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // };

  constructor(props) {
    super(props);
    // this.focusField = 'client';
    // this.props.handleSubmitFail.bind(this);
    this.elRef = [];
  }

  componentDidMount() {
    // start off giving focus to email
    this.elRef["client"].focus();
  }


  componentDidUpdate() {
    if (this.props.errorNotif && this.elRef) {
      const field = Object.keys(this.props.errorNotif.errors)[0]
      const ref = this.elRef[field];
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
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="RefDataEntry dataEntry">
        <div className="loading">
          {submitting && <div className="mdl-spinner mdl-js-spinner is-active"/>}
        </div>
        <br /><br />
        <form onSubmit={handleSubmit(this.props.updateDatabase.bind(this))}>
          <Field component={WbxTextfield} elRef={this.elRef} type="text" name="client" label="Client"/>
          <Field component={WbxTextfield} elRef={this.elRef} type="number" name="project"/>
          <Field component={WbxTextfield} elRef={this.elRef} type="currency" name="billingRate"
                 label="Hourly Billing Rate"/>
          <Field component={WbxTextfield} type="number" elRef={this.elRef} name="hoursWorked"
                 focusField={this.focusField}/>
          <Field component={WbxTextfield} type="text" elRef={this.elRef} name="invoiceComment"
                 focusField={this.focusField}/>
          <Field component={WbxTextfield} type="text" elRef={this.elRef} rows={5} name="notes"
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
          <Field component={WbxTextfield} elRef={this.elRef} type="text" name="category"
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
          <Field component={WbxTextfield} type="text" elRef={this.elRef} name="vendor" focusField={this.focusField}/>
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
