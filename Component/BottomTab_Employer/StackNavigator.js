import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import TopNavigator from './TopNavigator'
import Job_Annoucement_Create from './Annoucement/Job_Annoucement_Create';
import Job_Annoucement_Edit from './Annoucement/Job_Annoucement_Edit'
import Job_Description from './Annoucement/Job_Description'
import Annoucement_Profile from './Home/Annoucement_Profile'
import Application from '../Employer/Application/Application'
import Application_Profile from '../Employer/Application/Application_Profile'


import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator  } from 'react-navigation';

const stack = createStackNavigator({
  Home:{screen:TopNavigator,navigationOptions: {
  title: 'TopNavigator',headerShown:false}},
  Job_Annoucement_Create:{screen:Job_Annoucement_Create,navigationOptions: {
  title: 'Job_Annoucement_Create',headerShown:false}},
  Job_Annoucement_Edit:{screen:Job_Annoucement_Edit,navigationOptions: {
  title: 'Job_Annoucement_Edit',headerShown:false}},
  Job_Description:{screen:Job_Description,navigationOptions: {
  title: 'Job_Description',headerShown:false}},
  Annoucement_Profile:{screen:Annoucement_Profile,navigationOptions: {
  title: 'Annoucement_Profile',headerShown:false}},
  Application:{screen:Application,navigationOptions: {
  title: 'Application',headerShown:false}},
  Application_Profile:{screen:Application_Profile,navigationOptions: {
  title: 'Application_Profile',headerShown:false}},

}
);


export default createAppContainer(stack);