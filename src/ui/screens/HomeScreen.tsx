import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';
import { UITouchableOpacity } from '../shared/UITouchableOpacity';
import { UIContainer } from '../shared/UIContainer';
import firestore from '@react-native-firebase/firestore';
import { UITodoCard } from '../components/UITodoCard';
import { useAppDispatch } from '../../store/hooks';
import { addTodo, deleteTodo, updateTodo } from '../../store/todosSlice';
import {
    FirestoreDocumentChange,
    FirestoreDocumentData,
    FirestoreQueryDocumentSnapshot,
    FirestoreQuerySnapshot,
} from '../../types/types';

const BUTTON_RADIUS = 40;
const BUTTON_WIDTH = 50;
const BUTTON_HEIGHT = 50;
const HEADER_HEIGHT = 50;
const ICON_POS_BOTTOM = 0;
const ICON_POS_RIGHT = 0;
const ICON_SIZE = 26;
const INPUT_HEIGHT = 40;
const INPUT_MARGIN = 12;
const INPUT_FONT_SIZE = 20;
const INPUT_PADDING = 10;
const MARGIN_HORIZONTAL = 20;
const MARGIN_BOTTOM = 15;

export const HomeScreen: FunctionComponent = (): ReactElement => {
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
    const [todosList, setTodosList] = useState<any[]>([]);
    const dispatch = useAppDispatch();

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
                                renderItem={({ item }) =>
                                    item.archive ? null : <UITodoCard todo={item} key={item.id} />
                                }
                            />
                        </>
                    ) : null}
                </View>
                <View style={styles.addIconPosition}>
                    <UITouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTodo')}>
                        <Icon name="note-plus" size={ICON_SIZE} color={colors.white} />
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
    todosListContainer: {
        flex: 1,
    },
    addIconPosition: {
        position: 'absolute',
        bottom: ICON_POS_BOTTOM,
        right: ICON_POS_RIGHT,
    },
    headerModal: {
        marginHorizontal: MARGIN_HORIZONTAL,
        height: HEADER_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        borderRadius: BUTTON_RADIUS,
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#004385',
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
        height: INPUT_HEIGHT,
        margin: INPUT_MARGIN,
        color: colors.primaryColor,
        fontWeight: 'bold',
        fontSize: INPUT_FONT_SIZE,
        padding: INPUT_PADDING,
    },
});
