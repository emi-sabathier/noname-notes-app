import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { RootStackParamList } from '../../navigation/AppNavigation';
import { UITouchableOpacity } from '../UITouchableOpacity';
import { UIContainer } from '../UIContainer';
import firestore from '@react-native-firebase/firestore';
import { UITodoCard } from '../UITodoCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTodo, deleteTodo, updateTodo } from '../../store/todosSlice';
import {
    FirestoreDocumentChange,
    FirestoreDocumentData,
    FirestoreQueryDocumentSnapshot,
    FirestoreQuerySnapshot,
} from '../../types/types';

const MARGIN_HORIZONTAL = 20;
const MARGIN_BOTTOM = 15;
const HEADER_HEIGHT = 50;
const BORDER_WIDTH = 1;
const BORDER_RADIUS = 10;
const PADDING = 10;
const MARGIN = 10;

export const HomeScreen = (): JSX.Element => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [todosList, setTodosList] = useState<any[]>([]);
    const todosRedux = useAppSelector(state => state.todos);
    const dispatch = useAppDispatch();
    console.log('todos redux', todosRedux);

    useEffect(() => {
        (async () => {
            const unsubscribe = firestore()
                .collection('todos')
                .onSnapshot(
                    (snapshot: FirestoreQuerySnapshot<FirestoreDocumentData>): void => {
                        snapshot
                            .docChanges()
                            .forEach(async (change: FirestoreDocumentChange<FirestoreDocumentData>) => {
                                const document: FirestoreDocumentData = change.doc.data();
                                switch (change.type) {
                                    case 'added':
                                        dispatch(addTodo(document));
                                        break;
                                    case 'modified':
                                        dispatch(updateTodo(document));
                                        break;
                                    case 'removed':
                                        dispatch(deleteTodo(document.id));
                                        break;
                                }
                            });
                    },
                    (error: Error) => {
                        throw new Error(error.message);
                    },
                );
            return () => unsubscribe;
        })();
    }, [dispatch]);

    // get les data, les affiche
    useEffect(() => {
        (async () => {
            const unsubscribe = firestore()
                .collection('todos')
                .onSnapshot(
                    QuerySnapshot => {
                        const documentsList = QuerySnapshot.docs.map(
                            (document: FirestoreQueryDocumentSnapshot<FirestoreDocumentData>) => {
                                return document.data();
                            },
                        );
                        setTodosList(documentsList);
                    },
                    (error: Error) => {
                        throw new Error(error.message);
                    },
                );
            return () => unsubscribe;
        })();
    }, []);

    return (
        <UIContainer>
            <View style={styles.container}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <View style={styles.todosListContainer}>
                    {todosList.length > 0 ? (
                        <>
                            <FlatList
                                numColumns={2}
                                data={todosList}
                                keyExtractor={(todo, i) => i.toString()}
                                renderItem={({ item }) => (
                                    <UITouchableOpacity
                                        style={styles.card}
                                        onPress={() => navigation.navigate('ModifyTodo', { item })}>
                                        <UITodoCard todo={item} key={item.id} />
                                    </UITouchableOpacity>
                                )}
                            />
                        </>
                    ) : null}
                </View>
                <View style={styles.addIconPosition}>
                    <UITouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTodo')}>
                        <Icon name="note-plus-outline" size={80} color={colors.grey800} />
                    </UITouchableOpacity>
                </View>
            </View>
        </UIContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flex: 1,
        alignSelf: 'flex-start',
        borderColor: colors.grey300,
        borderWidth: BORDER_WIDTH,
        borderRadius: BORDER_RADIUS,
        padding: PADDING,
        margin: MARGIN,
    },
    todosListContainer: {
        flex: 1,
    },
    addIconPosition: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    headerModal: {
        marginHorizontal: MARGIN_HORIZONTAL,
        height: HEADER_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: colors.white,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: MARGIN_BOTTOM,
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        color: colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
    },
});
