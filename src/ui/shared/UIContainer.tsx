import React, { ReactElement, ReactNode } from 'react';
import { SafeAreaView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

const MARGIN: number = 20;

type UIContainerProps = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
};

export const UIContainer = ({ children, style }: UIContainerProps): ReactElement => {
    return (
        <SafeAreaView style={[styles.container, style]}>
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
