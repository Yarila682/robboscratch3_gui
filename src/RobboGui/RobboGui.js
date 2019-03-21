import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SensorPallete from './SensorPallete';
import ColorCorrectorTableComponent from './ColorCorrectorTableComponent';
import SensorPaletteCollapsed from './SensorPaletteCollapsed';
import { ItemTypes } from './drag_constants';
import { DropTarget } from 'react-dnd';
import SensorChooseWindowComponent from './SensorChooseWindowComponent';
import {ActionSearchRobotDevices} from './actions/sensor_actions';
import {ActionSearchLaboratoryDevices} from './actions/sensor_actions';
import {ActionRobotStopSearchProcess} from './actions/sensor_actions';
import {ActionRobotStopDataRecievingProcess}  from './actions/sensor_actions';
import {ActionTriggerExtensionPack} from './actions/sensor_actions';
import {ActionTriggerColorCorrectorTable} from './actions/sensor_actions';
//import {ActionTriggerNeedLanguageReload} from './actions/sensor_actions';

import RobboMenu from './RobboMenu';
import FirmwareFlasherComponent from './FirmwareFlasherComponent';
import DraggableWindowComponent from './DraggableWindowComponent';
import SettingsWindowComponent from './SettingsWindowComponent';
import styles from './RobboGui.css';

import { withAlert } from 'react-alert';

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';

const messages = defineMessages({
    search_devices: {

        id: 'gui.RobboGui.search_devices',
        description: ' ',
        defaultMessage: 'Search devices'
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
    },
    device_lost: {

        id: 'gui.RobboGui.device_lost',
        description: ' ',
        defaultMessage: 'Lost connection to device'
    }
});


// const Target = {
//   drop(props,monitor) {
//
//     let coords = monitor.getClientOffset();
//
//     props.onSensorChooseWindowDrop(coords.y, coords.x);
//   }
// };
//
//
// const  collect = (connect, monitor) =>  ({
//
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver()
//
// });

class RobboGui extends Component {



  componentWillReceiveProps (props) {




  }

  componentDidMount(){

      this.DCA.registerFirmwareVersionDiffersCallback((result) => {

        this.props.alert.info(<div  className={styles.alert}>{this.props.intl.formatMessage(messages.differ_firm_msg)}<br/><br/>{this.props.intl.formatMessage(messages.cr_firm_msg,{current_firmware:result.current_device_firmware,required_firmware:result.need_firmware})} <br/><br/> {this.props.intl.formatMessage(messages.update_firm_msg)}  </div>,{timeout:10000});

      //  this.props.alert.info(<div  className={styles.alert}>{this.props.intl.formatMessage(messages.update_firm_msg,{current_firmware:result.current_device_firmware,required_firmware:result.need_firmware})} </div>);


      //   this.props.alert.info(`Please update  firmware.` + <br/>  `Current firmware:  ${result.current_device_firmware}` + <br/> +  `Need firmware: ${result.need_firmware}`);

      });

      this.DCA.registerErrorCallback((error) => {

      //    this.props.alert.error(<div style={{ backgroundColor: 'green' }}>{`Error:  ${error.msg} Error code: ${error.code}`}</div>);

          if (error.code == 1){

      //      this.props.alert.error(<div className={styles.alert}>{`Error!`}<br/><br/>{error.msg}<br/><br/>{this.props.intl.formatMessage(messages.device_lost)}</div>);

          }else if (error.code == 2){

              this.props.alert.error(<div className={styles.alert}>{`Error!`}<br/><br/>{`${error.msg}`}</div>);

          }else{

                this.props.alert.error(<div className={styles.alert}>{`Error!`}<br/><br/>{`${error.msg}`}</div>);

          }



      //  this.props.alert.error(<div  className={styles.alert}>{`Error!`}<br/><br/>{`Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!`}</div>);


      });

      //  this.props.alert.error(<div  className={styles.alert}>{`Error!`}<br/><br/>{`Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!`}</div>);
    //    this.props.alert.error(<div>{`Error!`}<br/><br/>{`[Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!Error!]`}</div>);

  }



  searchDevices(){

    console.log("searchDevices");


   this.props.vm.getDCA().searchAllDevices();

   //  this.props.searchRobotDevices(this.props.vm.getRCA());
   // this.props.searchLaboratoryDevices(this.props.vm.getLCA());

   this.props.vm.getRCA().searchRobotDevices();
   this.props.vm.getLCA().searchLaboratoryDevices();
   this.OCA.searchOttoDevices();

   this.QCA.searchQuadcopterDevices();

  }

  stopSearchProcess(){

    console.log("stopSearchProcess");
  //  this.props.stopSearchProcess(this.props.vm.getRCA());

  this.props.vm.getRCA().stopSearchProcess();
  this.props.vm.getLCA().stopSearchProcess();


  }

