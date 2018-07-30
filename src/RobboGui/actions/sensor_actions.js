var RCA_local;
var LCA_local;


const ActionTriggerExtensionPack = function(){


  return {
    type: 'TRIGGER_EXTENSION_PACK',
    payload:{


        RCA:RCA_local
    }
  };


}

const ActionTriggerLabExtSensors = function(){


  return {

    type: 'TRIGGER_LAB_EXT_SENSORS',

    payload:{


        LCA:LCA_local
    }
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
    payload:{
      sensor_name_data:data,
      RCA:RCA_local
    }
  };

}else if (payload.startsWith("lab-")){

  data = payload.replace("lab-","");

  return {
    type: 'TRIGGER_LAB_SENSOR_NAME',
    payload:{
      sensor_name_data:data,
      LCA:LCA_local
    }
  };

}

    console.log('ERROR_UNKNOWN_DEVICE_SENSOR');
    return {
      type: 'ERROR_UNKNOWN_DEVICE_SENSOR',


    }

}

var LaboratoriesConnectionStatusCheckInterval;

const  ActionLaboratoriesConnectionStatusCheck = function(laboratory_number,LCA){

  return {

      type: 'LABORATORY_CONNECTION_STATUS_CHECK',
      payload:{

          laboratory_number:laboratory_number,
          LCA:LCA
      }
  }

}

const ActionLaboratoriesConnectionStatusCheckStart = function(laboratory_number,LCA){

  LCA_local = LCA


  return (dispatch) => {
    LaboratoriesConnectionStatusCheckInterval =   setInterval(() => {

          dispatch(ActionLaboratoriesConnectionStatusCheck(laboratory_number,LCA));
      }, 100);
  };



}


var RobotsConnectionStatusCheckInterval;

const  ActionRobotsConnectionStatusCheck = function(robot_number,RCA){

  return {

      type: 'ROBOT_CONNECTION_STATUS_CHECK',
      payload:{

          robot_number:robot_number,
          RCA:RCA
      }
  }

}

const ActionRobotsConnectionStatusCheckStart = function(robot_number,RCA){

  RCA_local = RCA


  return (dispatch) => {
    RobotsConnectionStatusCheckInterval =   setInterval(() => {

          dispatch(ActionRobotsConnectionStatusCheck(robot_number,RCA));
      }, 100);
  };



}

var RobotGetDataInterval;

const  ActionRobotGetData = function(robot_number,RCA){

  return {

      type: 'ROBOT_GET_SENSORS_DATA',
      payload:{

          robot_number:robot_number,
          RCA:RCA
      }
  }

}

const ActionRobotGetDataStart = function(robot_number,RCA){

  RCA_local = RCA;


  return (dispatch) => {
    RobotGetDataInterval =   setInterval(() => {

          dispatch(ActionRobotGetData(robot_number,RCA));
      }, 300); //25
  };



}


var LaboratoryGetDataInterval;

const  ActionLaboratoryGetData = function(laboratory_number,LCA){

  return {

      type: 'LABORATORY_GET_SENSORS_DATA',
      payload:{

          laboratory_number:laboratory_number,
          LCA:LCA
      }
  }

}

const ActionLaboratoryGetDataStart = function(laboratory_number,LCA){

  LCA_local = LCA;


  return (dispatch) => {
    LaboratoryGetDataInterval =   setInterval(() => {

          dispatch(ActionLaboratoryGetData(laboratory_number,LCA_local));
      }, 300);
  };



}

const ActionSearchRobotDevices = function(RCA){


    return {


      type: 'ROBOT_SEARCH_DEVICES',
      payload:{


          RCA:RCA
      }


    }

}

const ActionSearchLaboratoryDevices = function(LCA){


      LCA_local = LCA;

    return {


      type: 'LABORATORY_SEARCH_DEVICES',
      payload:{


          LCA:LCA
      }


    }

}

const ActionRobotStopSearchProcess = function(RCA){


    return {


      type: 'ROBOT_STOP_SEARCH_PROCESS',
      payload:{


          RCA:RCA
      }


    }

}

const ActionRobotStopDataRecievingProcess = function(RCA){


    return {


      type: 'ROBOT_STOP_DATA_RECIEVING_PROCESS',
      payload:{


          RCA:RCA
      }


    }

}

