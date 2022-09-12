import React, { ReactElement, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UIText } from './UIText';
import { UITouchableOpacity } from './UITouchableOpacity';
import { Note, NoteColor } from '../../models/NoteModel';
import { colorScheme } from '../../constants/colorScheme';
import { dictionary } from '../../constants/dictionary';
import { colorsList } from '../../constants/noteColorsList';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';
import { UIModal } from './UIModal';
import { UITagSelection } from '../components/UITagSelection';

const ICON_SIZE = 30;
const ICON_MARGIN = 10;
const ICON_COLOR_SIZE = 50;
const SELECTED_COLOR_BORDER_WIDTH = 2;
const SELECTED_COLOR_BORDER_RADIUS = 35;
const MODAL_CONTENT_HEIGHT = 200;
const MODAL_CONTENT_PADDING_HORIZONTAL = 10;
const MODAL_CONTENT_BORDER_RADIUS_TOP = 10;

interface UIScreenBottomBarProps {
    noteColorValue: (v: NoteColor) => void;
    note: Note;
}

export const UIScreenBottomBar = ({ noteColorValue }: UIScreenBottomBarProps): ReactElement => {
    const route = useRoute<RouteProp<StackNavigatorParamList, 'AddNote' | 'ModifyNote'>>();
    const currentNoteColor = route.params?.item.noteColor ?? 'white';
    const [colorsModalVisible, setColorsModalVisible] = useState(false);
    const [tagsModalVisible, setTagsModalVisible] = useState(false);
    const [noteColor, setNoteColor] = useState<NoteColor>(currentNoteColor);
    const [selectedColor, setSelectedColor] = useState<NoteColor>('white');

    const handleOpenModal = (modalType: string): void => {
        if (modalType === 'colors') {
            setColorsModalVisible(true);
        } else {
            setTagsModalVisible(true);
        }
    };

    const handleSelectedColor = (color: NoteColor): void => {
        setSelectedColor(color);
    };

    const handleColor = async (color: NoteColor): Promise<void> => {
        setNoteColor(color);
        handleSelectedColor(color);
    };

    const closeModalsCallBack = (value: boolean): void => {
        setColorsModalVisible(value);
        setTagsModalVisible(value);
    };

    useEffect(() => {
        noteColorValue(noteColor);
    }, [noteColor]);

    return (
        <>
            <UIModal visible={colorsModalVisible} close={closeModalsCallBack} modalHeight={200}>
                <View>
                    <UIText type="LARGE_BOLD" style={styles.title}>
                        {dictionary.components.screenBottomBar.colorsModalTitle}
                    </UIText>
                </View>
                <View style={styles.colorsContainer}>
                    <FlatList
                        numColumns={5}
                        data={colorsList}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <UITouchableOpacity
                                onPress={() => handleColor(item.noteColor)}
                                style={[
                                    styles.iconsMargin,
                                    item.noteColor === selectedColor ? styles.selectedColor : null,
                                ]}>
                                <Icon name="water-circle" size={ICON_COLOR_SIZE} color={item.noteColor} />
                            </UITouchableOpacity>
                        )}
                    />
                </View>
            </UIModal>

            <UIModal visible={tagsModalVisible} close={closeModalsCallBack} modalHeight={500}>
                <View>
                    <UIText type="LARGE_BOLD" style={styles.title}>
                        {dictionary.components.screenBottomBar.tagsModalTitle}
                    </UIText>
                </View>
                <UITagSelection />
            </UIModal>
            <View style={styles.container}>
                <UITouchableOpacity onPress={() => handleOpenModal('colors')}>
                    <Icon name="format-color-fill" size={ICON_SIZE} />
                </UITouchableOpacity>
                <UITouchableOpacity onPress={() => handleOpenModal('tags')}>
                    <Icon name="tag-text-outline" size={ICON_SIZE} />
                </UITouchableOpacity>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectedColor: {
        borderWidth: SELECTED_COLOR_BORDER_WIDTH,
        borderRadius: SELECTED_COLOR_BORDER_RADIUS,
        borderColor: 'grey',
        borderStyle: 'solid',
    },
    title: {
        textAlign: 'center',
        marginBottom: ICON_MARGIN,
    },
    colorsContainer: { alignItems: 'center' },
    iconsMargin: { marginRight: ICON_MARGIN },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        height: MODAL_CONTENT_HEIGHT,
        backgroundColor: colorScheme.white,
        paddingHorizontal: MODAL_CONTENT_PADDING_HORIZONTAL,
        justifyContent: 'flex-start',
        borderTopRightRadius: MODAL_CONTENT_BORDER_RADIUS_TOP,
        borderTopLeftRadius: MODAL_CONTENT_BORDER_RADIUS_TOP,
    },
});
