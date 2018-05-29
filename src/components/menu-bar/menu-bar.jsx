import classNames from 'classnames';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import LoadButton from '../../containers/load-button.jsx';
import SaveButton from '../../containers/save-button.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';

import {openFeedbackForm} from '../../reducers/modals';

import styles from './menu-bar.css';

import feedbackIcon from './icon--feedback.svg';
import scratchLogo from './scratch-logo.svg';

import {ActionTriggerRobboMenu} from '../../RobboGui/actions/sensor_actions.js'; //Robbo //modified_by_Yaroslav

const MenuBar = props => (
    <Box
        className={classNames({
            [styles.menuBar]: true
        })}
    >
        <div className={styles.mainMenu}>
            <div className={classNames(styles.logoWrapper, styles.menuItem)}>
                <img
                    alt="Scratch"
                    className={styles.scratchLogo}
                    draggable={false}
                    src={scratchLogo}
                />
            </div>
            <SaveButton className={styles.menuItem} />
            <LoadButton className={styles.menuItem} />
            <LanguageSelector className={styles.menuItem} />
            <div className={styles.trigger_robbo_menu} onClick={props.onTriggerRobboMenu}>

                Robbo menu
            </div>


        </div>
        <div className={styles.feedbackButtonWrapper}>

        </div>
    </Box>
);

MenuBar.propTypes = {
    onGiveFeedback: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({

    onGiveFeedback: () => {
        dispatch(openFeedbackForm());
    },

    onTriggerRobboMenu: () => {

          dispatch(ActionTriggerRobboMenu());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