const ActionTriggerOldAnalogSensorState = function(payload){



  let data = payload.split("_");

  let device_name = data[0];
  let caller_sensor_id = Number.parseInt(data[1].replace("sensor-",""));



  return {
    type: 'TRIGGER_OLD_ANALOG_SENSOR_STATE',

    payload:{

        caller_sensor_id:caller_sensor_id,
        RCA:RCA_local

    }
  }

}

const ActionTriggerColorCorrectorTable = function(sensor_caller_id){


return {
    type: 'TRIGGER_COLOR_CORRECTOR_TABLE',

    payload:{

        sensor_caller_id:sensor_caller_id,


    }
  }

}

const ActionDropColorCorrectorWindow = function(top,left){


  return {
    type: 'COLOR_CORRECTOR_TABLE_DROP',
    payload:{

        position_top:top,
        position_left:left

    }
  };


}

const ActionDropDraggableWindow = function(top,left, draggable_window_id){


  return {
    type: 'DRAGGABLE_WINDOW_DROP',
    payload:{

        position_top:top,
        position_left:left,
        draggable_window_id: draggable_window_id

    }
  };


}

const ActionTriggerDraggableWindow = function(draggable_window_id){


  return {
    type: 'DRAGGABLE_WINDOW_TRIGGER',
    payload:{


        draggable_window_id: draggable_window_id

    }
  };


}

const ActionCreateDraggableWindow = function(draggable_window_id){


  return {
    type: 'DRAGGABLE_WINDOW_CREATE',
    payload:{


        draggable_window_id: draggable_window_id

    }
  };


}

const ActionTriggerRobboMenu = function(){

  return {

    type: 'TRIGGER_ROBBO_MENU',
    payload:{



    }
  };

}

const  ActionFirmwareFlasherPushDevice = function(device){

  return {

      type: 'FIRMWARE_FLASHER_PUSH_DEVICE',
      payload:{

        device:device
      }
  }

}

const ActionFirmwareFlasherGetDevicesInfo = function(DCA,RCA,LCA,QCA){

 var device = {};


  return (dispatch) => {
  //  LaboratoryGetDataInterval =   setInterval(() => {


          DCA.searchPorts((port) => {

                var port_path =  port.path;

                device.port = port_path;

                RCA.checkRobotByPort(port.path,(result) => {

                      if (result.code === 0){

                        device.id = result.device.id;
                        device.firmware_version = result.device.firmware_version;
                        device.serial_number= result.device.serial_number;


                            dispatch(ActionFirmwareFlasherPushDevice(device));

                              device = {};

                      }else{

                            LCA.checkLabByPort(port.path, (result)=>{

                              if (result.code === 0){

                                device.id = result.device.id;
                                device.firmware_version = result.device.firmware_version;
                                device.serial_number= result.device.serial_number;

                                    dispatch(ActionFirmwareFlasherPushDevice(device));

                                      device = {};

                              }else{

                                    device.id = -1;
                                    device.firmware_version = -1;
                                    device.serial_number = -1;

                                    dispatch(ActionFirmwareFlasherPushDevice(device));

                                    device = {};
                                }

                            });

                      }


                });

          });



    //  }, 300);
  };



}

export {

    ActionTriggerExtensionPack,
    ActionTriggerSensorChooseWindow,
    ActionDropSensorChooseWindow,
    ActionTriggerSensorName,
    ActionTriggerSensorsPalette,
    ActionRobotsConnectionStatusCheckStart,
    ActionLaboratoriesConnectionStatusCheckStart,
    ActionSearchRobotDevices,
    ActionRobotStopSearchProcess,
    ActionRobotStopDataRecievingProcess,
    ActionRobotGetDataStart,
    ActionLaboratoryGetDataStart,
    ActionTriggerOldAnalogSensorState,
    ActionTriggerColorCorrectorTable,
    ActionDropColorCorrectorWindow,
    ActionDropDraggableWindow,
    ActionTriggerDraggableWindow,
    ActionCreateDraggableWindow ,
    ActionSearchLaboratoryDevices,
    ActionTriggerRobboMenu,
    ActionTriggerLabExtSensors,
    ActionFirmwareFlasherGetDevicesInfo

};
