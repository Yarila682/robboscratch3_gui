 import AudioEngine from 'scratch-audio';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import {openExtensionLibrary} from '../reducers/modals.js';

import vmListenerHOC from '../lib/vm-listener-hoc.jsx';

import GUIComponent from '../components/gui/gui.jsx';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class GUI extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleTabSelect'
        ]);
        this.state = {tabIndex: 0};
    }

    autoSaveProjectToInternallChromeFolder(data, name, extension, callback){


      console.log("autoSaveProjectToInternallChromeFolder=" + name + " extension=" + extension + " data length=" + data.length);


      function errorHandler(e){
         console.log("file error during autosaving project" + e);
      };


      function onInitFs(fs) {
         console.log('Opened file system: ' + fs.name);


         fs.root.getFile(name + "." + extension, {create: true}, function(fileEntry) {

           fileEntry.remove(function() {

             fs.root.getFile(name + "." + extension, {create: true}, function(fileEntry) {

                fileEntry.createWriter(function(fileWriter) {

                   fileWriter.onwriteend = function(e) {

                      console.log('Write completed.');

                      if((callback) && ((data instanceof Blob))){
                        console.log('Data is  a blob. ');
                        // callback();
                      }
                   }

                   fileWriter.onerror = function(e) {
                      console.log('Write failed: ' + e.toString());
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


      // function onInitFs(fs) {
      //    console.log('Opened file system: ' + fs.name);
      //
      //
      //    fs.root.getFile(name + "." + extension, {create: true}, function(fileEntry) {
      //
      //       fileEntry.createWriter(function(fileWriter) {
      //
      //          fileWriter.onwriteend = function(e) {
      //
      //             console.log('Write completed.');
      //
      //             if((callback) && ((data instanceof Blob))){
      //               console.log('Data is  a blob. ');
      //               // callback();
      //             }
      //          }
      //
      //          fileWriter.onerror = function(e) {
      //             console.log('Write failed: ' + e.toString());
      //          };
      //
      //           if (!(data instanceof Blob)){
      //
      //          var bb = new Blob([data], {type: 'text'}); // Note: window.WebKitBlobBuilder in Chrome 12.
      //          fileWriter.write(bb);
      //
      //        }else{
      //
      //           fileWriter.write(data);
      //
      //
      //        }
      //
      //       });
      //    }, errorHandler);
      // };


      //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    //  window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);
      navigator.webkitPersistentStorage.requestQuota(50*1024*1024,
         function(grantedBytes){
            console.log("byte granted=" + grantedBytes);
            window.webkitRequestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
         }, errorHandler
      );

    //   window.webkitRequestFileSystem(window.PERSISTENT, 50*1024*1024, onInitFs, errorHandler);


      if((callback) && (!(data instanceof Blob))){

          console.log('Data is not a blob. Standart callback case.');
        // callback(name + "." + extension);
      }



    }

    autoSaveProject(){

        const json = this.props.vm.saveProjectSb3();

        console.log("project data to save: " + json);

        this.autoSaveProjectToInternallChromeFolder(json,"auto-saved","json");


    }

    startProjectAutosaving(){

        setInterval(() => {

            this.autoSaveProject();

        }, 10 * 1000)

    }

    componentDidMount () {
        this.audioEngine = new AudioEngine();
        this.props.vm.attachAudioEngine(this.audioEngine);
        this.props.vm.loadProject(this.props.projectData);
        this.props.vm.setCompatibilityMode(true);
        this.props.vm.start();

        this.startProjectAutosaving();


    }
    componentWillReceiveProps (nextProps) {
        if (this.props.projectData !== nextProps.projectData) {
            this.props.vm.loadProject(nextProps.projectData);
        }
    }
    componentWillUnmount () {
        this.props.vm.stopAll();
    }
    handleTabSelect (tabIndex) {
        this.setState({tabIndex});
    }
    render () {
        const {
            children,
            projectData, // eslint-disable-line no-unused-vars
            vm,
            ...componentProps
        } = this.props;
        return (
            <GUIComponent
                enableExtensions={window.location.search.includes('extensions')}
                tabIndex={this.state.tabIndex}
                vm={vm}
                onTabSelect={this.handleTabSelect}
                {...componentProps}
            >
                {children}
            </GUIComponent>
        );
    }
}

GUI.propTypes = {
    ...GUIComponent.propTypes,
    feedbackFormVisible: PropTypes.bool,
    previewInfoVisible: PropTypes.bool,
    projectData: PropTypes.string,
    vm: PropTypes.instanceOf(VM)
};

GUI.defaultProps = GUIComponent.defaultProps;

const mapStateToProps = state => ({
    feedbackFormVisible: state.modals.feedbackForm,
    previewInfoVisible: state.modals.previewInfo
  //  saveProjectSb3: state.vm.saveProjectSb3.bind(state.vm)
});

const mapDispatchToProps = dispatch => ({
    onExtensionButtonClick: () => dispatch(openExtensionLibrary())

});

const ConnectedGUI = connect(
    mapStateToProps,
    mapDispatchToProps,
)( DragDropContext(HTML5Backend)(GUI));

export default vmListenerHOC(ConnectedGUI);
