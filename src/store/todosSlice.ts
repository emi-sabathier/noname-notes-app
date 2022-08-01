import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    title: string;
    content: string;
}

interface TodosState {
    todos: Array<Todo>;
}

const initialState: TodosState = {
    todos: [],
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                todos: [action.payload],
            };
        },
    },
});

export const { addTodo } = todosSlice.actions;

export default todosSlice.reducer;
