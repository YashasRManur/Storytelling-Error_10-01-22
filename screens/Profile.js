import React, { Component } from "react";
import { StyleSheet, Text, View, Switch, Platform, SafeAreaView, StatusBar, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from 'firebase';

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      lightTheme: true,
      name:'',
      profileImage:'',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  async fetchUser() {
      let theme, name, image;
      await firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
      .on("value", function(snapshot) {
          theme = snapshot.val().current_theme;
          name = `${snapshot.val().first_name} ${snapshot.val().last_name}`
          image = snapshot.val().profile_picture
      })
      this.setState({
          lightTheme: theme === 'light'? true: false,
          isEnabled: theme === 'light'? false: true,
          name: name,
          profileImage: image
      })
  }

  toggleSwitch = () => {
      const previous = this.state.isEnabled;
      const theme = this.state.isEnabled? 'light': 'dark';
      var updates = {};
      updates["/users/"+firebase.auth().currentUser.uid+'/current_theme/'] = theme;
      firebase.database().ref().update(updates);
      
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style = {styles.safeArea}/>
            <View style = {styles.appTitle}>
              <View style = {styles.appIcon}>
                <Image source = {require('../assets/logo.png')} style = {styles.iconImage}/>
              </View>
              <View style = {styles.appTitleTextContainer}>
                <Text style = {styles.appTitleText}>Story Telling APP</Text>
              </View>                
            </View>
            <View style = {styles.imageContainer}>
              <Image style = {styles.image} source = {{uri: this.state.profileImage}}/>
              <Text style = {styles.name}>{this.state.name}</Text>
            </View>
            <View style = {styles.switchContainer}>
              <Text style = {styles.switchText}>Dark Theme</Text>
              <Switch 
                trackColor={{false:'gray', true: 'white'}}
                thumbColor={this.state.isEnabled?'gray':'white'}
                onValueChange={() => {
                  this.toggleSwitch()}}
                value={this.state.isEnabled}/>
            </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  safeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  imageContainer: {
    flex:0.85,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Bubblegum-Sans'
  },
  switchContainer: {
    flex:0.2,
    flexDirection: 'row',
    justifyContent:'center',
  },
  switchText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Bubblegum-Sans'
  }
});