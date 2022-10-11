import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type FirestoreDocumentData = FirebaseFirestoreTypes.DocumentData;
export type FirestoreQuerySnapshot<T> = FirebaseFirestoreTypes.QuerySnapshot<T>;
export type FirestoreDocumentSnapshot<T> = FirebaseFirestoreTypes.DocumentSnapshot<T>;
export type FirestoreDocumentChange<T> = FirebaseFirestoreTypes.DocumentChange<T>;
export type FirestoreDocumentReference<T> = FirebaseFirestoreTypes.DocumentReference<T>;
export type FirestoreCollectionReference<T> = FirebaseFirestoreTypes.CollectionReference<T>;
export type FirestoreQueryDocumentSnapshot<T> = FirebaseFirestoreTypes.QueryDocumentSnapshot<T>;
