import classNames from 'classnames';
import React  from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import  styles from './SearchPanelComponentVisibilityWrapper.css';




class SearchPanelComponentVisibilityWrapper extends Component {



  render(){

            return (

                  <div    className={classNames(

                                {[styles.window_show]: isShowing},
                                {[styles.window_hide]: !isShowing},

                                )}


                          id={`SearchPanelComponentVisibilityWrapper`}>


                      {this.props.children}


                      </div>


            );           
             

        }


    }


    const mapStateToProps =  state => ({


    draggable_window:state.scratchGui.draggable_window


      });

    const mapDispatchToProps = dispatch => ({


      // onCreateDraggableWindow: (draggable_window_id) => {
      //
      //     dispatch(ActionCreateDraggableWindow(draggable_window_id));
      //   }

      

    });

    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(SearchPanelComponentVisibilityWrapper);
