import React, { ReactElement, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors';
import { UITouchableOpacity } from './UITouchableOpacity';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { RootStackParamList } from '../../navigation/AppNavigation';

const ICON_PADDING_HORIZONTAL = 5;

export interface ArchiveStatusSpecs {
    archiveStatus: (a: boolean) => void;
}

export const UIArchiveButton = ({ archiveStatus }: ArchiveStatusSpecs): ReactElement => {
    const [archive, setArchive] = useState<boolean>(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleArchive = async () => {
        setArchive(prevState => !prevState);
    };

    useEffect(() => {
        archiveStatus(archive);
    }, [archive]);

    return (
        <UITouchableOpacity
            onPress={async () => {
                await handleArchive();
                navigation.goBack();
            }}
            style={styles.iconsPadding}>
            <Icon name="archive-arrow-down-outline" size={30} color={colors.black} />
        </UITouchableOpacity>
    );
};
const styles = StyleSheet.create({
    iconsPadding: {
        paddingHorizontal: ICON_PADDING_HORIZONTAL,
    },
});
