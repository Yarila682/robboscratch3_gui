import classNames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styles from  './ColorCorrectorTableComponent.css';
import { ItemTypes } from './drag_constants';
import { DragSource } from 'react-dnd';
import ColorCorrectorTableRowElement from './ColorCorrectorTableRowElement';


var mouse_coords = {x:0,y:0};

const ColorCorrectorWindowSource = {
  beginDrag(props) {

     console.log("beginDrag");

    return {

          element_type: ItemTypes.COLOR_CORRECTOR_WINDOW
    };
  },

  canDrag(props,monitor) {


     console.log("canDrag");

      //let coord = monitor.getClientOffset();

      let  coord = mouse_coords;

      let color_corrector_table_tittle = document.getElementById("color-corrector-table-tittle");
      let cctt_coords =   color_corrector_table_tittle.getBoundingClientRect();


      if ( ( (coord.x > cctt_coords.left)&(coord.y>cctt_coords.top) ) &  ((coord.x < (cctt_coords.left + cctt_coords.width) )&(coord.y < (cctt_coords.top + cctt_coords.height) ) )) {

          return true;

      }else{

          return false;
      }



        return false;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}



class ColorCorrectorTableComponent extends Component {


  componentDidMount () {


       let rcs_1 = document.getElementById("left-color-slider-1");
       rcs_1.addEventListener("change",this.handleSliderChange.bind(this,"left-color-slider-1"), false);






       let cctc = ReactDOM.findDOMNode(this);
       cctc.addEventListener("dragstart",this.handleDragStart.bind(this,"dragstart"), false);

  }

  handleSliderChange(slider_id,event){


     console.log("handleSliderChange: " + slider_id);

     document.getElementById(slider_id+"-value").innerHTML =  document.getElementById(slider_id).value + "%";


  }

  handleDragStart(event_name,event){


     console.log("handleDragStart: " +  event_name + "clientX: " +  event.clientX  + "clientY: " +  event.clientY );
  //  ev.stopPropagation();

    mouse_coords.x = event.clientX;
    mouse_coords.y = event.clientY;

  }


  render() {

    var top   =  this.props.color_corrector_table.position_top;
    var left  =  this.props.color_corrector_table.position_left;

    var colors_arr = ["Red","Magenta","Yellow","Green","Blue","Cyan","Custom","Black","Gray","White"];

    return this.props.connectDragSource(

          <div id={`color-corrector-table-${this.props.color_corrector_table.sensor_caller_id}_sensor-caller-id-${this.props.color_corrector_table.sensor_caller_id}`}

                className={classNames(

                          {[styles.color_corrector_table]: true},
                          {[styles.color_corrector_table_show]: this.props.color_corrector_table.isShowing},
                          {[styles.color_corrector_table_hide]: !this.props.color_corrector_table.isShowing}

                          )}

                  style={{

                        position: 'absolute',
                        top: `${top}px`,
                        left: `${left}px`,
                        }}>

                    <div className={classNames(

                              {[styles.color_corrector_table_tittle]: true}


                              )}

                          id="color-corrector-table-tittle">

                        Color corrector {this.props.color_corrector_table.sensor_caller_id}

                    </div>

                    <div id="content" className={styles.content}>

                        <div id="data-row" className={styles.row}>

                              <div id="left-slider-block"

                                  className={classNames(

                                        {[styles.data_block]: true}


                                        )}>

                                        <div className={styles.left_slider_labels}>

                                                <span className={styles.slider_label}>R</span>
                                                <span className={styles.slider_label}>G</span>
                                                <span className={styles.slider_label}>B</span>

                                        </div>

                                        <div className={styles.left_slider_values}>
                                                <span className={styles.slider_value} id={"left-color-slider-1-value"}>0%</span>
                                                <span className={styles.slider_value} id={"left-color-slider-2-value"}>0%</span>
                                                <span className={styles.slider_value} id={"left-color-slider-3-value"}>0%</span>


                                        </div>

                                          <div className={styles.sliders}>

                                            <input type="range" id="left-color-slider-1" className={styles.color_slider} min="0" max="100" step="1"></input>
                                            <input type="range" id="left-color-slider-2" className={styles.color_slider} min="0" max="100" step="1"></input>
                                            <input type="range" id="left-color-slider-3" className={styles.color_slider} min="0" max="100" step="1"></input>

                                          </div>


                                        <div>
                                          <div className={styles.automatic_correcton_button_left}>
                                                <button>Automatic correction</button>

                                          </div>

                                          <div className={styles.rgb_sum}>

                                              R+G+B:

                                              <input id={`rgb-sum`} className={classNames(

                                                  {[styles.rgb_sum_input]: true}


                                                  )}

                                              type="text">
                                             </input>

                                          </div>

                                        </div>


                              </div>

                              <div id="right-slider-block"

                                    className={classNames(

                                    {[styles.data_block]: true}


                                    )}>

                                    <div className={styles.left_slider_labels}>

                                            <span className={styles.slider_label}>R</span>
                                            <span className={styles.slider_label}>G</span>
                                            <span className={styles.slider_label}>B</span>

                                    </div>

                                    <div className={styles.left_slider_values}>
                                            <span className={styles.slider_value} id={"right-color-slider-1-value"}>0%</span>
                                            <span className={styles.slider_value} id={"right-color-slider-2-value"}>0%</span>
                                            <span className={styles.slider_value} id={"right-color-slider-3-value"}>0%</span>


                                    </div>

                                    <div className={styles.sliders}>

                                      <input type="range" id="right-color-slider-1" className={styles.color_slider} min="0" max="100" step="1"></input>
                                      <input type="range" id="right-color-slider-2" className={styles.color_slider} min="0" max="100" step="1"></input>
                                      <input type="range" id="right-color-slider-3" className={styles.color_slider} min="0" max="100" step="1"></input>

                                    </div>

                                    <div className={styles.checkboxes_block}>

                                          <input id="right-color-slider-1-checkbox" type="checkbox" className={styles.checkboxes}></input>
                                          <input id="right-color-slider-2-checkbox" type="checkbox" className={styles.checkboxes}></input>
                                          <input id="right-color-slider-3-checkbox" type="checkbox" className={styles.checkboxes}></input>


                                    </div>

                                    <div className={styles.automatic_correcton_button_right}>
                                          <button>Automatic correction</button>

                                    </div>

                              </div>

                              <div id="data-block"

                                    className={classNames(

                                      {[styles.data_block]: true}


                                      )}>

                                  <div id="color-row-1" className={styles.color_row}>

                                        <div id="color-row-1-col-1"

                                              className={classNames(

                                          {[styles.color_col]: true},
                                          {[styles.color_col_header_label]: true}


                                          )} >


                                        </div>

                                        <div id="color-row-1-col-2"

                                              className={classNames(

                                          {[styles.color_col]: true},
                                          {[styles.color_col_header_label]: true}


                                          )} >

                                                R
                                        </div>

                                        <div id="color-row-1-col-3"

                                              className={classNames(

                                                {[styles.color_col]: true},
                                                {[styles.color_col_header_label]: true}


                                          )} >
                                                G

                                        </div>

                                        <div id="color-row-1-col-4"

                                              className={classNames(

                                                {[styles.color_col]: true},
                                                {[styles.color_col_header_label]: true}


                                          )} >
                                              B

                                        </div>

                                        <div id="color-row-1-col-5"

                                              className={classNames(

                                                {[styles.color_col]: true},
                                                {[styles.color_col_header_label]: true}


                                          )} >
                                              Bright

                                        </div>


                                  </div> {/* row1 end */}




                                  {

                                        colors_arr.map(function(color_name,index){

                                          return    <ColorCorrectorTableRowElement key={`color-row-${index+2}`} rowId={index+2} colorName={color_name} colorIntervalValue={"20-30"}/>

                                        })

                                  }

                              </div>

                        </div>


                        <div id="buttons-row" className={styles.row}>

                          <button className={styles.buttons}>Close</button>
                          <button className={styles.buttons}>Save</button>

                        </div>

                    </div>



          </div>




    )


  };


};


const mapStateToProps =  state => ({


  color_corrector_table: state.color_corrector_table


  });

const mapDispatchToProps = dispatch => ({




});



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragSource(ItemTypes.COLOR_CORRECTOR_WINDOW, ColorCorrectorWindowSource, collect)(ColorCorrectorTableComponent));
