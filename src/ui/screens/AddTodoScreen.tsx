import React from 'react';
import { UIContainer } from '../UIContainer';
import { UITextInput } from '../UITextInput';
import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const AddTodoScreen = () => {
    const [values, setValues] = React.useState({
        todoTitle: '',
        todoContent: '',
    });

    const handleInputValues = (inputName: string, value: string) =>
        setValues({
            ...values,
            [inputName]: value,
        });

    return (
        <UIContainer>
            <UITextInput
                style={styles.input}
                placeholder="Titre"
                onChangeText={value => handleInputValues('todoTitle', value)}
                value={values.todoTitle}
            />
            <UITextInput
                style={styles.input}
                placeholder="Ecrivez ici"
                onChangeText={value => handleInputValues('todoContent', value)}
                value={values.todoContent}
            />
        </UIContainer>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        color: colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
    },
});
