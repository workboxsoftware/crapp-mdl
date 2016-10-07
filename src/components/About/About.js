import React, { Component } from 'react';
// `componentHandler` from MDL to upgrade JS elements
import componentHandler from 'exports?componentHandler!material-design-lite/material';
import Panel from '../Panel/Panel';

class About extends Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }
  render () {
    return (
      <div className="tabs__about">
        <p>CRApp MDL is a shell app built with create-react-app & Material Design Lite.</p>
        <Panel />
      </div>
    );
  }
}

export default About;
