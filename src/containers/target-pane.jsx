import bindAll from 'lodash.bindall';
import React from 'react';

import {connect} from 'react-redux';

import {
    openSpriteLibrary,
    closeSpriteLibrary
} from '../reducers/modals';

import {activateTab, COSTUMES_TAB_INDEX} from '../reducers/editor-tab';
import {setReceivedBlocks} from '../reducers/hovered-target';
import {setRestore} from '../reducers/restore-deletion';
import DragConstants from '../lib/drag-constants';
import TargetPaneComponent from '../components/target-pane/target-pane.jsx';
import spriteLibraryContent from '../lib/libraries/sprites.json';
import {handleFileUpload, spriteUpload} from '../lib/file-uploader.js';

class TargetPane extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlockDragEnd',
            'handleChangeSpriteRotationStyle',
            'handleChangeSpriteDirection',
            'handleChangeSpriteName',
            'handleChangeSpriteSize',
            'handleChangeSpriteVisibility',
            'handleChangeSpriteX',
            'handleChangeSpriteY',
            'handleDeleteSprite',
            'handleDrop',
            'handleDuplicateSprite',
            'handleExportSprite',
            'handleNewSprite',
            'handleSelectSprite',
            'handleSurpriseSpriteClick',
            'handlePaintSpriteClick',
            'handleFileUploadClick',
            'handleSpriteUpload',
            'setFileInput'
        ]);
    }

    shouldComponentUpdate (nextProps, nextState) {



            let state = this.state;
            let props = this.props;

            let next_state = nextState;

            let next_props = nextProps;

            let is_equal = (JSON.stringify(nextProps) === JSON.stringify(this.props));
          //  return true;]

          return  !is_equal;
    }

    componentDidUpdate (prevProps) {

      function deepCompare () {
  var i, l, leftChain, rightChain;

  function compare2Objects (x, y) {
    var p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
         return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
        return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if ((typeof x === 'function' && typeof y === 'function') ||
       (x instanceof Date && y instanceof Date) ||
       (x instanceof RegExp && y instanceof RegExp) ||
       (x instanceof String && y instanceof String) ||
       (x instanceof Number && y instanceof Number)) {
        return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
        return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
        return false;
    }

    if (x.constructor !== y.constructor) {
        return false;
    }

    if (x.prototype !== y.prototype) {
        return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
         return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
        }
        else if (typeof y[p] !== typeof x[p]) {
            return false;
        }
    }

    for (p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
        }
        else if (typeof y[p] !== typeof x[p]) {
            return false;
        }

        switch (typeof (x[p])) {
            case 'object':
            case 'function':

                leftChain.push(x);
                rightChain.push(y);

                if (!compare2Objects (x[p], y[p])) {
                    return false;
                }

                leftChain.pop();
                rightChain.pop();
                break;

            default:
                if (x[p] !== y[p]) {
                    return false;
                }
                break;
        }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {

      leftChain = []; //Todo: this can be cached
      rightChain = [];

      if (!compare2Objects(arguments[0], arguments[i])) {
          return false;
      }
  }

  return true;
}

      var recursive_compare = function(prev, current,recursive_depth,_key){

        let _recursive_depth = recursive_depth + 1;

          if ( (prev !== null ) && (typeof(prev) !== 'undefined') ) {


            if ( (Array.isArray(prev)) || (typeof(prev) === 'object') ){

              for (var key in prev) {
              if (prev.hasOwnProperty(key)) {

                if (prev[key] != current[key]) {

            //  if ( deepCompare(prev[key],current[key]) ){

                  console.log(
                             `property ${key} changed from ${prev[key]} to ${
                                 current[key]
                             }`
                         );


                    recursive_compare(prev[key],current[key],_recursive_depth,key);

                }


              }else if (recursive_depth >= 2){

                if (prev[key] != current[key]) {

                  console.log(
                             `proto property ${key} changed from ${prev[key]} to ${
                                 current[key]
                             }`
                         );


                  //  recursive_compare(prev[key],current[key],_recursive_depth,key);

                }


              }
          }

            //   Object.keys(prev).forEach(key => {
            //
            // });


            }else{

              console.log(`property ${_key} changed from ${prev} to ${current}`);



            }

        }


      }

    //  recursive_compare(prevProps,this.props,1);






    }

    componentDidMount () {
        this.props.vm.addListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
    }
    componentWillUnmount () {
        this.props.vm.removeListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
    }
    handleChangeSpriteDirection (direction) {
        this.props.vm.postSpriteInfo({direction});
    }
    handleChangeSpriteRotationStyle (rotationStyle) {
        this.props.vm.postSpriteInfo({rotationStyle});
    }
    handleChangeSpriteName (name) {
        this.props.vm.renameSprite(this.props.editingTarget, name);
    }
    handleChangeSpriteSize (size) {
        this.props.vm.postSpriteInfo({size});
    }
    handleChangeSpriteVisibility (visible) {
        this.props.vm.postSpriteInfo({visible});
    }
    handleChangeSpriteX (x) {
        this.props.vm.postSpriteInfo({x});
    }
    handleChangeSpriteY (y) {
        this.props.vm.postSpriteInfo({y});
    }
    handleDeleteSprite (id) {
        const restoreFun = this.props.vm.deleteSprite(id);
        this.props.dispatchUpdateRestore({
            restoreFun: restoreFun,
            deletedItem: 'Sprite'
        });

    }
    handleDuplicateSprite (id) {
        this.props.vm.duplicateSprite(id);
    }
    handleExportSprite (id) {
        const spriteName = this.props.vm.runtime.getTargetById(id).getName();
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        this.props.vm.exportSprite(id).then(content => {
            const filename = `${spriteName}.sprite3`;

            // Use special ms version if available to get it working on Edge.
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(content, filename);
                return;
            }

            const url = window.URL.createObjectURL(content);
            saveLink.href = url;
            saveLink.download = filename;
            saveLink.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(saveLink);
        });
    }
    handleSelectSprite (id) {
        this.props.vm.setEditingTarget(id);
    }
    handleSurpriseSpriteClick () {
        const item = spriteLibraryContent[Math.floor(Math.random() * spriteLibraryContent.length)];
        this.props.vm.addSprite(JSON.stringify(item.json));
    }
    handlePaintSpriteClick () {
        // @todo this is brittle, will need to be refactored for localized libraries
        const emptyItem = spriteLibraryContent.find(item => item.name === 'Empty');
        if (emptyItem) {
            this.props.vm.addSprite(JSON.stringify(emptyItem.json)).then(() => {
                setTimeout(() => { // Wait for targets update to propagate before tab switching
                    this.props.onActivateTab(COSTUMES_TAB_INDEX);
                });
            });
        }
    }
    handleNewSprite (spriteJSONString) {
        this.props.vm.addSprite(spriteJSONString);
    }
    handleFileUploadClick () {
        this.fileInput.click();
    }
    handleSpriteUpload (e) {
        const storage = this.props.vm.runtime.storage;
        handleFileUpload(e.target, (buffer, fileType, fileName) => {
            spriteUpload(buffer, fileType, fileName, storage, this.handleNewSprite);
        });
    }
    setFileInput (input) {
        this.fileInput = input;
    }
    handleBlockDragEnd (blocks) {
        if (this.props.hoveredTarget.sprite && this.props.hoveredTarget.sprite !== this.props.editingTarget) {
            this.props.vm.shareBlocksToTarget(blocks, this.props.hoveredTarget.sprite, this.props.editingTarget);
            this.props.onReceivedBlocks(true);
        }
    }
    handleDrop (dragInfo) {
        const {sprite: targetId} = this.props.hoveredTarget;
        if (dragInfo.dragType === DragConstants.SPRITE) {
            // Add one to both new and target index because we are not counting/moving the stage
            this.props.vm.reorderTarget(dragInfo.index + 1, dragInfo.newIndex + 1);
        } else if (dragInfo.dragType === DragConstants.BACKPACK_SPRITE) {
            // TODO storage does not have a way of loading zips right now, and may never need it.
            // So for now just grab the zip manually.
            fetch(dragInfo.payload.bodyUrl)
                .then(response => response.arrayBuffer())
                .then(sprite3Zip => this.props.vm.addSprite(sprite3Zip));
        } else if (targetId) {
            // Something is being dragged over one of the sprite tiles or the backdrop.
            // Dropping assets like sounds and costumes duplicate the asset on the
            // hovered target. Shared costumes also become the current costume on that target.
            // However, dropping does not switch the editing target or activate that editor tab.
            // This is based on 2.0 behavior, but seems like it keeps confusing switching to a minimum.
            // it allows the user to share multiple things without switching back and forth.
            if (dragInfo.dragType === DragConstants.COSTUME) {
                this.props.vm.shareCostumeToTarget(dragInfo.index, targetId);
            } else if (targetId && dragInfo.dragType === DragConstants.SOUND) {
                this.props.vm.shareSoundToTarget(dragInfo.index, targetId);
            } else if (dragInfo.dragType === DragConstants.BACKPACK_COSTUME) {
                // In scratch 2, this only creates a new sprite from the costume.
                // We may be able to handle both kinds of drops, depending on where
                // the drop happens. For now, just add the costume.
                this.props.vm.addCostume(dragInfo.payload.body, {
                    name: dragInfo.payload.name
                }, targetId);
            } else if (dragInfo.dragType === DragConstants.BACKPACK_SOUND) {
                this.props.vm.addSound({
                    md5: dragInfo.payload.body,
                    name: dragInfo.payload.name
                }, targetId);
            }
        }
    }
    render () {
        const {
            onActivateTab, // eslint-disable-line no-unused-vars
            onReceivedBlocks, // eslint-disable-line no-unused-vars
            dispatchUpdateRestore, // eslint-disable-line no-unused-vars
            ...componentProps
        } = this.props;
        return (
            <TargetPaneComponent
                {...componentProps}
                fileInputRef={this.setFileInput}
                onChangeSpriteDirection={this.handleChangeSpriteDirection}
                onChangeSpriteName={this.handleChangeSpriteName}
                onChangeSpriteRotationStyle={this.handleChangeSpriteRotationStyle}
                onChangeSpriteSize={this.handleChangeSpriteSize}
                onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
                onChangeSpriteX={this.handleChangeSpriteX}
                onChangeSpriteY={this.handleChangeSpriteY}
                onDeleteSprite={this.handleDeleteSprite}
                onDrop={this.handleDrop}
                onDuplicateSprite={this.handleDuplicateSprite}
                onExportSprite={this.handleExportSprite}
                onFileUploadClick={this.handleFileUploadClick}
                onPaintSpriteClick={this.handlePaintSpriteClick}
                onSelectSprite={this.handleSelectSprite}
                onSpriteUpload={this.handleSpriteUpload}
                onSurpriseSpriteClick={this.handleSurpriseSpriteClick}
            />
        );
    }
}

