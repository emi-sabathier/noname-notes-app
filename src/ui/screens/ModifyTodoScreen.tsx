import React, { useEffect, useState } from 'react';
import { UIContainer } from '../shared/UIContainer';
import { UITextInput } from '../shared/UITextInput';
import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { RootStackParamList } from '../../navigation/AppNavigation';
import { Todo } from '../../models/TodoModel';
import { updateDocument } from '../../api/cloudDatabaseService';
import { Header } from '../../navigation/Header';

const INPUT_HEIGHT = 50;
const INPUT_MARGIN_BOTTOM = 10;
const INPUT_FONT_SIZE = 20;

export const ModifyTodoScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList>>();
    const id = route.params?.item.id ?? '';
    const title = route.params?.item.title ?? '';
    const content = route.params?.item.content ?? '';
    const archive = route.params?.item.archive ?? false;
    const [archiveStatus, setArchiveStatus] = useState<boolean>(false);

    const [inputsValues, setInputValues] = useState<Todo>({
        id,
        title,
        content,
        archive,
    });

    const handleInputValues = (inputName: string, inputValue: string) => {
        setInputValues({
            ...inputsValues,
            [inputName]: inputValue,
        });
    };

    useEffect(() => {
        const unsub = navigation.addListener('beforeRemove', async e => {
            await updateDocument({ ...inputsValues, archive: archiveStatus });
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
