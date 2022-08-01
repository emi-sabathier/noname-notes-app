import React from 'react';
import { HomeScreen } from '../ui/screens/HomeScreen';
import { AddTodoScreen } from '../ui/screens/AddTodoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from './Header';

export type RootStackParamList = {
    Home: undefined;
    AddTodo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Jpp' }} />
            <Stack.Screen
                name="AddTodo"
                component={AddTodoScreen}
                options={{
                    header: () => <Header />,
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigation;
