import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setProjectId} from '../reducers/project-id';

import analytics from './analytics';
import log from './log';
import storage from './storage';

const validate = require('scratch-parser');

/* Higher Order Component to provide behavior for loading projects by id. If
 * there's no id, the default project is loaded.
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const ProjectLoaderHOC = function (WrappedComponent) {
    class ProjectLoaderComponent extends React.Component {
        constructor (props) {
            super(props);
            this.updateProject = this.updateProject.bind(this);
            this.state = {
                projectData: null,
                fetchingProject: false
            };
            storage.setProjectHost(props.projectHost);
            storage.setAssetHost(props.assetHost);
            props.setProjectId(props.projectId);
            if (
                props.projectId !== '' &&
                props.projectId !== null &&
                typeof props.projectId !== 'undefined'
            ) {
                this.updateProject(props.projectId);
            }
        }
        componentWillUpdate (nextProps) {
            if (this.props.projectHost !== nextProps.projectHost) {
                storage.setProjectHost(nextProps.projectHost);
            }
            if (this.props.assetHost !== nextProps.assetHost) {
                storage.setAssetHost(nextProps.assetHost);
            }
            if (this.props.projectId !== nextProps.projectId) {
                this.props.setProjectId(nextProps.projectId);
                this.setState({fetchingProject: true}, () => {
                    this.updateProject(nextProps.projectId);
                });
            }
        }


        validateProject(input){

          if (typeof input === 'object' && !(input instanceof ArrayBuffer) &&
            !ArrayBuffer.isView(input)) {
              // If the input is an object and not any ArrayBuffer
              // or an ArrayBuffer view (this includes all typed arrays and DataViews)
              // turn the object into a JSON string, because we suspect
              // this is a project.json as an object
              // validate expects a string or buffer as input
              // TODO not sure if we need to check that it also isn't a data view
              input = JSON.stringify(input);
          }

          const validationPromise = new Promise((resolve, reject) => {
              // The second argument of false below indicates to the validator that the
              // input should be parsed/validated as an entire project (and not a single sprite)
              validate(input, false, (error, res) => {
                  if (error) return reject(error);
                  resolve(res);
              });
          });

          return validationPromise
              .then(result => {return Promise.resolve(input)})
              .catch(error => {
                  // Intentionally rejecting here (want errors to be handled by caller)
                  if (error.hasOwnProperty('validationError')) {
                      return Promise.reject(JSON.stringify(error));
                  }
                  return Promise.reject(error);
              });

        }


        checkLocallySavedProject(){

              return new Promise((resolve,reject)=>{

                function errorHandler(e){
                  console.error("File error during checkLocallySavedProject: " + e);
                };

                function onInitFs(fs) {
                   console.log('Opened file system: ' + fs.name);


                   fs.root.getFile("auto-saved" + "." + "sb3", {create: false}, function(fileEntry) {

                     fileEntry.file(function(file) {
                          var reader = new FileReader();

                          reader.onloadend = function(e) {
                             console.log("Read completed for " + "auto-saved" + "." + "sb3" + ". length=" + this.result.length);

                             let res = {};
                             res.file_exists = true;
                             res.file = this.result;
                             res.err = null;

                             resolve(res);
                          };

                          reader.readAsArrayBuffer(file);
                       });


                   }, function(e){

                     let res = {};

                     res.file_exists = false;
                     res.file = null;
                     res.err = e;

                     resolve(res);

                   });
                };


                //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
                //window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);
                navigator.webkitPersistentStorage.requestQuota(50*1024*1024,
                   function(grantedBytes){
                      console.log("checkLocallySavedProject byte granted=" + grantedBytes);
                      window.webkitRequestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
                   }, errorHandler
                );

              //   window.webkitRequestFileSystem(window.PERSISTENT, 50*1024*1024, onInitFs, errorHandler);

              });

      }

        updateProject (projectId) {


       // let json_valid = true;
       // let json = {};

       this.checkLocallySavedProject().then((result) => {


        if (result.file_exists){

         this.validateProject(result.file)

         .then((file) => {

           this.setState({

                     projectData: file,
                     fetchingProject: false
                })

         })

         .catch(error => {

           storage
               .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
               .then(projectAsset => projectAsset && this.setState({
                   projectData: projectAsset.data,
                   fetchingProject: false
               }))

             //  .catch(err => log.error(err));
             .catch(err => console.error("Project load error: " + err));

         });

       }else {
         storage
             .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
             .then(projectAsset => projectAsset && this.setState({
                 projectData: projectAsset.data,
                 fetchingProject: false
             }))

           //  .catch(err => log.error(err));
           .catch(err => console.error("Project load error: " + err));
       }



         // if (result.file_exists){
         //
         //   try {
         //
         //       console.log("saved_project: " + result.file);
         //
         //       json = JSON.parse(result.file);
         //       json_valid = true;
         //
         //   }catch(e){
         //
         //       console.error('Failed to parse project. Error: ' + e );
         //       json_valid = false;
         //
         //
         //   }
         // }

       //     if ( (result.file_exists)  && (json_valid) ){
       //
       //
       //
       //       this.setState({
       //           projectData: result.file,
       //            fetchingProject: false
       //       })
       //
       //
       //     }else {
       //       storage
       //           .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
       //           .then(projectAsset => projectAsset && this.setState({
       //               projectData: projectAsset.data,
       //               fetchingProject: false
       //           }))
       //
       //         //  .catch(err => log.error(err));
       //         .catch(err => console.error("Project load error: " + err));
       //     }
       //
       // } ).catch();


            // storage
            //     .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
            //     .then(projectAsset => projectAsset && this.setState({
            //         projectData: projectAsset.data,
            //         fetchingProject: false
            //     }))
            //     .then(() => {
            //         if (projectId !== 0) {
            //             analytics.event({
            //                 category: 'project',
            //                 action: 'Load Project',
            //                 label: projectId,
            //                 nonInteraction: true
            //             });
            //         }
            //     })
            //   //  .catch(err => log.error(err));
              //.catch(err => console.error("Project load error: " + err));
              
            });
        }

        render () {
            const {
                /* eslint-disable no-unused-vars */
                assetHost,
                projectHost,
                projectId,
                setProjectId: setProjectIdProp,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            if (!this.state.projectData) return null;
            return (
                <WrappedComponent
                    fetchingProject={this.state.fetchingProject}
                    projectData={this.state.projectData}
                    {...componentProps}
                />
            );
        }
    }
    ProjectLoaderComponent.propTypes = {
        assetHost: PropTypes.string,
        projectHost: PropTypes.string,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setProjectId: PropTypes.func
    };
    ProjectLoaderComponent.defaultProps = {
        assetHost: 'https://assets.scratch.mit.edu',
        projectHost: 'https://projects.scratch.mit.edu',
        projectId: 0
    };

    const mapStateToProps = () => ({});

    const mapDispatchToProps = dispatch => ({
        setProjectId: id => dispatch(setProjectId(id))
    });

    return connect(mapStateToProps, mapDispatchToProps)(ProjectLoaderComponent);
};

export {
    ProjectLoaderHOC as default
};