  stopDataRecievingProcess(){


    console.log("stopDataRecievingProcess");
  //  this.props.stopDataRecievingProcess(this.props.vm.getRCA());

  this.props.vm.getRCA().stopDataRecievingProcess();
  this.props.vm.getLCA().stopDataRecievingProcess();
  this.OCA.stopDataRecievingProcess();

  }

  triggerExtensionPack(){

    console.log("triggerExtensionPack");
    this.props.onTriggerExtensionPack();


  }

  triggerColorCorrectorTable(sensor_caller_id){

    console.log("triggerColorCorrectorTable");
    this.props.onTriggerColorCorrectorTable(sensor_caller_id);

  }



  render() {

//  return this.props.connectDropTarget(

  this.DCA =  this.props.vm.getDCA();
  this.RCA =  this.props.vm.getRCA();
  this.LCA =  this.props.vm.getLCA();
  this.QCA =  this.props.vm.getQCA();
  this.OCA =  this.props.vm.getOCA();

  return (

    <div className={classNames(

                  {[styles.robbo_gui]: true},
                  {[styles.content_collapsed]: this.props.sensorsPalette.sensors_pallete_collapsed},
                  {[styles.content_expand]:    !this.props.sensorsPalette.sensors_pallete_collapsed}


                  )}>


          <div className={styles.version}> Robbo Scratch ver. 3.8.0  </div>

         {
              (!this.props.sensorsPalette.sensors_pallete_collapsed)?  <SensorPallete RCA={this.RCA} LCA={this.LCA} QCA={this.QCA} OCA={this.OCA} />: <SensorPaletteCollapsed />


         }

         <DraggableWindowComponent draggableWindowId={3}>

            <FirmwareFlasherComponent DCA={this.DCA} RCA={this.RCA} LCA={this.LCA} QCA={this.QCA} OCA={this.OCA} />

          </DraggableWindowComponent>

        <DraggableWindowComponent draggableWindowId={4}>

          <SettingsWindowComponent />

        </DraggableWindowComponent>


          <SensorChooseWindowComponent key="SensorChooseWindowComponent" isShowing={this.props.sensorsChooseWindow.sensors_choose_window_showing}
           top={this.props.sensorsChooseWindow.sensors_choose_window_drag_top} left={this.props.sensorsChooseWindow.sensors_choose_window_drag_left}
           CallerSensorId={this.props.sensorsChooseWindow.sensors_choose_window_sensor_caller}
           SensorCallerDeviceName={this.props.sensorsChooseWindow.sensors_choose_window_sensor_caller_device_name}
           CallerSensorType={this.props.sensorsChooseWindow.sensors_choose_window_sensor_caller_type}/>



         <ColorCorrectorTableComponent RCA={this.RCA}/>

         <RobboMenu VM={this.props.vm} />

        <button id={`robbo_search_devices`} className={styles.robbo_search_devices} onClick={this.searchDevices.bind(this)}>{this.props.intl.formatMessage(messages.search_devices)} </button>

    </div>
  );
//  );
};

};



const mapStateToProps =  state => ({


  sensorsChooseWindow:state.scratchGui.sensors_choose_window,
  sensorsPalette:state.scratchGui.sensors_palette


  });

const mapDispatchToProps = dispatch => ({

  searchRobotDevices: (RCA) => {

      dispatch(ActionSearchRobotDevices(RCA));
    },

    // searchLaboratoryDevices: (LCA) => {
    //
    //     dispatch(ActionSearchLaboratoryDevices(LCA));
    //   },


    stopSearchProcess: (RCA) => {


          dispatch(ActionRobotStopSearchProcess(RCA));

    },

    stopDataRecievingProcess: (RCA) => {

            dispatch(ActionRobotStopDataRecievingProcess(RCA));

    },
    onTriggerExtensionPack: () => {

        dispatch(ActionTriggerExtensionPack());
      },


      onTriggerColorCorrectorTable:  (sensor_caller_id) => {

          dispatch(ActionTriggerColorCorrectorTable(sensor_caller_id));
        }

        // onTriggerNeedLanguageReload:  () => {
        //
        //     dispatch(ActionTriggerNeedLanguageReload());
        //   }



});


// RobboGui.propTypes = {
//   connectDropTarget: PropTypes.func.isRequired,
//   isOver: PropTypes.bool.isRequired,
//
// };


export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert()(RobboGui)));

// export default connect(
//         mapStateToProps,
//         mapDispatchToProps
//
//     ) (DropTarget(ItemTypes.SENSOR_CHOOSE_WINDOW, Target, collect)(RobboGui));
