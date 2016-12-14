import React, {Component} from 'react';
import {Modal, ModalManager, Effect} from '../uikit/index';
import Alert from '../uikit/alert';
import Dialog from '../uikit/dialog';
import RefDialogDataForm from './refDialogDataForm';

// const style={
//   width: '250px'
// }

class RefDialogForm extends Component {

  openAlert(content) {
    ModalManager.open(<Alert content={"Yo bob what's up dude"} title="My first alert"/>);
  }
  openLowerRight(content) {
    ModalManager.open(<Dialog><RefDialogDataForm /></Dialog>);
  }
  render() {
    const dialogs = [
      'Alert',
      'Centered Data Entry',
      'Lower Right Data Entry'
    ]

    return (
      <div className="container" style={{marginTop: 20}}>
        <div className="row">
          <div className="col-xs-offset-4 col-xs-4">
            <div style={{margin: 10}}>
              <textarea rows="3"
                        defaultValue="There are many possibilities for modal overlays to appear. Here are some modern ways of showing them using CSS transitions and animations."
                        className="form-control" ref='input'/>
            </div>
            <div>
              <button onClick={() => this.openAlert()}>Alert</button>
              <button onClick={() => this.openLowerRight()}>Lower Right Data Entry</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RefDialogForm;