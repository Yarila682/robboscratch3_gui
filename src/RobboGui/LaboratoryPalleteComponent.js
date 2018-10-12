import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './LaboratoryPalleteComponent.css';
import SensorDataBlockComponent  from './SensorDataBlockComponent';
import SensorComponent from './SensorComponent';

import {ActionLaboratoryGetDataStart} from  './actions/sensor_actions';
import {ActionTriggerDraggableWindow} from './actions/sensor_actions'

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';



const messages = defineMessages({

    button: {
        id: 'gui.RobboGui.LaboratoryPalette.button',
        description: ' ',
        defaultMessage: 'Button '
    },

    light: {
        id: 'gui.RobboGui.LaboratoryPalette.light',
        description: ' ',
        defaultMessage: 'Light: '
    },

    sound: {
        id: 'gui.RobboGui.LaboratoryPalette.sound',
        description: ' ',
        defaultMessage: 'Sound: '
    },

    slider: {
        id: 'gui.RobboGui.LaboratoryPalette.slider',
        description: ' ',
        defaultMessage: 'Slider: '
    },
    analog: {
        id: 'gui.RobboGui.LaboratoryPalette.analog',
        description: ' ',
        defaultMessage: 'Analog '
    },
    digital: {
        id: 'gui.RobboGui.LaboratoryPalette.digital',
        description: ' ',
        defaultMessage: 'Digital: '
    },
    laboratory: {
        id: 'gui.RobboGui.LaboratoryPalette.laboratory',
        description: ' ',
        defaultMessage: 'Laboratory'
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



class LaboratoryPalleteComponent extends Component {



  startGetDataLoop(){





  }


  shouldComponentUpdate (nextProps, nextState) {
      return (

        this.props.draggable_window[2].isShowing !== false

      );
  }

  componentDidMount(){


    console.log("startLaboratoryGetData");
  //  this.props.startLaboratoryGetData(0,this.props.LCA);

  }

  onThisWindowClose(){

    console.log("LaboartoryPalette close");
    this.props.onLaboratoryPaletteWindowClose(2);

  }


  render() {



    return (



      <div id="lab-1" className={styles.lab_palette}>


            <div id="lab-tittle" className={styles.lab_panel_tittle}>

                {this.props.intl.formatMessage(messages.laboratory)}

                  <div className={styles.close_icon} onClick={this.onThisWindowClose.bind(this)}>

                  </div>

            </div>

            {


              (() => {

                let components = [];


                                        this.props.lab_special_sensors.map((sensor, index) =>

                                                    {

                                                      let sensor_data =- "";

                                                      if (sensor.sensor_data == "false"){

                                                        sensor_data = this.props.intl.formatMessage(messages.false)

                                                      }else if (sensor.sensor_data == "true"){

                                                          sensor_data = this.props.intl.formatMessage(messages.true)

                                                      }else{

                                                          sensor_data = sensor.sensor_data;

                                                      }

                                                        let field_text = "";

                                                      if (index < 5){

                                                          field_text  = this.props.intl.formatMessage(messages.button) + " "  + (index + 1).toString() + ": ";

                                                      }

                                                      switch (index) {
                                                        case 5:

                                                              field_text  = this.props.intl.formatMessage(messages.light);


                                                          break;

                                                          case 6:

                                                                field_text  = this.props.intl.formatMessage(messages.sound);


                                                            break;

                                                          case 7:

                                                                  field_text  = this.props.intl.formatMessage(messages.slider);


                                                              break;

                                                        default:

                                                      }


                                                  components.push(<SensorDataBlockComponent key={sensor.sensor_id} sensorId={sensor.sensor_id}
                                                                      deviceName={sensor.sensor_device_name} sensorType={sensor.sensor_type}
                                                                      sensorFieldText={field_text}  sensorName={sensor.sensor_name}
                                                                      sensorData={sensor_data}  />


                                                                  );



                                                     }

                                                                              );


                                          if (this.props.settings.is_lab_ext_enabled){

                                          this.props.lab_external_sensors.map((sensor, index) =>

                                             {

                                                  let field_text = "";

                                               let sensorPictureUrl = `./static/robbo_assets/16/${sensor.sensor_device_name}_sensor_${sensor.sensor_name}.png`;


                                               if (index < 2){

                                                   field_text  = this.props.intl.formatMessage(messages.analog) + " "  + (index + 1).toString() + ": ";

                                               }

                                               switch (index) {
                                                 case 2:

                                                       field_text  = this.props.intl.formatMessage(messages.digital);


                                                   break;


                                                 default:

                                               }


                                               components.push(<SensorComponent key={index} index={index} sensorId={sensor.sensor_id} isSensorVersionNew={sensor.is_sensor_version_new}
                                                           sensorPictureUrl={sensorPictureUrl}
                                                           deviceName={sensor.sensor_device_name} sensorType={sensor.sensor_type}
                                                           sensorFieldText={field_text} sensorName={sensor.sensor_name}
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


  lab_external_sensors:state.scratchGui.lab_external_sensors,
  lab_special_sensors:state.scratchGui.lab_special_sensors,
  laboratories:state.scratchGui.laboratories,
  settings:state.scratchGui.settings,
  draggable_window:state.scratchGui.draggable_window

  });

const mapDispatchToProps = dispatch => ({

  startLaboratoryGetData: (robot_number,LCA) => {

      dispatch(ActionLaboratoryGetDataStart(robot_number,LCA));

  },


  onLaboratoryPaletteWindowClose: () => {

      dispatch(ActionTriggerDraggableWindow(2));
    }

});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(LaboratoryPalleteComponent));
