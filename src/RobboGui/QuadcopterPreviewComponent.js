import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './QuadcopterPreviewComponent.css'
import {ActionTriggerDraggableWindow} from './actions/sensor_actions'



class QuadcopterPreviewComponent extends Component {



  startQuadcopterConnectionStatusCheck(){


      var copter_searching_icon;
      var copter_connection_status;

       setInterval(function(self){

          self.isQuadcopterConnected      =    self.props.QCA.isQuadcopterConnected();
          self.quadcopter_is_searching    =    self.props.QCA.isQuadcopterSearching();

           copter_searching_icon = document.getElementById(`quadcopter-${self.props.quadcopterIndex}-searching-icon`);

          if (self.quadcopter_is_searching){




             copter_searching_icon.classList.remove(styles.quadcopter_loading_icon_hidden);
             copter_searching_icon.classList.remove(styles.quadcopter_loading_icon_showing);
             copter_searching_icon.classList.add(styles.quadcopter_loading_icon_showing);


          }else{


            copter_searching_icon.classList.remove(styles.quadcopter_loading_icon_hidden);
            copter_searching_icon.classList.remove(styles.quadcopter_loading_icon_showing);
            copter_searching_icon.classList.add(styles.quadcopter_loading_icon_hidden);


          }

          copter_connection_status = document.getElementById(`quadcopter-${self.props.quadcopterIndex}-connection-status`);

          if (self.isQuadcopterConnected){




             copter_connection_status.classList.remove(styles.quadcopter_status_connected);
             copter_connection_status.classList.remove(styles.quadcopter_status_disconnected);
             copter_connection_status.classList.add(styles.quadcopter_status_connected);

          }else{


            copter_connection_status.classList.remove(styles.quadcopter_status_disconnected);
            copter_connection_status.classList.remove(styles.quadcopter_status_connected);
            copter_connection_status.classList.add(styles.quadcopter_status_disconnected);


          }





       },30,this);



  }

  componentDidMount () {

      this.isQuadcopterConnected = false;
      this.quadcopter_is_searching = false;

      this.startQuadcopterConnectionStatusCheck();

  }




  render() {



    return (

          <div id={`quadcopter-preview-${this.props.quadcopterIndex}`} className={styles.quadcopterPreview} onClick={this.props.onTriggerQuadcopterPallete}>


                <div id={`quadcopter-${this.props.quadcopterIndex}-preview-pic`}  className={styles.quadcopterPreviewPic} >



                </div>

                <div id={`quadcopter-${this.props.quadcopterIndex}-searching-icon`} className={classNames(

                              {[styles.quadcopter_loading_icon]: true},
                              {[styles.quadcopter_loading_icon_hidden]: (/*(this.props.robots[0].robot_connected) || */(!this.quadcopter_is_searching))},
                              {[styles.quadcopter_loading_icon_showing]: ((this.quadcopter_is_searching) /*&& (!this.props.robots[0].robot_connected)*/)}
                                )}>


                </div>


                <div id={`quadcopter-${this.props.quadcopterIndex}-connection-status`}  className={classNames(

                              {[styles.quadcopter_connection_status]: true},
                              {[styles.quadcopter_status_connected]: this.isQuadcopterConnected},
                              {[styles.quadcopter_status_disconnected]: !this.isQuadcopterConnected}


                              )} >



                </div>


          </div>



    );


  }


}


const mapStateToProps =  state => ({


  });

const mapDispatchToProps = dispatch => ({

  onTriggerQuadcopterPallete: () => {

      dispatch(ActionTriggerDraggableWindow(0));
    }


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuadcopterPreviewComponent);
