import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HomePage from './HomePage'
import Employer_Login from '../Employer/Employer_Login'
import Employee_Login from '../Employee/Employee_Login'
import Forget_Password from './Forgot_Password'
import Create_Account from './Create_Account'
import Temporary from '../Employee/Temporary'
import Temporary1 from '../Employer/Temporary1'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator  } from 'react-navigation';

const stack = createStackNavigator({
  HomePage:{screen:HomePage,navigationOptions: {
  title: 'Homepage',headerShown:false}},
  Employer_Login:{screen:Employer_Login,navigationOptions: {
  title: 'Employer_Login',headerShown:false}},
  Employee_Login:{screen:Employee_Login,navigationOptions: {
  title: 'Employee_Login',headerShown:false}},
  Create_Account:{screen:Create_Account,navigationOptions: {
  title: 'Create_Account',headerShown:false}},
  Forget_Password:{screen:Forget_Password,navigationOptions: {
  title: 'Forget',headerShown:false}},
  Employee:{screen:Temporary,navigationOptions: {
  title: 'Home',headerShown:false}},
  Employer:{screen:Temporary1,navigationOptions: {
  title: 'Home',headerShown:false}},
  
}
);


export default createAppContainer(stack);