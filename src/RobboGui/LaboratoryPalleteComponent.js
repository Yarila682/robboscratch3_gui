import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './LaboratoryPalleteComponent.css';
import SensorDataBlockComponent  from './SensorDataBlockComponent';
import SensorComponent from './SensorComponent';

import {ActionLaboratoryGetDataStart} from  './actions/sensor_actions';

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
    }

  });



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

                {this.props.intl.formatMessage(messages.laboratory)}

            </div>

            {


              (() => {

                let components = [];


                                        this.props.lab_special_sensors.map((sensor, index) =>

                                                    {

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
                                                                      sensorData={sensor.sensor_data}  />


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

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(LaboratoryPalleteComponent));
