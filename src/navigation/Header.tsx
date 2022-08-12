import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from './AppNavigation';
import { UITouchableOpacity } from '../ui/shared/UITouchableOpacity';
import { ArchiveStatusSpecs, UIArchiveButton } from '../ui/shared/UIArchive';

const HEADER_HEIGHT = 50;
const ICON_PADDING_HORIZONTAL = 5;
const PADDING_HORIZONTAL = 15;
const ICON_SIZE = 30;

export const Header = ({ archiveStatus }: ArchiveStatusSpecs) => {
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View>
                <UITouchableOpacity activeOpacity={0} onPress={handleBack}>
                    <Icon name="arrow-left" size={ICON_SIZE} color={colors.black} />
                </UITouchableOpacity>
            </View>
            <View style={styles.rightIconsContainer}>
                <UITouchableOpacity onPress={() => console.log('todo')} style={styles.iconsPadding}>
                    <Icon name="pin-outline" size={ICON_SIZE} color={colors.black} />
                </UITouchableOpacity>
                <UIArchiveButton archiveStatus={archiveStatus} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: PADDING_HORIZONTAL,
        flexDirection: 'row',
        width: '100%',
        height: HEADER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rightIconsContainer: {
        flexDirection: 'row',
    },
    iconsPadding: {
        paddingHorizontal: ICON_PADDING_HORIZONTAL,
    },
});
