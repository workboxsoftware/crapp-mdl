import React, {Component} from 'react';
import {ModalManager} from '../uikit/index';
import Alert from '../uikit/alert';
import Dialog from '../uikit/dialog';
import RefDataEntryContainer from '../refDataEntry/refDataEntryContainer';
import { DIALOG_STYLE_CENTERED } from '../uikit/dialog';
import { DIALOG_STYLE_LOWER_RIGHT } from '../uikit/dialog';

class RefDialogForm extends Component {

  openAlert(content) {
    ModalManager.open(<Alert content={"Yo - what's up dude"} title="My first alert"/>);
  }

  openLowerRight() {
    ModalManager.open(<Dialog dialogStyle={ DIALOG_STYLE_LOWER_RIGHT }><RefDataEntryContainer /></Dialog>);
  }

  openCentered() {
    ModalManager.open(<Dialog dialogStyle={ DIALOG_STYLE_CENTERED } ><RefDataEntryContainer /></Dialog>);
  }


  render() {
    return (
      <div className="refDialog" style={{backgroundColor: 'rgb(242,242,242', height: '100vh', width: '100vw'}}>
        <div>
          <button style={{margin: '20px'}} onClick={() => this.openAlert()}>Alert</button>
          <button style={{margin: '20px'}} onClick={() => this.openLowerRight()}>Lower Right Data Entry</button>
          <button style={{margin: '20px'}} onClick={() => this.openCentered()}>Centered</button>
        </div>
      </div>
    );
  }
}

export default RefDialogForm;