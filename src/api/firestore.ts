import firestore from '@react-native-firebase/firestore';
import { FirestoreDocumentData, FirestoreQuerySnapshot } from '../types/firestoreTypes';

export const getDataOnce = async <T>(collection: string): Promise<FirestoreQuerySnapshot<FirestoreDocumentData>> => {
    return await firestore().collection<T>(collection).get();
};
