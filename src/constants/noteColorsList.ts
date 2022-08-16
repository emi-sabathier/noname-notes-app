import { NoteColor } from '../models/NoteModel';

type ColorsType = {
    id: number;
    noteColor: NoteColor;
};

export const colorsList: ColorsType[] = [
    {
        id: 1,
        noteColor: 'white',
    },
    {
        id: 2,
        noteColor: 'lightblue',
    },
    {
        id: 3,
        noteColor: 'lemonchiffon',
    },
    {
        id: 4,
        noteColor: 'lightgreen',
    },
    {
        id: 5,
        noteColor: 'orange',
    },
];
