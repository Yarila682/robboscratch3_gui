import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './SensorComponent.css'
import CommonFieldsSensorComponent from './CommonFieldsSensorComponent';


class OldVersionSensorComponent extends Component {


  render() {

      return  (




        <div>

            <CommonFieldsSensorComponent NameFieldText={`${this.props.fieldText}`} sensorId={this.props.sensorId} />

            <div className={styles.sensor_block_field}>

                <input type="checkbox" />

            </div>


        </div>








              );
}

}



export default OldVersionSensorComponent;
