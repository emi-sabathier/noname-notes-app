import firestore from '@react-native-firebase/firestore';
import { Todo } from '../models/TodoModel';

const db = firestore().collection('todos');

export const addToCollection = async (value: Todo): Promise<void> => {
    await db.add(value);
};
