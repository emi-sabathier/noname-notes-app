import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { colorScheme } from '../../constants/colorScheme';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';
import { UITouchableOpacity } from '../sharedComponents/UITouchableOpacity';
import { UIContainer } from '../sharedComponents/UIContainer';
import { UINoteCard } from '../sharedComponents/UINoteCard';
import { UIText } from '../sharedComponents/UIText';
import { useAppDispatch } from '../../store/hooks';
import { addNote, deleteNote, updateNote } from '../../store/notesSlice';
import {
    FirestoreDocumentChange,
    FirestoreDocumentData,
    FirestoreQueryDocumentSnapshot,
    FirestoreQuerySnapshot,
} from '../../types/firestoreTypes';
import { dictionary } from '../../constants/dictionary';
import { NOTES_COLLECTION_NAME, TAGS_COLLECTION_NAME } from '../../constants/firestore';
import { addTag, deleteTag, updateTag } from '../../store/tagsSlice';

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
const SEARCH_PADDING = 10;
const SEARCH_BORDER_RADIUS = 25;
const SEARCH_MARGIN_BOTTOM = 10;

export const HomeScreen: FunctionComponent = (): ReactElement => {
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
    const [notesList, setNotesList] = useState<any[]>([]);
    const dispatch = useAppDispatch();

    // TODO: Make it DRY for notes and tags
    useEffect(() => {
        (async () => {
            const unsubscribe = firestore()
                .collection(NOTES_COLLECTION_NAME)
                .onSnapshot(
                    (snapshot: FirestoreQuerySnapshot<FirestoreDocumentData>): void => {
                        snapshot
                            .docChanges()
                            .forEach(async (change: FirestoreDocumentChange<FirestoreDocumentData>) => {
                                const document: FirestoreDocumentData = change.doc.data();
                                switch (change.type) {
                                    case 'added':
                                        dispatch(addNote(document));
                                        break;
                                    case 'modified':
                                        dispatch(updateNote(document));
                                        break;
                                    case 'removed':
                                        dispatch(deleteNote(document.id));
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
                .collection(TAGS_COLLECTION_NAME)
                .onSnapshot(
                    (snapshot: FirestoreQuerySnapshot<FirestoreDocumentData>): void => {
                        snapshot
                            .docChanges()
                            .forEach(async (change: FirestoreDocumentChange<FirestoreDocumentData>) => {
                                const document: FirestoreDocumentData = change.doc.data();
                                switch (change.type) {
                                    case 'added':
                                        dispatch(addTag(document));
                                        break;
                                    case 'modified':
                                        dispatch(updateTag(document));
                                        break;
                                    case 'removed':
                                        dispatch(deleteTag(document.id));
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
                .collection(NOTES_COLLECTION_NAME)
                .onSnapshot(
                    QuerySnapshot => {
                        const documentsList = QuerySnapshot.docs.map(
                            (document: FirestoreQueryDocumentSnapshot<FirestoreDocumentData>) => {
                                return document.data();
                            },
                        );
                        setNotesList(documentsList);
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
            <UITouchableOpacity style={styles.search} onPress={() => navigation.navigate('Search')}>
                <UIText type="REGULAR_BOLD">{dictionary.screens.searchButton}</UIText>
            </UITouchableOpacity>
            <View style={styles.container}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <View style={styles.notesListContainer}>
                    {notesList.length > 0 ? (
                        <>
                            <FlatList
                                numColumns={2}
                                data={notesList}
                                keyExtractor={(note, i) => i.toString()}
                                renderItem={({ item }) =>
                                    item.archive ? null : <UINoteCard note={item} key={item.id} />
                                }
                            />
                        </>
                    ) : null}
                </View>
                <View style={styles.addIconPosition}>
                    <UITouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddNote')}>
                        <Icon name="note-plus" size={ICON_SIZE} color={colorScheme.white} />
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
    notesListContainer: {
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
        backgroundColor: colorScheme.lightblue900,
    },
    textStyle: {
        color: colorScheme.white,
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
        fontWeight: 'bold',
        fontSize: INPUT_FONT_SIZE,
        padding: INPUT_PADDING,
    },
    search: {
        padding: SEARCH_PADDING,
        borderRadius: SEARCH_BORDER_RADIUS,
        backgroundColor: colorScheme.cyan100,
        marginBottom: SEARCH_MARGIN_BOTTOM,
        alignItems: 'center',
    },
});
