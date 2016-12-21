import React, { Component } from 'react';
import componentHandler from 'exports?componentHandler!material-design-lite/material';

class Loader extends Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }
  render() {
    return (
      <div className="mdl-typography--text-center loader">
        <div className="mdl-spinner mdl-js-spinner is-active" />
      </div>
    );
  }
}