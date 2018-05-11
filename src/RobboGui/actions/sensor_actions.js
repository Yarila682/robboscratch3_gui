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

const ActionRobotGetDataStart = function(robot_number){




  return (dispatch) => {
    RobotGetDataInterval =   setInterval(() => {

          dispatch(ActionRobotGetData(robot_number,RCA_local));
      }, 25);
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

const ActionLaboratoryGetDataStart = function(laboratory_number){




  return (dispatch) => {
    LaboratoryGetDataInterval =   setInterval(() => {

          dispatch(ActionLaboratoryGetData(robot_number,LCA_local));
      }, 25);
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
    ActionSearchLaboratoryDevices

};
