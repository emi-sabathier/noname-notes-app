import firestore from '@react-native-firebase/firestore';
import {
    FirestoreCollectionReference,
    FirestoreDocumentData,
    FirestoreDocumentReference,
} from '../types/firestoreTypes';
import { Note } from '../models/NoteModel';
import { Tag } from '../models/TagModel';
import { CollectionName } from '../constants/firestore';

interface CloudDatabaseServiceSpecs<T> {
    addDocument(v: T): Promise<void>;
    updateDocument(value: T): Promise<void>;
    deleteDocument(documentId: string): Promise<void>;
}

export class CloudDatabaseService<T extends Note | Tag> implements CloudDatabaseServiceSpecs<T> {
    private db: FirestoreCollectionReference<FirestoreDocumentData>;

    constructor(readonly collectionName: CollectionName) {
        this.db = firestore().collection(collectionName);
    }

    async addDocument(value: T): Promise<void> {
        try {
            const document: FirestoreDocumentReference<FirestoreDocumentData> = this.db.doc();
            const id: string = document.id;
            await this.db.doc(id).set({
                id,
                ...value,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async updateDocument(value: T): Promise<void> {
        try {
            await this.db.doc(value.id).update(value);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async deleteDocument(documentId: string): Promise<void> {
        try {
            await this.db.doc(documentId).delete();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
}
export const notesCloudDatabase = new CloudDatabaseService(CollectionName.Notes);
export const tagsCloudDatabase = new CloudDatabaseService(CollectionName.Tags);
