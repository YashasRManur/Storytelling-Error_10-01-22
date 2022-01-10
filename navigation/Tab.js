import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Feed from '../screens/Feed'
import CreateStory from '../screens/CreateStory'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { RFValue } from 'react-native-responsive-fontsize'

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {
    constructor () {
        super();
        this.state = {
            isUpdated: false
        }
    }

    changeUpdated = () => {
        this.setState({isUpdated: true})
    }

    removeUpdated = () => {
        this.setState({isUpdated: false})
    }

    renderFeed = () => {
        return <Feed setUpdateToFalse = {this.removeUpdated} {...props}/>
    }

    createStory = () => {
        return <CreateStory setUpdateToTrue = {this.changeUpdated} {...props}/>
    }

    render() {
    return (
        <Tab.Navigator 
            style = {styles.tabStyle}
            labeled = {false}
            screenOptions = {({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === "Feed") {
                        iconName = focused ? 'home' : 'home-outline'
                    } 
                    else if (route.name === "CreateStory") {
                        iconName = focused ? 'add-circle' : 'add-circle-outline'
                    }
                    return <Ionicons style = {styles.icons} name = {iconName} color = {color} size = {size}/>
                }
            })}
            activeColor = 'red'
            inactiveColor = 'gray'
        >
            <Tab.Screen name = "Feed" component = {this.renderFeed} options={{unmountOnBlur: true}}/>
            <Tab.Screen name = "CreateStory" component = {this.createStory} options={{unmountOnBlur: true}}/>
        </Tab.Navigator>
    )
    }
}

const styles = StyleSheet.create({
    icons:{
        width: RFValue(50),
        height: RFValue(50)
    },
    tabStyle:{
        backgroundColor: 'blue',
        height: '8%',
        /*borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',*/
        overflow: 'hidden'
    }
})
