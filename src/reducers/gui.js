import {combineReducers} from 'redux';
import colorPickerReducer from './color-picker';
import customProceduresReducer from './custom-procedures';
import intlReducer from './intl';
import modalReducer from './modals';
import monitorReducer from './monitors';
import monitorLayoutReducer from './monitor-layout';
import targetReducer from './targets';
import toolboxReducer from './toolbox';
import vmReducer from './vm';
import stageSizeReducer from './stage-size';
import {ScratchPaintReducer} from 'scratch-paint';

import robot_sensors from '../RobboGui/reducers/robot_sensors';
import lab_external_sensors from '../RobboGui/reducers/lab_external_sensors';
import robot_special_sensors  from '../RobboGui/reducers/robot_special_sensors'
import lab_special_sensors  from '../RobboGui/reducers/lab_special_sensors'
import trash_reducer from '../RobboGui/reducers/trash_reducer';
import sensors_choose_window from '../RobboGui/reducers/sensors_choose_window';
import sensors_palette from '../RobboGui/reducers/sensors_palette';
import robots from '../RobboGui/reducers/robots';
import extension_pack from '../RobboGui/reducers/extension_pack';


export default combineReducers({
    colorPicker: colorPickerReducer,
    customProcedures: customProceduresReducer,
    intl: intlReducer,
    stageSize: stageSizeReducer,
    modals: modalReducer,
    monitors: monitorReducer,
    monitorLayout: monitorLayoutReducer,
    targets: targetReducer,
    toolbox: toolboxReducer,
    vm: vmReducer,
    scratchPaint: ScratchPaintReducer,

    robot_sensors:robot_sensors,
    lab_external_sensors:lab_external_sensors,
    robot_special_sensors: robot_special_sensors,
    lab_special_sensors: lab_special_sensors,
    trash_reducer:trash_reducer,
    sensors_choose_window:sensors_choose_window,
    sensors_palette:sensors_palette,
    robots:robots,
    extension_pack:extension_pack
});
