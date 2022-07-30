// @flow
import * as React from 'react';
import { Pressable, StyleSheet, UITouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../ui/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { RootStackParamList } from './AppNavigation';

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
                <UITouchableHighlight activeOpacity={0} underlayColor="#fff" onPress={handleBack}>
                    <Icon name="arrow-left" size={30} color={colors.black} />
                </UITouchableHighlight>
            </View>
            <View style={styles.rightIconsContainer}>
                <UITouchableHighlight style={styles.iconsPadding}>
                    <Icon name="pin-outline" size={30} color={colors.black} />
                </UITouchableHighlight>
                <UITouchableHighlight style={styles.iconsPadding}>
                    <Icon name="archive-arrow-down-outline" size={30} color={colors.black} />
                </UITouchableHighlight>
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
