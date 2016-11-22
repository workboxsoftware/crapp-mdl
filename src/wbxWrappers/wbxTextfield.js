import React, { Component } from 'react';
import componentHandler from 'exports?componentHandler!material-design-lite/material';


// sets an error message as returned from container (e.g. validate)
// only if the field has been touched - or an error came back
// after being submitted to server.
function ErrorHandler( { input, label, type, meta: { asyncValidating, submitting, touched, error } } ) {
  if ((touched || submitting) && error) {
    return  <span className="wbx-textfield__error">{error}</span>
  } else if (type === 'number') {
    return <span className="mdl-textfield__error">Must be a number</span>
  } else {
    return <span />;
  }
}

// if no label as been passed in, then just use the
// Field name and reverse from camelcase to capitalized.
function camel2prompt(camelCase) {
  const ret =  
      camelCase
      .replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase());
      return ret;
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
    const { input, label, type } = this.props;
 
    // if label provided,then use it - otherwise convert Field name  
    const myLabel = (label ) ? label : camel2prompt(this.props.input.name);

    // if input type is numeric, then set pattern.  This can be made more useful
    // by having user enter the number of significant digits and the appropriate error msg.
    // For exampe fmt(9.2)
    const pattern = (type === 'number') ? {pattern: '^-?[0-9]{0,9}(.[0-9]{0,3})?$'} : '';

    // const pattern = (type === 'number') ? {pattern: '^\-?[0-9]{0,9}(\.\[0-9]{0,3})?$'} : '';
     return (
      <div>
       <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input className="mdl-textfield__input" {...input} id="sample3"   autoComplete="off" {...pattern} />
        <label className="mdl-textfield__label" htmlFor="sample3">{myLabel}</label>
        <ErrorHandler {...this.props}/>
      </div>
    </div>
    );
  }
}

export default WbxTextfield;
