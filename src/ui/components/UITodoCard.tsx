import React from 'react';
import { UIText } from '../shared/UIText';
import { Todo } from '../../models/TodoModel';
import { StyleSheet, View } from 'react-native';
import { truncate } from '../../utils/truncate';
import { UIDeleteButton } from '../shared/UIDeleteButton';
import { UITouchableOpacity } from '../shared/UITouchableOpacity';
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';

const BORDER_WIDTH = 1;
const BORDER_RADIUS = 10;
const PADDING = 10;
const MARGIN = 10;

type UITodoCardProps = {
    todo: Todo;
};

export const UITodoCard = ({ todo }: UITodoCardProps): JSX.Element => {
    const id = todo.id ?? '';
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();

    return (
        <>
            <UITouchableOpacity style={styles.card} onPress={() => navigation.navigate('ModifyTodo', { item: todo })}>
                <View>
                    <UIText type="REGULAR_BOLD">{todo.title}</UIText>
                    <UIText type="REGULAR">{truncate(todo.content)}</UIText>
                </View>
                <UIDeleteButton id={id} />
            </UITouchableOpacity>
        </>
    );
};
const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignSelf: 'flex-start',
        borderColor: colors.grey300,
        borderWidth: BORDER_WIDTH,
        borderRadius: BORDER_RADIUS,
        padding: PADDING,
        margin: MARGIN,
    },
});
