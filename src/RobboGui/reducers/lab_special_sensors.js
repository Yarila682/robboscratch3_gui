import SensorsAPI from '../sensors_api'

function init_state(){

  let sensors = [];
  let sensors_count = 5;
  let i = 0;

  for (i=0;i<sensors_count;i++){

      sensors[i]= {

            sensor_id:`lab-button-${i}`,
            sensor_name:`lab-button`,
            sensor_type: `lab-button`,
            is_sensor_version_new: true,
            sensor_active: false,
            sensor_data:{value:"test"},
            sensor_device_name:"lab",
            sensor_field_text:`Button ${i + 1} :`

      }

  }


  sensors[5]= {

        sensor_id:`lab-light`,
        sensor_name:`lab-light`,
        sensor_type:`lab-light`,
        is_sensor_version_new: true,
        sensor_active: false,
        sensor_data:{value:"test"},
        sensor_device_name:"lab",
        sensor_field_text:`Light :`

  }

  sensors[6]= {

        sensor_id:`lab-sound`,
        sensor_name:`lab-sound`,
        sensor_type:`lab-sound`,
        is_sensor_version_new: true,
        sensor_active: false,
        sensor_data:{value:"test"},
        sensor_device_name:"lab",
        sensor_field_text:`Sound :`

  }

  sensors[7]= {

        sensor_id:`lab-lever`,
        sensor_name:`lab-lever`,
        sensor_type:`lab-lever`,
        is_sensor_version_new: true,
        sensor_active: false,
        sensor_data:{value:"test"},
        sensor_device_name:"lab",
        sensor_field_text:`Lever:`

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
