import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirestoreDocumentData } from '../types/types';

interface TodoState {
    todos: FirebaseFirestoreTypes.DocumentData[];
}

const initialState: TodoState = {
    todos: [],
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state: TodoState, action: PayloadAction<FirestoreDocumentData>) => {
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        },
    },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
