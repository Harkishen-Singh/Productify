import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';

export const Navigation = createStackNavigator({
    Login: {
        screen:LoginScreen,
        navigationOptions:{
            title:'Login',
            header: null
        }
    },
    Home: {
        screen:HomeScreen,
        navigationOptions:{
            title:'Home',
            header: null
        }
    }
},
{
    initialRouteName:'Login'
}
);