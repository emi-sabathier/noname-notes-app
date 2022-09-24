import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStackNavigator from './navigation/AppNavigation';
import { useFlipper } from '@react-navigation/devtools';
import 'react-native-gesture-handler';

const App = () => {
    const navigationRef = useNavigationContainerRef();
    useFlipper(navigationRef);

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer ref={navigationRef}>
                    <MainStackNavigator />
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    );
};

export default App;
