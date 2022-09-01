import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { UIHeader } from '../../navigation/UIHeader';
import { UIContainer } from '../shared/UIContainer';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native';
import { TAGS_COLLECTION_NAME } from '../../constants/firestore';
import { FirestoreDocumentData, FirestoreQueryDocumentSnapshot } from '../../types/firestoreTypes';
import { UIEditDeleteTag } from '../components/UIEditDeleteTag';
import { UIAddTag } from '../components/UIAddTag';

export const TagsScreen: FunctionComponent = (): ReactElement => {
    const [tagsList, setTagsList] = useState<any[]>([]);

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
                        setTagsList(documentsList);
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
                        data={tagsList}
                        keyExtractor={(tag, i) => i.toString()}
                        renderItem={({ item, index }) => <UIEditDeleteTag tag={item} key={index} />}
                    />
                ) : null}
            </UIContainer>
        </>
    );
};
