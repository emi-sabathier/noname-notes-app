import React, { ReactElement, useState } from 'react';
import { Tag } from '../../models/TagModel';
import { UIText } from '../shared/UIText';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorScheme } from '../../constants/colorScheme';

const ICON_SIZE = 26;
const MARGIN_LEFT = 40;
const MARGIN_TOP = 2;
const CONTAINER_MARGIN_TOP = 10;

interface UITagProps {
    tag: Tag;
}

export const UIEditDeleteTag = ({ tag }: UITagProps): ReactElement => {
    const [editTagVisible, setEditTagVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Icon name="tag-text" color={colorScheme.grey700} size={ICON_SIZE} />
            <UIText type="REGULAR" style={styles.margin}>
                {tag.name}
            </UIText>
            <Icon name="square-edit-outline" color={colorScheme.grey700} size={ICON_SIZE} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: CONTAINER_MARGIN_TOP,
    },
    margin: {
        flex: 1,
        marginTop: MARGIN_TOP,
        marginLeft: MARGIN_LEFT,
    },
});
