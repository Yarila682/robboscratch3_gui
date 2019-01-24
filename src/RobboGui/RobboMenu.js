import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './RobboMenu.css';
import classNames from 'classnames';
import {ActionTriggerExtensionPack} from './actions/sensor_actions';
import {ActionTriggerLabExtSensors} from  './actions/sensor_actions';
import {ActionTriggerColorCorrectorTable} from './actions/sensor_actions';
import {ActionTriggerDraggableWindow} from './actions/sensor_actions'

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';


const messages = defineMessages({
    extension_pack: {
        id: 'gui.RobboMenu.extension_pack',
        description: ' ',
        defaultMessage: 'Extension pack '
    },
    lab_ext_sensors: {
        id: 'gui.RobboMenu.lab_ext_sensors',
        description: ' ',
        defaultMessage: 'Laboratory external sensors'
    },
    trigger_logging:{

      id: 'gui.RobboMenu.trigger_logging',
      description: ' ',
      defaultMessage: 'Trigger logging'

    },
    trigger_firmware_flasher:{

      id: 'gui.RobboMenu.trigger_firmware_flasher',
      description: ' ',
      defaultMessage: 'Trigger firmware flasher'

    },
    trigger_settings_window:{

      id: 'gui.RobboMenu.trigger_settings_window',
      description: ' ',
      defaultMessage: 'Trigger settings window'

    },
    color_sensor_correction1:{

      id: 'gui.RobboMenu.color_sensor_correction1',
      description: ' ',
      defaultMessage: 'Color sensor correction 1'

    },
    color_sensor_correction2:{

      id: 'gui.RobboMenu.color_sensor_correction2',
      description: ' ',
      defaultMessage: 'Color sensor correction 2'

    },
    color_sensor_correction3:{

      id: 'gui.RobboMenu.color_sensor_correction3',
      description: ' ',
      defaultMessage: 'Color sensor correction 3'

    },
    color_sensor_correction4:{

      id: 'gui.RobboMenu.color_sensor_correction4',
      description: ' ',
      defaultMessage: 'Color sensor correction 4'

    },
    color_sensor_correction5:{

      id: 'gui.RobboMenu.color_sensor_correction5',
      description: ' ',
      defaultMessage: 'Color sensor correction 5'

    }
});


class RobboMenu extends Component {


  searchDevices(){

    console.log("searchDevices");


  //  this.DCA.searchAllDevices();



  //  this.RCA.searchRobotDevices();
//    this.LCA.searchLaboratoryDevices();

//    this.QCA.searchQuadcopterDevices();

  }

  stopSearchProcess(){

    console.log("stopSearchProcess");
  //  this.props.stopSearchProcess(this.props.vm.getRCA());

  this.RCA.stopSearchProcess();
  this.LCA.stopSearchProcess();


  }

  stopDataRecievingProcess(){


    console.log("stopDataRecievingProcess");
  //  this.props.stopDataRecievingProcess(this.props.vm.getRCA());

  this.RCA.stopDataRecievingProcess();
  this.LCA.stopDataRecievingProcess();

  }

  triggerExtensionPack(){

    console.log("triggerExtensionPack");
    this.props.onTriggerExtensionPack();


  }

  triggerLabExtSensors(){

    console.log("triggerLabExtSensors");
    this.props.onTriggerLabExtSensors();

  }

  triggerColorCorrectorTable(sensor_caller_id){

    console.log("triggerColorCorrectorTable");
    this.props.onTriggerColorCorrectorTable(sensor_caller_id);

  }

  triggerLogging(){

        console.log("triggerLogging");
        this.DCA.triggerLogging();

  }

  triggerFirmwareFlasher(){


        this.props.onTriggerFirmwareFlasher();

  }

  triggerSettingsWindow(){

    this.props.onTriggerSettingsWindow();

  }

  render() {

//  return this.props.connectDropTarget(

  this.DCA =  this.props.VM.getDCA();
  this.RCA =  this.props.VM.getRCA();
  this.LCA =  this.props.VM.getLCA();

  return (


      <div id="robbo-menu" className={classNames(

                    {[styles.robbo_menu]: true},
                    {[styles.robbo_menu_show]:   this.props.robbo_menu.isShowing},
                    {[styles.robbo_menu_hidden]: !this.props.robbo_menu.isShowing}


                    )}>







          <div id="trigger-extension-pack" onClick={this.triggerExtensionPack.bind(this)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                      )}> {this.props.intl.formatMessage(messages.extension_pack)}  </div>

                        <div id="trigger-lab-ext-sensors" onClick={this.triggerLabExtSensors.bind(this)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                      )}> {this.props.intl.formatMessage(messages.lab_ext_sensors)} </div>

                    <div id="trigger-logging" onClick={this.triggerLogging.bind(this)} className={classNames(

                      {[styles.robbo_menu_item]: true}

                    )}> {this.props.intl.formatMessage(messages.trigger_logging)} </div>

                  <div id="trigger-firmware-flasher" onClick={this.triggerFirmwareFlasher.bind(this)} className={classNames(

                      {[styles.robbo_menu_item]: true}

                    )}> {this.props.intl.formatMessage(messages.trigger_firmware_flasher)} </div>




                  <hr className={styles.hrDevider}/>

          <div id="trigger-color-corrector-table-0" onClick={this.triggerColorCorrectorTable.bind(this,0)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                      )}> {this.props.intl.formatMessage(messages.color_sensor_correction1)} </div>

          <div id="trigger-color-corrector-table-1" onClick={this.triggerColorCorrectorTable.bind(this,1)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                      )}>{this.props.intl.formatMessage(messages.color_sensor_correction2)} </div>

          <div id="trigger-color-corrector-table-2" onClick={this.triggerColorCorrectorTable.bind(this,2)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                      )}>{this.props.intl.formatMessage(messages.color_sensor_correction3)} </div>

          <div id="trigger-color-corrector-table-3" onClick={this.triggerColorCorrectorTable.bind(this,3)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                      )}> {this.props.intl.formatMessage(messages.color_sensor_correction4)} </div>

          <div id="trigger-color-corrector-table-4" onClick={this.triggerColorCorrectorTable.bind(this,4)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                      )}>{this.props.intl.formatMessage(messages.color_sensor_correction5)} </div>


      </div>



  );



}

}

const mapStateToProps =  state => ({


    robbo_menu:state.scratchGui.robbo_menu


  });

const mapDispatchToProps = dispatch => ({


    onTriggerExtensionPack: () => {

        dispatch(ActionTriggerExtensionPack());
      },

      onTriggerLabExtSensors: () => {

          dispatch(ActionTriggerLabExtSensors());
        },


      onTriggerColorCorrectorTable:  (sensor_caller_id) => {

          dispatch(ActionTriggerColorCorrectorTable(sensor_caller_id));
        },

        onTriggerFirmwareFlasher: () => {

            dispatch(ActionTriggerDraggableWindow(3));
          },

        onTriggerSettingsWindow: () => {

              dispatch(ActionTriggerDraggableWindow(4));
            }

});

export default injectIntl(connect(

  mapStateToProps,
  mapDispatchToProps

)(RobboMenu));
