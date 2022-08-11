import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BottomStackNavigator } from './navigation/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <BottomStackNavigator />
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    );
};

export default App;
