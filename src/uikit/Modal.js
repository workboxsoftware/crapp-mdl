import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import Assign from 'lodash.assign';
import { store } from '../index';
import { Provider } from 'react-redux';
import {addLocaleData} from 'react-intl';
import {IntlProvider} from 'react-intl';
import applicationReducer from './application/applicationReducer';
import authReducer from './refAuth/redux';
import { AUTH_USER, UNAUTH_USER } from './refAuth/redux'
import en from 'react-intl/lib/locale-data/en'
import fr from 'react-intl/lib/locale-data/fr'
import de from 'react-intl/lib/locale-data/de'
// import es from 'react-intl/lib/locale-data/es'
import ConnectedIntlProvider from './utils/connectedIntlProvider';
import * as i18n from './i18n'
addLocaleData(en);
addLocaleData(fr);
addLocaleData(de);

const prefix = require('react-prefixr');

const defaultStyles = {
  overlay: {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    zIndex          : 99999999,
    overflow        : 'hidden',
    perspective     :  1300,
    backgroundColor : 'rgba(f, 0, 0, 0.3)'
  },

  content: {
    width                   : '60%',
    border                  : '1px solid rgba(0, 0, 0, .2)',
    background              : '#fff',
    overflow                : 'auto',
    borderRadius            : '4px',
    outline                 : 'none',
    boxShadow               : '0 5px 10px rgba(0, 0, 0, .3)',
  }
};

const defaultTransition = {
  property : 'all',
  duration : 300,
  timingfunction : 'linear',
};

const stopPropagation = (e) => e.stopPropagation();

let onClose;

var node;
var modals = [];

const renderModal = () => {
  if(modals.length === 0)
    return;

  const component = modals.shift();
  if(!node){
    node = document.createElement('div');
    document.body.appendChild(node);
  }
  ReactDOM.render(component,node);
}

export const ModalManager = {
  open(component){
    modals.push(component);
    if(modals.length === 1){ // render the modal only if there is no other showing modals
      renderModal();
    }
  },
  close(){
    onClose && onClose(() => {
      ReactDOM.unmountComponentAtNode(node);
      renderModal();// render the other modals which are waiting.
    });
  }
}

export class Modal extends Component{
  constructor(props){
    super(props);
    this.state = {
      open : false
    }
    console.log("constructor", props);
  }
  close(){
    if(!this.props.onRequestClose || this.props.onRequestClose()){
      ModalManager.close();
    }
  }
  handleKeyDown(event){
    if (event.keyCode === 27 /*esc*/) this.close();
  }
  componentDidMount(){
    const transitionTimeMS = this.getTransitionDuration();
    setTimeout(() => this.setState({open : true}),0);
    onClose = (callback) => {
      this.setState({open: false}, () => {
        this.closeTimer = setTimeout(callback, transitionTimeMS);
      });
    };
  }
  componentWillUnmount(){
    onClose = null;
    clearTimeout(this.closeTimer);
  }
  getTransitionDuration(){
    const { effect } = this.props;
    if(!effect.transition){
      return defaultTransition.duration;
    }
    return effect.transition.duration || defaultTransition.duration;
  }
  render(){
    const {style,effect} = this.props;
    const { open } = this.state;

    let transition = effect.transition;
    if(!transition){
      transition = defaultTransition;
    }else{
      transition = Assign({},defaultTransition,transition);
    }
    let transition_style = {
      'transition': transition.property+' '+(transition.duration / 1000) + 's'+' '+transition.timingfunction
    };
    // var logstyle=prefix(Assign({},defaultStyles.overlay,style ? (style.overlay ? style.overlay : {}) : {},{ transition: 'opacity '+(transition.duration / 1000) + 's'+' linear',opacity: open ? 1 : 0}));
    // console.log("overlaystyle=",logstyle);
    // logstyle=prefix(Assign({},
    //   defaultStyles.content,
    //   style ? (style.content ? style.content : {}) : {},
    //   transition_style,
    //   open ? effect.end : effect.begin));
    // console.log("content style", logstyle);
    return (
      <div
        ref="overlay"
        style={prefix(Assign({},defaultStyles.overlay,style ? (style.overlay ? style.overlay : {}) : {},{ transition: 'opacity '+(transition.duration / 1000) + 's'+' linear',opacity: open ? 1 : 0}))}
        onClick={this.close.bind(this)}>

        <div
          ref="content"
          style={prefix(Assign({},
            defaultStyles.content,
            style ? (style.content ? style.content : {}) : {},
            transition_style,
            open ? effect.end : effect.begin))}
          onClick={stopPropagation}
          onKeyDown={this.handleKeyDown.bind(this)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}


