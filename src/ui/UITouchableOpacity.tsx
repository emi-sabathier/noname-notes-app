import React from 'react';
import { GestureResponderEvent, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    activeOpacity?: number;
    style?: StyleProp<ViewStyle>;
    onPress: (event: GestureResponderEvent) => void;
};

export const UITouchableOpacity = ({ style, activeOpacity, onPress, children }: Props) => {
    return (
        <TouchableOpacity style={style} activeOpacity={activeOpacity} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};
