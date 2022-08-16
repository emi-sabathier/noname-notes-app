import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QueryState {
    query: string;
}

const initialState: QueryState = {
    query: '',
};

export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setQuery: (state: QueryState, action: PayloadAction<string>) => {
            return {
                ...state,
                query: action.payload,
            };
        },
    },
});

export const { setQuery } = querySlice.actions;
export default querySlice.reducer;
