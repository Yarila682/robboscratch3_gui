import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FirmwareFlasherDeviceComponent.css';

import {ActionCreateDraggableWindow }  from './actions/sensor_actions';
import {ActionTriggerDraggableWindow} from './actions/sensor_actions';

import {createDiv} from './lib/lib.js';

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';




  const messages = defineMessages({

    device_robot: {
        id: 'gui.FirmwareFlasherDeviceComponent.device_robot',
        description: ' ',
        defaultMessage: 'Robot'
    },
    device_lab: {
        id: 'gui.FirmwareFlasherDeviceComponent.device_lab',
        description: ' ',
        defaultMessage: 'Laboratory'
    },
    device_unknown: {
        id: 'gui.FirmwareFlasherDeviceComponent.device_unknown',
        description: ' ',
        defaultMessage: 'Unknown device'
    },
    flash_device: {
        id: 'gui.FirmwareFlasherDeviceComponent.flash_device',
        description: ' ',
        defaultMessage: 'Flash device'
    }

  });

class FirmwareFlasherDeviceComponent extends Component {



  componentDidMount () {

    this.DCA =  this.props.DCA;
    this.RCA =  this.props.RCA;
    this.LCA =  this.props.LCA;
    // this.QCA =  this.props.QCA;

    this.props.onCreateDraggableWindow(this.props.draggableWindowId);


  }

  flashDevice(){

    this.props.onShowFlashingStatusWindow(this.props.draggableWindowId);

    var cId =  this.props.flashingStatusComponentId;

    var flashingStatusComponent = document.getElementById(`firmware-flasher-flashing-status-component-${cId}`).children[2];

    flashingStatusComponent.innerHTML = "";

    var config = {};
    config.device   = {};

    config.device.device_id = this.props.deviceId;
    config.device.device_firmware_version = this.props.deviceFirmwareVersion;

    if ([0,3].indexOf(this.props.deviceId) != -1){

        this.RCA.stopDataRecievingProcess();

    }else if ([1,2,4].indexOf(this.props.deviceId) != -1){

          this.LCA.stopDataRecievingProcess();

    }else{

              this.RCA.stopDataRecievingProcess();
              this.LCA.stopDataRecievingProcess();
    }

    this.DCA.flashFirmware(this.props.devicePort,config,(status) => {

          var styles = {

                margin: '10px'

          }

          createDiv(flashingStatusComponent,null,null,null,null,styles,status,null);

    });

  }




  render() {

    var device_name = "";

    switch (this.props.deviceId) {

      case -1:

          device_name = this.props.intl.formatMessage(messages.device_unknown);

        break;

      case 0:

          device_name = this.props.intl.formatMessage(messages.device_robot);

        break;

      case 1:

            device_name = this.props.intl.formatMessage(messages.device_lab);

          break;

      case 2:

            device_name = this.props.intl.formatMessage(messages.device_lab);

          break;

      case 3:

          device_name = this.props.intl.formatMessage(messages.device_robot);

        break;

      case 4:

            device_name = this.props.intl.formatMessage(messages.device_lab);

          break;


      default:

    }

  return (

          <div id="firmware-flasher-device-component" className={styles.firmware_flasher_device_component}>


          <div id="firmware-flasher-device-name" className={styles.firmware_flasher_device_element}>

              {device_name}

          </div>

          <div id="firmware-flasher-device-port" className={styles.firmware_flasher_device_element}>

                {this.props.devicePort}

          </div>

          <div id="firmware-flasher-device-firmware" className={styles.firmware_flasher_device_element}>

                {this.props.deviceFirmwareVersion}

          </div>

          <div id="firmware-flasher-device-flash-button" className={styles.firmware_flasher_device_element}>

              <button className={styles.device_flash_button} onClick={this.flashDevice.bind(this)}>{this.props.intl.formatMessage(messages.flash_device)} </button>

          </div>


          </div>



  );
}

}

const mapStateToProps =  state => ({


  });

const mapDispatchToProps = dispatch => ({


  onCreateDraggableWindow: (draggable_window_id) => {

      dispatch(ActionCreateDraggableWindow(draggable_window_id));
    },

    onShowFlashingStatusWindow: (draggable_window_id) => {

        dispatch(ActionTriggerDraggableWindow(draggable_window_id));
      }

});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(FirmwareFlasherDeviceComponent));
