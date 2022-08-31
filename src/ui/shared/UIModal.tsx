import React, { ReactElement, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { colorScheme } from '../../constants/colorScheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UITouchableOpacity } from './UITouchableOpacity';

const ICON_SIZE = 30;
const ICONS_CONTAINER_MARGIN_TOP = 10;
const MODAL_CONTENT_PADDING_HORIZONTAL = 10;
const MODAL_CONTENT_BORDER_RADIUS_TOP = 10;
const MODAL_ANIMATION_TIMING = 600;

interface UIModalProps {
    children: ReactNode;
    visible: boolean;
    close: (v: boolean) => void;
    modalHeight: number;
}

export const UIModal = ({ children, visible, close, modalHeight }: UIModalProps): ReactElement => {
    const handleClose = (): void => {
        close(false);
    };

    return (
        <>
            <Modal
                isVisible={visible}
                swipeDirection="down"
                animationInTiming={MODAL_ANIMATION_TIMING}
                animationOutTiming={MODAL_ANIMATION_TIMING}
                useNativeDriver={true}
                onSwipeComplete={() => {
                    handleClose();
                }}
                style={styles.bottomModal}>
                <View style={[styles.modalContent, { height: modalHeight }]}>
                    <View style={styles.headerModalContainer}>
                        <View style={styles.swipeIconAlign}>
                            <Icon name="menu" size={ICON_SIZE} />
                        </View>
                        <UITouchableOpacity
                            onPress={() => {
                                handleClose();
                            }}>
                            <Icon name="window-close" size={ICON_SIZE} />
                        </UITouchableOpacity>
                    </View>
                    {children}
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: colorScheme.white,
        paddingHorizontal: MODAL_CONTENT_PADDING_HORIZONTAL,
        justifyContent: 'flex-start',
        borderTopRightRadius: MODAL_CONTENT_BORDER_RADIUS_TOP,
        borderTopLeftRadius: MODAL_CONTENT_BORDER_RADIUS_TOP,
    },
    headerModalContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: ICONS_CONTAINER_MARGIN_TOP,
    },
    swipeIconAlign: { flex: 1, alignItems: 'center' },
});
