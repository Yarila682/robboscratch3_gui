
import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';

import {ActionTriggerDraggableWindow} from './actions/sensor_actions';
import {ActionCreateDraggableWindow }  from './actions/sensor_actions';


import styles from './SearchPanelDeviceComponent.css';

import {createDiv} from './lib/lib.js';



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
    device_otto: {
        id: 'gui.FirmwareFlasherDeviceComponent.device_otto',
        description: ' ',
        defaultMessage: 'Otto'
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
    },

    update_firm_msg: {

        id: 'gui.RobboGui.update_firm_msg',
        description: ' ',
        defaultMessage: 'Please update  firmware.'
    },
    cr_firm_msg: {

        id: 'gui.RobboGui.cr_firm_msg',
        description: ' ',
        defaultMessage: '(current: {current_firmware} required: {required_firmware})'
    },
    differ_firm_msg: {

        id: 'gui.RobboGui.differ_firm_msg',
        description: ' ',
        defaultMessage: 'The current firmware version of the device differs from the required one.'
    }

  });


class SearchPanelDeviceComponent extends Component {


    constructor(){  
        super();  

        this.state = {  
           devices: []
        };  

        this.deviceId = -1;

        this.firmware_version_differs = false;
        
   }

   componentDidUpdate(){

     this.props.DCA.registerDeviceStatusChangeCallback(this.props.devicePort,this.onStatusChange.bind(this));

   }

    componentDidMount(){


    this.DCA =  this.props.DCA;
    this.RCA =  this.props.RCA;
    this.LCA =  this.props.LCA;
    this.QCA =  this.props.QCA;
    this.OCA =  this.props.OCA;
    this.ACA =  this.props.ACA;

        this.props.onCreateDraggableWindow(this.props.draggableWindowId);


        // this.props.DCA.registerDeviceStatusChangeCallback(this.props.devicePort,this.onStatusChange.bind(this));



           this.props.DCA.registerFirmwareVersionDiffersCallback(this.props.devicePort, (result) => {

              //{this.props.intl.formatMessage(messages.cr_firm_msg,{current_firmware:result.current_device_firmware,required_firmware:result.need_firmware})}  {this.props.intl.formatMessage(messages.update_firm_msg)} 

         this.firmware_version_differs = true;       


        let info_field = document.getElementById(`search-panel-device-info-${this.props.Id}`);

         info_field.style.display = "inline-block";


        info_field.innerHTML = this.props.intl.formatMessage(messages.differ_firm_msg) + "<br/><br/>" + this.props.intl.formatMessage(messages.cr_firm_msg,{current_firmware:result.current_device_firmware,required_firmware:result.need_firmware}) +  "<br/><br/>" + this.props.intl.formatMessage(messages.update_firm_msg);


        var flashing_button =  document.getElementById(`search-panel-device-flash-button-${this.props.Id}`);
        flashing_button.style.backgroundColor = "";  


        // let firm_differs_msg = this.props.intl.formatMessage(messages.differ_firm_msg) + "<br/><br/>" + this.props.intl.formatMessage(messages.cr_firm_msg,{current_firmware:result.current_device_firmware,required_firmware:result.need_firmware}) +  "<br/><br/>" + "Прошить устройство?" ;
        
        // let flash_or_not = confirm(firm_differs_msg);

        // if (flash_or_not){

        //     this.flashDevice();
        // }

             });
    }


