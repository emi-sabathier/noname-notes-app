import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
