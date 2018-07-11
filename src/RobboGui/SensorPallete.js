import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './SensorPallete.css';
import SensorComponent from './SensorComponent';
import SensorDataBlockComponent  from './SensorDataBlockComponent'
import SensorChooseWindowComponent from './SensorChooseWindowComponent';

import QuadcopterPreviewComponent from './QuadcopterPreviewComponent';
import QuadcopterPalleteComponent from './QuadcopterPalleteComponent';
import DraggableWindowComponent from './DraggableWindowComponent';


import {ActionTriggerExtensionPack} from './actions/sensor_actions';
import {ActionTriggerSensorChooseWindow} from './actions/sensor_actions';
import {ActionTriggerSensorsPalette} from './actions/sensor_actions';
import {ActionRobotsConnectionStatusCheckStart} from './actions/sensor_actions';
import {ActionLaboratoriesConnectionStatusCheckStart} from './actions/sensor_actions';
import {ActionRobotGetDataStart} from  './actions/sensor_actions';
import {ActionLaboratoryGetDataStart} from './actions/sensor_actions';



class SensorPallete extends Component {


  componentDidMount () {


      //console.log("triggerSensorsPalette");
      //this.props.startSensorsGetDataLoop();

      console.log("startRobotsConnectionStatusCheck");
      this.props.startRobotsConnectionStatusCheck(0,this.props.RCA);

      console.log("startLaboratoriesConnectionStatusCheck");
      this.props.startLaboratoriesConnectionStatusCheck(0,this.props.LCA);

      console.log("startRobotGetData");
      this.props.startRobotGetData(0);

      console.log("startLaboratoryGetData");
      this.props.startLaboratoryGetData(0);

  }


  triggerSensorsPalette(){

    console.log("triggerSensorsPalette");
    this.props.onTriggerSensorsPalette();

  }

  triggerExtensionPack(){

      console.log("triggerExtensionPack()");
      this.props.onTriggerExtensionPack();

  }

  triggerSensorChooseWindow(){

      console.log("triggerSensorChooseWindow()");
      this.props.onTriggerSensorChooseWindow(0);

  }

