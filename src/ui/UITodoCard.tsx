import React from 'react';
import { UIText } from './UIText';
import { Todo } from '../models/TodoModel';
import { StyleSheet, View } from 'react-native';
import { truncate } from '../utils/truncate';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from './colors';
import { UITouchableOpacity } from './UITouchableOpacity';
import { deleteDocument } from '../api/cloudDatabaseService';
import { useAppDispatch } from '../store/hooks';
import { deleteTodo } from '../store/todosSlice';

type UITodoCardProps = {
    todo: Todo;
};

export const UITodoCard = ({ todo }: UITodoCardProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const id = todo.id ?? '';

    return (
        <>
            <View>
                <UIText type="REGULAR_BOLD">{todo.title}</UIText>
                <UIText type="REGULAR">{truncate(todo.content)}</UIText>
            </View>
            <UITouchableOpacity
                onPress={async () => {
                    await deleteDocument(id);
                    dispatch(deleteTodo(id));
                }}
                style={styles.iconsAlign}>
                <Icon name="trash-can-outline" size={26} color={colors.grey800} />
            </UITouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    iconsAlign: { alignSelf: 'flex-end', flexDirection: 'row', marginTop: 10 },
});
