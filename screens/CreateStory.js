import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Platform ,Image, TouchableOpacity, Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker'
import firebase from 'firebase';

let customFonts = {
    'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')
}

export default class CreateStory extends Component {

    constructor () {
        super();
        this.state = {
            fontsLoaded: false,
            preview: 'image1',
            dropDownHeight: 40
        }
    }
    componentDidMount() {
        this.loadFont();
        this.fetchUser();
    }

    loadFont = async() => {
        await Font.loadAsync(customFonts)
        this.setState ({
            fontsLoaded: true
        })
    }

    async fetchUser() {
        let theme;
        await firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
        .on("value", function(snapshot) {
            theme = snapshot.val().current_theme;
        })
        this.setState({
            lightTheme: theme === 'light'? true: false,
        })
    }

    addStory = async() => {
        if (this.state.title && this.state.description && this.state.story && this.state.moral) {
            let storyData = {
                preview_image : this.state.preview,
                title: this.state.title,
                description: this.state.description,
                story : this.state.story,
                moral : this.state.moral,
                likes : 0,
                created_on : new Date(),
                author : firebase.auth().currentUser.displayName,
                author_uid : firebase.auth().currentUser.uid
            }
            await firebase.database().ref('/posts/' + (Math.random().toString(36).slice(2))).set(storyData)
            this.props.navigation.navigate('Feed')
        } else {
            Alert.alert("All fields are required");
        }
    }

    render() {

        if (!this.state.fontsLoaded) {
            return <AppLoading/>
        }
        else {
            let previewImages = {
                image1: require('../assets/story_image_1.png'),
                image2: require('../assets/story_image_2.png'),
                image3: require('../assets/story_image_3.png'),
                image4: require('../assets/story_image_4.png'),
                image5: require('../assets/story_image_5.png'),
            }
            return (
                <View style = {styles.container}>
                    <SafeAreaView style = {styles.safeArea}/>
                    <View style = {styles.appTitle}>
                        <View style = {styles.appIcon}>
                            <Image 
                                source = {require('../assets/logo.png')}
                                style = {styles.iconImage}/>
                        </View>
                        <View style = {styles.appTitleTextContainer}>
                            <Text style = {styles.appTitleText}>New Story</Text>
                        </View>
                    </View>
                    
                    <View style = {styles.field}>
                        <ScrollView>
                            <View >
                                <Image 
                                    source = {previewImages[this.state.preview]}
                                    style = {styles.preview}/>
                                <View style = {{height:RFValue(this.state.dropDownHeight)}}>
                                    <DropDownPicker 
                                        labelStyle = {{color:'white', fontFamily:'Bubblegum-Sans'}}

                                        items = {[
                                            {label:'Image 1', value: 'image1'},
                                            {label:'Image 2', value: 'image2'},
                                            {label:'Image 3', value: 'image3'},
                                            {label:'Image 4', value: 'image4'},
                                            {label:'Image 5', value: 'image5'},
                                        ]}

                                        onOpen = {() => {
                                            this.setState({dropDownHeight: 100})
                                        }
                                        }
                                        onClose = {() => {
                                            this.setState({dropDownHeight: 40})
                                        }
                                        }

                                        defaultValue = {this.state.preview}

                                        onChangeItem = {item => this.setState({preview:item.value})}
                                        />
                                </View>
                                <TextInput 
                                    style = {styles.inputFont}
                                    onChangeText = {title => this.setState({title})}
                                    placeholder = {'Title'}
                                    placeholderTextColor = 'white'/>
                                <TextInput 
                                    style = {styles.inputFont}
                                    onChangeText = {description => this.setState({description})}
                                    placeholder = {'Description'}
                                    placeholderTextColor = 'white'
                                    multiline = {true}
                                    numberOfLines = {4}/>
                                <TextInput 
                                    style = {styles.inputFont}
                                    onChangeText = {story => this.setState({story})}
                                    placeholder = {'Story'}
                                    placeholderTextColor = 'white'
                                    multiline = {true}
                                    numberOfLines = {20}/>
                                <TextInput
                                    style = {styles.inputFont}
                                    onChangeText = {moral => this.setState({moral})}
                                    placeholder = {'Moral'}
                                    placeholderTextColor = 'white'
                                    multiline = {true}
                                    numberOfLines = {4}/>
                                <TouchableOpacity onPress={() => {this.addStory();}}>
                                    <Text>Submit</Text>
                                </TouchableOpacity>
                              </View>
                        </ScrollView>
                    </View>
                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
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
    preview:{
        width: '93%',
        height: RFValue(250),
        alignSelf:'center',
        marginVertical: RFValue(10),
        resizeMode: 'contain',
    },
    field:{
        flex: 0.85
    },
    inputFont: {
        height: RFValue(40),
        borderColor: 'white',
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        fontFamily: 'Bubblegum-Sans',
        marginTop: RFValue(15),
        textAlignVertical: 'top',
        padding: RFValue(5),
        color: 'white'
    }
  });
  