import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';

import styles from  './AboutWindowComponent.css';
import {ActionTriggerNewDraggableWindow,ActionCreateNewDraggableWindow} from './actions/sensor_actions';



const messages = defineMessages({

    about_window: {
        id: 'gui.RobboGui.about_window',
        description: ' ',
        defaultMessage: 'О программе'
    },
    start_profiling: {
        id: 'gui.RobboGui.start_profiling',
        description: ' ',
        defaultMessage: 'Включить измерение производительности'
    },
    stop_profiling: {
        id: 'gui.RobboGui.stop_profiling',
        description: ' ',
        defaultMessage: 'Выключить измерение производительности'
    },
    step_duration: {
        id: 'gui.RobboGui.step_duration',
        description: ' ',
        defaultMessage: 'Время полного выполнения цепочки блоков (в мс): '
    },
    recieve_delta: {
        id: 'gui.RobboGui.recieve_delta',
        description: ' ',
        defaultMessage: 'Задержка между получением полного пакета телеметрии (в мс): '
    },
    os_name_and_version: {
        id: 'gui.RobboGui.os_name_and_version',
        description: ' ',
        defaultMessage: 'Операционная система: '
    },
    arch: {
        id: 'gui.RobboGui.arch',
        description: ' ',
        defaultMessage: 'Разрядность: '
    },
    cpu: {
        id: 'gui.RobboGui.cpu',
        description: ' ',
        defaultMessage: 'Процессор: '
    }

  });

class AboutWindowComponent extends Component {

  constructor(){
  
      super();

     
  
  }


  onThisWindowClose(){

    console.log("aboutWindow close");
    this.props.onAboutWindowClose("about-window");

  }

  componentDidMount(){

      this.VM = this.props.VM;
      this.RCA = this.props.RCA;
      this.DCA = this.props.DCA;

      let os_field = document.getElementById(`raw-5-about-window-content-column-2`);

      getos((e,os) => {
            if(e) return console.error(e);

                 console.warn(os);   
          
            os_field.innerHTML = os.os + " " + ((typeof(node_os.release()) !== 'undefined')?node_os.release():"")  + " " + ((typeof(os.dist) !== 'undefined')?os.dist:"") + " " + ((typeof(os.release) !== 'undefined')?os.release:"");   
            })  

  }

  startProfiling(){

   console.warn(`start profiling`); 

    let time_counter = 0;

    let steps_ids_list = [];

    let average_self_time = 0;
    let average_total_time = 0;

    let self_time_summ = 0;
    let total_time_summ = 0;

    let recieve_time_delta = 0;
    let recieve_time_delta_sum = 0;
    let recieve_time_delta_average = 0;


    let step_time_field = document.getElementById(`raw-3-about-window-content-column-2`);
    let robot_recieve_time_field = document.getElementById(`raw-4-about-window-content-column-2`);


    this.VM.runtime.enableProfiling((frame) => {

            

             let frame_id = this.VM.runtime.profiler.nameById(frame.id);

              if (frame_id == "Runtime._step"){

                time_counter++;

                self_time_summ+= frame.selfTime;
                total_time_summ+= frame.totalTime;

                 recieve_time_delta = this.DCA.getRecieveTimeDelta();
                 recieve_time_delta_sum+= recieve_time_delta;

             

                if (time_counter == 100){

                    average_self_time = (self_time_summ / time_counter).toFixed(7);
                    average_total_time = (total_time_summ / time_counter).toFixed(7);

                    recieve_time_delta_average = ( recieve_time_delta_sum / time_counter).toFixed(7);

                    time_counter = 0;

                    
                    step_time_field.innerHTML = average_total_time;
                    robot_recieve_time_field.innerHTML = recieve_time_delta_average;



                    // profiler_window_average_time_field.innerHTML = `<div>Runtime._step total_time:${average_total_time} self_time: ${average_self_time} </div>
                    //                                                 <div>Recieve time delta: ${recieve_time_delta}</div>
                    //                                                 <div>Recieve time delta average: ${recieve_time_delta_average}</div>`;

                    self_time_summ = 0;
                    total_time_summ = 0;
                    recieve_time_delta_sum = 0;
                }

              }

               //if (frame_id != "Runtime._step") return;

               return;


    });


  }

