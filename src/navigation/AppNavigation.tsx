import React from 'react';
import { HomeScreen } from '../ui/screens/HomeScreen';
import { UIContainer } from '../ui/UIContainer';
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
            <Stack.Screen name="Home" options={{ headerTitle: 'Jpp' }}>
                {props => (
                    <UIContainer>
                        <HomeScreen {...props} />
                    </UIContainer>
                )}
            </Stack.Screen>
            <Stack.Screen
                name="AddTodo"
                options={{
                    header: props => <Header {...props} />,
                }}>
                {props => (
                    <UIContainer>
                        <AddTodoScreen {...props} />
                    </UIContainer>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AppNavigation;
