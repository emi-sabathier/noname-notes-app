import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UIText } from '../UIText';
import { colors } from '../colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { RootStackParamList } from '../../navigation/AppNavigation';
import { UITouchableOpacity } from '../UITouchableOpacity';
import { UIContainer } from '../UIContainer';

const MARGIN_HORIZONTAL = 20;
const MARGIN_BOTTOM = 15;
const HEADER_HEIGHT = 50;

export const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <UIContainer>
            <View style={styles.container}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <View style={styles.todosListContainer}>
                    <UIText type="REGULAR">C'est trop ouf</UIText>
                </View>
                <UITouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTodo')}>
                    <Icon name="comment-plus" size={80} color="#268df57F" />
                </UITouchableOpacity>
            </View>
        </UIContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    todosListContainer: {
        flex: 1,
    },
    addIcon: {
        alignSelf: 'flex-end',
    },
    headerModal: {
        marginHorizontal: MARGIN_HORIZONTAL,
        height: HEADER_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        alignSelf: 'flex-end',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: MARGIN_BOTTOM,
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        color: colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
    },
});
