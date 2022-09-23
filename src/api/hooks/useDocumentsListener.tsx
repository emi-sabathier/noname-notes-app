import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
    FirestoreDocumentChange,
    FirestoreDocumentData,
    FirestoreQueryDocumentSnapshot,
    FirestoreQuerySnapshot,
} from '../../types/firestoreTypes';
import { addNote, deleteNote, updateNote } from '../../store/notesSlice';
import { useAppDispatch } from '../../store/hooks';
import { addTag, deleteTag, updateTag } from '../../store/tagsSlice';
import { Note } from '../../models/NoteModel';
import { Tag } from '../../models/TagModel';

export const useDocumentsListener = <T extends Note | Tag>(collection: string): T[] => {
    const [documentsList, setDocumentsList] = useState<T[]>([]);
    const isNoteCollection = collection === 'notes';
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            const unsubscribe = firestore()
                .collection(collection)
                .onSnapshot(
                    (snapshot: FirestoreQuerySnapshot<FirestoreDocumentData>): void => {
                        snapshot
                            .docChanges()
                            .forEach(async (change: FirestoreDocumentChange<FirestoreDocumentData>) => {
                                const document = change.doc.data();
                                switch (change.type) {
                                    case 'added':
                                        isNoteCollection
                                            ? dispatch(addNote(document as Note))
                                            : dispatch(addTag(document as Tag));

                                        break;
                                    case 'modified':
                                        isNoteCollection
                                            ? dispatch(updateNote(document as Note))
                                            : dispatch(updateTag(document as Tag));
                                        break;
                                    case 'removed':
                                        isNoteCollection
                                            ? dispatch(deleteNote(document.id))
                                            : dispatch(deleteTag(document.id));
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
                .collection(collection)
                .onSnapshot(
                    QuerySnapshot => {
                        const documents = QuerySnapshot.docs.map(
                            (document: FirestoreQueryDocumentSnapshot<FirestoreDocumentData>) => {
                                return document.data();
                            },
                        );
                        setDocumentsList(documents as T[]);
                    },
                    (error: Error) => {
                        throw new Error(error.message);
                    },
                );
            return () => unsubscribe;
        })();
    }, []);
    return documentsList;
};
