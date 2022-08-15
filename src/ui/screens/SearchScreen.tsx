import React, { FunctionComponent, ReactElement } from 'react';
import { UIText } from '../shared/UIText';
import { UIHeader } from '../../navigation/UIHeader';
import { UIContainer } from '../shared/UIContainer';
import { useAppSelector } from '../../store/hooks';

export const SearchScreen: FunctionComponent = (): ReactElement => {
    const notesList = useAppSelector(state => state.notes);
    const query = useAppSelector(state => state.query);

    return (
        <>
            <UIHeader type="SEARCH" />
            <UIContainer>
                <UIText type="LARGE">Coucou</UIText>
            </UIContainer>
        </>
    );
};
