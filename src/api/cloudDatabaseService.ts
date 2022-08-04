import firestore from '@react-native-firebase/firestore';

const db = firestore().collection('todos');

export const TestRealtime = () => {
    console.log('realtime');
};

export const getTodos = async () => {
    const query = await firestore().collection('todos').get();
    return query.docs.map(document => {
        return document.data();
    });
};

export const addToCollection = async (value: any): Promise<void> => {
    try {
        await db.add(value);
    } catch (error) {
        throw new Error(error);
    }
};
