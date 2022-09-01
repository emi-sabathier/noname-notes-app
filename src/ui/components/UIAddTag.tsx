import React, { useEffect, useState } from 'react';
import { UITouchableOpacity } from '../shared/UITouchableOpacity';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { UITextInput } from '../shared/UITextInput';
import { dictionary } from '../../constants/dictionary';
import { UIText } from '../shared/UIText';
import { colorScheme } from '../../constants/colorScheme';
import { addDocument } from '../../api/tagsCloudDatabaseService';

const ICON_SIZE = 26;
const PLUS_ICON_SIZE = 30;
const INPUT_HEIGHT = 32;
const INPUT_WIDTH = 260;
const INPUT_FONT_SIZE = 16;
const INPUT_MARGIN_LEFT = 40;
const INPUT_PADDING = 0;
const MARGIN_LEFT = 37;
const PADDING_BOTTOM = 5;
const PADDING_VERTICAL = 5;

export const UIAddTag = () => {
    const [addTagVisible, setAddTagVisible] = useState(false);
    const [tagValue, setTagValue] = useState<string>('');

    const handleInput = (value: string): void => {
        setTagValue(value);
    };

    const addTag = async () => {
        if (tagValue !== '') {
            await addDocument({ name: tagValue });
            setTagValue('');
            setAddTagVisible(false);
        }
    };

    const toggleAddTagSpace = () => {
        setAddTagVisible(!addTagVisible);
        setTagValue('');
    };

    useEffect(() => {
        console.log(tagValue);
    }, [tagValue]);

    return (
        <View style={styles.addTagContainer}>
            {addTagVisible ? (
                <>
                    <UITouchableOpacity onPress={toggleAddTagSpace}>
                        <Icon name="close" size={ICON_SIZE} color={colorScheme.grey700} />
                    </UITouchableOpacity>
                    <View style={styles.inputContainer}>
                        <UITextInput
                            style={styles.input}
                            length={25}
                            placeholder={dictionary.screens.tagName}
                            onChangeText={inputValue => handleInput(inputValue)}
                            value={tagValue}
                        />
                    </View>
                    <UITouchableOpacity onPress={addTag}>
                        <Icon name="check" color={colorScheme.green500} size={ICON_SIZE} />
                    </UITouchableOpacity>
                </>
            ) : (
                <>
                    <Icon name="plus" color={colorScheme.grey700} size={PLUS_ICON_SIZE} />
                    <UITouchableOpacity style={styles.newTagButton} onPress={toggleAddTagSpace}>
                        <UIText type="REGULAR" style={styles.margin}>
                            {dictionary.screens.newTag}
                        </UIText>
                    </UITouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    addTagContainer: {
        flexDirection: 'row',
        paddingBottom: PADDING_BOTTOM,
        borderColor: colorScheme.grey300,
        borderBottomWidth: 1,
    },
    margin: {
        marginLeft: MARGIN_LEFT,
    },
    newTagButton: { paddingVertical: PADDING_VERTICAL },
    inputContainer: {
        alignSelf: 'flex-start',
        width: INPUT_WIDTH,
    },
    input: {
        height: INPUT_HEIGHT,
        fontSize: INPUT_FONT_SIZE,
        marginLeft: INPUT_MARGIN_LEFT,
        padding: INPUT_PADDING,
    },
});
