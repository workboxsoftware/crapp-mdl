import React, {Component} from 'react';
import {Field} from 'redux-form';
import WbxButton from '../wbxWrappers/wbxButton';
import WbxTextfield from '../wbxWrappers/wbxTextfield';
import {injectIntl} from 'react-intl';
import FmtMsg from '../widgets/fmtMsg';
import rocket from '../images/rocket.svg';
import './styles.css'
import clouds from '../images/clouds1.png';
import Alert from '../uikit/alert';
import {ModalManager} from '../uikit/index';

const inline = {
  signupLabel: {
    color: "mdl-color-text--primary"
  }
}


class RefSignupForm extends Component {


  constructor(props) {
    super(props);
    this.focusField = 'username';
    this.refMap = new Map();

    let usernameRef;

    // const {handleSubmit} = this.props;
    //
    // const submitFn = (event) => handleSubmit(this.props.validateAndUpdateInfo)(event)
    //   .catch(err => {
    //     console.log("got errs from submit", err)
    //   })

  }

  componentDidUpdate() {
    this.focusField = '';
    if (this.props.auth.error) {
      ModalManager.open(<Alert content={this.props.auth.error} title="Authorization Error"/>);
      this.props.dispatch(this.props.authClearError());
    }

    this.refMap.get("username").focus();
   
  }

  showSignupScreen() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.props.validateAndUpdateSignup.bind(this))}>
          <h3>
            <FmtMsg style={inline.signupLabel}>signup:Sign up</FmtMsg>
          </h3>
          <div className="Signup-input-area">
            <Field component={WbxTextfield} refMap={this.refMap} type="email" label="Your email address"
                   name="email"/>
            <Field component={WbxTextfield} refMap={this.refMap} type="text" label="Choose a username"
                   name="username"/>
            <Field component={WbxTextfield}  refMap={this.refMap} focusField={this.focusField} type="password" lablel="Choose a password"
                   name="password"/>
          </div>
          <p className="Signup-align-right">
            <WbxButton disabled={submitting} type="submit">Submit</WbxButton>
          </p>
          <div className="Signup-accept-area">
            <section style={inline.acceptText}>By signing up you agree to the Terms of Service
              and Privacy Policy.
            </section>
          </div>
        </form>
      </div>
    )
  }

  showInfoScreen() {
    const {handleSubmit, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.validateAndUpdateInfo.bind(this))}>
        <h3>
          <FmtMsg style={inline.signupLabel}>signup.more:Almost there...</FmtMsg>
        </h3>
        <div className="Signup-input-area">
          <Field component={WbxTextfield} type="text" label="Your first name" name="firstName"/>
          <Field component={WbxTextfield} type="text" label="Your last name" name="lastName"/>
          <Field component={WbxTextfield} type="text" lablel="Your Company Name" name="companyName"/>
        </div>
        <p className="Signup-align-right">
          <WbxButton disabled={submitting} type="submit">Done</WbxButton>
        </p>
      </form>

    );
  }

  render() {

    const {auth, submitting} = this.props;
    const screenNumber = (auth.authenticated) ? 2 : 1;

    // if we're not authenticated then show signup screen
    // else we're up to showing the general info screen
    return (
      <div>
        <div className="Signup-container">
          <div className="Signup-loading">
            {submitting && <div className="mdl-spinner mdl-js-spinner is-active"/>}
          </div>
          <section className="Signup-left-side">
            <div className="Signup-cloud-parent">
              <img src={clouds} className="Signup-clouds" alt="logo"/>
            </div>
            <div className="Signup-cloud-parent">
              <img src={clouds} className="Signup-clouds2" alt="logo"/>
            </div>
            <div className="Signup-grow-area"/>
            <img src={rocket} alt="Welcome to Workbox" className={'Signup-img-area' + screenNumber}/>
          </section>
          <section className="Signup-right-side mdl-color-text--primary">
            {(!auth.authenticated) ? this.showSignupScreen() : this.showInfoScreen()}
          </section>
        </div>
      </div>
    )
  }
}

export default injectIntl(RefSignupForm);


//ref={(input) => { this.usernameRef = input; }}


