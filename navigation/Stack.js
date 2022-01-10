import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import StoryScreen from '../screens/StoryScreen'
import BottomTabNavigator from './Tab'

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName = "home" 
            screenOptions = {{headerShown:false}}>
            <Stack.Screen name = "Home" component = {BottomTabNavigator}/>
            <Stack.Screen name = "StoryScreen" component = {StoryScreen}/>
        </Stack.Navigator>
    )
}

export default StackNavigator;