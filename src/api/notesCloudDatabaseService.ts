import firestore from '@react-native-firebase/firestore';
import { Note } from '../models/NoteModel';
import { NOTES_COLLECTION_NAME } from '../constants/firestore';
import { FirestoreDocumentData, FirestoreDocumentReference } from '../types/firestoreTypes';

const db = firestore().collection<Note>(NOTES_COLLECTION_NAME);

export const addNoteDocument = async (value: Note): Promise<void> => {
    try {
        const document: FirestoreDocumentReference<FirestoreDocumentData> = db.doc();
        const id = document.id;
        await db.doc(id).set({
            id,
            ...value,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};

export const deleteNoteDocument = async (documentId: string): Promise<void> => {
    try {
        await db.doc(documentId).delete();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};

export const updateNoteDocument = async (value: Note): Promise<void> => {
    try {
        await db.doc(value.id).update(value);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};
