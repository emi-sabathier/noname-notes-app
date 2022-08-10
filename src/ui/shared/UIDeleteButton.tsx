import * as React from 'react';
import { deleteDocument } from '../../api/cloudDatabaseService';
import { UITouchableOpacity } from './UITouchableOpacity';
import { deleteTodo } from '../../store/todosSlice';
import { colors } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch } from '../../store/hooks';
import { StyleSheet } from 'react-native';
import { ReactElement } from 'react';

export const UIDeleteButton = ({ id }: Record<'id', string>): ReactElement => {
    const dispatch = useAppDispatch();
    return (
        <UITouchableOpacity
            style={styles.iconsAlign}
            onPress={async () => {
                await deleteDocument(id);
                dispatch(deleteTodo(id));
            }}>
            <Icon name="trash-can-outline" size={26} color={colors.grey800} />
        </UITouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconsAlign: {
        alignSelf: 'flex-end',
    },
});
