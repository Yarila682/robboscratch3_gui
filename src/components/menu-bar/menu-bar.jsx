import classNames from 'classnames';
import {connect} from 'react-redux';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import Divider from '../divider/divider.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import ProjectLoader from '../../containers/project-loader.jsx';
import Menu from '../../containers/menu.jsx';
import {MenuItem, MenuSection} from '../menu/menu.jsx';
import ProjectTitleInput from './project-title-input.jsx';
import ProjectSaver from '../../containers/project-saver.jsx';
import DeletionRestorer from '../../containers/deletion-restorer.jsx';
import TurboMode from '../../containers/turbo-mode.jsx';

import {openTipsLibrary} from '../../reducers/modals';
import {setPlayer} from '../../reducers/mode';
import {
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen
} from '../../reducers/menus';

import styles from './menu-bar.css';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import mystuffIcon from './icon--mystuff.png';
import feedbackIcon from './icon--feedback.svg';
import profileIcon from './icon--profile.png';
import communityIcon from './icon--see-community.svg';
import dropdownCaret from '../language-selector/dropdown-caret.svg';
import languageIcon from '../language-selector/language-icon.svg';

import scratchLogo from './scratch-logo.svg';

import {ActionTriggerRobboMenu} from '../../RobboGui/actions/sensor_actions.js'; //Robbo //modified_by_Yaroslav

import storage from '../../lib/storage'

const ariaMessages = defineMessages({
    language: {
        id: 'gui.menuBar.LanguageSelector',
        defaultMessage: 'language selector',
        description: 'accessibility text for the language selection menu'
    },
    tutorials: {
        id: 'gui.menuBar.tutorialsLibrary',
        defaultMessage: 'Tutorials',
        description: 'accessibility text for the tutorials button'
    }
});

const MenuBarItemTooltip = ({
    children,
    className,
    enable,
    id,
    place = 'bottom'
}) => {
    if (enable) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
    return (
        <ComingSoonTooltip
            className={classNames(styles.comingSoon, className)}
            place={place}
            tooltipClassName={styles.comingSoonTooltip}
            tooltipId={id}
        >
            {children}
        </ComingSoonTooltip>
    );
};


MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    enable: PropTypes.bool,
    id: PropTypes.string,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const MenuItemTooltip = ({id, isRtl, children, className}) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        isRtl={isRtl}
        place={isRtl ? 'left' : 'right'}
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    isRtl: PropTypes.bool
};

const MenuBarMenu = ({
    children,
    onRequestClose,
    open,
    place = 'right'
}) => (
    <Menu
        className={styles.menu}
        open={open}
        place={place}
        onRequestClose={onRequestClose}
    >
        {children}
    </Menu>
);

