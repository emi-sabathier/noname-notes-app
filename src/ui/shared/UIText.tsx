import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import NamedStyles = StyleSheet.NamedStyles;

type FontsType = 'SMALL' | 'REGULAR_BOLD' | 'REGULAR' | 'LARGE';
type UITextProps = {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
    onPress?: (event: GestureResponderEvent) => void;
    allowFontScaling?: boolean;
    type: FontsType;
};

export const UIText = ({ children, style, allowFontScaling = true, onPress, type }: UITextProps) => {
    return (
        <Text allowFontScaling={allowFontScaling} style={[style, textStyles[type]]} onPress={onPress}>
            {children}
        </Text>
    );
};

export const textStyles = StyleSheet.create<NamedStyles<{ [K in FontsType]: TextStyle }>>({
    SMALL: {
        fontSize: 10,
    },
    REGULAR_BOLD: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    REGULAR: {
        fontSize: 16,
    },
    LARGE: {
        fontSize: 26,
    },
});
