import React, {Component} from 'react';
import componentHandler from 'exports?componentHandler!material-design-lite/material';
import { Modal } from './index';
import './modalStyles.css';

export const DIALOG_STYLE_LOWER_RIGHT = "dialog-lower-right";
export const DIALOG_STYLE_CENTERED = "dialog-centered";

const styleLowerRight = {
  overlay: {
    height: '100vh',
    width: '100vw',
    display: 'flex'
  },
  content: {
    right: 100,
    bottom: 0,
    position: 'fixed',
    display: 'flex',
    boxSizing: 'border-box',
    border: '2px solid rgba(0, 0, 0, .2)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, .5)',
    width: 400,
    height: 500,
    maxHeight: '100%',
    maxWidth: '100%',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: 'white',
    margin: 'none'
  }
}

const transitionFadeInNoBounce = {
  transition: {
    property: 'all',
    duration: 200,
    timingfunction: 'cubic-bezier(.90, -.10, .10, 1.10)'
  },
  begin: {
    'transform': 'scale(0.4)',
    'opacity': 0,
  },
  end: {
    'transform': 'scale(1)',
    'opacity': 1
  }
};

const styleCentered = {
  overlay: {
    height: '100vh',
    width: '100vw',
    // backgroundColor : 'rgba(30, 30, 30, .40)',
    display: 'flex',
    alignItems: 'center',
    justifyContents: 'center'
  },
  content: {
    position: 'relative',
    display: 'flex',
    margin: 'auto',
    marginBottom: '20px',
    boxSizing: 'border-box',
    border: '2px solid rgba(0, 0, 0, .2)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, .5)',
    width: 400,
    height: 550,
    maxHeight: '85%',
    maxWidth: '80%',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: 'white'
  }
}

const transitionFromBottom = {
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
};

// const transitionFadeIn = {
//   transition: {
//     property: 'all',
//     duration: 250,
//     // timingfunction: 'cubic-bezier(.87,-.41,.19,1.44)'
//     timingfunction: 'cubic-bezier(.87,-.21,.19,1.24)'
//   },
//   begin: {
//     'transform': 'scale(0.4)',
//     'opacity': 0,
//   },
//   end: {
//     'transform': 'scale(1)',
//     'opacity': 1
//   }
// };


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
    right: 100,
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

    const { dialogStyle, onRequestClose } = this.props;

    let style, effect;
    switch (dialogStyle) {
      case DIALOG_STYLE_LOWER_RIGHT:
        effect = transitionFromBottom;
        style  = styleLowerRight;
        break;
      case DIALOG_STYLE_CENTERED:
        effect = transitionFadeInNoBounce;
        style  = styleCentered;
        break;
      default:
        effect = defaultEffect;
        style  = defaultStyle;
    }

    return (
      <Modal
        effect={effect} style={style} onRequestClose={(onRequestClose) ? onRequestClose : () => true}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default Dialog;


