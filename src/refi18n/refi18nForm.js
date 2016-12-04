import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { switchLocale } from '../application/applicationActions'
import { connect } from 'react-redux';
import FmtDate from '../widgets/fmtDate';
import FmtNumber from '../widgets/fmtNumber';
import FmtMsg  from '../widgets/fmtMsg';
import { translateText } from '../utils/translateText';
import { dateFormatter, SHORT_DATE, MEDIUM_DATE, LONG_DATE, FULL_DATE } from '../utils/dateFormatter';
import { numberFormatter, PERCENT_NUMBER, DECIMAL_NUMBER, INTEGER_NUMBER, CURRENCY_NUMBER} from '../utils/numberFormatter';
class Refi18nForm extends Component {

  render() {
  
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
  
    const trOutputStyle = {
      position: "absolute",
      left: 650
    };

    const tr = new translateText(this.props.intl.formatMessage);

    return (
      <div className="dataEntry">
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
          <br /><br /><br />
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
          </tbody>
        </table>
        <br/><br/>
        <h4>Translations</h4>
 
        <div>
          <code>&lt;FormatedtMessage id=&quot;noclient&quot; defaultMessage=&quot;Client Required&quot; /&gt;</code>
          <span style={trOutputStyle}>
            <FormattedMessage id="noclient" defaultMessage="Client Required" />
          </span> 
        </div>
        <br />
        <div>
          <code> &lt;FmtMsg&gt;noclient:Client Required&lt;/FmtMsg&gt;</code>
          <FmtMsg style={trOutputStyle}>noclient:Client Required</FmtMsg>
        </div>
         <div>
          <code>&lt;FmtMsg&gt;billingRate&lt;/FmtMsg&gt;</code>
          <FmtMsg style={trOutputStyle}>billingRate</FmtMsg>
        </div>
        <div>
          <code>&lt;FmtMsg id=&quot;noclient&quot; defaultMessage=&quot;Client Required&quot; /&gt;</code>
          <span style={trOutputStyle}>
            <FmtMsg id="noclient" defaultMessage="Client Required" />
          </span> 
        </div>
        <div>
          <code>&lt;FmtMsg id=&quot;billingRate&quot; /&gt;</code>
          <span style={trOutputStyle}>
            <FmtMsg id="billingRate" />
          </span> 
        </div>
        <br />
        <div>
          <code>tr.msgId(&quot;noclient&quot;, &quot;Client Required&quot;)</code>
          <span style={trOutputStyle}>{tr.msgId("noclient", "Client Required")}</span> 
        </div>
        <div>
          <code>tr.text(&quot;noclient:Client Required&quot;)</code>
          <span style={trOutputStyle}>{tr.text("noclient:Client Required")}</span> 
        </div>
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

// export default connect(null, mapDispatchToProps)(Ti`me`sheetForm)
const form = connect(null, mapDispatchToProps)(Refi18nForm);
export default injectIntl(form);
