import React, { useEffect, useState } from 'react';
import { Modal, UITouchableHighlight, StatusBar, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UIText } from '../UIText';
import { colors } from '../colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { RootStackParamList } from '../../navigation/AppNavigation';

const MARGIN_HORIZONTAL = 20;
const MARGIN_BOTTOM = 15;
const HEADER_HEIGHT = 50;

export const HomeScreen = () => {
    const [text, setText] = React.useState('Titre');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        console.log('txt', text);
    }, [text]);

    const handleText = e => setText(e);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.todosListContainer}>
                <UIText type="REGULAR">hello jpp</UIText>
            </View>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={styles.headerModal}>
                    <UITouchableHighlight onPress={() => setModalVisible(false)}>
                        <Icon name="arrow-left" size={30} color={colors.black} />
                    </UITouchableHighlight>
                    <UITouchableHighlight onPress={() => setModalVisible(false)}>
                        <Icon name="pin-outline" size={30} color={colors.black} />
                    </UITouchableHighlight>
                </View>
                <TextInput style={styles.input} onChangeText={handleText} value={text} />
            </Modal>
            <UITouchableHighlight style={styles.button} onPress={() => navigation.navigate('AddTodo')}>
                <Icon name="comment-plus" size={80} color="#268df57F" />
            </UITouchableHighlight>
        </View>
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
