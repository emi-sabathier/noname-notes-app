import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen } from '../ui/screens/HomeScreen';
import { AddTodoScreen } from '../ui/screens/AddTodoScreen';
import { ModifyTodoScreen } from '../ui/screens/ModifyTodoScreen';
import { ArchivesScreen } from '../ui/screens/ArchivesScreen';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Todo } from '../models/TodoModel';

export type StackNavigatorParamList = {
    Home: undefined;
    AddTodo: undefined;
    ModifyTodo: { item: Todo };
};

export type BottomStackNavigatorParamList = {
    MainStack: StackNavigatorParamList;
    ArchivesStack: ArchivesStackNavigatorParamList;
};

export type ArchivesStackNavigatorParamList = {
    Archives: undefined;
    ModifyTodo: { item: Todo };
};

const HEADER_HIDDEN: NativeStackNavigationOptions = { headerShown: false };
const HEADER_TITLE: NativeStackNavigationOptions = { headerTitle: 'No Name App' };

const MainStack = createNativeStackNavigator<StackNavigatorParamList>();
const ArchivesStack = createNativeStackNavigator<ArchivesStackNavigatorParamList>();
const BottomStack = createMaterialBottomTabNavigator<BottomStackNavigatorParamList>();

export const ArchivesStackNavigator = () => {
    return (
        <ArchivesStack.Navigator>
            <ArchivesStack.Screen name="Archives" component={ArchivesScreen} options={HEADER_TITLE} />
            <ArchivesStack.Screen name="ModifyTodo" component={ModifyTodoScreen} options={HEADER_HIDDEN} />
        </ArchivesStack.Navigator>
    );
};

export const BottomStackNavigator = () => {
    return (
        <BottomStack.Navigator
            shifting={true}
            labeled={false}
            activeColor="#004385"
            inactiveColor="#E0F7FA"
            barStyle={{ backgroundColor: '#B2EBF2' }}>
            <BottomStack.Screen
                name="MainStack"
                component={MainStackNavigator}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="home-variant-outline"
                            style={{
                                textAlign: 'center',
                                backgroundColor: focused ? '#FFF' : 'transparent',
                                borderRadius: 20,
                                position: 'relative',
                                top: -5,
                                width: 50,
                                height: 32,
                            }}
                            size={32}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomStack.Screen
                name="ArchivesStack"
                component={ArchivesStackNavigator}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="archive-arrow-down-outline"
                            style={{
                                textAlign: 'center',
                                backgroundColor: focused ? '#FFF' : 'transparent',
                                borderRadius: 20,
                                position: 'relative',
                                top: -5,
                                width: 50,
                                height: 32,
                            }}
                            size={32}
                            color={color}
                        />
                    ),
                }}
            />
        </BottomStack.Navigator>
    );
};

const MainStackNavigator = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShadowVisible: false,
            }}>
            <MainStack.Screen name="Home" component={HomeScreen} options={HEADER_TITLE} />
            <MainStack.Screen name="AddTodo" component={AddTodoScreen} options={HEADER_HIDDEN} />
            <MainStack.Screen name="ModifyTodo" component={ModifyTodoScreen} options={HEADER_HIDDEN} />
        </MainStack.Navigator>
    );
};

export default MainStackNavigator;
