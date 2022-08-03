import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../models/TodoModel';

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [],
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        },
    },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
