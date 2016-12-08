import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import componentHandler from 'exports?componentHandler!material-design-lite/material';
import { translateText } from '../utils/translateText';
import deCamelCase  from '../utils/deCamelCase';

// redux-form is passed a component that's used to enter data.  This is the
// component that's used for input and textarea.  if prop "rows" is passed in
// The routine assumes you want a textarea.
//  wbxTextField takes care of the following:
//  1.  all mdl css stuff
//  2.  label translation
//  3.  error message handling including translation
//  4.  basic numeric validation
//  5.  future: aria
//  6.  extra help messages that will be available in mdl 2.0

// sets an error message as returned from the validate method in container.
// Show error if the field has been touched - or an error came back
// after being submitted to server.  Note: errors come back from container
// as an object {key:default}.
function ErrorHandler({ input, label, type, intl: { formatMessage }, meta: { submitting, touched, error } }) {

  if ((touched || submitting) && error) {
    const tr = new translateText(formatMessage);
    const translatedText = tr.text(error);
    return  <span className="wbx-textfield__error">{translatedText}</span>
  } else if (type === 'number') {
    const tr = new translateText(formatMessage);
    const translatedText = tr.msgId("nonum", "Must be a number");
    return <span className="mdl-textfield__error">{translatedText}</span>
  } else {
    return <span />;
  }
}
  
class WbxTextfield extends Component {
  
  // regular housekeeping needed for mdl
  componentDidMount() {
    componentHandler.upgradeDom();
  }
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  render() {
    const { input, label, type, rows } = this.props;
    const {formatMessage} = this.props.intl;
    const tr = new translateText(formatMessage);
  
    // Here are the steps involed in getting the label.  
    // NOTE --> label is the what redux-form calls the prompt.
    //
    // 1st thing:  If label is passed in then, just use.  Otherwise,
    //             use the field name (but decamelCase it).  For example,
    //             billingRate is converted to Billing Rate.
    // 2nd step:  See if there's a translation.  Use the field name as the key.
    const defaultLabel = (label) ? label : deCamelCase(this.props.input.name);
    const finalLabel = tr.msgId(input.name, defaultLabel)

    // if input type is numeric, then set pattern. MDL only gives a very simplistic
    // error message so just check that number has no more than 9 significant
    // digits and no more than 4 decimal digits which is the most this app needs.
    // const pattern = (type === 'number') ? {pattern: '^-?[0-9]{0,9}(.[0-9]{0,3})?$'} : '';

      // html doesn't handle input type numeric or email
      // very well.  For now, do all email validation
      // on server - the input was showing an error
      // right away.  This is the best regex that I
      // could find: /^[^\s@]+@[^\s@]+\.[^\s@]+$/



    let pattern = '';
    let myType = type;
    switch (type) {
      case 'number':
        pattern = {pattern: '^-?[0-9]{0,9}(.[0-9]{0,3})?$'};
        myType = "text";
        break;
      case 'email':
        myType = "text";
        break;
      default:
        break;
    }


      // for some reason html type = number doesn't like decimal points
      // so just rely on pattern to make ok
      // const myType = (type === 'number') ? 'text' : type;

      // if (type === 'password') {
      //   debugger;
      //   console.log('got password');
     // }
    return (
      <div>
        { rows ? (   // if rows passed in then assume it's a '
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <textarea className="mdl-textfield__input" {...input} id="fieldId" autoComplete="off" />
            <label className="mdl-textfield__label" htmlFor="fieldId">{finalLabel}</label>
            <ErrorHandler {...this.props}/>
          </div>
        ) : (
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" {...input} type={myType} id="fieldId" autoComplete="off" {...pattern} />
            <label className="mdl-textfield__label" htmlFor="fieldId">{finalLabel}</label>
            <ErrorHandler {...this.props}/>
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(WbxTextfield);

