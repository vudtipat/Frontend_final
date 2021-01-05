import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import TopNavigator from './TopNavigator'
import Annoucement_Profile from './Annoucement/Annoucement_Profile';
import Annoucement_Create from './Annoucement/Annoucement_Create';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator  } from 'react-navigation';

const stack = createStackNavigator({
  Home:{screen:TopNavigator,navigationOptions: {
  title: 'TopNavigator',headerShown:false}},
  Annoucement_Profile:{screen:Annoucement_Profile,navigationOptions: {
  title: 'Annoucement_Profile',headerShown:false}},
  Annoucement_Create:{screen:Annoucement_Create,navigationOptions: {
  title: 'Annoucement_Create',headerShown:false}},

}
);


export default createAppContainer(stack);