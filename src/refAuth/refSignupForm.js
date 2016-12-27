import React, {Component} from 'react';
import {Field, Fields} from 'redux-form';
import WbxButton from '../wbxWrappers/wbxButton';
import WbxTextfield from '../wbxWrappers/wbxTextfield';
import {injectIntl} from 'react-intl';
import FmtMsg from '../widgets/fmtMsg';
import rocket from '../images/rocket.svg';
import './styles.css'
import clouds from '../images/clouds1.png';
import Alert from '../uikit/alert';
import {ModalManager} from '../uikit/index';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

const isLowerCase = char => char.toLowerCase() && char !== char.toUpperCase();
const isUpperCase = char => char.toUpperCase() && char !== char.toLowerCase();

const passwordHints = (fields) => {
  const pw = fields.password.input.value;
  let lowercaseClass, uppercaseClass, numberClass, lengthClass;

  // is there a lowercase letter
  for (let i = 0, char; i < pw.length; i++) {
    char = pw.charAt(i);
    if (isLowerCase(char)) lowercaseClass = "checkmark";
    if (isUpperCase(char)) uppercaseClass = "checkmark";
    if (char >= "0" && char <= "9") numberClass = "checkmark";
  }
  if (pw.length > 7) {
    lengthClass = "checkmark";
  }
  return (
    <div>
      <div className="Signup-password-hint">
        <ul>
          <li className={`${uppercaseClass} plus20`}>One uppercase character</li>
          <li className={numberClass}>One number</li>
        </ul>
        <ul>
          <li className={`${lowercaseClass} plus20`}>One lowercase character</li>
          <li className={lengthClass}>8 characters minimum</li>
        </ul>
      </div>
    </div>
  )
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


          <section className="Signup-bottom mdl-color-text--primary">
            <div className="Signup-accept-label">By signing up you agree to the Terms of Service
              and Privacy Policy.
            </div>
            <div className="Signup-submit-button">
              <WbxButton disabled={submitting} type="submit">Submit</WbxButton>
            </div>
          </section>
        </form>
      </div>
    )
  }

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
              <div>
                <img src={clouds} className="Signup-clouds1" alt="logo"/>
                {/*</div>*/}
                {/*<div className="Signup-cloud-parent">*/}
              </div>
              <div>
                <img src={clouds} className="Signup-clouds2" alt="logo"/>
              </div>
            </div>
            {/*<div className="Signup-grow-area"/>*/}
            <div className="Signup-rocket-parent">
              <img src={rocket} alt="Welcome to Workbox" className={'Signup-rocket-area' + screenNumber}/>
            </div>
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


