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
        defaultMessage: 'Настройки'
    },
    uno_search_timeout: {
        id: 'gui.RobboGui.uno_search_timeout',
        description: ' ',
        defaultMessage: 'Robbo search timeout'
    },
    fullscreen_interval: {
        id: 'gui.RobboGui.fullscreen_interval',
        description: ' ',
        defaultMessage: 'Интервал выполнения цепочки блоков в полноэкранном режиме (1-500) (в мс): '
    },
    normal_mode_interval: {
        id: 'gui.RobboGui.normal_mode_interval',
        description: ' ',
        defaultMessage: 'Интервал выполнения цепочки блоков в обычном режиме (1-500) (в мс): '
    }, 
    save_settings: {
        id: 'gui.RobboGui.save_settings',
        description: ' ',
        defaultMessage: 'Сохранить настройки '
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

  readSettings(){

    console.warn(`readSettings`);

           return new Promise((resolve,reject)=>{

              function errorHandler(e){
                console.error("File error during settings reading: " + e);
              };

              function onInitFs(fs) {
                 console.log('Opened file system: ' + fs.name);


                 fs.root.getFile("settings" + "." + "json", {create: false}, function(fileEntry) {

                   fileEntry.file(function(file) {
                        var reader = new FileReader();

                        reader.onloadend = function(e) {

                          if ((typeof (this) !== 'undefined') && (typeof(this.result) !== 'undefined')  && (this.result !== null)){


                            console.warn("Read completed for " + "settings" + "." + "json" + " data: " + this.result);

                            let res = {};
                            res.file_exists = true;
                            res.file = this.result;
                            res.err = null;

                            resolve(res);


                          }else{

                            let res = {};

                            res.file_exists = false;
                            res.file = null;
                            res.err = e;

                            resolve(res);


                          }


                        };

                        reader.readAsText(file);
                     });


                 }, function(e){

                   let res = {};

                   res.file_exists = false;
                   res.file = null;
                   res.err = e;

                   resolve(res);

                 });
              };


              
              navigator.webkitPersistentStorage.requestQuota(500*1024*1024,
                 function(grantedBytes){
                    console.log("readSettings byte granted=" + grantedBytes);
                    window.webkitRequestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
                 }, errorHandler
              );

            });

  }

  saveSettings(){

      let settings_data = {};

       var fullscreen_interval_component =  document.getElementById("raw-1-settings-window-content-column-2").children[0];

       settings_data.fullscreen_interval = fullscreen_interval_component.value;

      var normal_mode_interval_component =  document.getElementById("raw-2-settings-window-content-column-2").children[0];

       settings_data.normal_mode_interval =  normal_mode_interval_component.value;


       let settings_data_serialized = JSON.stringify(settings_data);



       let fullscreen_interval =  Math.round(Number(fullscreen_interval_component.value));

       //if ( (isNaN(fullscreen_interval)) || (typeof(fullscreen_interval) === 'undefined')) return;
       if (typeof(fullscreen_interval) !== 'number') return;

       if ((fullscreen_interval > 500) || (fullscreen_interval < 1) ) return;

       this.VM.runtime.setFullscreenInterval(fullscreen_interval);



        let normal_mode_interval =  Math.round(Number(normal_mode_interval_component.value));

     //  if ( (isNaN(normal_mode_interval)) || (typeof(normal_mode_interval) === 'undefined')) return;
      if (typeof(normal_mode_interval) !== 'number') return;

       if ((normal_mode_interval > 500) || (normal_mode_interval < 1) ) return;

       this.VM.runtime.setNormalInterval(normal_mode_interval);


       this.saveSettingsData(settings_data_serialized);



  }

  saveSettingsData(settings_data){

    console.warn("saveSettings" + " data: " + settings_data);



    function errorHandler(e){
            
             console.error("Error during saving settings: " + e);
          };


          function onInitFs(fs) {
             console.log('Opened file system: ' + fs.name);


             fs.root.getFile("settings" + "." + "json", {create: true}, function(fileEntry) {

                fileEntry.createWriter(function(fileWriter) {

                   fileWriter.onwriteend = function(e) {

                      console.log('Settings write completed.');

                     

                   }

                   fileWriter.onerror = function(e) {
                      console.log('Settings writing failed: ' + e.toString());
                   };

                  var bb = new Blob([settings_data]); 
                  fileWriter.write(bb);
                   


                });
             }, errorHandler);
          };


       navigator.webkitPersistentStorage.requestQuota(500*1024*1024, //500Мб
             function(grantedBytes){
                console.log("byte granted=" + grantedBytes);
                window.webkitRequestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
             }, errorHandler
          );

  }

    deleteSettingsFile(){

    var  errorHandler = function(e){
       console.error("File error during removing bad settings file: " + e);
    };

    var _onInitFs = function(fs){

         fs.root.getFile("settings.json", {create: false}, function(fileEntry) {

           fileEntry.remove(() => {

                console.log('File settings.json was removed.');

              }, errorHandler);

      }, errorHandler);

    }


    navigator.webkitPersistentStorage.requestQuota(500*1024*1024,
       function(grantedBytes){
    //      console.log("byte granted=" + grantedBytes);
          window.webkitRequestFileSystem(PERSISTENT, grantedBytes, _onInitFs, errorHandler);
       }, errorHandler);


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

  this.VM = this.props.VM;


    this.readSettings().then((result) => {

       var fullscreen_interval_component =  document.getElementById("raw-1-settings-window-content-column-2").children[0];
       var normal_mode_interval_component =  document.getElementById("raw-2-settings-window-content-column-2").children[0];

         if (result.file_exists){

              try {

                let settings_data =  JSON.parse(result.file);

                let fullscreen_interval = settings_data.fullscreen_interval || this.VM.runtime.getFullscreenInterval();
                let normal_mode_interval = settings_data.normal_mode_interval || this.VM.runtime.getNormalInterval();
  
                 fullscreen_interval_component.value = fullscreen_interval;
                 normal_mode_interval_component.value = normal_mode_interval;

                 this.VM.runtime.setFullscreenInterval(fullscreen_interval);
                 this.VM.runtime.setNormalInterval(fullscreen_interval);

                
              } catch (error) {

                  console.error(error);

                  this.deleteSettingsFile();

              let fullscreen_interval =  this.VM.runtime.getFullscreenInterval();

              fullscreen_interval_component.value = fullscreen_interval;

               let normal_mode_interval =  this.VM.runtime.getNormalInterval();

              normal_mode_interval_component.value = normal_mode_interval;
                
              }

         }else{

               let fullscreen_interval =  this.VM.runtime.getFullscreenInterval();

              fullscreen_interval_component.value = fullscreen_interval;

               let normal_mode_interval =  this.VM.runtime.getNormalInterval();

              normal_mode_interval_component.value = normal_mode_interval;

         }

    });


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

                      {this.props.intl.formatMessage(messages.fullscreen_interval)}

                     </div>

                     <div id="raw-1-settings-window-content-column-2" className={styles.settings_window_content_column}>

                        <input type="number" />

                     </div>


             </div>

             <div id="settings-window-content-raw-2" className={styles.settings_window_content_raw}>

                     <div id="raw-2-settings-window-content-column-1" className={styles.settings_window_content_column}>

                      {this.props.intl.formatMessage(messages.normal_mode_interval)}

                     </div>

                     <div id="raw-2-settings-window-content-column-2" className={styles.settings_window_content_column}>

                         <input type="number" />

                     </div>

             </div>

             <div id="settings-window-content-raw-3" className={styles.settings_window_content_raw}>

                     <div id="raw-3-settings-window-content-column-1" className={styles.settings_window_content_column}>

                      <button onClick={this.saveSettings.bind(this)}> {this.props.intl.formatMessage(messages.save_settings)} </button>

                     </div>

                     <div id="raw-3-settings-window-content-column-2" className={styles.settings_window_content_column}>

                     

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
)(SettingsWindowComponent));
