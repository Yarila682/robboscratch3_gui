import React, { Component } from 'react';
import { connect } from 'react-redux';
import SensorPallete from './SensorPallete';
import { ItemTypes } from './drag_constants';
import { DropTarget } from 'react-dnd';
import SensorChooseWindowComponent from './SensorChooseWindowComponent';
import {ActionDropSensorChooseWindow} from './actions/sensor_actions';
import styles from './RobboGui.css'


const Target = {
  drop(props,monitor) {

    let coords = monitor.getClientOffset();

    props.onSensorChooseWindowDrop(coords.y, coords.x);
  }
};


const  collect = (connect, monitor) =>  ({

    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()

});

class RobboGui extends Component {




  render() {

  return this.props.connectDropTarget(

    <div className={styles.robbo_gui}>

          <SensorPallete />
          <SensorChooseWindowComponent key="SensorChooseWindowComponent" isShowing={this.props.sensorsChooseWindow.sensors_choose_window_showing}
           top={this.props.sensorsChooseWindow.sensors_choose_window_drag_top} left={this.props.sensorsChooseWindow.sensors_choose_window_drag_left}
           CallerSensorId={this.props.sensorsChooseWindow.sensors_choose_window_sensor_caller}
           SensorCallerDeviceName={this.props.sensorsChooseWindow.sensors_choose_window_sensor_caller_device_name}
           CallerSensorType={this.props.sensorsChooseWindow.sensors_choose_window_sensor_caller_type}/>


    </div>
  );
};

};



const mapStateToProps =  state => ({


  sensorsChooseWindow: state.sensors_choose_window

  });

const mapDispatchToProps = dispatch => ({

  onSensorChooseWindowDrop: (top,left) => {

      dispatch(ActionDropSensorChooseWindow(top,left));
    }
});


// RobboGui.propTypes = {
//   connectDropTarget: PropTypes.func.isRequired,
//   isOver: PropTypes.bool.isRequired,
//
// };


// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

export default connect(
        mapStateToProps,
        mapDispatchToProps

    ) (DropTarget(ItemTypes.SENSOR_CHOOSE_WINDOW, Target, collect)(RobboGui));
