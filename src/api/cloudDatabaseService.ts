import firestore from '@react-native-firebase/firestore';
import { Note } from '../models/NoteModel';
import { COLLECTION_NAME } from '../constants/firestore';
import { FirestoreDocumentData, FirestoreDocumentReference } from '../types/types';

const db = firestore().collection(COLLECTION_NAME);

export const addDocument = async (value: Note): Promise<void> => {
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
export const getNotesChange = () => {
    return new Promise((resolve, reject) => {
        db.onSnapshot(snapshot => {
            console.log('onSnapshot Called!');
            let updatedData = snapshot.docs.map(doc => doc.data());
            resolve(updatedData);
        }, reject);
    });
};
export const deleteDocument = async (documentId: string): Promise<void> => {
    try {
        await db.doc(documentId).delete();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};

export const updateDocument = async (value: Note): Promise<void> => {
    try {
        await db.doc(value.id).update(value);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};
