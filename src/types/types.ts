import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type FirestoreDocumentData = FirebaseFirestoreTypes.DocumentData;
export type FirestoreQuerySnapshot = FirebaseFirestoreTypes.QuerySnapshot<FirestoreDocumentData>;
export type FirestoreDocumentChange = FirebaseFirestoreTypes.DocumentChange<FirestoreDocumentData>;
