import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './QuadcopterPalleteComponent.css';
import SensorDataBlockComponent  from './SensorDataBlockComponent'



class QuadcopterPalleteComponent extends Component {




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
