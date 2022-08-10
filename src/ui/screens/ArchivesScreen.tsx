import React from 'react';
import { UIContainer } from '../shared/UIContainer';
import { FlatList, StyleSheet, View } from 'react-native';
import { UITodoCard } from '../components/UITodoCard';
import { useAppSelector } from '../../store/hooks';

type Props = {};
export const ArchivesScreen = (props: Props) => {
    const todosList = useAppSelector(state => state.todos);
    const archivesList = todosList.todos.filter(todo => todo.archive === true);
    console.log(archivesList.length);
    return (
        <UIContainer>
            <View style={styles.todosListContainer}>
                {archivesList.length > 0 ? (
                    <>
                        <FlatList
                            numColumns={2}
                            data={archivesList}
                            keyExtractor={(todo, i) => i.toString()}
                            renderItem={({ item }) => <UITodoCard todo={item} key={item.id} />}
                        />
                    </>
                ) : null}
            </View>
        </UIContainer>
    );
};
const styles = StyleSheet.create({
    todosListContainer: {
        flex: 1,
    },
});
