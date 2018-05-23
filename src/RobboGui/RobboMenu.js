import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './RobboMenu.css';
import classNames from 'classnames';
import {ActionTriggerExtensionPack} from './actions/sensor_actions';
import {ActionTriggerLabExtSensors} from  './actions/sensor_actions';
import {ActionTriggerColorCorrectorTable} from './actions/sensor_actions';


class RobboMenu extends Component {


  searchDevices(){

    console.log("searchDevices");


    this.DCA.searchAllDevices();



    this.RCA.searchRobotDevices();
    this.LCA.searchLaboratoryDevices();

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




          <div id="stop-search-process" onClick={this.stopSearchProcess.bind(this)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                          )}> Stop searching  </div>

          <div id="stop-data-recieve"   onClick={this.stopDataRecievingProcess.bind(this)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                          )}> Stop data recieve  </div>


          <div id="trigger-extension-pack" onClick={this.triggerExtensionPack.bind(this)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                          )}> Trigger extension pack  </div>

                        <div id="trigger-lab-ext-sensors" onClick={this.triggerLabExtSensors.bind(this)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                      )}> Laboratory external sensors </div>


                    <hr/> 

          <div id="trigger-color-corrector-table-0" onClick={this.triggerColorCorrectorTable.bind(this,0)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                          )}> Trigger color corrector table for sensor 1 </div>

          <div id="trigger-color-corrector-table-1" onClick={this.triggerColorCorrectorTable.bind(this,1)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                          )}> Trigger color corrector table for sensor 2 </div>

          <div id="trigger-color-corrector-table-2" onClick={this.triggerColorCorrectorTable.bind(this,2)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                          )}> Trigger color corrector table for sensor 3 </div>

          <div id="trigger-color-corrector-table-3" onClick={this.triggerColorCorrectorTable.bind(this,3)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                          )}> Trigger color corrector table for sensor 4 </div>

          <div id="trigger-color-corrector-table-4" onClick={this.triggerColorCorrectorTable.bind(this,4)} className={classNames(

                        {[styles.robbo_menu_item]: true}

                          )}> Trigger color corrector table for sensor 5 </div>


      </div>



  );



}

}

const mapStateToProps =  state => ({


    robbo_menu: state.robbo_menu


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
        }

});

export default connect(

  mapStateToProps,
  mapDispatchToProps

)(RobboMenu);
