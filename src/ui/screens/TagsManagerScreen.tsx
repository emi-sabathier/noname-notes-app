import React, { FunctionComponent, ReactElement } from 'react';
import { UIHeader } from '../../navigation/UIHeader';
import { UIContainer } from '../sharedComponents/UIContainer';
import { FlatList } from 'react-native';
import { CollectionName } from '../../constants/firestore';
import { UIEditDeleteTag } from '../components/UIEditDeleteTag';
import { UIAddTag } from '../components/UIAddTag';
import { Tag } from '../../models/TagModel';
import { useDocumentsListener } from '../../api/hooks/useDocumentsListener';

export const TagsManagerScreen: FunctionComponent = (): ReactElement => {
    const tagsList = useDocumentsListener<Tag>(CollectionName.Tags);

    return (
        <>
            <UIHeader type="TAGS" />
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
