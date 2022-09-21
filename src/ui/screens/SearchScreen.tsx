import React, { FunctionComponent, ReactElement } from 'react';
import { UIHeader } from '../../navigation/UIHeader';
import { useAppSelector } from '../../store/hooks';
import { FlatList, StyleSheet } from 'react-native';
import { UINoteCard } from '../sharedComponents/UINoteCard';
import { UIContainer } from '../sharedComponents/UIContainer';
import { Tag } from '../../models/TagModel';

export const SearchScreen: FunctionComponent = (): ReactElement => {
    const { notes } = useAppSelector(state => state.notes);
    const { query } = useAppSelector(state => state.query);
    const queryLowercase = query.toLowerCase();

    const getResults = () => {
        return notes.filter(note => {
            const titleLowercase = note.title.toLowerCase();
            const contentLowercase = note.content.toLowerCase();
            const tags = note.tags ?? [];
            const tagsFound = tags.some((tag: Tag) => tag.name.toLowerCase().includes(queryLowercase));

            if (titleLowercase.includes(queryLowercase) || contentLowercase.includes(queryLowercase) || tagsFound) {
                return note;
            }
        });
    };

    const results = query !== '' ? getResults() : [];

    return (
        <>
            <UIHeader type="SEARCH" />
            <UIContainer style={styles.notesListContainer}>
                {results.length > 0 && query.length > 0 ? (
                    <>
                        <FlatList
                            numColumns={2}
                            data={results}
                            keyExtractor={(note, i) => i.toString()}
                            renderItem={({ item, index }) =>
                                item.archive ? null : <UINoteCard note={item} index={index} key={item.id} />
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
