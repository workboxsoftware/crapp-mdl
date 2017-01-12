import React, {Component} from 'react';
import {Field, Fields} from 'redux-form';
import WbxButton from '../wbxWrappers/wbxButton';
import WbxTextfield from '../wbxWrappers/wbxTextfield';
import {injectIntl} from 'react-intl';
import FmtMsg from '../widgets/fmtMsg';
import rocket from '../images/rocket.svg';
import './style.css'
import clouds from '../images/clouds1.png';
import Alert from '../uikit/alert';
import {ModalManager} from '../uikit/index';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import Firebase from "firebase";

const isLowerCase = char => char.toLowerCase() && char !== char.toUpperCase();
const isUpperCase = char => char.toUpperCase() && char !== char.toLowerCase();

const analyzePassword = (pw) => {
  let hasUppercase, hasLowercase, hasNumber, hasLength;

  // is there a lowercase letter
  for (let i = 0, char; i < pw.length; i++) {
    char = pw.charAt(i);
    if (isLowerCase(char)) hasLowercase = true;
    if (isUpperCase(char)) hasUppercase = true;
    if (char >= "0" && char <= "9") hasNumber = true;
  }
  if (pw.length > 7) {
    hasLength = true;
  }

  return {
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasLength,
    isOk: (hasLowercase && hasUppercase && hasNumber && hasLength) ? true : false
  }

}

const showSubmit = (fields) => {
  let ret = analyzePassword(fields.password.input.value);

  const {submitting} = fields.password.meta;

  // give false error message while enter email - so remove
  // and do error checking on submi
  // const re = /^\S+@\S+$/;
  // let isEmailValid;
  // if (re.test(fields.email.input.value)) {
  //   isEmailValid = true;
  // }

  let isEmailValid;
  if (fields.email.input.value && fields.email.input.value.trim() !== '') {
    isEmailValid = true;
  }

  let isUsernameEntered
  if (fields.username.input.value && fields.username.input.value.trim() !== '') {
    isUsernameEntered = true;
  }

  // diable submit button if in the middle of a submit - or fields are invalid
  let isDisabled = !fields.connected || submitting || !ret.isOk || !isEmailValid || !isUsernameEntered;

  return (
    <div className="Signup-submit-button">
      <WbxButton disabled={isDisabled} type="submit">Submit</WbxButton>
    </div>

  );
}

const passwordHints = (fields) => {
  const pw = fields.password.input.value;

  let ret = analyzePassword(pw);

  return (
    <div>
      <div className="Signup-password-hint">
        <ul>
          <li className={`${ret.hasUppercase ? "checkmark" : ''} plus20`}>One uppercase character</li>
          <li className={ret.hasNumber ? "checkmark" : ""}>One number</li>
        </ul>
        <ul>
          <li className={`${ret.hasLowercase ? "checkmark" : ""} plus20`}>One lowercase character</li>
          <li className={ret.hasLength ? "checkmark" : ""}>8 characters minimum</li>
        </ul>
      </div>
    </div>
  );
}


class RefSignupForm extends Component {

  constructor(props) {
    super(props);
    this.elRef = [];

  }

  componentDidMount() {
    // start off giving focus to email
    this.elRef["email"].focus();
  }

  componentDidUpdate() {
    // Show alert box if needed
    if (this.props.auth.error) {
      ModalManager.open(<Alert content={this.props.auth.error} title="Authorization Error"/>);
      this.props.dispatch(this.props.authClearError());
    }

    // position cursor and scroll if needed
    if (this.props.errorNotif && this.elRef) {
      const field = Object.keys(this.props.errorNotif.errors)[0];
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


  showSignupScreen() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="Signup">
        <form onSubmit={handleSubmit(this.props.validateAndUpdateSignup.bind(this))}>
          <h3>
            <FmtMsg className="mdl-color-text--primary">signup:Sign up</FmtMsg>
          </h3>
          <div className="Signup-input-area">
            <Field component={WbxTextfield} elRef={this.elRef} type="email" label="Your email address"
                   name="email"/>
            <Field component={WbxTextfield} elRef={this.elRef} type="text" label="Choose a username"
                   name="username"/>
            <Field component={WbxTextfield} elRef={this.elRef} type="password" lablel="Choose a password"
                   name="password"/>
          </div>
          <Fields names={['password']} component={passwordHints}/>
          <div className="Signup-no-network">
            {!this.props.auth.connected && "Sorry - there's no network connection.  Sign up cannot proceed at this time."}
          </div>

          <section className="Signup-bottom mdl-color-text--primary">
            <div className="Signup-accept-label">By signing up you agree to the Terms of Service
              and Privacy Policy.
            </div>

            <Fields props={{connected: this.props.auth.connected}}
                    names={['password', 'username', 'email']}
                    submitting={submitting} component={showSubmit}/>
          </section>

        </form>
      </div>
    )
  }

  /*
   <div className="Signup-submit-button">
   <WbxButton disabled={submitting} type="submit">Submit</WbxButton>
   </div>
   */

  showInfoScreen() {
    const {handleSubmit, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.validateAndUpdateInfo.bind(this))}>
        <h3>
          <FmtMsg className="mdl-color-text--primary">signup.more:Almost there...</FmtMsg>
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
    const rocketClass = (auth.authenticated) ? 'Signup-rocket-area Signup-rocket-move' : 'Signup-rocket-area';

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
              <img src={clouds} className="Signup-clouds Signup-clouds-2 {
" alt="logo"/>
            </div>
            <div className="Signup-rocket-parent">
              <img src={rocket} alt="Welcome to Workbox" className={rocketClass}/>
            </div>
          </section>
          <section className="Signup-right-side mdl-color-text--primary">
            {(!auth.authenticated) ? this.showSignupScreen() : this.showInfoScreen()}
          </section>
        </div>
      </div >
    )
  }
}

export default injectIntl(RefSignupForm);


//ref={(input) => { this.usernameRef = input; }}


