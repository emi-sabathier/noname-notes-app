import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirestoreDocumentData } from '../types/firestoreTypes';

export interface TagState {
    tags: FirestoreDocumentData[];
}

const initialState: TagState = {
    tags: [],
};

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addTag: (state: TagState, action: PayloadAction<FirestoreDocumentData>) => {
            return {
                ...state,
                tags: [...state.tags, action.payload],
            };
        },
        updateTag: (state: TagState, action: PayloadAction<FirestoreDocumentData>) => {
            const updatedTags = state.tags.filter(tag => tag.id !== action.payload.id);
            return {
                ...state,
                tags: [...updatedTags, { ...action.payload }],
            };
        },
        deleteTag: (state: TagState, action: PayloadAction<string>) => {
            const updatedTags = state.tags.filter(tag => tag.id !== action.payload);
            return {
                ...state,
                tags: updatedTags,
            };
        },
    },
});

export const { addTag, updateTag, deleteTag } = tagsSlice.actions;
export default tagsSlice.reducer;
