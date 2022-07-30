import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

const MARGIN: number = 20;

type Props = {
    children: ReactNode;
};

export const UIContainer = ({ children }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>{children}</ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
        margin: MARGIN,
    },
});
