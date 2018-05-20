import classNames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styles from  './ColorCorrectorTableComponent.css';
import { ItemTypes } from './drag_constants';
import { DragSource } from 'react-dnd';
import ColorCorrectorTableRowElement from './ColorCorrectorTableRowElement';


var mouse_coords = {x:0,y:0};

const colors_arr        = ["Red","Magenta","Yellow","Green","Blue","Cyan","Custom","Black","Gray","White"];
const correctors_arr    = ["R","G","B","Bright"];

var slider_rounded_flag = 0;
var slider_rounded_flag_old = 0;

var one_slider_percent_value_old = 0;

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


       let lcs_1 = document.getElementById("left-color-slider-1");
       lcs_1.addEventListener("input",this.handleSliderChange.bind(this,"left-color-slider-1"), false);

       let lcs_2 = document.getElementById("left-color-slider-2");
       lcs_2.addEventListener("input",this.handleSliderChange.bind(this,"left-color-slider-2"), false);

       let lcs_3 = document.getElementById("left-color-slider-3");
       lcs_3.addEventListener("input",this.handleSliderChange.bind(this,"left-color-slider-3"), false);

       let rcs_1 = document.getElementById("right-color-slider-1");
       rcs_1.addEventListener("input",this.handleSliderChange.bind(this,"right-color-slider-1",this.props.RCA,this.props.color_corrector_table.sensor_caller_id), false);

       let rcs_2 = document.getElementById("right-color-slider-2");
       rcs_2.addEventListener("input",this.handleSliderChange.bind(this,"right-color-slider-2",this.props.RCA,this.props.color_corrector_table.sensor_caller_id), false);

       let rcs_3 = document.getElementById("right-color-slider-3");
       rcs_3.addEventListener("input",this.handleSliderChange.bind(this,"right-color-slider-3",this.props.RCA,this.props.color_corrector_table.sensor_caller_id), false);






       let cctc = ReactDOM.findDOMNode(this);
       cctc.addEventListener("dragstart",this.handleDragStart.bind(this,"dragstart"), false);

  }



  handleSliderChange(slider_id,RCA,sensor_caller_id,event){

    function isInteger(num) {
      return (num ^ 0) === num;
    }

    function isEqualSign(num1,num2){

      if ((num1 == 0) || (num2 == 0)) {

        return true;

      }else return Math.sign(num1) == Math.sign(num2);


    }


    const recalculateSliderPercents = function(slider_id){

       var  percents = 300;

       const sliders_arr = ["right-color-slider-1","right-color-slider-2","right-color-slider-3"];

       var slider =  document.getElementById(slider_id);

       var slider_value_now = Number(slider.value);

       console.log("slider_value_now: " + slider_value_now);

       var slider_value_old = Number(document.getElementById(slider_id+"-value").innerHTML.replace("%",""));

       console.log("slider_value_old: " + slider_value_old);

       var filtered_sliders_arr =  sliders_arr.filter(slider => slider != slider_id);

       var checked_sliders_arr =   filtered_sliders_arr.filter(slider => document.getElementById(slider+"-checkbox").checked == true);

       var unchecked_sliders_arr =   filtered_sliders_arr.filter(slider => document.getElementById(slider+"-checkbox").checked != true);


       checked_sliders_arr.forEach(function(slider,index){

              percents  =  percents -  Number(document.getElementById(slider).value);



       });


      var percent_delta = slider_value_now - slider_value_old;

        var one_slider_percent_value;
      var one_slider_percent_value_without_round = percent_delta / unchecked_sliders_arr.length;
      console.log("one_slider_percent_value_without_round: " + one_slider_percent_value_without_round);
      one_slider_percent_value = one_slider_percent_value_without_round;

      if (!isInteger(one_slider_percent_value_without_round)){



          one_slider_percent_value =  Math.round(one_slider_percent_value_without_round);

          console.log("one_slider_percent_value_rounded: " +   one_slider_percent_value);

          slider_rounded_flag_old = slider_rounded_flag;
          slider_rounded_flag+=1;

          console.log("slider_rounded_flag: " + slider_rounded_flag);

        if (slider_rounded_flag == 2){

          console.log("slider_rounded_flag == 2");

        //  if (isEqualSign(one_slider_percent_value,one_slider_percent_value_old)){

        //    console.log("isEqualSign: true");

            one_slider_percent_value_old = one_slider_percent_value;

            if (one_slider_percent_value > 0){

                one_slider_percent_value-=1;

            }else if (one_slider_percent_value < 0){

                one_slider_percent_value-=1;

            }else if (one_slider_percent_value == 0){

                one_slider_percent_value-=1;
            }
          //}

            slider_rounded_flag_old = slider_rounded_flag;
            slider_rounded_flag = 0;

        }


      }



      console.log("one_slider_percent_value: " + one_slider_percent_value);

      let value = 0;
      let value_is_negative = false;
      unchecked_sliders_arr.forEach(function(slider,index){

              let value_buf = 0;
              value_buf = (Number(document.getElementById(slider).value) -  one_slider_percent_value);
              value +=  value_buf;

             value_is_negative = ((value_buf < 0) || (value_is_negative))?true:false;

                console.log("Number(document.getElementById(slider).value): " + Number(document.getElementById(slider).value));
                console.log("value1: " + value);

      });

      if ((slider_value_now + value ) < (percents -1)){

        let sum = slider_value_now + value;

          console.log("Low then : " +  percents + "sum: " + sum);

      }


      if (((slider_value_now + value ) <= percents) && ((value) >= 0) && (!value_is_negative)) {

      one_slider_percent_value_old = one_slider_percent_value;
      slider_rounded_flag_old = slider_rounded_flag;

      document.getElementById(slider_id+"-value").innerHTML = slider_value_now + "%";

        unchecked_sliders_arr.forEach(function(slider,index){

              let value =  Number(document.getElementById(slider).value) -  one_slider_percent_value;
              console.log("value2: " + value);

              document.getElementById(slider).value  = value;
              document.getElementById(slider+"-value").innerHTML = value + "%";

        });

      }else{


          document.getElementById(slider_id).value = Number(document.getElementById(slider_id+"-value").innerHTML.replace("%",""));

          one_slider_percent_value    =    one_slider_percent_value_old;
          slider_rounded_flag         =    slider_rounded_flag_old;

          if (slider_rounded_flag >= 2){

            slider_rounded_flag-=1;
          }

      }



    }

  //   console.log("handleSliderChange: " + slider_id);

     //var slider_type = typeof(document.getElementById(slider_id+"-checkbox"));

     if (document.getElementById(slider_id+"-checkbox") != null){

       const sliders_arr = ["right-color-slider-1","right-color-slider-2","right-color-slider-3"];

       var checked_sliders_arr = sliders_arr.filter(slider => document.getElementById(slider+"-checkbox").checked == true);

       if ((document.getElementById(slider_id+"-checkbox").checked == true) || (checked_sliders_arr.length >= 2)){


          document.getElementById(slider_id).value = Number(document.getElementById(slider_id+"-value").innerHTML.replace("%",""));

       }else{

         //if (slider_id.startsWith("right")){

              recalculateSliderPercents(slider_id);
        // }




       }

          let red_color_slider_value      =   document.getElementById("right-color-slider-1").value;
          let green_color_slider_value    =   document.getElementById("right-color-slider-2").value;
          let blue_color_slider_value     =   document.getElementById("right-color-slider-3").value;




          RCA.setColorKoefs(sensor_caller_id,red_color_slider_value,green_color_slider_value, blue_color_slider_value);

     }else{

          document.getElementById(slider_id+"-value").innerHTML =  document.getElementById(slider_id).value + "%";

     }






  }

  handleDragStart(event_name,event){


  //   console.log("handleDragStart: " +  event_name + "clientX: " +  event.clientX  + "clientY: " +  event.clientY );
  //  ev.stopPropagation();

    mouse_coords.x = event.clientX;
    mouse_coords.y = event.clientY;

  }

  automaticCollorCorrection(RCA,sensor_caller_id){

        RCA.colorAutoCorection(sensor_caller_id);



       document.getElementById("right-color-slider-1").value = RCA.getColorKoefs(sensor_caller_id,"red");
       document.getElementById("right-color-slider-2").value = RCA.getColorKoefs(sensor_caller_id,"green");
       document.getElementById("right-color-slider-3").value = RCA.getColorKoefs(sensor_caller_id,"blue");


        document.getElementById("right-color-slider-1"+"-value").innerHTML =  document.getElementById("right-color-slider-1").value + "%";
        document.getElementById("right-color-slider-2"+"-value").innerHTML =  document.getElementById("right-color-slider-2").value + "%";
        document.getElementById("right-color-slider-3"+"-value").innerHTML =  document.getElementById("right-color-slider-3").value + "%";

  }

  onButtonApplyChangesClick(RCA, sensor_id){

       console.log("onButtonApplyChangesClick" );


       var color_corrector_table_object = {};

       colors_arr.forEach(function(color,color_index){


             let color_name = color.toLowerCase();

               color_corrector_table_object[color_name] = {};

             correctors_arr.forEach(function(corrector,corrector_index){

                   color_corrector_table_object[color_name][corrector] = document.getElementById(`color-${color_name}-corrector-${corrector}`).value;

             });

       });


        RCA.setColorFilterTable(sensor_id, color_corrector_table_object );

  }

  onButtonSaveClick(){


       console.log("onButtonSaveClick()" );

        var color_corrector_table_object = {};

        colors_arr.forEach(function(color,color_index){


              let color_name = color.toLowerCase();

                color_corrector_table_object[color_name] = {};

              correctors_arr.forEach(function(corrector,corrector_index){

                    color_corrector_table_object[color_name][corrector] = document.getElementById(`color-${color_name}-corrector-${corrector}`).value;

              });

        });


        var pom = document.createElement('a');

        var contents = new Blob([JSON.stringify(color_corrector_table_object,null,' ')], {type : 'application/json'});

        pom.setAttribute('href', URL.createObjectURL(contents, {
           type: "application/json"
        }));
        pom.setAttribute('download', "color_corrector_table"+ ".json");
        pom.click();
  }


  onButtonLoadClick(){


    console.log("onButtonLoadClick" );

    function updateTable(color_corrector_table_object_loaded){


        var color_corrector_table_object = JSON.parse(color_corrector_table_object_loaded);

        colors_arr.forEach(function(color,color_index){


              let color_name = color.toLowerCase();



              correctors_arr.forEach(function(corrector,corrector_index){

              document.getElementById(`color-${color_name}-corrector-${corrector}`).value = color_corrector_table_object[color_name][corrector];

              });

        });
    }


    function readFile(e){
           var file = e.target.files[0];
           if (!file) {
              return;
           }
           var reader = new FileReader();
           reader.onload = function(e){
            //  var contents = e.target.result.replace("data:application/json;base64,", "");



            updateTable(e.target.result);


           };
           reader.readAsText(file);
        }

    var oInputFile = document.createElement("input");
         oInputFile.setAttribute('type', "file");


      oInputFile.style.position = "absolute";
      oInputFile.style.left = "0px";
      oInputFile.style.top = "0px";
      oInputFile.style.width = "1px";
      oInputFile.style.height = "1px";
      oInputFile.addEventListener('change', readFile, false);
      document.body.appendChild(oInputFile);

      setTimeout(function(){
                   oInputFile.click();
                   oInputFile.focus();
                 }, 1000);

  }


  render() {

    var top   =  this.props.color_corrector_table.position_top;
    var left  =  this.props.color_corrector_table.position_left;



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
                                                <span className={styles.slider_value} id={"left-color-slider-1-value"}>100%</span>
                                                <span className={styles.slider_value} id={"left-color-slider-2-value"}>100%</span>
                                                <span className={styles.slider_value} id={"left-color-slider-3-value"}>100%</span>


                                        </div>

                                          <div className={styles.sliders}>

                                            <input type="range" id="left-color-slider-1" className={styles.color_slider} min="0" max="200" step="1" defaultValue="100"></input>
                                            <input type="range" id="left-color-slider-2" className={styles.color_slider} min="0" max="200" step="1" defaultValue="100"></input>
                                            <input type="range" id="left-color-slider-3" className={styles.color_slider} min="0" max="200" step="1" defaultValue="100"></input>

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
                                            <span className={styles.slider_value} id={"right-color-slider-1-value"}>100%</span>
                                            <span className={styles.slider_value} id={"right-color-slider-2-value"}>100%</span>
                                            <span className={styles.slider_value} id={"right-color-slider-3-value"}>100%</span>


                                    </div>

                                    <div className={styles.sliders}>

                                      <input type="range" id="right-color-slider-1" className={styles.color_slider} min="0" max="300" step="1" defaultValue="100"></input>
                                      <input type="range" id="right-color-slider-2" className={styles.color_slider} min="0" max="300" step="1" defaultValue="100"></input>
                                      <input type="range" id="right-color-slider-3" className={styles.color_slider} min="0" max="300" step="1" defaultValue="100"></input>

                                    </div>

                                    <div className={styles.checkboxes_block}>

                                          <input id="right-color-slider-1-checkbox" type="checkbox" className={styles.checkboxes}></input>
                                          <input id="right-color-slider-2-checkbox" type="checkbox" className={styles.checkboxes}></input>
                                          <input id="right-color-slider-3-checkbox" type="checkbox" className={styles.checkboxes}></input>


                                    </div>

                                    <div className={styles.automatic_correcton_button_right}>
                                          <button  onClick={this.automaticCollorCorrection.bind(this,this.props.RCA,
                                                    this.props.color_corrector_table.sensor_caller_id)} >Automatic correction</button>

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
                          <button className={styles.buttons} onClick={this.onButtonSaveClick.bind(this)}>Save</button>
                          <button className={styles.buttons} onClick={this.onButtonLoadClick.bind(this)}>Load</button>
                          <button className={styles.buttons} onClick={this.onButtonApplyChangesClick.bind(this, this.props.RCA, this.props.color_corrector_table.sensor_caller_id)}>Apply changes</button>

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
