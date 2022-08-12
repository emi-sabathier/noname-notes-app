import * as React from 'react';
import { ReactElement } from 'react';
import { deleteDocument } from '../../api/cloudDatabaseService';
import { UITouchableOpacity } from './UITouchableOpacity';
import { deleteNote } from '../../store/notesSlice';
import { colors } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch } from '../../store/hooks';
import { StyleSheet } from 'react-native';

const ICON_SIZE = 26;

export const UIDeleteButton = ({ id }: Record<'id', string>): ReactElement => {
    const dispatch = useAppDispatch();
    return (
        <UITouchableOpacity
            style={styles.iconsAlign}
            onPress={async () => {
                await deleteDocument(id);
                dispatch(deleteNote(id));
            }}>
            <Icon name="trash-can-outline" size={ICON_SIZE} color={colors.grey800} />
        </UITouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconsAlign: {
        alignSelf: 'flex-end',
    },
});
