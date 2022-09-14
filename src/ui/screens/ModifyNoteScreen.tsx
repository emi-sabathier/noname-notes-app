import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { UIContainer } from '../sharedComponents/UIContainer';
import { UITextInput } from '../sharedComponents/UITextInput';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';
import { Note, NoteColor } from '../../models/NoteModel';
import { updateDocument } from '../../api/notesCloudDatabaseService';
import { UIScreenBottomBar } from '../sharedComponents/UIScreenBottomBar';
import { UIHeader } from '../../navigation/UIHeader';
import { addAlreadySelectedTags, clearSelectedTags } from '../../store/tagsSelectionSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { UIChip } from '../sharedComponents/UIChip';

const INPUT_HEIGHT = 50;
const INPUT_MARGIN_BOTTOM = 10;
const INPUT_FONT_SIZE = 20;

export const ModifyNoteScreen: FunctionComponent = (): ReactElement => {
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
    const route = useRoute<RouteProp<StackNavigatorParamList, 'ModifyNote'>>();
    const dispatch = useAppDispatch();

    const [archiveStatus, setArchiveStatus] = useState<boolean>(false);
    const [noteColorValue, setNoteColorValue] = useState<NoteColor>('white');
    const tagsSelector = useAppSelector(state => state.tagsSelected);
    const { tagsSelected } = tagsSelector;
    const [tagsList, setTagsList] = useState(tagsSelected);

    const id = route.params?.item.id ?? '';
    const title = route.params?.item.title ?? '';
    const content = route.params?.item.content ?? '';
    const archive = route.params?.item.archive ?? false;
    const tags = route.params?.item.tags ?? [];
    const noteColor = route.params?.item.noteColor;

    const [inputsValues, setInputValues] = useState<Note>({
        id,
        title,
        content,
        archive,
        noteColor,
        tags,
    });

    const handleInputValues = (inputName: string, inputValue: string) => {
        setInputValues({
            ...inputsValues,
            [inputName]: inputValue,
        });
        setTagsList(tagsSelected);
    };

    useEffect(() => {
        if (tagsSelected.length > 0) {
            setTagsList(tagsSelected);
        }
    }, [tagsList, tagsSelected]);

    useEffect(() => {
        dispatch(addAlreadySelectedTags(tags));
    }, []);

    useEffect(() => {
        const unsub = navigation.addListener('beforeRemove', async e => {
            await updateDocument({
                ...inputsValues,
                archive: archiveStatus,
                noteColor: noteColorValue,
                tags: tagsList,
            });
            dispatch(clearSelectedTags());
        });
        return () => {
            unsub();
        };
    }, [tagsList, tagsSelected, inputsValues, archiveStatus, noteColorValue]);

    const archiveCallback = (archiveValue: boolean): void => {
        setArchiveStatus(archiveValue);
    };

    const noteColorCallBack = (color: NoteColor): void => {
        setNoteColorValue(color);
    };

    return (
        <>
            <UIHeader type="DEFAULT" archiveStatus={archiveCallback} />
            <UIContainer style={{ backgroundColor: noteColorValue }}>
                <UITextInput
                    style={styles.inputTitle}
                    onChangeText={inputValue => handleInputValues('title', inputValue)}
                    value={inputsValues.title}
                />
                <UITextInput
                    style={styles.textArea}
                    onChangeText={inputValue => handleInputValues('content', inputValue)}
                    value={inputsValues.content}
                />
                <View>
                    {tagsSelected.length > 0 ? (
                        <FlatList
                            columnWrapperStyle={styles.flatListWrap}
                            numColumns={4}
                            data={tagsSelected}
                            renderItem={({ item }) => <UIChip tag={item} />}
                        />
                    ) : null}
                </View>
                <UIScreenBottomBar noteColorValue={noteColorCallBack} note={route.params.item} />
            </UIContainer>
        </>
    );
};

const styles = StyleSheet.create({
    inputTitle: {
        height: INPUT_HEIGHT,
        marginBottom: INPUT_MARGIN_BOTTOM,
        fontWeight: 'bold',
        fontSize: INPUT_FONT_SIZE,
    },
    flatListWrap: {
        flexWrap: 'wrap',
    },
    textArea: {
        flex: 1,
        fontSize: INPUT_FONT_SIZE,
        textAlignVertical: 'top',
    },
});
