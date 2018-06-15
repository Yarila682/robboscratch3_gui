import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './QuadcopterPreviewComponent.css'



class QuadcopterPreviewComponent extends Component {




  render() {



    return (

          <div id={`quadcopter-preview-${this.props.quadcopterIndex}`}>


                <div id="quadcopter-preview-pic"  className={styles.quadcopterPreviewPic} >



                </div>

                <div id="quadcopter-searching-icon" className={classNames(

                              {[styles.quadcopter_loading_icon]: true},
                              {[styles.quadcopter_loading_icon_hidden]: (/*(this.props.robots[0].robot_connected) || */(!this.props.robots[0].robot_is_searching))},
                              {[styles.quadcopter_loading_icon_showing]: ((this.props.robots[0].robot_is_searching) /*&& (!this.props.robots[0].robot_connected)*/)}
                                )}>


                </div>


                <div id="quadcopter-connection-status"  className={classNames(

                              {[styles.quadcopter_connection_status]: true},
                              {[styles.quadcopter_status_connected]: this.props.robots[0].robot_connected},
                              {[styles.quadcopter_status_disconnected]: !this.props.robots[0].robot_connected}


                              )} >



                </div>


          </div>



    );


  }


}
