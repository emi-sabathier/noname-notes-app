import React from 'react';
import { GestureResponderEvent, StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    opacity?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
    onPress: (event: GestureResponderEvent) => void;
};

export const UITouchableHightlight = ({ style, opacity, color, onPress, children }: Props) => {
    return (
        <TouchableHighlight style={style} activeOpacity={opacity} underlayColor={color} onPress={onPress}>
            {children}
        </TouchableHighlight>
    );
};
