import React, { FunctionComponent, useEffect, useState } from 'react';
import { UIContainer } from '../shared/UIContainer';
import { UITextInput } from '../shared/UITextInput';
import { StyleSheet } from 'react-native';
import { colorScheme } from '../../constants/colorScheme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';
import { Note, NoteColor } from '../../models/NoteModel';
import { updateDocument } from '../../api/cloudDatabaseService';
import { Header } from '../../navigation/Header';
import { UIScreenBottomBar } from '../components/UIScreenBottomBar';

const INPUT_HEIGHT = 50;
const INPUT_MARGIN_BOTTOM = 10;
const INPUT_FONT_SIZE = 20;

export const ModifyNoteScreen: FunctionComponent = () => {
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
    const route = useRoute<RouteProp<StackNavigatorParamList>>();
    const [archiveStatus, setArchiveStatus] = useState<boolean>(false);
    const [noteColorValue, setNoteColorValue] = useState<NoteColor>('white');

    const id = route.params?.item.id ?? '';
    const title = route.params?.item.title ?? '';
    const content = route.params?.item.content ?? '';
    const archive = route.params?.item.archive ?? false;
    const noteColor = route.params?.item.noteColor;

    const [inputsValues, setInputValues] = useState<Note>({
        id,
        title,
        content,
        archive,
        noteColor,
    });

    const handleInputValues = (inputName: string, inputValue: string) => {
        setInputValues({
            ...inputsValues,
            [inputName]: inputValue,
        });
    };

    useEffect(() => {
        const unsub = navigation.addListener('beforeRemove', async e => {
            await updateDocument({ ...inputsValues, archive: archiveStatus, noteColor: noteColorValue });
        });
        return () => {
            unsub();
        };
    }, [navigation, inputsValues, archiveStatus, noteColorValue]);

    const archiveCallback = (archiveValue: boolean): void => {
        setArchiveStatus(archiveValue);
    };

    const noteColorCallBack = (color: NoteColor): void => {
        setNoteColorValue(color);
    };

    return (
        <>
            <Header archiveStatus={archiveCallback} />
            <UIContainer style={{ backgroundColor: noteColorValue }}>
                <UITextInput
                    style={styles.inputTitle}
                    placeholder="Titre"
                    onChangeText={inputValue => handleInputValues('title', inputValue)}
                    value={inputsValues.title}
                />
                <UITextInput
                    style={styles.textArea}
                    placeholder="Ecrivez ici"
                    onChangeText={inputValue => handleInputValues('content', inputValue)}
                    value={inputsValues.content}
                />
                <UIScreenBottomBar noteColorValue={noteColorCallBack} />
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
        fontSize: INPUT_FONT_SIZE,
    },
    textArea: {
        flex: 1,
        color: colorScheme.primaryColor,
        fontSize: INPUT_FONT_SIZE,
        textAlignVertical: 'top',
    },
});
