import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './RobotPalleteComponent.css';
import SensorDataBlockComponent  from './SensorDataBlockComponent';
import SensorComponent from './SensorComponent';

import {ActionRobotGetDataStart} from  './actions/sensor_actions';
import {ActionTriggerDraggableWindow} from './actions/sensor_actions';

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';



const messages = defineMessages({

    sensor: {
        id: 'gui.RobboGui.RobotPalette.sensor',
        description: ' ',
        defaultMessage: 'Sensor '
    },

    path_left: {
        id: 'gui.RobboGui.RobotPalette.path_left',
        description: ' ',
        defaultMessage: 'Path left: '
    },

    path_right: {
        id: 'gui.RobboGui.RobotPalette.path_right',
        description: ' ',
        defaultMessage: 'Path right: '
    },

    start_button_pushed: {
        id: 'gui.RobboGui.RobotPalette.start_button_pushed',
        description: ' ',
        defaultMessage: 'Start button pushed: '
    },
    robot: {
        id: 'gui.RobboGui.RobotPalette.robot',
        description: ' ',
        defaultMessage: 'Robot'
    },
    true: {
        id: 'gui.RobboGui.true',
        description: ' ',
        defaultMessage: 'true'
    },
    false: {
        id: 'gui.RobboGui.false',
        description: ' ',
        defaultMessage: 'false'
    }

  });


class RobotPalleteComponent extends Component {



  startGetDataLoop(){





  }

  shouldComponentUpdate (nextProps, nextState) {
      return (

        this.props.draggable_window[1].isShowing !== false


      );
  }

  componentDidMount(){


    console.log("startRobotGetData");
    this.props.startRobotGetData(0,this.props.RCA);

  }


  onThisWindowClose(){

    console.log("RobotPalette close");
    this.props.onRobotPaletteWindowClose(1);

  }

  render() {

  let sensor_data = "";

  if (this.props.robot_special_sensors[2].sensor_data == "false"){

    sensor_data = this.props.intl.formatMessage(messages.false);

  }else if (this.props.robot_special_sensors[2].sensor_data == "true"){

      sensor_data = this.props.intl.formatMessage(messages.true);

  }else{

    //  sensor_data =this.props.robot_special_sensors[2].sensor_data;

    sensor_data = this.props.intl.formatMessage(messages.false);

  }


    return (



      <div id="robot-1" className={styles.robot_palette}>


            <div id="robot-tittle" className={styles.robot_panel_tittle}>

              {this.props.intl.formatMessage(messages.robot)}

              <div className={styles.close_icon} onClick={this.onThisWindowClose.bind(this)}>


              </div>

            </div>

            <SensorDataBlockComponent key={this.props.robot_special_sensors[0].sensor_id} sensorId={this.props.robot_special_sensors[0].sensor_id}
                               deviceName={this.props.robot_special_sensors[0].sensor_device_name} sensorType={this.props.robot_special_sensors[0].sensor_type}
                               sensorFieldText={this.props.intl.formatMessage(messages.path_left)}
                               sensorName={this.props.robot_special_sensors[0].sensor_name}
                                sensorData={this.props.robot_special_sensors[0].sensor_data} />

            <SensorDataBlockComponent key={this.props.robot_special_sensors[1].sensor_id} sensorId={this.props.robot_special_sensors[1].sensor_id}
                                                  deviceName={this.props.robot_special_sensors[1].sensor_device_name} sensorType={this.props.robot_special_sensors[1].sensor_type}
                                                  sensorFieldText={this.props.intl.formatMessage(messages.path_right)}
                                                  sensorName={this.props.robot_special_sensors[1].sensor_name}
                                                  sensorData={this.props.robot_special_sensors[1].sensor_data} />

        {


              this.props.robot_sensors.map((sensor, index) =>

                 {

                   let sensorPictureUrl = `./static/robbo_assets/16/${sensor.sensor_device_name}_sensor_${sensor.sensor_name}.png`;

                    let field_text  = this.props.intl.formatMessage(messages.sensor) + " "  + (index + 1).toString() + ": ";

                   return   <SensorComponent key={index} index={index} sensorId={sensor.sensor_id} isSensorVersionNew={sensor.is_sensor_version_new}
                               sensorPictureUrl={sensorPictureUrl}
                               deviceName={sensor.sensor_device_name} sensorType={sensor.sensor_type}
                               sensorFieldText={field_text} sensorName={sensor.sensor_name}
                               sensorData={sensor.sensor_data} />



                 }

             )




        }


        <SensorDataBlockComponent key={this.props.robot_special_sensors[2].sensor_id} sensorId={this.props.robot_special_sensors[2].sensor_id}
                           deviceName={this.props.robot_special_sensors[2].sensor_device_name} sensorType={this.props.robot_special_sensors[2].sensor_type}
                           sensorFieldText={this.props.intl.formatMessage(messages.start_button_pushed)}
                           sensorName={this.props.robot_special_sensors[2].sensor_name}
                           sensorData={sensor_data} />

      </div>


    );


  }


}


const mapStateToProps =  state => ({


  robot_sensors:state.scratchGui.robot_sensors,
  robot_special_sensors:state.scratchGui.robot_special_sensors,
  draggable_window:state.scratchGui.draggable_window

  });

const mapDispatchToProps = dispatch => ({

  startRobotGetData: (robot_number,RCA) => {

      dispatch(ActionRobotGetDataStart(robot_number,RCA));

  },

  onRobotPaletteWindowClose: () => {

      dispatch(ActionTriggerDraggableWindow(1));
    }

});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(RobotPalleteComponent));
