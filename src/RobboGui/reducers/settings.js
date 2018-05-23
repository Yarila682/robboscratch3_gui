const initialState = {

  is_lab_ext_enabled:false,


};

const  reducer = function (state, action) {



  if (typeof state === 'undefined') state = initialState;


  let sensors_pallete_state = {};


switch (action.type) {

  case 'TRIGGER_LAB_EXT_SENSORS':


  sensors_pallete_state = Object.assign({}, state);

  sensors_pallete_state.is_lab_ext_enabled = !sensors_pallete_state.is_lab_ext_enabled;



  return sensors_pallete_state;


    break;



  default:

      return state;

}




  return state;


}


export {
    reducer as default,

};
