import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UIText } from '../shared/UIText';
import { UITouchableOpacity } from '../shared/UITouchableOpacity';
import Modal from 'react-native-modal';
import { NoteColor } from '../../models/NoteModel';
import { colorScheme } from '../../constants/colorScheme';
import { dictionary } from '../../constants/dictionary';
import { colorsList } from '../../constants/noteColorsList';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';

const ICON_SIZE = 30;
const ICON_MARGIN = 10;
const ICONS_CONTAINER_MARGIN_TOP = 10;
const SELECTED_COLOR_BORDER_WIDTH = 2;
const SELECTED_COLOR_BORDER_RADIUS = 35;
const MODAL_CONTENT_HEIGHT = 200;
const MODAL_CONTENT_PADDING_HORIZONTAL = 10;
const MODAL_CONTENT_BORDER_RADIUS_TOP = 10;

interface NoteColorProps {
    noteColorValue: (s: NoteColor) => void;
}

export const UIScreenBottomBar = ({ noteColorValue }: NoteColorProps) => {
    const route = useRoute<RouteProp<StackNavigatorParamList>>();
    const currentNoteColor = route.params?.item.noteColor ?? 'white';
    const [visible, setVisible] = useState(false);
    const [noteColor, setNoteColor] = useState<NoteColor>(currentNoteColor);
    const [selectedColor, setSelectedColor] = useState<NoteColor>('white');

    const handleClose = () => {
        setVisible(false);
    };

    const handlePress = () => {
        setVisible(true);
    };

    const handleSelectedColor = (color: NoteColor) => {
        setSelectedColor(color);
    };

    const handleColor = async (color: NoteColor) => {
        setNoteColor(color);
        handleSelectedColor(color);
    };

    useEffect(() => {
        noteColorValue(noteColor);
    }, [noteColor]);

    return (
        <>
            <Modal
                isVisible={visible}
                swipeDirection="down"
                animationInTiming={600}
                animationOutTiming={600}
                useNativeDriver={true}
                onSwipeComplete={() => {
                    handleClose();
                }}
                style={styles.bottomModal}>
                <View style={styles.modalContent}>
                    <View style={styles.iconsContainer}>
                        <View style={styles.swipeIconAlign}>
                            <Icon name="menu" size={ICON_SIZE} />
                        </View>
                        <UITouchableOpacity
                            onPress={() => {
                                handleClose();
                            }}>
                            <Icon name="window-close" size={ICON_SIZE} />
                        </UITouchableOpacity>
                    </View>
                    <View>
                        <UIText type="REGULAR" style={styles.colorsListMargin}>
                            {dictionary.components.screenBottomBar.colorsList}
                        </UIText>
                    </View>
                    <View>
                        <FlatList
                            numColumns={5}
                            data={colorsList}
                            keyExtractor={note => note.id.toString()}
                            renderItem={({ item }) => (
                                <UITouchableOpacity
                                    onPress={() => handleColor(item.noteColor)}
                                    style={[
                                        styles.iconsMargin,
                                        item.noteColor === selectedColor ? styles.selectedColor : null,
                                    ]}>
                                    <Icon name="water-circle" size={60} color={item.noteColor} />
                                </UITouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.container}>
                <UITouchableOpacity onPress={() => handlePress()}>
                    <Icon name="format-color-fill" size={ICON_SIZE} />
                </UITouchableOpacity>
                <Icon name="dots-vertical-circle-outline" size={ICON_SIZE} />
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
    colorsListMargin: {
        marginBottom: ICON_MARGIN,
    },
    iconsMargin: { marginRight: ICON_MARGIN },
    iconsContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: ICONS_CONTAINER_MARGIN_TOP,
    },
    swipeIconAlign: { flex: 1, alignItems: 'center' },
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
