import SensorsAPI from '../sensors_api'

function init_state(){

  let sensors = [];
  let sensors_count = 5;


      sensors[0]= {

            sensor_id:"encoder_left",
            sensor_name: "encoder_left",
            sensor_type: "encoder",
            is_sensor_version_new: true,
            sensor_active: false,
            sensor_data:{value:"test"},
            sensor_device_name:"robot",
            sensor_field_text:`Encoder left :`

      }

      sensors[1]= {

            sensor_id:"encoder_right",
            sensor_name: "encoder_right",
            sensor_type: "encoder",
            is_sensor_version_new: true,
            sensor_active: false,
            sensor_data:{value:"test"},
            sensor_device_name:"robot",
            sensor_field_text:`Encoder right :`

      }

      sensors[2]= {

            sensor_id:"button_start",
            sensor_name: "button_start",
            sensor_type: "button_start",
            is_sensor_version_new: true,
            sensor_active: false,
            sensor_data:{value:"test"},
            sensor_device_name:"robot",
            sensor_field_text:`Button pushed :`

      }



    return sensors;

}


const initialState = init_state();

const  reducer = function (state, action) {

    let sensors = [];

  if (typeof state === 'undefined') state = initialState;


switch (action.type) {

  case 'TEST':






    break;



  default:

      return state;

}




  return state;


}





export {
    reducer as default,

};
