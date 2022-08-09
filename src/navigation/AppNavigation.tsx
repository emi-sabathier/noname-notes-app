import React from 'react';
import { HomeScreen } from '../ui/screens/HomeScreen';
import { AddTodoScreen } from '../ui/screens/AddTodoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from './Header';
import { ModifyTodoScreen } from '../ui/screens/ModifyTodoScreen';
import { Todo } from '../models/TodoModel';

export type RootStackParamList = {
    Home: undefined;
    AddTodo: undefined;
    ModifyTodo: { item: Todo };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'No Name App',
                }}
            />
            <Stack.Screen
                name="AddTodo"
                component={AddTodoScreen}
                options={{
                    header: () => null,
                    headerTitle: () => null,
                }}
            />
            <Stack.Screen
                name="ModifyTodo"
                component={ModifyTodoScreen}
                options={{
                    header: () => <Header />,
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigation;