const {
    onSelectSprite, // eslint-disable-line no-unused-vars
    ...targetPaneProps
} = TargetPaneComponent.propTypes;

TargetPane.propTypes = {
    ...targetPaneProps
};

const mapStateToProps = state => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    hoveredTarget: state.scratchGui.hoveredTarget,
    sprites: Object.keys(state.scratchGui.targets.sprites).reduce((sprites, k) => {
        let {direction, size, x, y, ...sprite} = state.scratchGui.targets.sprites[k];
        if (typeof direction !== 'undefined') direction = Math.round(direction);
        if (typeof x !== 'undefined') x = Math.round(x);
        if (typeof y !== 'undefined') y = Math.round(y);
        if (typeof size !== 'undefined') size = Math.round(size);
        sprites[k] = {...sprite, direction, size, x, y};
        return sprites;
    }, {}),
    stage: state.scratchGui.targets.stage,
    raiseSprites: state.scratchGui.blockDrag,
    spriteLibraryVisible: state.scratchGui.modals.spriteLibrary
});
const mapDispatchToProps = dispatch => ({
    onNewSpriteClick: e => {
        e.preventDefault();
        dispatch(openSpriteLibrary());
    },
    onRequestCloseSpriteLibrary: () => {
        dispatch(closeSpriteLibrary());
    },
    onActivateTab: tabIndex => {
        dispatch(activateTab(tabIndex));
    },
    onReceivedBlocks: receivedBlocks => {
        dispatch(setReceivedBlocks(receivedBlocks));
    },
    dispatchUpdateRestore: restoreState => {
        dispatch(setRestore(restoreState));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetPane);
