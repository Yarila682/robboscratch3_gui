import {applyMiddleware, compose, combineReducers} from 'redux';
import assetDragReducer, {assetDragInitialState} from './asset-drag';
import cardsReducer, {cardsInitialState} from './cards';
import colorPickerReducer, {colorPickerInitialState} from './color-picker';
import customProceduresReducer, {customProceduresInitialState} from './custom-procedures';
import blockDragReducer, {blockDragInitialState} from './block-drag';
import editorTabReducer, {editorTabInitialState} from './editor-tab';
import hoveredTargetReducer, {hoveredTargetInitialState} from './hovered-target';
import menuReducer, {menuInitialState} from './menus';
import modalReducer, {modalsInitialState} from './modals';
import modeReducer, {modeInitialState} from './mode';
import monitorReducer, {monitorsInitialState} from './monitors';
import monitorLayoutReducer, {monitorLayoutInitialState} from './monitor-layout';
import projectIdReducer, {projectIdInitialState} from './project-id';
import projectTitleReducer, {projectTitleInitialState} from './project-title';
import restoreDeletionReducer, {restoreDeletionInitialState} from './restore-deletion';
import stageSizeReducer, {stageSizeInitialState} from './stage-size';
import targetReducer, {targetsInitialState} from './targets';
import toolboxReducer, {toolboxInitialState} from './toolbox';
import vmReducer, {vmInitialState} from './vm';
import vmStatusReducer, {vmStatusInitialState} from './vm-status';
import throttle from 'redux-throttle';

import robot_sensors,{robot_sensors_InitialState} from '../RobboGui/reducers/robot_sensors';
import lab_external_sensors,{lab_external_sensors_InitialState} from '../RobboGui/reducers/lab_external_sensors';
import robot_special_sensors,{robot_special_sensors_InitialState}  from '../RobboGui/reducers/robot_special_sensors'
import lab_special_sensors,{lab_special_sensors_InitialState}  from '../RobboGui/reducers/lab_special_sensors'
import trash_reducer from '../RobboGui/reducers/trash_reducer';
import sensors_choose_window,{sensors_choose_window_InitialState} from '../RobboGui/reducers/sensors_choose_window';
import sensors_palette,{sensors_palette_InitialState} from '../RobboGui/reducers/sensors_palette';
import robots,{robots_InitialState} from '../RobboGui/reducers/robots';
import laboratories,{laboratories_InitialState} from '../RobboGui/reducers/laboratories';
import extension_pack,{extension_pack_InitialState} from '../RobboGui/reducers/extension_pack';
import color_corrector_table,{color_corrector_table_InitialState} from '../RobboGui/reducers/color_corrector_table';
import robbo_menu,{robbo_menu_InitialState} from '../RobboGui/reducers/robbo_menu';
import settings,{settings_InitialState} from '../RobboGui/reducers/settings';
import draggable_window,{draggable_window_InitialState} from '../RobboGui/reducers/draggable_window';
import devices_firmware_flasher,{devices_firmware_flasher_InitialState} from '../RobboGui/reducers/devices_firmware_flasher';

import thunk from 'redux-thunk';

const guiMiddleware = compose(  applyMiddleware(
        throttle(300, {leading: true, trailing: true}),
        thunk
    ));

const guiInitialState = {
    assetDrag: assetDragInitialState,
    blockDrag: blockDragInitialState,
    cards: cardsInitialState,
    colorPicker: colorPickerInitialState,
    customProcedures: customProceduresInitialState,
    editorTab: editorTabInitialState,
    mode: modeInitialState,
    hoveredTarget: hoveredTargetInitialState,
    stageSize: stageSizeInitialState,
    menus: menuInitialState,
    modals: modalsInitialState,
    monitors: monitorsInitialState,
    monitorLayout: monitorLayoutInitialState,
    projectId: projectIdInitialState,
    projectTitle: projectTitleInitialState,
    restoreDeletion: restoreDeletionInitialState,
    targets: targetsInitialState,
    toolbox: toolboxInitialState,
    vm: vmInitialState,
    vmStatus: vmStatusInitialState,


  robot_sensors:robot_sensors_InitialState,
  lab_external_sensors:lab_external_sensors_InitialState,
  robot_special_sensors:robot_special_sensors_InitialState,
  lab_special_sensors: lab_special_sensors_InitialState,
  sensors_choose_window:sensors_choose_window_InitialState,
  sensors_palette:sensors_palette_InitialState,
  robots:robots_InitialState,
  laboratories:laboratories_InitialState,
  extension_pack:extension_pack_InitialState,
  color_corrector_table:color_corrector_table_InitialState,
  robbo_menu:robbo_menu_InitialState,
  settings:settings_InitialState,
  draggable_window: draggable_window_InitialState,
  devices_firmware_flasher:devices_firmware_flasher_InitialState



};

const initPlayer = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {mode: {
            isFullScreen: currentState.mode.isFullScreen,
            isPlayerOnly: true
        }}
    );
};
const initFullScreen = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {mode: {
            isFullScreen: true,
            isPlayerOnly: currentState.mode.isPlayerOnly
        }}
    );
};

const guiReducer = combineReducers({
    assetDrag: assetDragReducer,
    blockDrag: blockDragReducer,
    cards: cardsReducer,
    colorPicker: colorPickerReducer,
    customProcedures: customProceduresReducer,
    editorTab: editorTabReducer,
    mode: modeReducer,
    hoveredTarget: hoveredTargetReducer,
    stageSize: stageSizeReducer,
    menus: menuReducer,
    modals: modalReducer,
    monitors: monitorReducer,
    monitorLayout: monitorLayoutReducer,
    projectId: projectIdReducer,
    projectTitle: projectTitleReducer,
    restoreDeletion: restoreDeletionReducer,
    targets: targetReducer,
    toolbox: toolboxReducer,
    vm: vmReducer,
    vmStatus: vmStatusReducer,

    robot_sensors:robot_sensors,
  lab_external_sensors:lab_external_sensors,
  robot_special_sensors: robot_special_sensors,
  lab_special_sensors: lab_special_sensors,
  sensors_choose_window:sensors_choose_window,
  sensors_palette:sensors_palette,
  robots:robots,
  laboratories:laboratories,
  extension_pack:extension_pack,
  color_corrector_table:color_corrector_table,
  robbo_menu:robbo_menu,
  settings:settings,
  draggable_window: draggable_window,
  devices_firmware_flasher:devices_firmware_flasher
});

export {
    guiReducer as default,
    guiInitialState,
    guiMiddleware,
    initFullScreen,
    initPlayer
};
