import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from '@rneui/base';
import { Tag } from '../../models/TagModel';
import { colorScheme } from '../../constants/colorScheme';
import { useAppDispatch } from '../../store/hooks';
import { deleteOneSelectedTag } from '../../store/tagsSelectionSlice';

const MARGIN = 10;

interface UIChipProps {
    tag: Tag;
}

export const UIChip = ({ tag }: UIChipProps) => {
    const dispatch = useAppDispatch();

    const handleDeleteTag = (tagItem: Tag): void => {
        dispatch(deleteOneSelectedTag(tagItem));
    };

    return (
        <Chip
            title={tag.name}
            color={colorScheme.white}
            icon={{
                // TODO: Fix TS error when i use StyleSheet icon css
                name: 'close-circle',
                type: 'material-community',
                size: 20,
                color: colorScheme.white,
            }}
            titleStyle={styles.text}
            iconRight
            onPress={() => handleDeleteTag(tag)}
            containerStyle={styles.containerStyle}
            buttonStyle={{ backgroundColor: tag.color }}
        />
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        margin: MARGIN,
        flexWrap: 'wrap',
    },
    text: {
        color: colorScheme.white,
    },
});
