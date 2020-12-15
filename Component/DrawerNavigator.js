import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {AsyncStorage,StyleSheet,Image,Text,Linking,View, Button} from 'react-native';
import { createAppContainer ,StackActions, NavigationActions } from 'react-navigation';
import TopNavigator from './TopNavigator'
import Temp1 from './Temp1'
import { Icon } from 'react-native-elements'
import CustomSidebarMenu from './CustomSidebarMenu'

  const MyDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: TopNavigator,
      navigationOptions: {
        drawerLabel: () => null,
        headerShown:false
      }
    },
    Profile: {
      screen: Temp1,
      navigationOptions: {
        headerShown:false,
        drawerLabel: 'View Profile',
        drawerIcon:() => (
          <Icon name='profile' type='antdesign' color='white' size={24}/>
        )
      }
    },
    Current: {
      screen: Temp1,
      navigationOptions: {
        headerShown:false,
        drawerLabel: 'Currenting Job',
        drawerIcon:() => (
          <Icon name='filetext1' type='antdesign' color='white' size={24}/>
        )
      }
    },
    All_Apply: {
      screen: Temp1,
      navigationOptions: {
        headerShown:false,
        drawerLabel: 'All Apply',
        drawerIcon:() => (
          <Icon name='copy1' type='antdesign' color='white' size={24}/>
        )
      }
    },
    Logout: {
      screen: Temp1,
      navigationOptions: {
        drawerLabel: 'Logout',
        headerShown:false,
        drawerIcon:() => (
          <Icon name='logout' type='antdesign' color='white' size={24}/>
        )
          
      },
    },
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "red" ,
      itemStyle : {
      
      },
      labelStyle : {
        color:'white',
        fontSize: 16,
        
      }
    },
    contentComponent: CustomSidebarMenu,
    drawerWidth:'50%'
  });
  
  export default createAppContainer(MyDrawerNavigator);