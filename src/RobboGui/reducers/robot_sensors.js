
import SensorsAPI from '../sensors_api'

function init_state(){

  let sensors = [];
  let sensors_count = 5;
  let i = 0;

  for (i=0;i<sensors_count;i++){

      sensors[i]= {

            sensor_id:i,
            sensor_name: SensorsAPI.getSensorInitName(),
            sensor_type:  SensorsAPI.getSensorInitType(),
            is_sensor_version_new: true,
            sensor_active: false,
            sensor_data:{value:"test"},
            sensor_device_name:"robot",
            sensor_field_text:`Sensor ${i + 1} :`

      }

  }


    return sensors;

}


const initialState = init_state();

const  reducer = function (state, action) {

    let sensors = [];

  if (typeof state === 'undefined') state = initialState;


switch (action.type) {

  case 'TRIGGER_EXTENSION_PACK':




            sensors = [...state];

            sensors = handler_trigger_extension_pack(sensors);



            return sensors;


    break;

    case 'TRIGGER_ROBOT_SENSOR_NAME':




              sensors = [...state];

              sensors = handler_trigger_sensor_name(sensors,action.payload);



              return sensors;


      break;

  default:

      return state;

}




  return state;


}


const handler_trigger_sensor_name = function (initial_sensors_state,payload){

    let sensors_state = initial_sensors_state;

    let data = payload.split("_");

    let sensor_name = data[0].replace("sensor-name-","");
    let sensor_id =   data[1].replace("CallerSensorId-","");

    sensors_state[sensor_id].sensor_name = sensor_name;








  return sensors_state;
}

const handler_trigger_extension_pack = function (initial_sensors_state){

    let sensors_state = initial_sensors_state;

    sensors_state.map((sensor, index) => {

        sensors_state[index].is_sensor_version_new = !sensors_state[index].is_sensor_version_new;


    });

  return sensors_state;
}


export {
    reducer as default,

};
