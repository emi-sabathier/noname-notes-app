import React, { useEffect } from 'react';
import { UIContainer } from '../UIContainer';
import { UITextInput } from '../UITextInput';
import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../store/hooks';
import { addTodo } from '../../store/todosSlice';
import { addToCollection } from '../../api/cloudDatabaseService';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { RootStackParamList } from '../../navigation/AppNavigation';

const INPUT_HEIGHT = 50;
const INPUT_MARGIN_BOTTOM = 10;
const INPUT_FONT_SIZE = 20;

export const AddTodoScreen = () => {
    const [value, setValue] = React.useState({
        title: '',
        content: '',
    });
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();

    const handleInputValues = (inputName: string, inputValue: string) => {
        setValue({
            ...value,
            [inputName]: inputValue,
        });
    };

    useEffect(
        () =>
            navigation.addListener('beforeRemove', async e => {
                dispatch(addTodo(value));
                await addToCollection(value);
            }),
        [navigation, value],
    );

    return (
        <UIContainer>
            <UITextInput
                style={styles.inputTitle}
                placeholder="Titre"
                onChangeText={inputValue => handleInputValues('title', inputValue)}
                value={value.title}
            />
            <UITextInput
                style={styles.textArea}
                placeholder="Ecrivez ici"
                onChangeText={inputValue => handleInputValues('content', inputValue)}
                value={value.content}
            />
        </UIContainer>
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
        fontWeight: 'bold',
        fontSize: INPUT_FONT_SIZE,
        textAlignVertical: 'top',
    },
});
