import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './LaboratoryPalleteComponent.css';
import SensorDataBlockComponent  from './SensorDataBlockComponent';
import SensorComponent from './SensorComponent';

import {ActionLaboratoryGetDataStart} from  './actions/sensor_actions';



class LaboratoryPalleteComponent extends Component {



  startGetDataLoop(){





  }

  componentDidMount(){


    console.log("startLaboratoryGetData");
    this.props.startLaboratoryGetData(0,this.props.LCA);

  }


  render() {



    return (



      <div id="lab-1" className={styles.lab_palette}>


            <div id="lab-tittle" className={styles.lab_panel_tittle}>

                Лаборатория

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

    );


  }


}


const mapStateToProps =  state => ({


  lab_external_sensors:  state.lab_external_sensors,
  lab_special_sensors:  state.lab_special_sensors,
  laboratories: state.laboratories,
  settings:state.settings

  });

const mapDispatchToProps = dispatch => ({

  startLaboratoryGetData: (robot_number,LCA) => {

      dispatch(ActionLaboratoryGetDataStart(robot_number,LCA));

  }

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaboratoryPalleteComponent);
