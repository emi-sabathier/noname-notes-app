import React, { FunctionComponent, ReactElement } from 'react';
import { UIHeader } from '../../navigation/UIHeader';
import { useAppSelector } from '../../store/hooks';
import { FlatList, StyleSheet } from 'react-native';
import { UINoteCard } from '../sharedComponents/UINoteCard';
import { UIContainer } from '../sharedComponents/UIContainer';
import { Note } from '../../models/NoteModel';

export const SearchScreen: FunctionComponent = (): ReactElement => {
    const notesList = useAppSelector(state => state.notes);
    const { query } = useAppSelector(state => state.query);
    const queryLowercase = query.toLowerCase();

    const found = notesList.notes.filter(note => {
        const titleLowercase = note.title.toLowerCase();
        const contentLowercase = note.content.toLowerCase();

        if (titleLowercase.includes(queryLowercase) || contentLowercase.includes(queryLowercase)) {
            return note;
        }
    });

    return (
        <>
            <UIHeader type="SEARCH" />
            <UIContainer style={styles.notesListContainer}>
                {found.length > 0 && query.length > 0 ? (
                    <>
                        <FlatList
                            numColumns={2}
                            data={found}
                            keyExtractor={(note, i) => i.toString()}
                            renderItem={({ item }) =>
                                item.archive ? null : <UINoteCard note={item as Note} key={item.id} />
                            }
                        />
                    </>
                ) : null}
            </UIContainer>
        </>
    );
};
const styles = StyleSheet.create({
    notesListContainer: {
        flex: 1,
    },
});
