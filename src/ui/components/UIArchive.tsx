import React, { ReactElement, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorScheme } from '../../constants/colorScheme';
import { UITouchableOpacity } from '../sharedComponents/UITouchableOpacity';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from '../../navigation/AppNavigation';

const ICON_PADDING_HORIZONTAL = 5;
const ICON_SIZE = 30;

export interface ArchiveStatusProps {
    archiveStatus?: (v: boolean) => void;
}

export const UIArchiveButton = ({ archiveStatus }: ArchiveStatusProps): ReactElement => {
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
    const route = useRoute<RouteProp<StackNavigatorParamList, 'ModifyNote' | 'AddNote'>>();
    const currentArchiveStatus = route.params?.item.archive ?? false;
    const [archive, setArchive] = useState<boolean>(currentArchiveStatus);

    const handleArchive = async (): Promise<void> => {
        await setArchive(!currentArchiveStatus);
    };

    useEffect(() => {
        if (archiveStatus) {
            archiveStatus(archive);
        }
    }, [archive]);

    return (
        <UITouchableOpacity
            onPress={async () => {
                await handleArchive();
                navigation.goBack();
            }}
            style={styles.iconsPadding}>
            <Icon name="archive-arrow-down-outline" size={ICON_SIZE} color={colorScheme.grey800} />
        </UITouchableOpacity>
    );
};
const styles = StyleSheet.create({
    iconsPadding: {
        paddingHorizontal: ICON_PADDING_HORIZONTAL,
    },
});
