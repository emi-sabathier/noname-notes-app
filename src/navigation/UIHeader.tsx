import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { UITouchableOpacity } from '../ui/shared/UITouchableOpacity';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorScheme } from '../constants/colorScheme';
import { UIArchiveButton } from '../ui/components/UIArchive';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import { StackNavigatorParamList } from './AppNavigation';
import { UITextInput } from '../ui/shared/UITextInput';
import { dictionary } from '../constants/dictionary';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setQuery } from '../store/querySlice';

const HEADER_HEIGHT = 50;
const ICON_PADDING_HORIZONTAL = 5;
const PADDING_HORIZONTAL = 15;
const ICON_SIZE = 30;

interface UIHeaderProps {
    type: 'DEFAULT' | 'SEARCH';
    archiveStatus?: (v: boolean) => void;
}

export const UIHeader = ({ type, archiveStatus }: UIHeaderProps): ReactElement => {
    const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
    const dispatch = useAppDispatch();
    const { query } = useAppSelector(state => state.query);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (inputValue: string) => {
        setSearchQuery(inputValue);
        dispatch(setQuery(inputValue));
    };

    const handleBack = () => {
        navigation.goBack();

        if (query.length > 0) {
            dispatch(setQuery(''));
            setSearchQuery('');
        }
    };

    useEffect(() => {
        navigation.addListener('focus', () => {
            setSearchQuery('');
        });
    }, []);

    switch (type) {
        case 'DEFAULT':
            return (
                <View style={styles.container}>
                    <View>
                        <UITouchableOpacity activeOpacity={0} onPress={handleBack}>
                            <Icon name="arrow-left" size={ICON_SIZE} color={colorScheme.grey800} />
                        </UITouchableOpacity>
                    </View>
                    <View style={styles.rightIconsContainer}>
                        <UITouchableOpacity onPress={() => console.log('note')} style={styles.iconsPadding}>
                            <Icon name="pin-outline" size={ICON_SIZE} color={colorScheme.grey800} />
                        </UITouchableOpacity>
                        <UIArchiveButton archiveStatus={archiveStatus} />
                    </View>
                </View>
            );
        case 'SEARCH':
            return (
                <View style={styles.searchContainer}>
                    <UITouchableOpacity activeOpacity={0} onPress={handleBack}>
                        <Icon name="arrow-left" size={ICON_SIZE} color={colorScheme.grey800} />
                    </UITouchableOpacity>
                    <UITextInput
                        onChangeText={inputValue => handleSearch(inputValue)}
                        value={searchQuery}
                        style={styles.input}
                        placeholder={dictionary.screens.searchPlaceholder}
                    />
                </View>
            );
    }
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: PADDING_HORIZONTAL,
        flexDirection: 'row',
        width: '100%',
        height: HEADER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchContainer: {
        paddingHorizontal: PADDING_HORIZONTAL,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightIconsContainer: {
        flexDirection: 'row',
    },
    iconsPadding: {
        paddingHorizontal: ICON_PADDING_HORIZONTAL,
    },
    input: { flex: 1, textAlign: 'center', fontSize: 20 },
});
