import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirestoreDocumentData } from '../types/firestoreTypes';

export interface NoteState {
    notes: FirestoreDocumentData[];
}

const initialState: NoteState = {
    notes: [],
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state: NoteState, action: PayloadAction<FirestoreDocumentData>) => {
            return {
                ...state,
                notes: [...state.notes, action.payload],
            };
        },
        updateNote: (state: NoteState, action: PayloadAction<FirestoreDocumentData>) => {
            const updatedNotes = state.notes.filter(note => note.id !== action.payload.id);
            return {
                ...state,
                notes: [...updatedNotes, { ...action.payload }],
            };
        },
        deleteNote: (state: NoteState, action: PayloadAction<string>) => {
            const updatedNotes = state.notes.filter(note => note.id !== action.payload);
            return {
                ...state,
                notes: updatedNotes,
            };
        },
    },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
