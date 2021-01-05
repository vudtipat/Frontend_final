import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import TopNavigator from './TopNavigator'
import Job_Annoucement_Create from './Annoucement/Job_Annoucement_Create';
import Job_Annoucement_Edit from './Annoucement/Job_Annoucement_Edit'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator  } from 'react-navigation';

const stack = createStackNavigator({
  Home:{screen:TopNavigator,navigationOptions: {
  title: 'TopNavigator',headerShown:false}},
  Job_Annoucement_Create:{screen:Job_Annoucement_Create,navigationOptions: {
  title: 'Job_Annoucement_Create',headerShown:false}},
  Job_Annoucement_Edit:{screen:Job_Annoucement_Edit,navigationOptions: {
  title: 'Job_Annoucement_Edit',headerShown:false}},

}
);


export default createAppContainer(stack);