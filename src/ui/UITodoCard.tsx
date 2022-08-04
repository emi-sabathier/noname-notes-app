import React from 'react';
import { UIText } from './UIText';
import { Todo } from '../models/TodoModel';
import { StyleSheet, View } from 'react-native';
import { truncate } from '../utils/truncate';

const BORDER_WIDTH = 1;
const BORDER_RADIUS = 10;
const PADDING = 10;
const MARGIN = 10;

type UITodoCardProps = {
    todo: Todo;
};

export const UITodoCard = ({ todo }: UITodoCardProps): JSX.Element => {
    return (
        <View style={styles.card}>
            <UIText type="REGULAR_BOLD">{todo.title}</UIText>
            <UIText type="REGULAR">{truncate(todo.content)}</UIText>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignSelf: 'flex-start',
        borderColor: 'lightgrey',
        borderWidth: BORDER_WIDTH,
        borderRadius: BORDER_RADIUS,
        padding: PADDING,
        margin: MARGIN,
    },
});
