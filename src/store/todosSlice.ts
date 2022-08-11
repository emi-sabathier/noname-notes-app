import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirestoreDocumentData } from '../types/types';

export interface TodoState {
    todos: FirestoreDocumentData[];
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
        updateTodo: (state: TodoState, action: PayloadAction<FirestoreDocumentData>) => {
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload.id);
            return {
                todos: [...updatedTodos, { ...action.payload }],
            };
        },
        deleteTodo: (state: TodoState, action: PayloadAction<string>) => {
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);
            return {
                ...state,
                todos: updatedTodos,
            };
        },
    },
});

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
