import PropTypes from 'prop-types';
import React from 'react';

import ButtonComponent from '../button/button.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';

import styles from './load-button.css';

import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';

const messages = defineMessages({
    load_project: {

        id: 'gui.menuBar.load_project',
        description: ' ',
        defaultMessage: 'Load'
    }
});

const LoadButtonComponent = ({
    inputRef,
    onChange,
    onClick,
    title,
    ...props
}) => (
    <span {...props}>

            <ButtonComponent
                enabled
                onClick={onClick}
            >
                {props.intl.formatMessage(messages.load_project)}
            </ButtonComponent>
            <input
                enabled
                className={styles.fileInput}
                ref={inputRef}
                type="file"
                onChange={onChange}
            />

    </span>
);

LoadButtonComponent.propTypes = {
    className: PropTypes.string,
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string
};
LoadButtonComponent.defaultProps = {
    title: 'Load'
};
export default injectIntl(LoadButtonComponent);
