import React, { FunctionComponent, ReactElement } from 'react';
import { UIContainer } from '../sharedComponents/UIContainer';
import { FlatList, StyleSheet, View } from 'react-native';
import { UINoteCard } from '../sharedComponents/UINoteCard';
import { useAppSelector } from '../../store/hooks';
import { Note } from '../../models/NoteModel';

export const ArchivesScreen: FunctionComponent = (): ReactElement => {
    const notesSelector = useAppSelector(state => state.notes);
    const archivesList = notesSelector.notes.filter(note => note.archive === true);

    const archivedNotesList = (list: Note[]) => {
        return list.filter((note: Note) => note.archive);
    };

    return (
        <UIContainer>
            <View style={styles.notesListContainer}>
                {archivesList.length > 0 ? (
                    <>
                        <FlatList
                            numColumns={2}
                            data={archivedNotesList(archivesList)}
                            keyExtractor={(note, i) => i.toString()}
                            renderItem={({ item, index }) => <UINoteCard note={item} index={index} key={item.id} />}
                        />
                    </>
                ) : null}
            </View>
        </UIContainer>
    );
};
const styles = StyleSheet.create({
    notesListContainer: {
        flex: 1,
    },
});
