import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { UIContainer } from '../shared/UIContainer';
import { UITextInput } from '../shared/UITextInput';
import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { addDocument } from '../../api/cloudDatabaseService';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';
import { Note, NoteColor } from '../../models/NoteModel';
import { Header } from '../../navigation/Header';
import { UIScreenBottomBar } from '../components/UIScreenBottomBar';

const INPUT_HEIGHT = 50;
const INPUT_MARGIN_BOTTOM = 10;
const INPUT_FONT_SIZE = 20;

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

    const handleInputValues = (inputName: string, inputValue: string) => {
        setInputValues({
            ...inputsValues,
            [inputName]: inputValue,
        });
    };

    useEffect(() => {
        const unsub = navigation.addListener('beforeRemove', async e => {
            await addDocument({ ...inputsValues, archive: archiveStatus, noteColor });
        });
        return () => {
            unsub();
        };
    }, [navigation, inputsValues, archiveStatus]);

    const archiveCallback = (archiveValue: boolean): void => {
        setArchiveStatus(archiveValue);
    };

    const noteColorCallBack = (noteColorValue: NoteColor): void => {
        setNoteColor(noteColorValue);
    };

    return (
        <>
            <Header archiveStatus={archiveCallback} />
            <UIContainer>
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
                <UIScreenBottomBar />
            </UIContainer>
        </>
    );
};

const styles = StyleSheet.create({
    inputTitle: {
        height: INPUT_HEIGHT,
        marginBottom: INPUT_MARGIN_BOTTOM,
        color: colors.primaryColor,
        fontWeight: 'bold',
        fontSize: INPUT_FONT_SIZE,
    },
    textArea: {
        flex: 1,
        color: colors.primaryColor,
        fontSize: INPUT_FONT_SIZE,
        textAlignVertical: 'top',
    },
});