MenuBarMenu.propTypes = {
    children: PropTypes.node,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    place: PropTypes.oneOf(['left', 'right'])
};
class MenuBar extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleLanguageMouseUp',
            'handleRestoreOption',
            'handleCloseFileMenuAndThen',
            'restoreOptionMessage'
        ]);
        this.state = {projectSaveInProgress: false};
    }
    handleLanguageMouseUp (e) {
        if (!this.props.languageMenuOpen) {
            this.props.onClickLanguage(e);
        }
    }
    handleRestoreOption (restoreFun) {
        return () => {
            restoreFun();
            this.props.onRequestCloseEdit();
        };
    }
    handleUpdateProject (updateFun) {
        return () => {
            this.props.onRequestCloseFile();
            this.setState({projectSaveInProgress: true},
                () => {
                    updateFun().then(() => {
                        this.setState({projectSaveInProgress: false});
                    });
                }
            );
        };
    }
    handleCloseFileMenuAndThen (fn) {
        return () => {
            this.props.onRequestCloseFile();
            fn();
        };
    }
    restoreOptionMessage (deletedItem) {
        switch (deletedItem) {
        case 'Sprite':
            return (<FormattedMessage
                defaultMessage="Restore Sprite"
                description="Menu bar item for restoring the last deleted sprite."
                id="gui.menuBar.restoreSprite"
            />);
        case 'Sound':
            return (<FormattedMessage
                defaultMessage="Restore Sound"
                description="Menu bar item for restoring the last deleted sound."
                id="gui.menuBar.restoreSound"
            />);
        case 'Costume':
            return (<FormattedMessage
                defaultMessage="Restore Costume"
                description="Menu bar item for restoring the last deleted costume."
                id="gui.menuBar.restoreCostume"
            />);
        default: {
            return (<FormattedMessage
                defaultMessage="Restore"
                description="Menu bar item for restoring the last deleted item in its disabled state." /* eslint-disable-line max-len */
                id="gui.menuBar.restore"
            />);
        }
        }
    }

  newProject(){

    storage
        .load(storage.AssetType.Project, 0, storage.DataFormat.JSON)
        .then((projectAsset) => {

          this.props.vm.loadProject(projectAsset.data)

        })
        .catch(err => console.error("Project load error: " + err));

  }

    render () {
        const saveNowMessage = (
            <FormattedMessage
                defaultMessage="Save now"
                description="Menu bar item for saving now"
                id="gui.menuBar.saveNow"
            />
        );
        return (
            <Box
                className={classNames(styles.menuBar, {
                    [styles.saveInProgress]: this.state.projectSaveInProgress
                })}
            >
                <div className={styles.mainMenu}>
                    <div className={styles.fileGroup}>
                        <div className={classNames(styles.menuBarItem)}>

                                <img
                                    alt="Scratch"
                                    className={styles.scratchLogo}
                                    draggable={false}
                                    src={scratchLogo}
                                />
                          
                        </div>
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
                        >
                            <div>
                                <img
                                    className={styles.languageIcon}
                                    src={languageIcon}
                                />
                                <img
                                    className={styles.languageCaret}
                                    src={dropdownCaret}
                                />
                            </div>
                            <LanguageSelector label={this.props.intl.formatMessage(ariaMessages.language)} />
                        </div>
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.fileMenuOpen
                            })}
                            onMouseUp={this.props.onClickFile}
                        >
                            <div className={classNames(styles.fileMenu)}>
                                <FormattedMessage
                                    defaultMessage="File"
                                    description="Text for file dropdown menu"
                                    id="gui.menuBar.file"
                                />
                            </div>
                            <MenuBarMenu
                                open={this.props.fileMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseFile}
                            >

                                    <MenuItem onClick={this.newProject.bind(this)}>
                                        <FormattedMessage
                                            defaultMessage="New"
                                            description="Menu bar item for creating a new project"
                                            id="gui.menuBar.new"
                                        />
                                    </MenuItem>


                                <MenuSection>
                                    <ProjectLoader>{(renderFileInput, loadProject, loadProps) => (
                                        <MenuItem
                                            onClick={loadProject}
                                            {...loadProps}
                                        >
                                            <FormattedMessage
                                                defaultMessage="Load from your computer"
                                                description="Menu bar item for uploading a project from your computer"
                                                id="gui.menuBar.uploadFromComputer"
                                            />
                                            {renderFileInput()}
                                        </MenuItem>
                                    )}</ProjectLoader>
                                    <ProjectSaver>{saveProject => (
                                        <MenuItem
                                            onClick={this.handleCloseFileMenuAndThen(saveProject)}
                                        >
                                            <FormattedMessage
                                                defaultMessage="Save to your computer"
                                                description="Menu bar item for downloading a project to your computer"
                                                id="gui.menuBar.downloadToComputer"
                                            />
                                        </MenuItem>
                                    )}</ProjectSaver>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.editMenuOpen
                            })}
                            onMouseUp={this.props.onClickEdit}
                        >
                            <div className={classNames(styles.editMenu)}>
                                <FormattedMessage
                                    defaultMessage="Edit"
                                    description="Text for edit dropdown menu"
                                    id="gui.menuBar.edit"
                                />
                            </div>
                            <MenuBarMenu
                                open={this.props.editMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseEdit}
                            >

                                <MenuSection>
                                    <TurboMode>{(toggleTurboMode, {turboMode}) => (
                                        <MenuItem onClick={toggleTurboMode}>
                                            {turboMode ? (
                                                <FormattedMessage
                                                    defaultMessage="Turn off Turbo Mode"
                                                    description="Menu bar item for turning off turbo mode"
                                                    id="gui.menuBar.turboModeOff"
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    defaultMessage="Turn on Turbo Mode"
                                                    description="Menu bar item for turning on turbo mode"
                                                    id="gui.menuBar.turboModeOn"
                                                />
                                            )}
                                        </MenuItem>
                                    )}</TurboMode>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                    </div>
                    <Divider className={classNames(styles.divider)} />

                    <div className={classNames(styles.menuBarItem, styles.growable)}>
                        <MenuBarItemTooltip
                            enable
                            id="title-field"
                        >
                            <ProjectTitleInput
                                className={classNames(styles.titleFieldGrowable)}
                                onUpdateProjectTitle={this.props.onUpdateProjectTitle}
                            />
                        </MenuBarItemTooltip>
                    </div>

                    <div className={styles.trigger_robbo_menu} onClick={this.props.onTriggerRobboMenu}>

                      <FormattedMessage
                          defaultMessage="Robbo menu"
                          description=""
                          id="gui.menuBar.robbo_menu"
                      />
                    </div>


                </div>

            </Box>
        );
    }
}

MenuBar.propTypes = {
    canUpdateProject: PropTypes.bool,
    editMenuOpen: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    fileMenuOpen: PropTypes.bool,
    intl: intlShape,
    isRtl: PropTypes.bool,
    languageMenuOpen: PropTypes.bool,
    onClickEdit: PropTypes.func,
    onClickFile: PropTypes.func,
    onClickLanguage: PropTypes.func,
    onOpenTipLibrary: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onRequestCloseLanguage: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func
};

const mapStateToProps = state => ({
    canUpdateProject: typeof (state.session && state.session.session && state.session.session.user) !== 'undefined',
    fileMenuOpen: fileMenuOpen(state),
    editMenuOpen: editMenuOpen(state),
    isRtl: state.locales.isRtl,
    languageMenuOpen: languageMenuOpen(state),
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onOpenTipLibrary: () => dispatch(openTipsLibrary()),
    onClickFile: () => dispatch(openFileMenu()),
    onRequestCloseFile: () => dispatch(closeFileMenu()),
    onClickEdit: () => dispatch(openEditMenu()),
    onRequestCloseEdit: () => dispatch(closeEditMenu()),
    onClickLanguage: () => dispatch(openLanguageMenu()),
    onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
    onSeeCommunity: () => dispatch(setPlayer(true)),
    onTriggerRobboMenu: () => {

        dispatch(ActionTriggerRobboMenu());
  }
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar));