  onStatusChange(result_obj){

        let state = result_obj.state;
            //let deviceId =  result_obj.deviceId;
            this.deviceId =  result_obj.deviceId;

            let status_field = document.getElementById(`search-panel-device-status-${this.props.Id}`);

            let info_field = document.getElementById(`search-panel-device-info-${this.props.Id}`);

           let flashing_button =  document.getElementById(`search-panel-device-flash-button-${this.props.Id}`);

           let flashing_show_details_icon = document.getElementById(`search-panel-flashing-show-details-${this.props.Id}`);
       



           let  device_name = "";

    switch (this.deviceId) {

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

      case 5:

                device_name = this.props.intl.formatMessage(messages.device_otto);

          break;


      default:

    }
                if (state == 0){

                    //init here

                   this.firmware_version_differs = false; 

                   info_field.innerHTML = "";

                   info_field.style.display = "none";

                   flashing_button.style.backgroundColor = "";  
                   flashing_button.innerText = "Прошить устройство";  


                }else if (state == 2){

                  

                   this.firmware_version_differs = false; 

                   status_field.innerHTML = "Connected";

                   info_field.innerHTML = "";

                   info_field.style.display = "none";

                   flashing_button.style.backgroundColor = "";  
                   flashing_button.innerText = "Прошить устройство";  

                   //flashing_show_details_icon.style.display = "none";
                    //flashing_button.style.display = "none";


                }else if (state == 3){

                    status_field.innerHTML = "Checking serial...";


                }else if (state == 6){

                    status_field.innerHTML = `${device_name} is ready`;

                     //let firm_differs_msg = this.props.intl.formatMessage(messages.differ_firm_msg) + this.props.intl.formatMessage(messages.cr_firm_msg,{current_firmware:result.current_device_firmware,required_firmware:result.need_firmware})  + "Прошить устройство?";
                    
                    let firm_differs_msg = "Flash?";

                    let need_flash_device = false; 

                    if (this.firmware_version_differs){

                         need_flash_device = confirm(firm_differs_msg);

                    }

                   

                    if (need_flash_device){

                        this.flashDevice();

                    }else{

                            let all_devices = this.props.DCA.getDevices();

                            let all_devices_found = false;

                            for (let device_index = 0; device_index < all_devices.length;device_index++){

                                all_devices_found = (all_devices[device_index].getState() == 6);

                                if (!all_devices_found) break;
                            }

                            if (all_devices_found){

                                let search_panel = document.getElementById(`SearchPanelComponent`);

                            //  search_panel.style.display = "none";
                            }

                    }


                } else if (state == 8){ //Port doesn't respond (state - TIMEOUT)

                     let info_field = document.getElementById(`search-panel-device-info-${this.props.Id}`);

                    info_field.style.display = "inline-block";


                    let DEVICE_HANDLE_TIMEOUT =  this.DCA.getTimeoutVars().DEVICE_HANDLE_TIMEOUT;   

                    info_field.innerHTML = `Port doesn't respond in time (${DEVICE_HANDLE_TIMEOUT})`;

                     status_field.innerHTML = `Error!`;



                }//else

  }  


searchDevices(){


    console.warn("serachPanelDeviceComponent searchDevices");

    let search_panel = document.getElementById(`SearchPanelComponent`);

    search_panel.style.display = "block";


   this.DCA.searchAllDevices();

   this.RCA.searchRobotDevices();
   this.LCA.searchLaboratoryDevices();
   this.OCA.searchOttoDevices();
   this.ACA.searchArduinoDevices();

   this.QCA.searchQuadcopterDevices();
}


flashingShowDetails(){

if (this.props.draggable_window[this.props.draggableWindowId].isShowing !== true){

    this.props.onShowFlashingStatusWindow(this.props.draggableWindowId);

  }

}


flashDevice(){

    var search_device_button =  document.getElementById(`robbo_search_devices`);

    search_device_button.setAttribute("disabled", "disabled");


    // var flashing_short_status_field =  document.getElementById(`search-panel-flashing-status-${this.props.Id}`);


    // flashing_short_status_field.style.display = "inline-block";
    // flashing_short_status_field.style.backgroundImage = " url(/build/static/robbo_assets/searching.gif)";



    var flashing_button =  document.getElementById(`search-panel-device-flash-button-${this.props.Id}`);

    flashing_button.setAttribute("disabled", "disabled");


    //flashing_button.style.display = "inline-block";
    flashing_button.style.backgroundImage = " url(/build/static/robbo_assets/searching.gif)";
    flashing_button.style.backgroundColor = "";
    flashing_button.style.backgroundRepeat = "no-repeat";
    flashing_button.style.backgroundPosition = "center";
    flashing_button.style.textAlign = "left";
    flashing_button.innerText = "Flashing...";




//     if (this.props.draggable_window[this.props.draggableWindowId].isShowing !== true){

//     this.props.onShowFlashingStatusWindow(this.props.draggableWindowId);

//   }

    var cId =  this.props.flashingStatusComponentId;

    var firmwareFlasherFlashingStatusComponent =  document.getElementById(`firmware-flasher-flashing-status-component-${cId}`);

  //  var flashingStatusComponent = document.getElementById(`firmware-flasher-flashing-status-component-${cId}`).children[2];

   var flashingStatusComponent = firmwareFlasherFlashingStatusComponent.children[1];

   var flashingLogComponent = firmwareFlasherFlashingStatusComponent.children[2];

    var block_ids_component = null;

    flashingStatusComponent.innerHTML = "";
    flashingLogComponent.innerHTML = "";

    var config = {};
    config.device   = {};

    config.device.device_id = this.deviceId;
   // config.device.device_firmware_version = this.props.deviceFirmwareVersion;

    if ([0,3].indexOf(this.deviceId) != -1){

        this.RCA.stopDataRecievingProcess();
        this.RCA.discon();

    }else if ([1,2,4].indexOf(this.deviceId) != -1){

          this.LCA.stopDataRecievingProcess();
          this.LCA.discon();

    }else if ([5].indexOf(this.deviceId) != -1){

          this.OCA.stopDataRecievingProcess();
          this.OCA.discon();

    }else{

              this.RCA.stopDataRecievingProcess();
              this.RCA.discon();

              this.LCA.stopDataRecievingProcess();
              this.OCA.stopDataRecievingProcess();
            //  this.LCA.discon();
    }

    var styles = {

          margin: '20px 10px',
          fontWeight:'bold',
          fontSize:"16px"

    }


    var dots_counter = 1;

    this.DCA.flashFirmware(this.props.devicePort,config,(status) => {

           styles = {

                margin: '10px'

          }

          if ( (status.indexOf("Block") == -1) &&  (status.indexOf("Error") == -1)  && (status.indexOf("Uploading") == -1) && (status.indexOf("Port closed") == -1) ){

              createDiv(flashingLogComponent,null,null,null,null,styles,status,null);
            //    block_ids_component.innerHTML = "";

                var dots = "";

                for (var i = 0; i < dots_counter; i++) {

                    dots += ".";
                }

                flashingStatusComponent.innerHTML = "Waiting.." + dots;

                if (dots_counter == 1 ){

                    dots_counter = 2;

                }else{

                    dots_counter = 1;

                }

          }else{

             

                      flashingStatusComponent.innerHTML = status;

           


          }

          flashingLogComponent.scrollTop = flashingLogComponent.scrollHeight;

          if ( (status.indexOf("Port closed") !== -1)){

                flashingStatusComponent.style.backgroundColor = "green";

                search_device_button.removeAttribute("disabled");

                //flashing_short_status_field.style.backgroundImage = " url(/build/static/robbo_assets/status_ok.svg)";
               
                flashing_button.style.backgroundImage = "";
        

                flashing_button.removeAttribute("disabled");
                flashing_button.style.display = "inline-block";

                this.searchDevices(); //search devices

          }else if ((status.indexOf("Error") !== -1)){

                flashingStatusComponent.style.backgroundColor = "red";
                search_device_button.removeAttribute("disabled");

              //  flashing_short_status_field.style.backgroundImage = " url(/build/static/robbo_assets/status_error.svg)";


                flashing_button.style.backgroundImage = "";
                flashing_button.style.backgroundColor = "#ff0000";
                flashing_button.style.textAlign = "center";
                flashing_button.innerText = "Error!";

                flashing_button.removeAttribute("disabled");

                // flashing_short_status_field.style.display = "none";

          }else{

              flashingStatusComponent.style.backgroundColor = "#FFFF99"; //Light yellow2

          }



    });

  }


