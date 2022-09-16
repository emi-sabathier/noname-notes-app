import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from '@rneui/base';
import { Tag } from '../../models/TagModel';
import { colorScheme } from '../../constants/colorScheme';
import { useAppDispatch } from '../../store/hooks';
import { deleteOneSelectedTag } from '../../store/tagsSelectionSlice';
import { getDataOnce } from '../../api/firestore';
import { TAGS_COLLECTION_NAME } from '../../constants/firestore';

const MARGIN = 10;

interface UIChipProps {
    tag: Tag;
}

export const UIChip = ({ tag }: UIChipProps) => {
    const dispatch = useAppDispatch();
    const [tagName, setTagName] = useState('');

    const handleDeleteTag = (tagItem: Tag): void => {
        dispatch(deleteOneSelectedTag(tagItem));
    };

    useEffect(() => {
        (async () => {
            const data = await getDataOnce<Tag>(TAGS_COLLECTION_NAME);
            const documentsList = data.docs.map(item => item.data());
            documentsList.map(item => {
                if (item.id && tag.id === item.id) {
                    setTagName(item.name);
                }
            });
            return () => data;
        })();
    }, []);

    return (
        <Chip
            title={tagName}
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
