import React from 'react';
import { TextInput, NativeSyntheticEvent, StyleProp, TextInputFocusEventData, TextStyle } from 'react-native';

type UITextInputProps = {
    style?: StyleProp<TextStyle>;
    onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
};

export const UITextInput = ({ style, onFocus, placeholder, onChangeText, value }: UITextInputProps) => {
    return (
        <TextInput
            style={style}
            placeholder={placeholder}
            onFocus={onFocus}
            onChangeText={onChangeText}
            value={value}
        />
    );
};
