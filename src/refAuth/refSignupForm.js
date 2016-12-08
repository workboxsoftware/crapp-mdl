import React, {Component} from 'react';
import {Field} from 'redux-form';
import WbxButton from '../wbxWrappers/wbxButton';
import WbxTextfield from '../wbxWrappers/wbxTextfield';
import {injectIntl} from 'react-intl';
import FmtMsg from '../widgets/fmtMsg';
import signup from '../images/signup.svg';
import './styles.css'

const styles = {
  leftSide: {
    flex: 1,
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,64,129,.2)'
  },
  rightSide: {
    flex: 1,
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgParent: {
    flexShrink: 1,
    minWidth: 0,
    minHeight: 0
  },
  imgArea1: {
    width: 'auto',
    height: 'auto',
    maxWidth: '50%',
    maxHeight: '50%',
    alignSelf: 'center',
    marginBottom: '0%'
  },
  imgArea2: {
    width: 'auto',
    height: 'auto',
    maxWidth: '50%',
    maxHeight: '50%',
    alignSelf: 'center',
    marginBottom: '60%'
  },
  welcomeArea: {
    flexGrow: 1,
    marginTop: 50,
    // color:'white'
  },

  alignRight: {
    flexShrink: 0,
    textAlign: 'right',
    marginTop: '25px'
  },
  signupLabel: {
    color: "mdl-color-text--primary"
  },

  inputArea: {
    color: "#333333"
  },
  acceptArea: {
    fontSize: "12px",
    // color: "#373D3F",
    color: "rgb(192,192,192)",
    maxWidth: "300px",
  },
  linkStyle: {
    color: "mdl-color-text--primary"
  }

};

class RefSignupForm extends Component {

  renderAlert() {
    if (this.props.auth.error) {
      return (
        <h5 className="Error">
          {this.props.auth.error}
        </h5>
      );
    }
  }

  showSignupScreen() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="Container">
        <section style={styles.leftSide}>
          <h3 style={styles.welcomeArea}>

          </h3>
          <div style={styles.imgParent}>
            <img src={signup} alt="Welcome to Workbox" style={styles.imgArea1}/>
          </div>
        </section>
        <section style={styles.rightSide} className="mdl-color-text--primary">
          {this.renderAlert()}
          <form onSubmit={handleSubmit(this.props.validateAndUpdateSignup.bind(this))}>
            <h3>
              <FmtMsg style={styles.signupLabel}>signup:Sign up</FmtMsg>
            </h3>
            <div style={styles.inputArea}>
              <Field component={WbxTextfield} type="email" label="Your email address" name="email"/>
              <Field component={WbxTextfield} type="text" label="Choose a username" name="username"/>
              <Field component={WbxTextfield} type="password" lablel="Choose a password" name="password"/>
            </div>
            <p style={styles.alignRight}>
              <WbxButton disabled={submitting} type="submit">Submit</WbxButton>
            </p>
            <div style={styles.acceptArea}>
              <section style={styles.acceptText}>By signing up you agree to the Terms of Service
                and Privacy Policy.
              </section>
            </div>
          </form>
        </section>
      </div>
    )
  }

  showInfoScreen() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="Container">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {submitting && <div className="mdl-spinner mdl-js-spinner is-active"/>}
        </div>
        <section style={styles.leftSide}>
          <h3 style={styles.welcomeArea}>

          </h3>
          <div style={styles.imgParent}>
            <img src={signup} alt="Welcome to Workbox" style={styles.imgArea2}/>
          </div>
        </section>
        <section style={styles.rightSide} className="mdl-color-text--primary">
          <form onSubmit={handleSubmit(this.props.validateAndUpdateInfo.bind(this))}>
            <h3>
              <FmtMsg style={styles.signupLabel}>signup.more:Almost there...</FmtMsg>
            </h3>
            <div style={styles.inputArea}>
              <Field component={WbxTextfield} type="text" label="Your first name" name="firstName"/>
              <Field component={WbxTextfield} type="text" label="Your last name" name="lastName"/>
              <Field component={WbxTextfield} type="text" lablel="Your Company Name" name="companyName"/>
            </div>
            <p style={styles.alignRight}>
              <WbxButton disabled={submitting} type="submit">Done</WbxButton>
            </p>
          </form>
        </section>
      </div>
    );
  }

  render() {

    const {auth, submitting } = this.props;


    // if we're not authenticated then show signup screen
    // else we're up to showing the general info screen
    return (
      <div>
        <div className="Spinner">
          {submitting && <div className="mdl-spinner mdl-js-spinner is-active"/>}
        </div>
        {(!auth.authenticated) ? this.showSignupScreen() : this.showInfoScreen()}
      </div>
    )
  }
}

export default injectIntl(RefSignupForm);


