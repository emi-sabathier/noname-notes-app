import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../models/TagModel';

export interface TagsSelectionState {
    tagsSelected: Tag[];
}

const initialState: TagsSelectionState = {
    tagsSelected: [],
};

export const tagsSelectionSlice = createSlice({
    name: 'tagsSelection',
    initialState,
    reducers: {
        toggleSelectedTags: (state: TagsSelectionState, action: PayloadAction<Tag>) => {
            const isExists = state.tagsSelected.some(tag => tag.id === action.payload.id);
            if (isExists) {
                return {
                    tagsSelected: state.tagsSelected.filter(tag => tag.id !== action.payload.id),
                };
            } else {
                return {
                    tagsSelected: [...state.tagsSelected, action.payload],
                };
            }
        },
        deleteOneSelectedTag: (state: TagsSelectionState, action: PayloadAction<Tag>) => {
            return {
                tagsSelected: state.tagsSelected.filter(tag => tag.id !== action.payload.id),
            };
        },
        clearSelectedTags: () => {
            return {
                tagsSelected: [],
            };
        },
    },
});

export const { toggleSelectedTags, clearSelectedTags, deleteOneSelectedTag } = tagsSelectionSlice.actions;
export default tagsSelectionSlice.reducer;
