import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, StatusBar, Easing, Animated } from 'react-native';
import {Text, Icon, ListItem, Card, ThemeProvider} from 'react-native-elements';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Voice from 'react-native-voice';

import Login from './app/login';
import MainNavigator from './app/mainNavigator'
import Chat from './app/ai_chat';

import { theme, colors } from './config';


const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {      
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
  }
}


const MainAppStackNavigator = createStackNavigator({
  Login: Login,
  MainApp: MainNavigator,
  Chat: Chat
}, 
{	
  cardStyle: { opacity: 1 },
  headerMode: 'none',
  title: 'Main',
  transitionConfig
});

const MainAppContainer = createAppContainer(MainAppStackNavigator)

class App extends Component{
  render(){
    return(
      <ThemeProvider theme = {theme} >
      <View style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar
          barStyle="light-content"
          backgroundColor={colors.success}
      />
      <MainAppContainer />
      </View>
      </ThemeProvider>


    );
  }
}

export default App;