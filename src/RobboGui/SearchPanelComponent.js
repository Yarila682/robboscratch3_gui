
import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';


import styles from './SearchPanelComponent.css';
import {ActionAddNewFoundDevice} from './actions/sensor_actions';

import FirmwareFlasherFlashingStatusComponent from './FirmwareFlasherFlashingStatusComponent';
import SearchPanelDeviceComponent from './SearchPanelDeviceComponent';

import DraggableWindowComponent from './DraggableWindowComponent';

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';



class SearchPanelComponent extends Component {


    constructor(){ 

        super();  
        this.state = {  
           devices: []
        }; 
        
        this.device_list = [];
        
   }


    componentDidMount () {

   

    // this.DCA =  this.props.deviceControlInterfaces.DCA;
    // this.RCA =  this.props.deviceControlInterfaces.RCA;
    // this.LCA =  this.props.deviceControlInterfaces.LCA;
    // this.QCA =  this.props.deviceControlInterfaces.QCA;
    // this.OCA =  this.props.deviceControlInterfaces.OCA;
    // this.ACA =  this.props.deviceControlInterfaces.ACA;

    this.DCA =  this.props.DCA;
    this.RCA =  this.props.RCA;
    this.LCA =  this.props.LCA;
    this.QCA =  this.props.QCA;
    this.OCA =  this.props.OCA;
    this.ACA =  this.props.ACA;

    this.draggableWindowId = this.props.draggableWindowId;

   

     this.DCA.registerDeviceFoundCallback(() => {

       let devices = this.DCA.getDevices();

       this.device_list = [];

        console.warn("devices: ");
        console.warn(devices);

       for (let index = 0; index < devices.length; index++){

             let device = {

                     
                devicePort: devices[index].getPortName()
              //  deviceId: devices[index].getDeviceID() 
            
            }

            this.device_list.push(device);

            // console.warn("device");
            // console.warn(device);

            // console.warn("device list: ");
            // console.warn(this.device_list);

       }


        this.setState((previousState, currentProps) => {

            // let devices =  previousState.devices;

            // // devices.push(device);

            //  if (this.device_ports.indexOf(device.devicePort) == -1){

            //     this.device_ports.push(device.devicePort);

            //     devices.push(device);
            // }

             console.warn("device list: ");
             console.warn(this.device_list);


         
            return {
                devices:this.device_list
              };
            });
        
    

    });







  }

  onThisWindowClose(){

    console.log("Search Panel close");
    this.props.onSearchPanelWindowClose(this.draggableWindowId);

  }

  render() {

  return (


    <div id="SearchPanelComponent" className={styles.search_panel}>


          <div id="SearchPanelComponent-tittle" className={styles.search_panel_tittle}>

             Search panel

              <div className={styles.close_icon} onClick={this.onThisWindowClose.bind(this)}>


              </div>

          </div>

           <div id="SearchPanelComponent-body" className={styles.search_panel_body}>

               <div id="SearchPanelComponent-devices-list">

                {


                   this.state.devices.map((device, index) =>

                        {





                         return  <SearchPanelDeviceComponent Id={index} flashingStatusComponentId={index} draggableWindowId={7+index}  key={index + "search-panel-devices-list"}  devicePort={device.devicePort}   DCA={this.DCA} RCA={this.RCA} LCA={this.LCA} OCA={this.OCA} ACA={this.ACA}/>



                        }

                    )

                }    


         {

           this.state.devices.map((device, index) =>

              {





                return     <DraggableWindowComponent key={index + "devices-list-draggable"} draggableWindowId={7+index}>

                              <FirmwareFlasherFlashingStatusComponent key={index + "devices-list-status"} componentId={index}  draggableWindowId={7+index}  DCA={this.DCA} RCA={this.RCA} LCA={this.LCA} QCA={this.QCA} OCA={this.OCA} ACA={this.ACA}/>

                          </DraggableWindowComponent>




              }

          )



          }


               </div>  


          </div>    

  </div>  

  )};



}

// const mapStateToProps =  state => ({

//       devices:state.scratchGui.devices_search_panel,
//       draggable_window:state.scratchGui.new_draggable_window

//   });

// const mapDispatchToProps = dispatch => ({

// //   onGetDevicesInfo: (DCA,RCA,LCA,QCA,OCA) => {

// //       dispatch(ActionFirmwareFlasherGetDevicesInfo(DCA,RCA,LCA,QCA,OCA));

// //   },

//     onDeviceFound: (device) => {

//           dispatch(ActionAddNewFoundDevice(device));
//     },


//     onSearchPanelWindowClose: (window_id) => {

//         dispatch(ActionTriggerDraggableWindow(window_id));
//       }


// });

// export default injectIntl(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SearchPanelComponent));

export default injectIntl(SearchPanelComponent);