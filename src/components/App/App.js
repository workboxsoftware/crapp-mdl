import React, { Component } from 'react';
// `componentHandler` from MDL to upgrade JS elements
import componentHandler from 'exports?componentHandler!material-design-lite/material';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';

class App extends Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }
  render() {
    return (
      <div className="App">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <Menu />
          <main className="mdl-layout__content">
            <div className="page-content">
              {this.props.children}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
