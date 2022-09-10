import React, { ReactElement, useEffect, useState } from 'react';
import { TAGS_COLLECTION_NAME } from '../../constants/firestore';
import { FlatList, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UIText } from '../shared/UIText';
import { colorScheme } from '../../constants/colorScheme';
import { CheckBox } from '@rneui/base';
import { Tag } from '../../models/TagModel';
import { getDataOnce } from '../../api/firestore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTagsSelected } from '../../store/tagsSelectionSlice';
import { FirestoreDocumentData } from '../../types/firestoreTypes';

const ICON_SIZE = 26;
const MARGIN_LEFT = 40;
const MARGIN_TOP = 2;
const CONTAINER_MARGIN_TOP = 10;

export const UITagSelection = (): ReactElement => {
    const [tagsList, setTagsList] = useState<Tag[]>([]);
    const [checked, setChecked] = useState<boolean[]>([]);
    const dispatch = useAppDispatch();
    const tags = useAppSelector(state => state.tagsSelected);
    const { tagsSelected } = tags;

    const toggleCheckbox = (position: number): void => {
        const updatedCheckedState = checked.map((isChecked, index) => (index === position ? !isChecked : isChecked));
        setChecked(updatedCheckedState);
    };

    const setCheckedState = (documentsList: FirestoreDocumentData[]): void => {
        if (tagsSelected.length > 0) {
            const isAlreadyChecked = documentsList.map(doc => !!tagsSelected.find(tag => tag.id === doc.id));
            setChecked(isAlreadyChecked);
        } else {
            setChecked(new Array(documentsList.length).fill(false));
        }
    };

    useEffect(() => {
        (async () => {
            const data = await getDataOnce<Tag>(TAGS_COLLECTION_NAME);
            const documentsList = data.docs.map(item => item.data());
            setTagsList(documentsList as Tag[]);
            setCheckedState(documentsList);
            return () => data;
        })();
    }, []);

    return (
        <>
            {tagsList.length > 0 ? (
                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    data={tagsList}
                    keyExtractor={(tag, i) => i.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.container}>
                            <Icon name="tag-text" color={item.color} size={ICON_SIZE} />
                            <UIText type="REGULAR" style={styles.margin}>
                                {item.name}
                            </UIText>
                            <CheckBox
                                key={item.id}
                                containerStyle={styles.checkbox}
                                checked={checked[index]}
                                onPress={async () => {
                                    toggleCheckbox(index);
                                    dispatch(toggleTagsSelected(item));
                                }}
                                uncheckedIcon={
                                    <Icon name="checkbox-blank-outline" color={colorScheme.grey700} size={ICON_SIZE} />
                                }
                                checkedIcon={
                                    <Icon name="checkbox-outline" color={colorScheme.green500} size={ICON_SIZE} />
                                }
                            />
                        </View>
                    )}
                />
            ) : null}
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: CONTAINER_MARGIN_TOP,
    },
    checkbox: {
        padding: 0,
        margin: 0,
    },
    margin: {
        flex: 1,
        marginTop: MARGIN_TOP,
        marginLeft: MARGIN_LEFT,
    },
});
