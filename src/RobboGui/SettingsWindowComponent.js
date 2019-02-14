import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';

import styles from  './SettingsWindowComponent.css';
import {ActionTriggerDraggableWindow} from './actions/sensor_actions';


const messages = defineMessages({

    settings_window: {
        id: 'gui.RobboGui.settings_window',
        description: ' ',
        defaultMessage: 'Settings'
    },
    uno_search_timeout: {
        id: 'gui.RobboGui.uno_search_timeout',
        description: ' ',
        defaultMessage: 'Robbo search timeout'
    }

  });

class SettingsWindowComponent extends Component {

  // constructor(){
  //
  //     super();
  //
  // }


  onThisWindowClose(){

    console.log("SettingsWindow close");
    this.props.onSettingsWindowClose(4);

  }

  componentDidMount(){

  //   try {
  //
  //       const data = node_fs.readFileSync('settings.json')
  //       console.log(data.toString());
  //
  //       try {
  //
  //           let json = JSON.parse(data);
  //
  //           if (typeof(json) !== 'undefined'){
  //
  //                 this.NO_RESPONSE_TIME = Math.floor(Number(json.device_response_timeout))||3000;
  //                 this.NO_START_TIMEOUT = Math.floor(Number(json.device_no_start_timeout))||1000;
  //                 this.UNO_TIMEOUT      = Math.floor(Number(json.device_uno_timeout))||3000;
  //
  //                 console.warn(`NO_RESPONSE_TIME: ${this.NO_RESPONSE_TIME}  NO_START_TIMEOUT: ${this.NO_START_TIMEOUT} UNO_TIMEOUT: ${this.UNO_TIMEOUT}`);
  //
  //                 var uno_timeout_component =  document.getElementById("raw-1-settings-window-content-column-2").children[0];
  //
  //                 uno_timeout_component.value = this.UNO_TIMEOUT;
  //           }
  //
  //
  //
  //       } catch (e) {
  //
  //           console.error(e)
  //       }
  //
  //
  //
  // } catch (err) {
  //
  //     console.error(err)
  //
  // }

  }

  render() {



  return (

    <div id="settings-window" className={styles.settings_window}>


          <div id="settings-window-tittle" className={styles.settings_window_tittle}>

            {this.props.intl.formatMessage(messages.settings_window)}

            <div className={styles.close_icon} onClick={this.onThisWindowClose.bind(this)}>


            </div>

          </div>

          <div id="settings-window-content" className={styles.settings_window_content}>

             <div id="settings-window-content-raw-1" className={styles.settings_window_content_raw}>

                     <div id="raw-1-settings-window-content-column-1" className={styles.settings_window_content_column}>

                      {this.props.intl.formatMessage(messages.uno_search_timeout)}

                     </div>

                     <div id="raw-1-settings-window-content-column-2" className={styles.settings_window_content_column}>

                        <input type="number" />

                     </div>


             </div>

             <div id="settings-window-content-raw-2" className={styles.settings_window_content_raw}>

                     <div id="raw-2-settings-window-content-column-1" className={styles.settings_window_content_column}>

                      test

                     </div>

                     <div id="raw-2-settings-window-content-column-2" className={styles.settings_window_content_column}>

                      test

                     </div>

             </div>

          </div>


      </div>


  )

};


}

const mapStateToProps =  state => ({





  });

const mapDispatchToProps = dispatch => ({

  onSettingsWindowClose: () => {

      dispatch(ActionTriggerDraggableWindow(4));
    }


});





export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert()(SettingsWindowComponent)));
