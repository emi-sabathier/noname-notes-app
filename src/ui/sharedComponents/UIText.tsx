import React, { ReactElement, ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { colorScheme } from '../../constants/colorScheme';
import NamedStyles = StyleSheet.NamedStyles;

type FontsType = 'SMALL' | 'REGULAR_BOLD' | 'REGULAR' | 'LARGE' | 'LARGE_BOLD';
type UITextProps = {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
    onPress?: (event: GestureResponderEvent) => void;
    allowFontScaling?: boolean;
    type: FontsType;
};

export const UIText = ({ children, style, allowFontScaling = true, onPress, type }: UITextProps): ReactElement => {
    return (
        <Text allowFontScaling={allowFontScaling} style={[style, textStyles[type]]} onPress={onPress}>
            {children}
        </Text>
    );
};

export const textStyles = StyleSheet.create<NamedStyles<{ [K in FontsType]: TextStyle }>>({
    SMALL: {
        fontSize: 10,
        color: colorScheme.grey700,
    },
    REGULAR_BOLD: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorScheme.grey700,
    },
    REGULAR: {
        fontSize: 16,
        color: colorScheme.grey700,
    },
    LARGE: {
        fontSize: 26,
        color: colorScheme.grey700,
    },
    LARGE_BOLD: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colorScheme.grey700,
    },
});