 render() {

    


  return (

   

    <div id={`search-panel-device-component`} className={styles.firmware_flasher_device_component}>


          <div id="search-panel-device-port" className={styles.search_panel_device_element}>

                {this.props.devicePort}

          </div>

           <div id={`search-panel-device-status-${this.props.Id}`} className={styles.search_panel_device_element}>

                {"status"}

          </div>

          <div id={`search-panel-device-info-${this.props.Id}`} className={styles.search_panel_device_element}>

                {"info"}

          </div>

          <div id={`search-panel-device-flash-button-element-${this.props.Id}`} className={styles.search_panel_device_element}>

              <button id={`search-panel-device-flash-button-${this.props.Id}`} className={styles.device_flash_button} onClick={this.flashDevice.bind(this)}>{this.props.intl.formatMessage(messages.flash_device)} </button>

          </div>

           <div id={`search-panel-flashing-status-${this.props.Id}`} className={styles.search_panel_flashing_status}>

               

          </div>

          <div id={`search-panel-flashing-show-details-${this.props.Id}`} className={styles.search_panel_flashing_show_details} onClick={this.flashingShowDetails.bind(this)}>

               

          </div>


          </div>

  );

}

}


const mapStateToProps =  state => ({

    //   devices:state.scratchGui.devices_search_panel,
    //   draggable_window:state.scratchGui.new_draggable_window
        draggable_window:state.scratchGui.draggable_window

  });

const mapDispatchToProps = dispatch => ({

      onShowFlashingStatusWindow: (draggable_window_id) => {

         dispatch(ActionTriggerDraggableWindow(draggable_window_id));
      },

      onCreateDraggableWindow: (draggable_window_id) => {

        dispatch(ActionCreateDraggableWindow(draggable_window_id));
    }

    // onDeviceFound: (device) => {

    //       dispatch(ActionDeviceFound(device));
    // },


    // onSearchPanelWindowClose: (window_id) => {

    //     dispatch(ActionTriggerDraggableWindow(window_id));
    //   }


});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPanelDeviceComponent));

//export default injectIntl(SearchPanelDeviceComponent);