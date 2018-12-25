import AudioEngine from 'scratch-audio';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';

import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import {openExtensionLibrary} from '../reducers/modals';
import {setProjectTitle} from '../reducers/project-title';
import {
    activateTab,
    BLOCKS_TAB_INDEX,
    COSTUMES_TAB_INDEX,
    SOUNDS_TAB_INDEX
} from '../reducers/editor-tab';

import {
    closeCostumeLibrary,
    closeBackdropLibrary
} from '../reducers/modals';

import ProjectLoaderHOC from '../lib/project-loader-hoc.jsx';
import vmListenerHOC from '../lib/vm-listener-hoc.jsx';

import GUIComponent from '../components/gui/gui.jsx';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { withAlert } from 'react-alert';

class GUI extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: !props.vm.initialized,
            loadingError: false,
            errorMessage: ''
        };
    }


    autoSaveProjectToInternallChromeFolder(data, name, extension, callback){


  //  console.log("autoSaveProjectToInternallChromeFolder=" + name + " extension=" + extension + " data length=" + data.length);


    function errorHandler(e){
       console.error("file error during autosaving project" + e);
    };


    function onInitFs(fs) {
    //   console.log('Opened file system: ' + fs.name);


       fs.root.getFile(name + "." + extension, {create: true}, function(fileEntry) {

         fileEntry.remove(function() {

           fs.root.getFile(name + "." + extension, {create: true}, function(fileEntry) {

              fileEntry.createWriter(function(fileWriter) {

                 fileWriter.onwriteend = function(e) {

                  //  console.log('Write completed.');

                    if((callback) && ((data instanceof Blob))){
                  //    console.log('Data is  a blob. ');
                      // callback();
                    }
                 }

                 fileWriter.onerror = function(e) {
                    console.error('Write failed: ' + e.toString());
                 };

                  if (!(data instanceof Blob)){

                 var bb = new Blob([data], {type: 'text'}); // Note: window.WebKitBlobBuilder in Chrome 12.
                 fileWriter.write(bb);

               }else{

                  fileWriter.write(data);


               }

              });
           }, errorHandler);

            });

            }, errorHandler);



    };



    navigator.webkitPersistentStorage.requestQuota(50*1024*1024,
       function(grantedBytes){
    //      console.log("byte granted=" + grantedBytes);
          window.webkitRequestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
       }, errorHandler
    );

  //   window.webkitRequestFileSystem(window.PERSISTENT, 50*1024*1024, onInitFs, errorHandler);


    if((callback) && (!(data instanceof Blob))){

    //    console.log('Data is not a blob. Standart callback case.');
      // callback(name + "." + extension);
    }



  }

  deleteAutoSave(name){

    var  errorHandler = function(e){
       console.error("File error during removing bad autosave: " + e);
    };

    var _onInitFs = function(fs){

         fs.root.getFile(name, {create: false}, function(fileEntry) {

           fileEntry.remove(() => {

                console.log('File auto-saved.sb3 was removed.');

              }, errorHandler);

      }, errorHandler);

    }


    navigator.webkitPersistentStorage.requestQuota(50*1024*1024,
       function(grantedBytes){
    //      console.log("byte granted=" + grantedBytes);
          window.webkitRequestFileSystem(PERSISTENT, grantedBytes, _onInitFs, errorHandler);
       }, errorHandler);


  }

  autoSaveProject(){

      // this.props.vm.saveProjectSb3()
      //  .then( project_data => {
      //
      // //   console.log("project data to save: " + project_data);
      //
      //    this.autoSaveProjectToInternallChromeFolder(project_data,"auto-saved","sb3");
      //
      //  })
      //
      // .catch(err => {})

        this.props.vm.saveProjectSb3_auto();




  }

  startProjectAutosaving(){

      setInterval(() => { // TODO: not to save when error

          this.autoSaveProject();

      }, 10 * 1000)

  }

    componentDidMount () {
        if (this.props.projectTitle) {
            this.props.onUpdateReduxProjectTitle(this.props.projectTitle);
        }

        if (this.props.vm.initialized) return;
        this.audioEngine = new AudioEngine();
        this.props.vm.attachAudioEngine(this.audioEngine);
        this.props.vm.loadProject(this.props.projectData)
            .then(() => {
                this.setState({loading: false}, () => {
                    this.props.vm.setCompatibilityMode(false);//modified_by_Yaroslav
                    this.props.vm.start();

                    this.startProjectAutosaving(); //added_by_Yaroslav not original

                });
            })
            .catch(e => {
                // Need to catch this error and update component state so that
                // error page gets rendered if project failed to load
                this.setState({loadingError: true, errorMessage: e});
            });
        this.props.vm.initialized = true;
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.projectData !== nextProps.projectData) {
            this.setState({loading: true}, () => {
                this.props.vm.loadProject(nextProps.projectData)
                    .then(() => {
                        this.setState({loading: false});
                    })
                    .catch(e => {
                        // Need to catch this error and update component state so that
                        // error page gets rendered if project failed to load
                        this.setState({loadingError: true, errorMessage: e});
                    });
            });
        }
        if (this.props.projectTitle !== nextProps.projectTitle) {
            this.props.onUpdateReduxProjectTitle(nextProps.projectTitle);
        }
    }
    render () {
        if (this.state.loadingError) {

        //  const alert = this.props.alert.error(`Failed to load project. Error:  ${this.state.errorMessage}`,{timeout:0});

              this.props.alert.error(<div>{`Failed to load project. Error:  ${this.state.errorMessage}`}</div>,{timeout:0});

              this.deleteAutoSave("auto-saved.sb3");

            throw new Error(
                `Failed to load project. Error: ${this.state.errorMessage}`);


        }
        const {
            /* eslint-disable no-unused-vars */
            assetHost,
            hideIntro,
            onUpdateReduxProjectTitle,
            projectData,
            projectHost,
            projectTitle,
            /* eslint-enable no-unused-vars */
            children,
            fetchingProject,
            loadingStateVisible,
            vm,
            ...componentProps
        } = this.props;
        return (
            <GUIComponent
                loading={fetchingProject || this.state.loading || loadingStateVisible}
                vm={vm}
                {...componentProps}
            >
                {children}
            </GUIComponent>
        );
    }
}

