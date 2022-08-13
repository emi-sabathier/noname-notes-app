export type NoteColor = 'white' | 'blue' | 'yellow' | 'orange' | 'green';

export interface Note {
    id?: string;
    title: string;
    content: string;
    archive: boolean;
    noteColor: NoteColor;
}
