
const ActionTriggerExtensionPack = function(){


  return {
    type: 'TRIGGER_EXTENSION_PACK'
  };


}

const ActionTriggerSensorChooseWindow = function(payload){


  let data = payload.split("_");

  let device_name = data[0];
  let caller_sensor_id = Number.parseInt(data[1].replace("sensor-",""));
  let device_type = data[2].replace("type-","");


  return {
    type: 'TRIGGER_SENSOR_CHOOSE_WINDOW',

    payload:{

        caller_sensor_id:caller_sensor_id,
        sensor_caller_device_name:device_name,
        sensor_caller_type: device_type

    }
  };


}

const ActionDropSensorChooseWindow = function(top,left){


  return {
    type: 'DROP_SENSOR_CHOOSE_WINDOW',
    payload:{

        top:top,
        left:left

    }
  };


}

const ActionTriggerSensorsPalette = function(){


  return {
    type: "TRIGGER_SENSORS_PALETTE",
    payload:{



    }
  };


}

const ActionTriggerSensorName = function(payload){

let data;

console.log('ActionTriggerSensorName: ' + payload );

if (payload.startsWith("robot-")){

   data = payload.replace("robot-","");

  return {
    type: 'TRIGGER_ROBOT_SENSOR_NAME',
    payload:data
  };

}else if (payload.startsWith("lab-")){

  data = payload.replace("lab-","");

  return {
    type: 'TRIGGER_LAB_SENSOR_NAME',
    payload:data
  };

}

    console.log('ERROR_UNKNOWN_DEVICE_SENSOR');
    return {
      type: 'ERROR_UNKNOWN_DEVICE_SENSOR',


    }

}

export {

    ActionTriggerExtensionPack,
    ActionTriggerSensorChooseWindow,
    ActionDropSensorChooseWindow,
    ActionTriggerSensorName,
    ActionTriggerSensorsPalette
};
