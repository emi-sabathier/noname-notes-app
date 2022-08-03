// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../ui/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { RootStackParamList } from './AppNavigation';
import { UITouchableOpacity } from '../ui/UITouchableOpacity';

const HEADER_HEIGHT = 50;
const ICON_PADDING_HORIZONTAL = 5;
const PADDING_HORIZONTAL = 15;

export const Header = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View>
                <UITouchableOpacity activeOpacity={0} onPress={handleBack}>
                    <Icon name="arrow-left" size={30} color={colors.black} />
                </UITouchableOpacity>
            </View>
            <View style={styles.rightIconsContainer}>
                <UITouchableOpacity onPress={() => console.log('todo')} style={styles.iconsPadding}>
                    <Icon name="pin-outline" size={30} color={colors.black} />
                </UITouchableOpacity>
                <UITouchableOpacity onPress={() => console.log('todo')} style={styles.iconsPadding}>
                    <Icon name="archive-arrow-down-outline" size={30} color={colors.black} />
                </UITouchableOpacity>
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
