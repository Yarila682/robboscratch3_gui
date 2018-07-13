import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './RobotPalleteComponent.css';
import SensorDataBlockComponent  from './SensorDataBlockComponent';
import SensorComponent from './SensorComponent';

import {ActionRobotGetDataStart} from  './actions/sensor_actions';



class RobotPalleteComponent extends Component {



  startGetDataLoop(){





  }

  componentDidMount(){


    console.log("startRobotGetData");
    this.props.startRobotGetData(0,this.props.RCA);

  }


  render() {



    return (



      <div id="robot-1" className={styles.robot_palette}>


            <div id="robot-tittle" className={styles.robot_panel_tittle}>

                Робот

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


    );


  }


}


const mapStateToProps =  state => ({


  robot_sensors: state.robot_sensors,
  robot_special_sensors: state.robot_special_sensors

  });

const mapDispatchToProps = dispatch => ({

  startRobotGetData: (robot_number,RCA) => {

      dispatch(ActionRobotGetDataStart(robot_number,RCA));

  }

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RobotPalleteComponent);
