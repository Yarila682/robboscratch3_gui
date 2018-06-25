import classNames from 'classnames';
import React  from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import  styles from './DraggableWindowComponent.css';

import PropTypes from 'prop-types';
import { ItemTypes } from './drag_constants';
import { DragSource } from 'react-dnd';

const DraggableWindowSource = {
  beginDrag(props) {
    return {

          element_type: ItemTypes.DRAGGABLE_WINDOW,
          draggableWindowId: props.draggableWindowId
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DraggableWindowComponent extends Component {





  render(){



     const { connectDragSource, isDragging} = this.props;

      var draggable_window_id =  this.props.draggableWindowId;

     var top   =  this.props.draggable_window[draggable_window_id].position_top;
     var left  =  this.props.draggable_window[draggable_window_id].position_left;
     var isShowing =  this.props.draggable_window[draggable_window_id].isShowing;



          return connectDragSource(

                  <div    className={classNames(

                                {[styles.draggable_window]: true},
                                {[styles.window_show]: isShowing},
                                {[styles.window_hide]: !isShowing},

                                )}

                          style={{

                                position: 'absolute',
                                top: `${top}px`,
                                left: `${left}px`,
                                }}

                          id={`draggable_window_id-${this.props.draggableWindowId}`}>


                      {this.props.children}


                      </div>



             )

        }


    }


    const mapStateToProps =  state => ({


    draggable_window: state.draggable_window


      });

    const mapDispatchToProps = dispatch => ({




    });

    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(DragSource(ItemTypes.DRAGGABLE_WINDOW, DraggableWindowSource, collect)(DraggableWindowComponent));