  stopProfiling(){

     console.warn(`stop profiling`); 

       this.VM.runtime.disableProfiling();

  }

  render() {



  return (

    <div id="about-window" className={styles.about_window}>


          <div id="about-window-tittle" className={styles.about_window_tittle}>

            {this.props.intl.formatMessage(messages.about_window)}

            <div className={styles.close_icon} onClick={this.onThisWindowClose.bind(this)}>


            </div>

          </div>

          <div id="about-window-content" className={styles.about_window_content}>

             <div id="about-window-content-raw-1" className={styles.about_window_content_raw}>

                     <div id="raw-1-about-window-content-column-1" className={styles.about_window_content_column}>

                     Robbo Scratch v.3.19.0

                     </div>

                     <div id="raw-1-about-window-content-column-2" className={styles.about_window_content_column}>

                       

                     </div>


             </div>

             <div id="about-window-content-raw-2" className={styles.about_window_content_raw}>

                     <div id="raw-2-about-window-content-column-1" className={styles.about_window_content_column}>

                      <button id={`about-window-start-profiling`} onClick={this.startProfiling.bind(this)}>{this.props.intl.formatMessage(messages.start_profiling)} </button>

                     </div>

                     <div id="raw-2-about-window-content-column-2" className={styles.about_window_content_column}>

                       <button id={`about-window-stop-profiling`} onClick={this.stopProfiling.bind(this)}>{this.props.intl.formatMessage(messages.stop_profiling)} </button>

                     </div>

             </div>

              <div id="about-window-content-raw-3" className={styles.about_window_content_raw}>

                     <div id="raw-3-about-window-content-column-1" className={styles.about_window_content_column}>

                     {this.props.intl.formatMessage(messages.step_duration)}
                     </div>

                     <div id="raw-3-about-window-content-column-2" className={styles.about_window_content_column}>

                       

                     </div>

             </div>

              <div id="about-window-content-raw-4" className={styles.about_window_content_raw}>

                     <div id="raw-4-about-window-content-column-1" className={styles.about_window_content_column}>

                         {this.props.intl.formatMessage(messages.recieve_delta)}

                     </div>

                     <div id="raw-4-about-window-content-column-2" className={styles.about_window_content_column}>

                       

                     </div>

             </div>



              <div id="about-window-content-raw-5" className={styles.about_window_content_raw}>

                     <div id="raw-5-about-window-content-column-1" className={styles.about_window_content_column}>

                         {this.props.intl.formatMessage(messages.os_name_and_version)}

                     </div>

                     <div id="raw-5-about-window-content-column-2" className={styles.about_window_content_column}>

                       {/*node_process.platform + " " + node_os.release()*/}

                     </div>

             </div>


             <div id="about-window-content-raw-6" className={styles.about_window_content_raw}>

                     <div id="raw-6-about-window-content-column-1" className={styles.about_window_content_column}>

                         {this.props.intl.formatMessage(messages.arch)}

                     </div>

                     <div id="raw-6-about-window-content-column-2" className={styles.about_window_content_column}>

                       {node_process.arch}

                     </div>

             </div>


           <div id="about-window-content-raw-7" className={styles.about_window_content_raw}>

                     <div id="raw-7-about-window-content-column-1" className={styles.about_window_content_column}>

                         {this.props.intl.formatMessage(messages.cpu)}

                     </div>

                     <div id="raw-7-about-window-content-column-2" className={styles.about_window_content_column}>

                       {node_os.cpus()[0].model}

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

  onAboutWindowClose: (window_id) => {

      dispatch(ActionTriggerNewDraggableWindow(window_id));
    },

   createWindow: (top,left,window_id) => {

      ActionCreateNewDraggableWindow(top,left,window_id);
   } 


});





export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutWindowComponent));
