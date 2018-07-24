import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FirmwareFlasherFlashingStatusComponent.css';

import {ActionTriggerDraggableWindow} from './actions/sensor_actions';




import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';




  const messages = defineMessages({

    close_window: {
        id: 'gui.FirmwareFlasherFlashingStatusComponent.close_window',
        description: ' ',
        defaultMessage: 'Close window'
    }

  });

class FirmwareFlasherFlashingStatusComponent extends Component {



  componentDidMount () {

    this.DCA =  this.props.DCA;
    // this.RCA =  this.props.RCA;
    // this.LCA =  this.props.LCA;
    // this.QCA =  this.props.QCA;


  }

  closeWindow(){

      this.props.onWindowClose(this.props.draggableWindowId);

  }

  flashDevice(){



  }




  render() {



  return (

          <div id={`firmware-flasher-flashing-status-component-${this.props.componentId}`} className={styles.firmware_flasher_flashing_status_component}>

          <div id={`firmware-flasher-flashing-status-component-${this.props.componentId}-tittle`} className={styles.firmware_flasher_flashing_status_component_tittle}>

              Flashing status {this.props.componentId}

          </div>

          <div>

              <button className={styles.close_window} onClick={this.closeWindow.bind(this)}>{this.props.intl.formatMessage(messages.close_window)} </button>

          </div>

          <div>



          </div>


          </div>



  );
}

}

const mapStateToProps =  state => ({


  });

const mapDispatchToProps = dispatch => ({

  onWindowClose: (draggable_window_id) => {

      dispatch(ActionTriggerDraggableWindow(draggable_window_id));
    }



});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(FirmwareFlasherFlashingStatusComponent));
