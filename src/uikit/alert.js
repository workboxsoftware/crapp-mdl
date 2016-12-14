import React, {Component} from 'react';
import componentHandler from 'exports?componentHandler!material-design-lite/material';
import { Modal, ModalManager } from './index';
import './dialogStyles.css';

const defaultEffect = {
  transition: {
    property: 'all',
    duration: 250,
    // timingfunction: 'cubic-bezier(.87,-.41,.19,1.44)'
    timingfunction: 'cubic-bezier(.87,-.21,.19,1.24)'
  },
  begin: {
    'transform': 'scale(0.4)',
    'opacity': 0,
  },
  end: {
    'transform': 'scale(1)',
    'opacity': 1
  }
}

const defaultStyle = {
  overlay: {
    height: '100vh',
    width: '100vw',
    backgroundColor : 'rgba(30, 30, 30, .40)',
    display: 'flex',
    alignItems: 'center',
    justifyContents: 'center'
  },

  content: {
    position         : 'relative',
    paddingTop       : '20px',
    paddingLeft      : '20px',
    boxSizing        : 'border-box',
    border           : 'none',
    margin           : '15% auto',
    boxShadow:  '0 9px 46px 8px rgba(0, 0, 0, 0.14), ' +
    '0 11px 15px -7px rgba(0, 0, 0, 0.12), ' +
    '0 24px 38px 3px rgba(0, 0, 0, 0.2)',
    width            : 400,
    maxWidth         : '60%',
    backgroundColor  : '#fff',
    WebkitOverflowScrolling: 'touch',
  }
}

class Alert extends Component {
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
    if ( style ) {
      const x = {...defaultStyle.content, ...style};
      myStyle = {...defaultStyle, ...{content: x}}
    }

    console.log(myStyle);
    console.log(defaultStyle);

    return (
      <Modal
        effect={effect ? effect : defaultEffect}
        style={myStyle}
        onRequestClose={() => true}
      >
        <div className="Alert-body">
          <div id="alert" className="Alert.dialog">
            <h4 className="Alert-dialog__title">{title}</h4>
            <div className="Alert-dialog__content">
              <p>{content}</p>
            </div>
            <div className="mdl-dialog__actions">
              <button type="button"
                      className="mdl-button mdl-js-button mdl-button--primary Alert-button"
                      ref={(button) => { if (button) button.focus() }}
                      onClick={ModalManager.close}>Close</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Alert;


