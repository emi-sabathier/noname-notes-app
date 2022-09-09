import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { UIContainer } from '../shared/UIContainer';
import { UITextInput } from '../shared/UITextInput';
import { FlatList, StyleSheet } from 'react-native';
import { colorScheme } from '../../constants/colorScheme';
import { useNavigation } from '@react-navigation/native';
import { addDocument } from '../../api/notesCloudDatabaseService';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';
import { Note, NoteColor } from '../../models/NoteModel';
import { UIScreenBottomBar } from '../components/UIScreenBottomBar';
import { dictionary } from '../../constants/dictionary';
import { UIHeader } from '../../navigation/UIHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { UIText } from '../shared/UIText';
import { clearTagsSelected } from '../../store/tagsSelectionSlice';

const INPUT_HEIGHT = 50;
const INPUT_MARGIN_BOTTOM = 10;

export const AddNoteScreen: FunctionComponent = (): ReactElement => {
    const [inputsValues, setInputValues] = useState<Note>({
        title: '',
        content: '',
        archive: false,
        noteColor: 'white',
    });
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
    const [archiveStatus, setArchiveStatus] = useState<boolean>(false);
    const [noteColor, setNoteColor] = useState<NoteColor>('white');
    const dispatch = useAppDispatch();
    const tags = useAppSelector(state => state.tagsSelected);
    const { tagsSelected } = tags;

    const handleInputValues = (inputName: string, inputValue: string) => {
        setInputValues({
            ...inputsValues,
            [inputName]: inputValue,
        });
    };

    useEffect(() => {
        const unsub = navigation.addListener('beforeRemove', async e => {
            await addDocument({ ...inputsValues, archive: archiveStatus, noteColor, tags: tagsSelected });
            dispatch(clearTagsSelected());
        });
        return () => {
            unsub();
        };
    }, [navigation, inputsValues, archiveStatus, noteColor]);

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
                {tagsSelected.length > 0 ? (
                    <FlatList
                        data={tagsSelected}
                        renderItem={({ item }) => <UIText type="LARGE">{item.name}</UIText>}
                    />
                ) : null}
                <UIScreenBottomBar noteColorValue={noteColorCallBack} note={inputsValues} />
            </UIContainer>
        </>
    );
};

const styles = StyleSheet.create({
    inputTitle: {
        height: INPUT_HEIGHT,
        marginBottom: INPUT_MARGIN_BOTTOM,
        color: colorScheme.primaryColor,
        fontWeight: 'bold',
        fontSize: 20,
    },
    textArea: {
        flex: 1,
        color: colorScheme.primaryColor,
        textAlignVertical: 'top',
        fontSize: 20,
    },
});
