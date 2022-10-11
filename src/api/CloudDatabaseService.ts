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
}

export class CloudDatabaseService<T extends Note | Tag> implements CloudDatabaseServiceSpecs<T> {
    private db: FirestoreCollectionReference<FirestoreDocumentData>;

    constructor(readonly collectionName: CollectionName) {
        this.db = firestore().collection(collectionName);
    }

    async addDocument(value: T): Promise<void> {
        try {
            const document: FirestoreDocumentReference<FirestoreDocumentData> = this.db.doc();
            const id = document.id;
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
}
