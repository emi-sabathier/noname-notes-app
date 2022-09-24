import firestore from '@react-native-firebase/firestore';
import { TAGS_COLLECTION_NAME } from '../constants/firestore';
import { FirestoreDocumentData, FirestoreDocumentReference } from '../types/firestoreTypes';
import { Tag } from '../models/TagModel';

const db = firestore().collection<Tag>(TAGS_COLLECTION_NAME);

export const addTagDocument = async (value: Tag): Promise<void> => {
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

export const deleteTagDocument = async (documentId: string): Promise<void> => {
    try {
        await db.doc(documentId).delete();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};

export const updateTagDocument = async (value: Tag): Promise<void> => {
    try {
        await db.doc(value.id).update(value);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};
