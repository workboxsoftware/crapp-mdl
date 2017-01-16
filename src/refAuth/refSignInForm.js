import React, {Component} from 'react';
import {Field, Fields} from 'redux-form';
import WbxButton from '../wbxWrappers/wbxButton';
import WbxTextfield from '../wbxWrappers/wbxTextfield';
import {injectIntl} from 'react-intl';
import FmtMsg from '../widgets/fmtMsg';
import Alert from '../uikit/alert';
import {ModalManager} from '../uikit';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import {browserHistory} from 'react-router';
import './style.css'

const showSubmit = (fields) => {
  const {submitting} = fields.password.meta;
  let isUsernameEmailEntered;
  if (fields.usernameEmail.input.value && fields.usernameEmail.input.value.trim().length > 0) {
    isUsernameEmailEntered = true;
  }
  let isPasswordEntered;
  if (fields.password.input.value && fields.password.input.value.trim().length > 0) {
    isPasswordEntered = true;
  }
  let isDisabled = !fields.connected || submitting || !isUsernameEmailEntered || !isPasswordEntered;

  return (
    <div className="SignIn-align-right">
      <WbxButton disabled={isDisabled} type="submit">Submit</WbxButton>
    </div>

  );
}

class RefSignInForm extends Component {

  constructor(props) {
    super(props);
    this.elRef = [];
  }

  componentDidMount() {
    // start off giving focus to email
    this.elRef["usernameEmail"].focus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.auth.authenticated) {
      browserHistory.push('about');
    }
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

  render() {
    const {handleSubmit, submitting} = this.props;
    return (
      <div>
        <div className="SignIn-container">
          <div className="SignIn-body">
            <div className="SignIn-loading">
              {submitting && <div className="mdl-spinner mdl-js-spinner is-active"/>}
            </div>
            <section className="SignIn-right-side mdl-color-text--primary">
              <form onSubmit={handleSubmit(this.props.validateAndUpdateSignIn.bind(this))}>
                <h3>
                  <FmtMsg className="mdl-color-text--primary">signin:Log In</FmtMsg>
                </h3>
                <div className="SignIn-input-area">
                  <Field component={WbxTextfield} elRef={this.elRef} type="email" label="Username or Email"
                         name="usernameEmail"/>
                  <Field component={WbxTextfield} elRef={this.elRef} type="password" lablel="Choose a password"
                         name="password"/>
                </div>
                <div className="SignIn-no-network">
                  {!this.props.auth.connected && "Sorry - there's no network connection.  Sign up cannot proceed at this time."}
                </div>
                <Fields props={{connected: this.props.auth.connected}}
                        names={['password', 'usernameEmail']}
                        submitting={submitting} component={showSubmit}/>

              </form>
            </section>
          </div>
        </div>
      </div >
    )
  }
}

export default injectIntl(RefSignInForm);