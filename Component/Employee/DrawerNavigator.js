import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import StackNavigator from '../BottomTab/StackNavigator'
import Temp1 from '../Manage/Temp1'
import { Icon } from 'react-native-elements'
import CustomSidebarMenu from '../CustomSidebarMenu'
//====================Profile============================
import Profile_Employee from './Profile/Profile_Employee';
import Education from './Profile/Education';
import Education_Edit from './Profile/Education_Edit';
import Interesting_Edit from './Profile/Interesting_Edit';
import Status_Edit from './Profile/Status_Edit';

  const MyDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: StackNavigator,
      navigationOptions: {
        drawerLabel: () => null,
        headerShown:false
      }
    },
    Profile: {
      screen: Profile_Employee,
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
    //                     Profile
    Education:{screen:Education,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Education_Edit:{screen:Education_Edit,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Interesting_Edit:{screen:Interesting_Edit,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Status_Edit:{screen:Status_Edit,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
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