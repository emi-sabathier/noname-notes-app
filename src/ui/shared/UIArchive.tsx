import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors';
import { UITouchableOpacity } from './UITouchableOpacity';
import { StyleSheet } from 'react-native';

const ICON_PADDING_HORIZONTAL = 5;

export interface ArchiveStatusSpecs {
    archiveStatus: (a: boolean) => void;
}

export const UIArchiveButton = ({ archiveStatus }: ArchiveStatusSpecs) => {
    const [archive, setArchive] = useState<boolean>(false);

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
