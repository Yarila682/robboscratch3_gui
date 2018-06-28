import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './QuadcopterPalleteComponent.css';
import SensorDataBlockComponent  from './SensorDataBlockComponent'



class QuadcopterPalleteComponent extends Component {



  startGetDataLoop(){


    var battery_sensor_component = document.getElementById(`quadcopter_sensor-data-block-copter-${this.props.quadcopterIndex}-battery-level_type-analog`);

    var battery_sensor_value_field = battery_sensor_component.children[0].children[1].children[0];


    var x_coord_sensor_component = document.getElementById(`quadcopter_sensor-data-block-copter-${this.props.quadcopterIndex}-coord-x_type-analog`);

    var x_coord_sensor_value_field = x_coord_sensor_component.children[0].children[1].children[0];



    var y_coord_sensor_component = document.getElementById(`quadcopter_sensor-data-block-copter-${this.props.quadcopterIndex}-coord-y_type-analog`);

    var y_coord_sensor_value_field = y_coord_sensor_component.children[0].children[1].children[0];


    var z_coord_sensor_component = document.getElementById(`quadcopter_sensor-data-block-copter-${this.props.quadcopterIndex}-coord-z_type-analog`);

    var z_coord_sensor_value_field  = z_coord_sensor_component.children[0].children[1].children[0];



    var getDataLoopInterval = setInterval(() => {

          battery_sensor_value_field.innerHTML = this.props.QCA.get_battery_level();

          x_coord_sensor_value_field.innerHTML = this.props.QCA.get_coord("X");

          y_coord_sensor_value_field.innerHTML = this.props.QCA.get_coord("Y");

          z_coord_sensor_value_field.innerHTML = this.props.QCA.get_coord("Z");


    },50);



  }

  componentDidMount(){


      this.startGetDataLoop();

  }


  render() {



    return (

          <div id="quadcopter-1" className={styles.quadcopter_palette}>


                <div id="quadcopter-tittle" className={styles.quadcopter_panel_tittle}>

                    Quadcopter

                </div>

                <SensorDataBlockComponent key={`copter-${this.props.quadcopterIndex}-battery-level`} sensorId={`copter-${this.props.quadcopterIndex}-battery-level`}
                                   deviceName={`quadcopter`} sensorType={`analog`}
                                   sensorFieldText={`Battery level: `}
                                   sensorName={`battery-level`}
                                   sensorData={`---`} />

               <SensorDataBlockComponent key={`copter-${this.props.quadcopterIndex}-coord-x`} sensorId={`copter-${this.props.quadcopterIndex}-coord-x`}
                                                      deviceName={`quadcopter`} sensorType={`analog`}
                                                      sensorFieldText={`X coord: `}
                                                      sensorName={`coord-x`}
                                                      sensorData={`0`} />

              <SensorDataBlockComponent key={`copter-${this.props.quadcopterIndex}-coord-y`} sensorId={`copter-${this.props.quadcopterIndex}-coord-y`}
                                                                                             deviceName={`quadcopter`} sensorType={`analog`}
                                                                                             sensorFieldText={`Y coord: `}
                                                                                             sensorName={`coord-y`}
                                                                                             sensorData={`0`} />

            <SensorDataBlockComponent key={`copter-${this.props.quadcopterIndex}-coord-z`} sensorId={`copter-${this.props.quadcopterIndex}-coord-z`}
                                                                                            deviceName={`quadcopter`} sensorType={`analog`}
                                                                                            sensorFieldText={`Z coord: `}
                                                                                            sensorName={`coord-z`}
                                                                                            sensorData={`0`} />


          </div>



    );


  }


}


const mapStateToProps =  state => ({


  });

const mapDispatchToProps = dispatch => ({



});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuadcopterPalleteComponent);
