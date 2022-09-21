import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../models/TagModel';

export interface TagState {
    tags: Tag[];
}

const initialState: TagState = {
    tags: [],
};

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addTag: (state: TagState, action: PayloadAction<Tag>) => {
            return {
                ...state,
                tags: [...state.tags, action.payload],
            };
        },
        updateTag: (state: TagState, action: PayloadAction<Tag>) => {
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
