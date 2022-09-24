import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
import tagsReducer from './tagsSlice';
import queryReducer from './querySlice';
import tagsSelectionReducer from './tagsSelectionSlice';

export const store = configureStore({
    reducer: { notes: notesReducer, query: queryReducer, tags: tagsReducer, tagsSelected: tagsSelectionReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
