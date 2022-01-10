import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer} from 'react-navigation'
import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen'
import DashboardScreen from './screens/DashboardScreen'
import firebase from 'firebase'
import {firebaseConfig} from './config'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const switchNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen
})

const AppContainer = createAppContainer(switchNavigator)

export default class App extends Component {
  render() {
    return (
      <AppContainer/>
    )
  }
}
