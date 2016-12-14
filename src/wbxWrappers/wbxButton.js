import React, { Component } from 'react';
import componentHandler from 'exports?componentHandler!material-design-lite/material';

// import { connect } from 'react-redux';

class WbxButton extends Component {
  
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  render() {
     return (
       <button className="mdl-button mdl-js-button mdl-button--raised   mdl-button--colored mdl-js-ripple-effect" {...this.props}>
          {this.props.children}
        </button>
    );
  }
}

export default WbxButton;

/*
 <button className="mdl-button mdl-js-button mdl-button--raised   mdl-button--colored mdl-js-ripple-effect" type={this.props.type} disabled={this.props.disabled}>
 */



