import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { UIContainer } from '../sharedComponents/UIContainer';
import { UITextInput } from '../sharedComponents/UITextInput';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDocument } from '../../api/notesCloudDatabaseService';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';
import { Note, NoteColor } from '../../models/NoteModel';
import { UIScreenBottomBar } from '../sharedComponents/UIScreenBottomBar';
import { dictionary } from '../../constants/dictionary';
import { UIHeader } from '../../navigation/UIHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearSelectedTags } from '../../store/tagsSelectionSlice';
import { UIChip } from '../sharedComponents/UIChip';

const INPUT_HEIGHT = 50;
const INPUT_MARGIN_BOTTOM = 10;
const FONT_SIZE = 20;

export const AddNoteScreen: FunctionComponent = (): ReactElement => {
    const dispatch = useAppDispatch();
    const [inputsValues, setInputValues] = useState<Note>({
        title: '',
        content: '',
        archive: false,
        noteColor: 'white',
    });
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
    const [archiveStatus, setArchiveStatus] = useState<boolean>(false);
    const [noteColor, setNoteColor] = useState<NoteColor>('white');
    const { tagsSelected } = useAppSelector(state => state.tagsSelected);
    const [tagsList, setTagsList] = useState(tagsSelected);

    const handleInputValues = (inputName: string, inputValue: string) => {
        setInputValues({
            ...inputsValues,
            [inputName]: inputValue,
        });
        setTagsList(tagsSelected);
    };

    useEffect(() => {
        if (tagsSelected.length > 0) {
            setTagsList(tagsSelected);
        }
    }, [tagsList, tagsSelected]);

    useEffect(() => {
        const unsub = navigation.addListener('beforeRemove', async e => {
            await addDocument({ ...inputsValues, archive: archiveStatus, noteColor, tags: tagsList });
            dispatch(clearSelectedTags());
        });
        return () => {
            unsub();
        };
    }, [tagsList, tagsSelected, navigation, inputsValues, archiveStatus, noteColor]);

    const archiveCallback = (archiveValue: boolean): void => {
        setArchiveStatus(archiveValue);
    };

    const noteColorCallBack = (noteColorValue: NoteColor): void => {
        setNoteColor(noteColorValue);
    };

    return (
        <>
            <UIHeader type="DEFAULT" archiveStatus={archiveCallback} />
            <UIContainer style={{ backgroundColor: noteColor }}>
                <UITextInput
                    style={styles.inputTitle}
                    placeholder={dictionary.screens.titlePlaceholder}
                    onChangeText={inputValue => handleInputValues('title', inputValue)}
                    value={inputsValues.title}
                />
                <UITextInput
                    style={styles.textArea}
                    placeholder={dictionary.screens.contentPlaceholder}
                    onChangeText={inputValue => handleInputValues('content', inputValue)}
                    value={inputsValues.content}
                />
                <View>
                    {tagsSelected.length > 0 ? (
                        <FlatList
                            columnWrapperStyle={styles.flatListWrap}
                            numColumns={4}
                            data={tagsSelected}
                            renderItem={({ item }) => <UIChip tag={item} />}
                        />
                    ) : null}
                </View>
                <UIScreenBottomBar noteColorValue={noteColorCallBack} note={inputsValues} />
            </UIContainer>
        </>
    );
};

const styles = StyleSheet.create({
    inputTitle: {
        height: INPUT_HEIGHT,
        marginBottom: INPUT_MARGIN_BOTTOM,
        fontWeight: 'bold',
        fontSize: FONT_SIZE,
    },
    flatListWrap: {
        flexWrap: 'wrap',
    },
    textArea: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: FONT_SIZE,
    },
});
