import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SensorPallete from './SensorPallete';
import SensorPaletteCollapsed from './SensorPaletteCollapsed';
import { ItemTypes } from './drag_constants';
import { DropTarget } from 'react-dnd';
import SensorChooseWindowComponent from './SensorChooseWindowComponent';
//import {ActionTriggerSensorsPalette} from './actions/sensor_actions';
import styles from './RobboGui.css'


// const Target = {
//   drop(props,monitor) {
//
//     let coords = monitor.getClientOffset();
//
//     props.onSensorChooseWindowDrop(coords.y, coords.x);
//   }
// };
//
//
// const  collect = (connect, monitor) =>  ({
//
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver()
//
// });

class RobboGui extends Component {




  render() {

//  return this.props.connectDropTarget(

  return (

    <div className={classNames(

                  {[styles.robbo_gui]: true},
                  {[styles.content_collapsed]: this.props.sensorsPalette.sensors_pallete_collapsed},
                  {[styles.content_expand]:    !this.props.sensorsPalette.sensors_pallete_collapsed}


                  )}>

         {
              (!this.props.sensorsPalette.sensors_pallete_collapsed)?  <SensorPallete />: <SensorPaletteCollapsed />


         }


          <SensorChooseWindowComponent key="SensorChooseWindowComponent" isShowing={this.props.sensorsChooseWindow.sensors_choose_window_showing}
           top={this.props.sensorsChooseWindow.sensors_choose_window_drag_top} left={this.props.sensorsChooseWindow.sensors_choose_window_drag_left}
           CallerSensorId={this.props.sensorsChooseWindow.sensors_choose_window_sensor_caller}
           SensorCallerDeviceName={this.props.sensorsChooseWindow.sensors_choose_window_sensor_caller_device_name}
           CallerSensorType={this.props.sensorsChooseWindow.sensors_choose_window_sensor_caller_type}/>


    </div>
  );
//  );
};

};



const mapStateToProps =  state => ({


  sensorsChooseWindow: state.sensors_choose_window,
  sensorsPalette: state.sensors_palette


  });

const mapDispatchToProps = dispatch => ({

  // onSensorChooseWindowDrop: (top,left) => {
  //
  //     dispatch(ActionDropSensorChooseWindow(top,left));
  //   }


  // onTriggerSensorsPalette: () => {
  //
  //     dispatch(ActionTriggerSensorsPalette());
  //   }


});


// RobboGui.propTypes = {
//   connectDropTarget: PropTypes.func.isRequired,
//   isOver: PropTypes.bool.isRequired,
//
// };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RobboGui);

// export default connect(
//         mapStateToProps,
//         mapDispatchToProps
//
//     ) (DropTarget(ItemTypes.SENSOR_CHOOSE_WINDOW, Target, collect)(RobboGui));
