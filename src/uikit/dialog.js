import React, {Component} from 'react';
import componentHandler from 'exports?componentHandler!material-design-lite/material';
import {Modal, ModalManager} from './index';
import './dialogStyles.css';

const defaultEffect = {
  transition: {
    property: 'all',
    duration: 200,
    timingfunction: 'linear'
  },
  begin: {
    'transform': 'translateY(185px)',
    'opacity': 1
  },
  end: {
    'transform': 'translateY(0)',
    'opacity': 1
  }
}

const defaultStyle = {
  overlay: {
    height: '100vh',
    width: '100vw',
    display: 'flex'

  },

  content: {
    right: 50,
    bottom: 0,
    position: 'fixed',
    display: 'flex',
    boxSizing: 'border-box',
    border : '2px solid rgba(0, 0, 0, .2)',
    boxShadow : '0 8px 16px rgba(0, 0, 0, .5)',
    width: 400,
    height: 500,
    maxHeight: '100%',
    maxWidth: '100%',
    backgroundColor: '#fff',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: 'white',
    margin: 'none'
  }
}

class Dialog extends Component {
  // regular housekeeping needed for mdl
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  render() {
    const {title, content, effect, style} = this.props;

    //merge in styles
    let myStyle = defaultStyle;
    if (style) {
      const x = {...defaultStyle.content, ...style};
      myStyle = {...defaultStyle, ...{content: x}}
    }

    // debugger;

    return (
      <Modal
        effect={effect ? effect : defaultEffect}
        style={myStyle}
        onRequestClose={() => true}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default Dialog;


