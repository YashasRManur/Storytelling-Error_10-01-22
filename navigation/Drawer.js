import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Profile from '../screens/Profile'
import BottomTabNavigator from './Tab'
import StackNavigator from './Stack'
import Logout from '../screens/Logout'
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name = "Home" component = {StackNavigator}/>
            <Drawer.Screen name = "Profile" component = {Profile}/>
            <Drawer.Screen name = "Logout" component = {Logout}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;