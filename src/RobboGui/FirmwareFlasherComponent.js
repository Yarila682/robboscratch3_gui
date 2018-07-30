import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './FirmwareFlasherComponent.css';

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';

import {ActionFirmwareFlasherGetDevicesInfo}  from './actions/sensor_actions';

import FirmwareFlasherDeviceComponent from './FirmwareFlasherDeviceComponent';

import FirmwareFlasherFlashingStatusComponent from './FirmwareFlasherFlashingStatusComponent';

import DraggableWindowComponent from './DraggableWindowComponent';


  const messages = defineMessages({

    get_devices_info: {
        id: 'gui.FirmwareFlasherComponent.get_devices_info',
        description: ' ',
        defaultMessage: 'Search devices'
    },
    device_name:{
        id: 'gui.FirmwareFlasherComponent.device_name',
        description: ' ',
        defaultMessage: 'Device name'
    },
    device_port:{
        id: 'gui.FirmwareFlasherComponent.device_port',
        description: ' ',
        defaultMessage: 'Device port'
    },
    device_firmware:{
        id: 'gui.FirmwareFlasherComponent.device_firmware',
        description: ' ',
        defaultMessage: 'Device firmware'
    },
    device_serial:{
        id: 'gui.FirmwareFlasherComponent.device_serial',
        description: ' ',
        defaultMessage: 'Device serial number'
    }

  });

class FirmwareFlasherComponent extends Component {

  getDevicesInfo(){

      console.log(`getDevicesInfo`);

      this.props.onGetDevicesInfo(this.DCA,this.RCA,this.LCA,this.QCA);

  }


  componentDidMount () {

    this.DCA =  this.props.DCA;
    this.RCA =  this.props.RCA;
    this.LCA =  this.props.LCA;
    this.QCA =  this.props.QCA;


  }




  render() {

  return (


    <div id="FirmwareFlasherComponent" className={styles.firmware_flasher_component}>


          <div id="FirmwareFlasherComponent-tittle" className={styles.firmware_flasher_component_tittle}>

              FirmwareFlasher

          </div>

          <div>

            <button className={styles.get_devices_info} onClick={this.getDevicesInfo.bind(this)}>{this.props.intl.formatMessage(messages.get_devices_info)} </button>

          </div>

          <div id = "devices-header" className={styles.devices_header}>

                <div id="devices-header-device-name" className={styles.devices_header_element}>

                      {this.props.intl.formatMessage(messages.device_name)}

                </div>



                <div id="devices-header-device-port" className={styles.devices_header_element}>

                      {this.props.intl.formatMessage(messages.device_port)}

                </div>

                <div id="devices-header-device-serial" className={styles.devices_header_element}>

                      {this.props.intl.formatMessage(messages.device_serial)}

                </div>

                <div id="devices-header-device-firmware" className={styles.devices_header_element}>

                      {this.props.intl.formatMessage(messages.device_firmware)}

                </div>


          </div>


          <div>


          {


            this.props.devices.map((device, index) =>

               {





                 return  <FirmwareFlasherDeviceComponent flashingStatusComponentId={index} draggableWindowId={4+index}  key={index} deviceSerial={device.serial_number} devicePort={device.port} deviceId={device.id} deviceFirmwareVersion={device.firmware_version} DCA={this.DCA} RCA={this.RCA} LCA={this.LCA}/>



               }

           )

         }


         {

           this.props.devices.map((device, index) =>

              {





                return     <DraggableWindowComponent draggableWindowId={4+index}>

                              <FirmwareFlasherFlashingStatusComponent key={index} componentId={index}  draggableWindowId={4+index}  DCA={this.DCA} RCA={this.RCA} LCA={this.LCA} QCA={this.QCA} />

                          </DraggableWindowComponent>




              }

          )



          }


          </div>



    </div>


  );
}

}

const mapStateToProps =  state => ({

      devices:state.devices_firmware_flasher

  });

const mapDispatchToProps = dispatch => ({

  onGetDevicesInfo: (DCA,RCA,LCA,QCA) => {

      dispatch(ActionFirmwareFlasherGetDevicesInfo(DCA,RCA,LCA,QCA));

  }


});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(FirmwareFlasherComponent));
