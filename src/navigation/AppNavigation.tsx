import React from 'react';
import { HomeScreen } from '../ui/screens/HomeScreen';
import { AddTodoScreen } from '../ui/screens/AddTodoScreen';
import { ModifyTodoScreen } from '../ui/screens/ModifyTodoScreen';
import { ArchivesScreen } from '../ui/screens/ArchivesScreen';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Todo } from '../models/TodoModel';
import { createDrawerNavigator } from '@react-navigation/drawer';

export type StackNavigatorParamList = {
    Drawer: DrawerStackNavigatorParamList;
    Home: undefined;
    AddTodo: undefined;
    ModifyTodo: { item: Todo };
};

export type DrawerStackNavigatorParamList = {
    DrawerHome: StackNavigatorParamList;
    ArchivesStack: ArchivesStackNavigatorParamList;
};

export type ArchivesStackNavigatorParamList = {
    Archives: undefined;
    ModifyTodo: { item: Todo };
};

const HEADER_HIDDEN: StackNavigationOptions = { headerShown: false };
const HEADER_TITLE: StackNavigationOptions = { headerTitle: 'No Name App' };

const MainStack = createStackNavigator<StackNavigatorParamList>();
const ArchivesStack = createStackNavigator<ArchivesStackNavigatorParamList>();
const DrawerStack = createDrawerNavigator<DrawerStackNavigatorParamList>();

export const ArchivesStackNavigator = () => {
    return (
        <ArchivesStack.Navigator screenOptions={{ headerShown: false }}>
            <ArchivesStack.Screen name="Archives" component={ArchivesScreen} />
            <ArchivesStack.Screen name="ModifyTodo" component={ModifyTodoScreen} />
        </ArchivesStack.Navigator>
    );
};

export const DrawerStackNavigator = () => {
    return (
        <DrawerStack.Navigator>
            <DrawerStack.Screen
                name="DrawerHome"
                component={HomeScreen}
                options={{
                    headerTitle: 'No Name App',
                    title: 'Home',
                }}
            />
            <DrawerStack.Screen
                name="ArchivesStack"
                component={ArchivesStackNavigator}
                options={{
                    headerTitle: 'No Name App',
                    title: 'Archives',
                }}
            />
        </DrawerStack.Navigator>
    );
};

const MainStackNavigator = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShadowVisible: false,
            }}>
            <MainStack.Screen name="Drawer" component={DrawerStackNavigator} options={HEADER_HIDDEN} />
            <MainStack.Screen name="Home" component={HomeScreen} options={HEADER_TITLE} />
            <MainStack.Screen name="AddTodo" component={AddTodoScreen} options={HEADER_HIDDEN} />
            <MainStack.Screen name="ModifyTodo" component={ModifyTodoScreen} options={HEADER_HIDDEN} />
        </MainStack.Navigator>
    );
};

export default MainStackNavigator;