GUI.propTypes = {
    assetHost: PropTypes.string,
    children: PropTypes.node,
    fetchingProject: PropTypes.bool,
    hideIntro: PropTypes.bool,
    importInfoVisible: PropTypes.bool,
    loadingStateVisible: PropTypes.bool,
    onSeeCommunity: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    onUpdateReduxProjectTitle: PropTypes.func,
    previewInfoVisible: PropTypes.bool,
    projectData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    projectHost: PropTypes.string,
    projectTitle: PropTypes.string,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = (state, ownProps) => ({
    activeTabIndex: state.scratchGui.editorTab.activeTabIndex,
    backdropLibraryVisible: state.scratchGui.modals.backdropLibrary,
    blocksTabVisible: state.scratchGui.editorTab.activeTabIndex === BLOCKS_TAB_INDEX,
    cardsVisible: state.scratchGui.cards.visible,
    costumeLibraryVisible: state.scratchGui.modals.costumeLibrary,
    costumesTabVisible: state.scratchGui.editorTab.activeTabIndex === COSTUMES_TAB_INDEX,
    importInfoVisible: state.scratchGui.modals.importInfo,
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl,
    loadingStateVisible: state.scratchGui.modals.loadingProject,
    previewInfoVisible: state.scratchGui.modals.previewInfo && !ownProps.hideIntro,
    targetIsStage: (
        state.scratchGui.targets.stage &&
        state.scratchGui.targets.stage.id === state.scratchGui.targets.editingTarget
    ),
    soundsTabVisible: state.scratchGui.editorTab.activeTabIndex === SOUNDS_TAB_INDEX,
    tipsLibraryVisible: state.scratchGui.modals.tipsLibrary
});

const mapDispatchToProps = dispatch => ({
    onExtensionButtonClick: () => dispatch(openExtensionLibrary()),
    onActivateTab: tab => dispatch(activateTab(tab)),
    onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX)),
    onActivateSoundsTab: () => dispatch(activateTab(SOUNDS_TAB_INDEX)),
    onRequestCloseBackdropLibrary: () => dispatch(closeBackdropLibrary()),
    onRequestCloseCostumeLibrary: () => dispatch(closeCostumeLibrary()),
    onUpdateReduxProjectTitle: title => dispatch(setProjectTitle(title))
});

const ConnectedGUI = connect(
    mapStateToProps,
    mapDispatchToProps,
)( DragDropContext(HTML5Backend)(withAlert(GUI)));

const WrappedGui = ErrorBoundaryHOC('Top Level App')(
    ProjectLoaderHOC(vmListenerHOC(ConnectedGUI))
);

WrappedGui.setAppElement = ReactModal.setAppElement;
export default WrappedGui;
