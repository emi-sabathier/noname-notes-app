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
import { addTodo } from '../../store/todosSlice';
import { FirestoreDocumentChange, FirestoreDocumentData, FirestoreQuerySnapshot } from '../../types/types';

const MARGIN_HORIZONTAL = 20;
const MARGIN_BOTTOM = 15;
const HEADER_HEIGHT = 50;

export const HomeScreen = (): JSX.Element => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [todosList, setTodosList] = useState<any>([]);
    const todosRedux = useAppSelector(state => state.todos);
    const dispatch = useAppDispatch();
    console.log('todos redux', todosRedux);

    useEffect(() => {
        (async () => {
            const unsubscribe = firestore()
                .collection('todos')
                .onSnapshot((snapshot: FirestoreQuerySnapshot): void => {
                    snapshot.docChanges().forEach(async (change: FirestoreDocumentChange) => {
                        const document: FirestoreDocumentData = change.doc.data();
                        switch (change.type) {
                            case 'added':
                                dispatch(addTodo(document));
                                break;
                            case 'modified':
                                // TODO : update in redux
                                console.log('Modified: ', document);
                                break;
                            case 'removed':
                                // TODO : remove in redux
                                console.log('Removed: ', document);
                                break;
                        }
                    });
                });

            return () => unsubscribe;
        })();
    }, [dispatch]);

    /// get les data
    useEffect(() => {
        (async () => {
            const unsubscribe = firestore()
                .collection('todos')
                .onSnapshot(
                    QuerySnapshot => {
                        const documentsList = QuerySnapshot.docs.map(document => {
                            return document.data();
                        });
                        setTodosList(documentsList);
                    },
                    error => {
                        throw new Error(error.message);
                    },
                );
            return () => unsubscribe;
        })();
    }, [dispatch]);

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
                                renderItem={({ item }) => <UITodoCard todo={item} key={item.id} />}
                            />
                        </>
                    ) : null}
                </View>
                <UITouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTodo')}>
                    <Icon name="comment-plus" size={80} color="#268df57F" />
                </UITouchableOpacity>
            </View>
        </UIContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    todosListContainer: {
        flex: 1,
    },
    addIcon: {
        alignSelf: 'flex-end',
    },
    headerModal: {
        marginHorizontal: MARGIN_HORIZONTAL,
        height: HEADER_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        alignSelf: 'flex-end',
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
