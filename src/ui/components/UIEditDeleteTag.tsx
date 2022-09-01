import React, { ReactElement, useState } from 'react';
import { Tag } from '../../models/TagModel';
import { UIText } from '../shared/UIText';
import { Keyboard, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorScheme } from '../../constants/colorScheme';
import { UITouchableOpacity } from '../shared/UITouchableOpacity';
import { UITextInput } from '../shared/UITextInput';
import { dictionary } from '../../constants/dictionary';
import { deleteDocument, updateDocument } from '../../api/tagsCloudDatabaseService';

const ICON_SIZE = 26;
const INPUT_HEIGHT = 25;
const INPUT_WIDTH = 260;
const INPUT_FONT_SIZE = 16;
const INPUT_MARGIN_LEFT = 40;
const INPUT_PADDING = 0;
const MARGIN_LEFT = 40;
const MARGIN_TOP = 2;
const CONTAINER_MARGIN_TOP = 10;

interface UITagProps {
    tag: Tag;
}

export const UIEditDeleteTag = ({ tag }: UITagProps): ReactElement => {
    const [editTagVisible, setEditTagVisible] = useState(false);
    const [editedTagValue, setEditedTagValue] = useState<string>(tag.name);

    const toggleEdit = () => {
        setEditTagVisible(!editTagVisible);
    };

    const handleInput = (value: string): void => {
        setEditedTagValue(value);
    };

    const updateTag = async (): Promise<void> => {
        if (editedTagValue !== '') {
            await updateDocument({ id: tag.id, name: editedTagValue });
            setEditTagVisible(false);
        }
    };

    const deleteTag = async () => {
        const id = tag.id ?? '';
        await deleteDocument(id);
        setEditTagVisible(false);
    };

    return (
        <View style={styles.editContainer}>
            {editTagVisible ? (
                <>
                    <UITouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={deleteTag}>
                        <Icon name="trash-can-outline" size={ICON_SIZE} color={colorScheme.grey700} />
                    </UITouchableOpacity>

                    <View style={styles.inputContainer}>
                        <UITextInput
                            style={styles.input}
                            length={25}
                            placeholder={dictionary.screens.tagName}
                            onChangeText={inputValue => handleInput(inputValue)}
                            value={editedTagValue}
                        />
                    </View>
                    <UITouchableOpacity style={styles.editButton} onPress={updateTag}>
                        <Icon name="check" color={colorScheme.green500} size={ICON_SIZE} />
                    </UITouchableOpacity>
                </>
            ) : (
                <>
                    <Icon name="tag-text" color={colorScheme.grey700} size={ICON_SIZE} />
                    <UIText type="REGULAR" style={styles.margin}>
                        {tag.name}
                    </UIText>
                    <UITouchableOpacity style={styles.editButton} onPress={toggleEdit}>
                        <Icon name="square-edit-outline" color={colorScheme.grey700} size={ICON_SIZE} />
                    </UITouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    editContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: CONTAINER_MARGIN_TOP,
    },
    editButton: { alignItems: 'flex-end', flex: 1 },
    margin: {
        flex: 1,
        marginTop: MARGIN_TOP,
        marginLeft: MARGIN_LEFT,
    },
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
