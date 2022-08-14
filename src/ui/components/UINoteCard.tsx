import React from 'react';
import { UIText } from '../shared/UIText';
import { Note } from '../../models/NoteModel';
import { StyleSheet, View } from 'react-native';
import { truncate } from '../../utils/truncate';
import { UIDeleteButton } from '../shared/UIDeleteButton';
import { UITouchableOpacity } from '../shared/UITouchableOpacity';
import { colorScheme } from '../../constants/colorScheme';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';

const BORDER_WIDTH = 1;
const BORDER_RADIUS = 10;
const PADDING = 10;
const MARGIN = 10;

type UINoteCardProps = {
    note: Note;
};

export const UINoteCard = ({ note }: UINoteCardProps): JSX.Element => {
    const id = note.id ?? '';
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();

    return (
        <>
            <UITouchableOpacity
                style={[styles.card, { backgroundColor: note.noteColor }]}
                onPress={() => navigation.navigate('ModifyNote', { item: note })}>
                <View>
                    <UIText type="REGULAR_BOLD">{note.title}</UIText>
                    <UIText type="REGULAR">{truncate(note.content)}</UIText>
                </View>
                <UIDeleteButton id={id} />
            </UITouchableOpacity>
        </>
    );
};
const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignSelf: 'flex-start',
        borderColor: colorScheme.grey300,
        borderWidth: BORDER_WIDTH,
        borderRadius: BORDER_RADIUS,
        padding: PADDING,
        margin: MARGIN,
    },
});
