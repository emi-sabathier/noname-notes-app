import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
import queryReducer from './querySlice';

export const store = configureStore({
    reducer: { notes: notesReducer, query: queryReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
