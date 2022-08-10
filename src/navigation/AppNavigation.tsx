import React from 'react';
import { HomeScreen } from '../ui/screens/HomeScreen';
import { AddTodoScreen } from '../ui/screens/AddTodoScreen';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ModifyTodoScreen } from '../ui/screens/ModifyTodoScreen';
import { Todo } from '../models/TodoModel';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../utils/colors';
import { ArchivesScreen } from '../ui/screens/ArchivesScreen';

export type StackNavigatorParamList = {
    Home: undefined;
    AddTodo: undefined;
    ModifyTodo: { item: Todo };
    Tabs: BottomNavigatorParamList;
};

export type BottomNavigatorParamList = {
    Main: StackNavigatorParamList;
    Archives: { item: Todo };
};

const HEADER_HIDDEN: NativeStackNavigationOptions = { headerShown: false };

const MainStack = createNativeStackNavigator<StackNavigatorParamList>();
const BottomStack = createMaterialBottomTabNavigator<BottomNavigatorParamList>();

export const BottomStackNavigator = () => {
    return (
        <BottomStack.Navigator labeled={false}>
            <BottomStack.Screen
                name="Main"
                component={MainStackNavigator}
                options={{
                    tabBarIcon: () => <Icon name="note-plus-outline" size={26} color={colors.white} />,
                }}
            />
            <BottomStack.Screen
                name="Archives"
                component={ArchivesScreen}
                options={{
                    tabBarIcon: () => <Icon name="archive-arrow-down-outline" size={26} color={colors.white} />,
                }}
            />
        </BottomStack.Navigator>
    );
};

const MainStackNavigator = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: 'No Name App',
                }}
            />
            <MainStack.Screen name="AddTodo" component={AddTodoScreen} options={HEADER_HIDDEN} />
            <MainStack.Screen name="ModifyTodo" component={ModifyTodoScreen} options={HEADER_HIDDEN} />
            <MainStack.Screen name="Tabs" component={BottomStackNavigator} />
        </MainStack.Navigator>
    );
};

export default MainStackNavigator;
