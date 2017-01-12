import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import * as Actions from '../../authAPI/actions';
import './style.css';

class Navigation extends React.Component {

  handleSignout() {
    this.props.signOutUser();
  }

  renderAuthLinks() {
    if (this.props.auth.authenticated) {
      return (
        <a className="mdl-navigation__link" href="#" onClick={() => this.handleSignout()}>Sign Out</a>
      )
    } else {
      return [
        <Link key="1" className="mdl-navigation__link" to="/loginx">Login</Link>,
        <Link key="2" className="mdl-navigation__link" to="/refSignup">Sign Up</Link>
      ]
    }
  }

  render() {
    return (

      <nav className="mdl-navigation mdl-layout--large-screen-only">
        { (this.props.auth.connected) ?
          (<div className="mdl-navigation__link">
            Network is online
          </div>)
          :
          (<div className="mdl-navigation__link">
            <div className="Navigation-error">
              Network is offline
            </div>
          </div>)
        }
        {/*<div className="mdl-navigation__link">*/}
        {/*{this.props.auth.connected ? "Network is Online" : "Network is Offline"}*/}
        {/*</div>*/}
        { this.renderAuthLinks() }
        <Link to="/" className="mdl-navigation__link">
          Home
        </Link>
        <Link to="/about" className="mdl-navigation__link">
          About
        </Link>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, Actions)(Navigation);

