import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { UIHeader } from '../../navigation/UIHeader';
import { UIContainer } from '../shared/UIContainer';
import { FlatList } from 'react-native';
import { TAGS_COLLECTION_NAME } from '../../constants/firestore';
import { UIEditDeleteTag } from '../components/UIEditDeleteTag';
import { UIAddTag } from '../components/UIAddTag';
import { Tag } from '../../models/TagModel';
import { FirestoreDocumentData, FirestoreQueryDocumentSnapshot } from '../../types/firestoreTypes';
import firestore from '@react-native-firebase/firestore';

export const TagsManagerScreen: FunctionComponent = (): ReactElement => {
    const [tagsList, setTagsList] = useState<Tag[]>([]);

    useEffect(() => {
        (async () => {
            const unsubscribe = firestore()
                .collection(TAGS_COLLECTION_NAME)
                .onSnapshot(
                    QuerySnapshot => {
                        const documentsList = QuerySnapshot.docs.map(
                            (document: FirestoreQueryDocumentSnapshot<FirestoreDocumentData>) => {
                                return document.data();
                            },
                        );
                        setTagsList(documentsList as Tag[]);
                    },
                    (error: Error) => {
                        throw new Error(error.message);
                    },
                );
            return () => unsubscribe;
        })();
    }, []);

    return (
        <>
            <UIHeader type="DEFAULT" />
            <UIContainer>
                <UIAddTag />
                {tagsList.length > 0 ? (
                    <FlatList
                        keyboardShouldPersistTaps={'handled'}
                        data={tagsList}
                        keyExtractor={(tag, i) => i.toString()}
                        renderItem={({ item }) => <UIEditDeleteTag tag={item} key={item.id} />}
                    />
                ) : null}
            </UIContainer>
        </>
    );
};
