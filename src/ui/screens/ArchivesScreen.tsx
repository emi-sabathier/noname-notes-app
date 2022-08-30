import React from 'react';
import { UIContainer } from '../shared/UIContainer';
import { FlatList, StyleSheet, View } from 'react-native';
import { UINoteCard } from '../components/UINoteCard';
import { useAppSelector } from '../../store/hooks';
import { Note } from '../../models/NoteModel';

export const ArchivesScreen = () => {
    const notesList = useAppSelector(state => state.notes);
    const archivesList = notesList.notes.filter(note => note.archive === true);

    return (
        <UIContainer>
            <View style={styles.notesListContainer}>
                {archivesList.length > 0 ? (
                    <>
                        <FlatList
                            numColumns={2}
                            data={archivesList}
                            keyExtractor={(note, i) => i.toString()}
                            renderItem={({ item }) => <UINoteCard note={item as Note} key={item.id} />}
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
