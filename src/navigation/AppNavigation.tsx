import React from 'react';
import { HomeScreen } from '../ui/screens/HomeScreen';
import { AddNoteScreen } from '../ui/screens/AddNoteScreen';
import { ModifyNoteScreen } from '../ui/screens/ModifyNoteScreen';
import { ArchivesScreen } from '../ui/screens/ArchivesScreen';
import { SearchScreen } from '../ui/screens/SearchScreen';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Note } from '../models/NoteModel';
import { TagsManagerScreen } from '../ui/screens/TagsManagerScreen';

export type StackNavigatorParamList = {
    Drawer: DrawerStackNavigatorParamList;
    Home: undefined;
    AddNote: undefined;
    ModifyNote: { item: Note };
    Search: undefined;
    Archives: undefined;
    TagsManager: undefined;
};

export type DrawerStackNavigatorParamList = {
    DrawerHome: StackNavigatorParamList;
    Archives: undefined;
    TagsManager: undefined;
};

const HEADER_HIDDEN: StackNavigationOptions = { headerShown: false };
const DRAWER_OPTIONS = (title: string, isShown = true) => ({
    headerTitle: 'No Name App',
    title: title,
    headerShown: isShown,
});

const MainStack = createStackNavigator<StackNavigatorParamList>();
const DrawerStack = createDrawerNavigator<DrawerStackNavigatorParamList>();

export const DrawerStackNavigator = () => {
    return (
        <DrawerStack.Navigator>
            <DrawerStack.Screen name="DrawerHome" component={HomeScreen} options={DRAWER_OPTIONS('Home')} />
            <DrawerStack.Screen name="Archives" component={ArchivesScreen} options={DRAWER_OPTIONS('Archives')} />
            <DrawerStack.Screen
                name="TagsManager"
                component={TagsManagerScreen}
                options={DRAWER_OPTIONS('Libellés', false)}
            />
        </DrawerStack.Navigator>
    );
};

const MainStackNavigator = () => {
    return (
        <MainStack.Navigator
            initialRouteName="Drawer"
            screenOptions={{
                headerShadowVisible: false,
            }}>
            <MainStack.Screen name="Drawer" component={DrawerStackNavigator} options={HEADER_HIDDEN} />
            <MainStack.Screen name="AddNote" component={AddNoteScreen} options={HEADER_HIDDEN} />
            <MainStack.Screen name="ModifyNote" component={ModifyNoteScreen} options={HEADER_HIDDEN} />
            <MainStack.Screen name="Search" component={SearchScreen} options={HEADER_HIDDEN} />
            <MainStack.Screen name="TagsManager" component={TagsManagerScreen} options={HEADER_HIDDEN} />
        </MainStack.Navigator>
    );
};

export default MainStackNavigator;
