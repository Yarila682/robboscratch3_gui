import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import ButtonComponent from '../components/button/button.jsx';
import {ComingSoonTooltip} from '../components/coming-soon/coming-soon.jsx';


class SaveButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick () {
        const json = this.props.saveProjectSb3();

        // Download project data into a file - create link element,
        // simulate click on it, and then remove it.
      //  const saveLink = document.createElement('a');
    //    saveLink.setAttribute("target","_blank");

      //  document.body.appendChild(saveLink);

        const data = new Blob([json], {type: 'text'});
    //    const url = window.URL.createObjectURL(data);
    //    saveLink.href = url;

        // File name: project-DATE-TIME
        const date = new Date();
        const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
      //  saveLink.download = `project-${timestamp}.json`;
    //    saveLink.click();
    //    window.URL.revokeObjectURL(url);
    //    document.body.removeChild(saveLink);


    function exportToFileEntry(fileEntry) {

        //  savedFileEntry = fileEntry;



          // Use this to get a file path appropriate for displaying
          chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
        //    fileDisplayPath = path;
        //    status.innerText = 'Exporting to '+path;
          });

      //    getTodosAsText( function(contents) {

            fileEntry.createWriter(function(fileWriter) {

              var truncated = false;
          //    var blob = new Blob([contents]);

              fileWriter.onwriteend = function(e) {
                // if (!truncated) {
                //   truncated = true;
                //   // You need to explicitly set the file size to truncate
                //   // any content that might have been there before
                //   this.truncate(blob.size);
                //
                //   console.log(`Saving project to ${path} completed`);
                //
                //   return;
                // }

                  console.log(`Saving project to ${path} completed`);

            //    status.innerText = 'Export to '+fileDisplayPath+' completed';
              };

              fileWriter.onerror = function(e) {

                console.log(`Saving project file failed: ${e.toString()}`);
            //    status.innerText = 'Export failed: '+e.toString();
              };

              fileWriter.write(data);

            });
        //  });
}


    chrome.fileSystem.chooseEntry( {

          type: 'saveFile',
          suggestedName: `project.json`,   //  suggestedName: `project-${timestamp}.json`,
          accepts: [ { description: 'Robboscratch3 save files (*.json)',
                      extensions: ['json']} ],
          acceptsAllTypes: true
          }, exportToFileEntry);

    }
    render () {
        const {
            saveProjectSb3, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (

                <ButtonComponent
                    enabled
                    onClick={this.handleClick}
                    {...props}
                >
                    Save
                </ButtonComponent>

        );
    }
}

SaveButton.propTypes = {
    saveProjectSb3: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    saveProjectSb3: state.vm.saveProjectSb3.bind(state.vm)
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SaveButton);
