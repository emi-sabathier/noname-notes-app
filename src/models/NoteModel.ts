import { Tag } from './TagModel';

export type NoteColor = 'white' | 'lightblue' | 'lemonchiffon' | 'orange' | 'lightgreen';

export interface Note {
    id?: string;
    title: string;
    content: string;
    archive: boolean;
    noteColor: NoteColor;
    tags?: Tag[];
}
