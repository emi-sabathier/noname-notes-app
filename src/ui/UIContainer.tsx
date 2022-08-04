import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const MARGIN: number = 20;

type Props = {
    children: ReactNode;
};

export const UIContainer = ({ children }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    view: {
        flex: 1,
        margin: MARGIN,
    },
});
