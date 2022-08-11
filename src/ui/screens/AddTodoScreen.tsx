import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { UIContainer } from '../shared/UIContainer';
import { UITextInput } from '../shared/UITextInput';
import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { addDocument } from '../../api/cloudDatabaseService';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';
import { Todo } from '../../models/TodoModel';
import { Header } from '../../navigation/Header';

const INPUT_HEIGHT = 50;
const INPUT_MARGIN_BOTTOM = 10;
const INPUT_FONT_SIZE = 20;

export const AddTodoScreen: FunctionComponent = (): ReactElement => {
    const [inputsValues, setInputValues] = useState<Todo>({
        title: '',
        content: '',
        archive: false,
    });
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
    const [archiveStatus, setArchiveStatus] = useState<boolean>(false);

    const handleInputValues = (inputName: string, inputValue: string) => {
        setInputValues({
            ...inputsValues,
            [inputName]: inputValue,
        });
    };

    useEffect(() => {
        const unsub = navigation.addListener('beforeRemove', async e => {
            await addDocument({ ...inputsValues, archive: archiveStatus });
        });
        return () => {
            unsub();
        };
    }, [navigation, inputsValues, archiveStatus]);

    const archiveCallback = (archiveValue: boolean): void => {
        setArchiveStatus(archiveValue);
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