  render() {
//  console.log(this.props.tracks);
  return (

      <div id={styles.sensor_pallete}>



          <div id={styles.robot_sensors}>

              <div id="robot-sensors-tittle" className={styles.sensor_panel_tittle} onClick={this.triggerSensorsPalette.bind(this)}>

                  Робот

                  <div id="robot-searching-icon" className={classNames(

                                {[styles.robot_loading_icon]: true},
                                {[styles.robot_loading_icon_hidden]: (/*(this.props.robots[0].robot_connected) || */(!this.props.robots[0].robot_is_searching))},
                                {[styles.robot_loading_icon_showing]: ((this.props.robots[0].robot_is_searching) /*&& (!this.props.robots[0].robot_connected)*/)}
                                  )}>


                  </div>

                 <div id="robot-connection-status" className={classNames(

                               {[styles.robot_connection_status]: true},
                               {[styles.robot_status_connected]: this.props.robots[0].robot_connected},
                               {[styles.robot_status_disconnected]: !this.props.robots[0].robot_connected}


                               )}>

                                {

                                    (this.props.robots[0].robot_connected)? "Подключено": "Отключено"

                                }

                 </div>


              </div>

                <SensorDataBlockComponent key={this.props.robot_special_sensors[0].sensor_id} sensorId={this.props.robot_special_sensors[0].sensor_id}
                                   deviceName={this.props.robot_special_sensors[0].sensor_device_name} sensorType={this.props.robot_special_sensors[0].sensor_type}
                                   sensorFieldText={this.props.robot_special_sensors[0].sensor_field_text}
                                   sensorName={this.props.robot_special_sensors[0].sensor_name}
                                    sensorData={this.props.robot_special_sensors[0].sensor_data} />

                <SensorDataBlockComponent key={this.props.robot_special_sensors[1].sensor_id} sensorId={this.props.robot_special_sensors[1].sensor_id}
                                                      deviceName={this.props.robot_special_sensors[1].sensor_device_name} sensorType={this.props.robot_special_sensors[1].sensor_type}
                                                      sensorFieldText={this.props.robot_special_sensors[1].sensor_field_text}
                                                      sensorName={this.props.robot_special_sensors[1].sensor_name}
                                                      sensorData={this.props.robot_special_sensors[1].sensor_data} />

            {


                  this.props.robot_sensors.map((sensor, index) =>

                     {

                       let sensorPictureUrl = `./static/robbo_assets/16/${sensor.sensor_device_name}_sensor_${sensor.sensor_name}.png`;



                       return   <SensorComponent key={index} index={index} sensorId={sensor.sensor_id} isSensorVersionNew={sensor.is_sensor_version_new}
                                   sensorPictureUrl={sensorPictureUrl}
                                   deviceName={sensor.sensor_device_name} sensorType={sensor.sensor_type}
                                   sensorFieldText={sensor.sensor_field_text} sensorName={sensor.sensor_name}
                                   sensorData={sensor.sensor_data} />



                     }

                 )




            }


            <SensorDataBlockComponent key={this.props.robot_special_sensors[2].sensor_id} sensorId={this.props.robot_special_sensors[2].sensor_id}
                               deviceName={this.props.robot_special_sensors[2].sensor_device_name} sensorType={this.props.robot_special_sensors[2].sensor_type}
                               sensorFieldText={this.props.robot_special_sensors[2].sensor_field_text}
                               sensorName={this.props.robot_special_sensors[2].sensor_name}
                               sensorData={this.props.robot_special_sensors[2].sensor_data} />

          </div>

        <div id={styles.laboratory_sensors}>

            <div id="laboratory-sensors-tittle" className={styles.sensor_panel_tittle}>Лаборатория

              <div id="laboratory-searching-icon" className={classNames(

                            {[styles.laboratory_loading_icon]: true},
                            {[styles.laboratory_loading_icon_hidden]: (/*( this.props.laboratories[0].laboratory_connected) ||*/ (!this.props.laboratories[0].laboratory_is_searching))},
                            {[styles.laboratory_loading_icon_showing]: ((this.props.laboratories[0].laboratory_is_searching) /* && (!this.props.laboratories[0].laboratory_connected)*/)}
                              )}>


              </div>

              <div id="laboratory-connection-status" className={classNames(

                            {[styles.laboratory_connection_status]: true},
                            {[styles.laboratory_status_connected]: this.props.laboratories[0].laboratory_connected},
                            {[styles.laboratory_status_disconnected]: !this.props.laboratories[0].laboratory_connected}


                            )}>

                             {

                                 (this.props.laboratories[0].laboratory_connected)? "Подключено": "Отключено"

                             }

              </div>


            </div>

            {


              (() => {

                let components = [];


                                        this.props.lab_special_sensors.map((sensor, index) =>

                                                    {

                                                  components.push(<SensorDataBlockComponent key={sensor.sensor_id} sensorId={sensor.sensor_id}
                                                                      deviceName={sensor.sensor_device_name} sensorType={sensor.sensor_type}
                                                                      sensorFieldText={sensor.sensor_field_text}  sensorName={sensor.sensor_name}
                                                                      sensorData={sensor.sensor_data}  />


                                                                  );



                                                     }

                                                                              );


                                          if (this.props.settings.is_lab_ext_enabled){

                                          this.props.lab_external_sensors.map((sensor, index) =>

                                             {



                                               let sensorPictureUrl = `./static/robbo_assets/16/${sensor.sensor_device_name}_sensor_${sensor.sensor_name}.png`;



                                               components.push(<SensorComponent key={index} index={index} sensorId={sensor.sensor_id} isSensorVersionNew={sensor.is_sensor_version_new}
                                                           sensorPictureUrl={sensorPictureUrl}
                                                           deviceName={sensor.sensor_device_name} sensorType={sensor.sensor_type}
                                                           sensorFieldText={sensor.sensor_field_text} sensorName={sensor.sensor_name}
                                                           sensorData={sensor.sensor_data} />);



                                             }

                                                                              )

                                                            }



                return (

                        components

                        );
                      }
              )()





            }


          </div>



        <QuadcopterPreviewComponent QCA={this.props.QCA} quadcopterIndex={0} />


        <DraggableWindowComponent draggableWindowId={0}>

              <QuadcopterPalleteComponent QCA={this.props.QCA} quadcopterIndex={0}/>

        </DraggableWindowComponent>




      </div>
  );
}

}

const mapStateToProps =  state => ({

      robot_sensors: state.robot_sensors,
      lab_external_sensors:  state.lab_external_sensors,
      robot_special_sensors: state.robot_special_sensors,
      lab_special_sensors:  state.lab_special_sensors,
      sensors_choose_window: state.sensors_choose_window,
      robots:state.robots,
      laboratories: state.laboratories,
      settings:state.settings
  });

const mapDispatchToProps = dispatch => ({

  onTriggerExtensionPack: () => {

      dispatch(ActionTriggerExtensionPack());
    },

  onTriggerSensorChooseWindow: (sensor_caller_id) => {

         dispatch(ActionTriggerSensorChooseWindow(sensor_caller_id));
       },

  onTriggerSensorsPalette: () => {

           dispatch(ActionTriggerSensorsPalette());
         },

  startRobotsConnectionStatusCheck: (robot_number,RCA) => {

       dispatch(ActionRobotsConnectionStatusCheckStart(robot_number,RCA));

  },

  startLaboratoriesConnectionStatusCheck: (laboratory_number,LCA) => {

       dispatch(ActionLaboratoriesConnectionStatusCheckStart(laboratory_number,LCA));

  },

  startRobotGetData: (robot_number) => {

      dispatch(ActionRobotGetDataStart(robot_number));

  },

  startLaboratoryGetData: (laboratory_number) => {

      dispatch(ActionLaboratoryGetDataStart(laboratory_number));

  }


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SensorPallete);
