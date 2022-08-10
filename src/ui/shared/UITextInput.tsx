import React, { ReactElement } from 'react';
import { NativeSyntheticEvent, StyleProp, TextInput, TextInputFocusEventData, TextStyle } from 'react-native';

type UITextInputProps = {
    style?: StyleProp<TextStyle>;
    onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
};

export const UITextInput = ({ style, onFocus, placeholder, onChangeText, value }: UITextInputProps): ReactElement => {
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
