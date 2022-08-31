import React, { ReactElement, useState } from 'react';
import { Tag } from '../../models/TagModel';
import { UIText } from '../shared/UIText';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from '@rneui/themed';
import { colorScheme } from '../../constants/colorScheme';

const ICON_SIZE = 26;
const MARGIN_LEFT = 40;
const MARGIN_TOP = 2;
const CONTAINER_MARGIN_TOP = 10;

interface UITagProps {
    tag: Tag;
}

export const UITag = ({ tag }: UITagProps): ReactElement => {
    const [checked, setChecked] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <Icon name="tag-text" color={colorScheme.grey700} size={ICON_SIZE} />
            <UIText type="REGULAR" style={styles.margin}>
                {tag.name}
            </UIText>
            <CheckBox
                containerStyle={styles.checkbox}
                checked={checked}
                onPress={() => setChecked(!checked)}
                uncheckedIcon={<Icon name="checkbox-blank-outline" color={colorScheme.grey700} size={ICON_SIZE} />}
                checkedIcon={<Icon name="checkbox-outline" color={colorScheme.green500} size={ICON_SIZE} />}
            />
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
    checkbox: {
        padding: 0,
        margin: 0,
    },
});
