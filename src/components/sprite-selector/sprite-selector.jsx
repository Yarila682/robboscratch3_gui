import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import Box from '../box/box.jsx';
import SpriteInfo from '../../containers/sprite-info.jsx';
import SpriteSelectorItem from '../../containers/sprite-selector-item.jsx';
import AssetButton from '../asset-button/asset-button.jsx';

import styles from './sprite-selector.css';
import spriteIcon from './icon--sprite.svg';

const messages = defineMessages({
    addSprite: {
        id: 'gui.spriteSelector.addSprite',
        description: 'Button to add a sprite in the target pane',
        defaultMessage: 'Add Sprite'
    }
});

const SpriteSelectorComponent = function (props) {
    const {
        intl,
        onChangeSpriteDirection,
        onChangeSpriteName,
        onChangeSpriteSize,
        onChangeSpriteVisibility,
        onChangeSpriteX,
        onChangeSpriteY,
        onDeleteSprite,
        onDuplicateSprite,
        onNewSpriteClick,
        onSelectSprite,
        selectedId,
        sprites,
        ...componentProps
    } = props;
    let selectedSprite = sprites[selectedId];
    let spriteInfoDisabled = false;
    if (typeof selectedSprite === 'undefined') {
        selectedSprite = {};
        spriteInfoDisabled = true;
    }
    return (
        <Box
            className={styles.spriteSelector}
            {...componentProps}
        >

            <SpriteInfo
                direction={selectedSprite.direction}
                disabled={spriteInfoDisabled}
                name={selectedSprite.name}
                size={selectedSprite.size}
                visible={selectedSprite.visible}
                x={selectedSprite.x}
                y={selectedSprite.y}
                onChangeDirection={onChangeSpriteDirection}
                onChangeName={onChangeSpriteName}
                onChangeSize={onChangeSpriteSize}
                onChangeVisibility={onChangeSpriteVisibility}
                onChangeX={onChangeSpriteX}
                onChangeY={onChangeSpriteY}
            />

            <Box className={styles.scrollWrapper}>
                <Box className={styles.itemsWrapper}>
                    {Object.keys(sprites)
                        // Re-order by list order
                        .sort((id1, id2) => sprites[id1].order - sprites[id2].order)
                        .map(id => sprites[id])
                        .map(sprite => (
                            <SpriteSelectorItem
                                assetId={sprite.costume && sprite.costume.assetId}
                                className={styles.sprite}
                                id={sprite.id}
                                key={sprite.id}
                                name={sprite.name}
                                selected={sprite.id === selectedId}
                                onClick={onSelectSprite}
                                onDeleteButtonClick={onDeleteSprite}
                                onDuplicateButtonClick={onDuplicateSprite}
                            />
                        ))
                    }
                </Box>
            </Box>
            <AssetButton
                className={styles.addButton}
                img={spriteIcon}
                title={intl.formatMessage(messages.addSprite)}
                onClick={onNewSpriteClick}
            />
        </Box>
    );
};

SpriteSelectorComponent.propTypes = {
    intl: intlShape.isRequired,
    onChangeSpriteDirection: PropTypes.func,
    onChangeSpriteName: PropTypes.func,
    onChangeSpriteSize: PropTypes.func,
    onChangeSpriteVisibility: PropTypes.func,
    onChangeSpriteX: PropTypes.func,
    onChangeSpriteY: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onDuplicateSprite: PropTypes.func,
    onNewSpriteClick: PropTypes.func,
    onSelectSprite: PropTypes.func,
    selectedId: PropTypes.string,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            costume: PropTypes.shape({
                url: PropTypes.string,
                name: PropTypes.string.isRequired,
                bitmapResolution: PropTypes.number.isRequired,
                rotationCenterX: PropTypes.number.isRequired,
                rotationCenterY: PropTypes.number.isRequired
            }),
            name: PropTypes.string.isRequired,
            order: PropTypes.number.isRequired
        })
    })
};

export default injectIntl(SpriteSelectorComponent);
