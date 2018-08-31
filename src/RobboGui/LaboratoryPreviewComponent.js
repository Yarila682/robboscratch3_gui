import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from  './LaboratoryPreviewComponent.css'
import {ActionTriggerDraggableWindow} from './actions/sensor_actions'



class LaboratoryPreviewComponent extends Component {



  startlabConnectionStatusCheck(){


      var lab_searching_icon;
      var lab_connection_status;

       setInterval(function(self){

          self.isLabConnected      =    self.props.LCA.isLaboratoryConnected(0);
          self.lab_is_searching    =    self.props.LCA.isLaboratorySearching();

           lab_searching_icon = document.getElementById(`lab-${self.props.labIndex}-searching-icon`);

            if (typeof( lab_searching_icon) != 'undefined'){


              if (self.lab_is_searching){




                 lab_searching_icon.classList.remove(styles.lab_loading_icon_hidden);
                 lab_searching_icon.classList.remove(styles.lab_loading_icon_showing);
                 lab_searching_icon.classList.add(styles.lab_loading_icon_showing);


              }else{


                lab_searching_icon.classList.remove(styles.lab_loading_icon_hidden);
                lab_searching_icon.classList.remove(styles.lab_loading_icon_showing);
                lab_searching_icon.classList.add(styles.lab_loading_icon_hidden);


              }

              lab_connection_status = document.getElementById(`lab-${self.props.labIndex}-connection-status`);

              if (self.isLabConnected){




                 lab_connection_status.classList.remove(styles.lab_status_connected);
                 lab_connection_status.classList.remove(styles.lab_status_disconnected);
                 lab_connection_status.classList.add(styles.lab_status_connected);

              }else{


                lab_connection_status.classList.remove(styles.lab_status_disconnected);
                lab_connection_status.classList.remove(styles.lab_status_connected);
                lab_connection_status.classList.add(styles.lab_status_disconnected);


              }



            }






       },30,this);



  }

  componentDidMount () {

      this.islabConnected = false;
      this.lab_is_searching = false;

      this.startlabConnectionStatusCheck();

  }




  render() {



    return (


      <div id={`lab-preview-${this.props.labIndex}`} className={styles.labPreview} onClick={this.props.onTriggerLabPallete}>


            <div id={`lab-${this.props.labIndex}-preview-pic`}  className={styles.labPreviewPic} >

                L

            </div>

            <div id={`lab-${this.props.labIndex}-searching-icon`} className={classNames(

                          {[styles.lab_loading_icon]: true},
                          {[styles.lab_loading_icon_hidden]: (/*(this.props.labs[0].lab_connected) || */(!this.lab_is_searching))},
                          {[styles.lab_loading_icon_showing]: ((this.lab_is_searching) /*&& (!this.props.labs[0].lab_connected)*/)}
                            )}>


            </div>


            <div id={`lab-${this.props.labIndex}-connection-status`}  className={classNames(

                          {[styles.lab_connection_status]: true},
                          {[styles.lab_status_connected]: this.isLabConnected},
                          {[styles.lab_status_disconnected]: !this.isLabConnected}


                          )} >



            </div>


      </div>

      );

}






}


const mapStateToProps =  state => ({


  });

const mapDispatchToProps = dispatch => ({

  onTriggerLabPallete: () => {

      dispatch(ActionTriggerDraggableWindow(2));
    }


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaboratoryPreviewComponent);
