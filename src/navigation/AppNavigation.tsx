import React from 'react';
import { HomeScreen } from '../ui/screens/HomeScreen';
import { AddNoteScreen } from '../ui/screens/AddNoteScreen';
import { ModifyNoteScreen } from '../ui/screens/ModifyNoteScreen';
import { ArchivesScreen } from '../ui/screens/ArchivesScreen';
import { SearchScreen } from '../ui/screens/SearchScreen';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Note } from '../models/NoteModel';
import { TagsScreen } from '../ui/screens/TagsScreen';

export type StackNavigatorParamList = {
    Drawer: DrawerStackNavigatorParamList;
    Home: undefined;
    AddNote: undefined;
    ModifyNote: { item: Note };
    Search: undefined;
    Tags: undefined;
};

export type DrawerStackNavigatorParamList = {
    DrawerHome: StackNavigatorParamList;
    ArchivesStack: ArchivesStackNavigatorParamList;
};

export type ArchivesStackNavigatorParamList = {
    Archives: undefined;
    ModifyNote: { item: Note };
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
            <ArchivesStack.Screen name="ModifyNote" component={ModifyNoteScreen} />
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
            <MainStack.Screen name="AddNote" component={AddNoteScreen} options={HEADER_HIDDEN} />
            <MainStack.Screen name="ModifyNote" component={ModifyNoteScreen} options={HEADER_HIDDEN} />
            <MainStack.Screen name="Search" component={SearchScreen} options={HEADER_HIDDEN} />
            <MainStack.Screen name="Tags" component={TagsScreen} options={HEADER_HIDDEN} />
        </MainStack.Navigator>
    );
};

export default MainStackNavigator;
