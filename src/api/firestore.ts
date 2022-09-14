import firestore from '@react-native-firebase/firestore';
import { FirestoreDocumentData, FirestoreQueryDocumentSnapshot, FirestoreQuerySnapshot } from '../types/firestoreTypes';
import { NOTES_COLLECTION_NAME } from '../constants/firestore';

export const getDataOnce = async <T>(collection: string): Promise<FirestoreQuerySnapshot<FirestoreDocumentData>> => {
    return await firestore().collection<T>(collection).get();
};

export const dataListener = (): Promise<FirestoreDocumentData[]> => {
    return new Promise((resolve, reject) => {
        firestore()
            .collection(NOTES_COLLECTION_NAME)
            .onSnapshot(
                QuerySnapshot => {
                    let documentsList: FirestoreDocumentData[] = [];
                    return QuerySnapshot.docs.map((document: FirestoreQueryDocumentSnapshot<FirestoreDocumentData>) => {
                        documentsList.push(document.data());
                        resolve(documentsList);
                    });
                },
                (error: Error) => {
                    reject(error.message);
                },
            );
    });
};
