import React, { Component } from 'react';
import { Field } from 'redux-form';
import WbxButton from '../wbxWrappers/wbxButton';
import WbxTextfield from '../wbxWrappers/wbxTextfield';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import { switchLocale } from '../application/applicationActions'
import { connect } from 'react-redux';
import FmtDate from '../widgets/fmtDate';
import FmtNumber from '../widgets/fmtNumber';
import { translateText } from '../utils/translateText';
import { dateFormatter, SHORT_DATE, MEDIUM_DATE, LONG_DATE, FULL_DATE } from '../utils/dateFormatter';
import { numberFormatter, PERCENT_NUMBER, DECIMAL_NUMBER, INTEGER_NUMBER, CURRENCY_NUMBER} from '../utils/numberFormatter';
class TimesheetForm extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // };

  render() {
    const messages = defineMessages({
    hello: {
        id: 'hello',
        defaultMessage: 'Hello'
    },
  });
  
    const locale = this.props.application.locale;
    const myDate = new Date();
    const myNum = 10000000.34;
    const dfs = new dateFormatter(locale, SHORT_DATE);
    const dfm = new dateFormatter(locale, MEDIUM_DATE);
    const dfl = new dateFormatter(locale, LONG_DATE);
    const dff = new dateFormatter(locale, FULL_DATE);

    const nfd = new numberFormatter(locale, DECIMAL_NUMBER);
    const nfi = new numberFormatter(locale, INTEGER_NUMBER);
    const nfp = new numberFormatter(locale, PERCENT_NUMBER);
    const nfc = new numberFormatter(locale, CURRENCY_NUMBER, "CAD");
    const nfa = new numberFormatter(locale, CURRENCY_NUMBER, "USD");

    const CAD_OPTIONS = { ...CURRENCY_NUMBER, currency: "CAD" };
    const USD_OPTIONS = { ...CURRENCY_NUMBER, currency: "USD" };

    const { handleSubmit, submitting } = this.props;


    const tr = new translateText(this.props.intl.formatMessage);
    
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
          <br />
        <table style={{width:'100%'}}> 
          <tbody>
            <tr>
              <td>Formatted Numbers using numberFormatter:</td>
              <td>{nfd.toString(myNum)}</td>
              <td>{nfc.toString(myNum)}</td>
              <td>{nfa.toString(myNum)}</td>
              <td>{nfi.toString(myNum)}</td>
              <td>{nfp.toString(.1025)}</td>
            </tr>
             <tr>
              <td>Formatted Numbers using react-intl:</td>
              <td><FmtNumber value={myNum} options={DECIMAL_NUMBER} /></td>
              <td><FmtNumber value={myNum} options={CAD_OPTIONS} /></td>
              <td><FmtNumber value={myNum} options={USD_OPTIONS} /></td>
              <td><FmtNumber value={myNum} options={INTEGER_NUMBER} /></td>
              <td><FmtNumber value={.1025} options={PERCENT_NUMBER} /></td>
            </tr>
            <tr>
              <td>Formatted Dates using dateFormatter:</td>
              <td>{dfs.toString(myDate)}</td>
              <td>{dfm.toString(myDate)}</td>
              <td>{dfl.toString(myDate)}</td>
              <td>{dff.toString(myDate)}</td>
            </tr>
             <tr>
              <td>Formatted Dates using react-intl:</td>
              <td><FmtDate value={myDate} options={SHORT_DATE} /></td>
              <td><FmtDate value={myDate} options={MEDIUM_DATE} /></td>
              <td><FmtDate value={myDate} options={LONG_DATE} /></td>
              <td><FmtDate value={myDate} options={FULL_DATE} /></td>
            </tr>
            <tr>
              <td>Formatted Text:</td>
              <td>
                <FormattedMessage {...messages.hello} />
              </td>
              <td>{tr.msgId("hello", "Hello")}</td> 
           
            </tr>
          </tbody>
        </table>
        <br/>
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

// export default connect(null, mapDispatchToProps)(TimesheetForm)
const ts = connect(null, mapDispatchToProps)(TimesheetForm);
export default injectIntl(ts);
