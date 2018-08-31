import React from 'react';

import analytics from './analytics';
import log from './log';
import storage from './storage';

/* Higher Order Component to provide behavior for loading projects by id from
 * the window's hash (#this part in the url)
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const ProjectLoaderHOC = function (WrappedComponent) {
    class ProjectLoaderComponent extends React.Component {
        constructor (props) {
            super(props);
            this.fetchProjectId = this.fetchProjectId.bind(this);
            this.updateProject = this.updateProject.bind(this);
            this.checkLocallySavedProject = this.checkLocallySavedProject.bind(this); //modified_by_Yaroslav
            this.state = {
                projectId: null,
                projectData: null
            };
        }
        componentDidMount () {
            window.addEventListener('hashchange', this.updateProject);
            this.updateProject();
        }
        componentDidUpdate (prevProps, prevState) {

          let json_valid = true;
          let json = {};

          this.checkLocallySavedProject().then((result) => {

            if (result.file_exists){

              try {

                  json = JSON.parse(result);
                  json_valid = true;

              }catch(e){

                  console.error('Failed to parse project. Error: ' + e );
                  json_valid = false;


              }
            }

              if ((result.file_exists) && (this.state.projectId !== prevState.projectId) && (json_valid)){



                this.setState({
                    projectData: result.file
                })


              }else if (this.state.projectId !== prevState.projectId) {
                  storage
                      .load(storage.AssetType.Project, this.state.projectId, storage.DataFormat.JSON)
                      .then(projectAsset => projectAsset && this.setState({
                          projectData: projectAsset.data.toString()
                      }))
                      .catch(err => log.error(err));
              }

          } ).catch();

            // if (this.state.projectId !== prevState.projectId) {
            //     storage
            //         .load(storage.AssetType.Project, this.state.projectId, storage.DataFormat.JSON)
            //         .then(projectAsset => projectAsset && this.setState({
            //             projectData: projectAsset.data.toString()
            //         }))
            //         .catch(err => log.error(err));
            // }
        }
        componentWillUnmount () {
            window.removeEventListener('hashchange', this.updateProject);
        }

        checkLocallySavedProject(){

                return new Promise((resolve,reject)=>{

                  function errorHandler(e){
                    console.error("file error during checkLocallySavedProject: " + e);
                  };

                  function onInitFs(fs) {
                     console.log('Opened file system: ' + fs.name);


                     fs.root.getFile("auto-saved" + "." + "json", {create: false}, function(fileEntry) {

                       fileEntry.file(function(file) {
                            var reader = new FileReader();

                            reader.onloadend = function(e) {
                               console.log("Read completed for " + "auto-saved" + "." + "json" + ". length=" + this.result.length);

                               let res = {};
                               res.file_exists = true;
                               res.file = this.result;
                               res.err = null;

                               resolve(res);
                            };

                            reader.readAsText(file);
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

        // checkLocallySavedProject(){
        //
        //         return new Promise((resolve,reject)=>{
        //
        //
        //
        //         });
        //
        // }

        fetchProjectId () {
            return window.location.hash.substring(1);
        }
        updateProject () {
            let projectId = this.fetchProjectId();
            if (projectId !== this.state.projectId) {
                if (projectId.length < 1) projectId = 0;
                this.setState({projectId: projectId});

                if (projectId !== 0) {
                    analytics.event({
                        category: 'project',
                        action: 'Load Project',
                        value: projectId,
                        nonInteraction: true
                    });
                }
            }
        }
        render () {
            if (!this.state.projectData) return null;
            return (
                <WrappedComponent
                    projectData={this.state.projectData}
                    {...this.props}
                />
            );
        }
    }

    return ProjectLoaderComponent;
};


export {
    ProjectLoaderHOC as default
};
