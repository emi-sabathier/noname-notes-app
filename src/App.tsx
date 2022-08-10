import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BottomStackNavigator } from './navigation/AppNavigation';

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <BottomStackNavigator />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
