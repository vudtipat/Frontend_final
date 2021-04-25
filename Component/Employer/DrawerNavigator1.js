import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer ,StackActions, NavigationActions } from 'react-navigation';
import StackNavigator from '../BottomTab_Employer/StackNavigator'
import { FontAwesome,Feather } from '@expo/vector-icons'; 
import Temp1 from '../Manage/Temp1'
import { Icon } from 'react-native-elements'
import CustomSidebarMenu from '../CustomSidebarMenu'
import Profile_Employer from './Profile/Profile_Employer'
import Company_Contact_Edit from './Profile/Company_Contact_Edit'
import Company_Information_Edit from './Profile/Company_Information_Edit'
import All_Hiring from './Hiring/All_Hiring'
import Hiring_Profile from './Hiring/Hiring_Profile'
import Contact from './Chat/Contact'
import Agreement from './Application/Agreement'
import Chat_List from './Chat/Chat_List'
import Bookmark_Employer from '../BottomTab_Employer/Bookmark/Bookmark_Employer'
import Watch_Profile_Employee from './Chat/Watch_Profile_Employee.js'

  const MyDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: StackNavigator,
      navigationOptions: {
        drawerLabel: () => null,
        headerShown:false
      }
    },
    Profile: {
      screen: Profile_Employer,
      navigationOptions: {
        headerShown:false,
        drawerLabel: 'View Profile',
        drawerIcon:() => (
          <Icon name='profile' type='antdesign' color='white' size={24}/>
        )
      }
    },
    Hiring: {
      screen: All_Hiring,
      navigationOptions: {
        headerShown:false,
        drawerLabel: 'Hiring',
        drawerIcon:() => (
          <Icon name='copy1' type='antdesign' color='white' size={24}/>
        )
      }
    },
    Bookmark_Employer: {
      screen: Bookmark_Employer,
      navigationOptions: {
        headerShown:false,
        drawerLabel: 'Bookmark',
        drawerIcon:() => (
          <FontAwesome name='bookmark' type='Regular'  color='white' size={24}/>
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
    Company_Contact_Edit:{screen:Company_Contact_Edit,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Company_Information_Edit:{screen:Company_Information_Edit,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Hiring_Profile:{screen:Hiring_Profile,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Contact:{screen:Contact,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Agreement:{screen:Agreement,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    All_Hiring:{screen:All_Hiring,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Profile_Employer:{screen:Profile_Employer,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Watch_Profile_Employee:{screen:Watch_Profile_Employee,navigationOptions: {
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
        fontSize: 14,
        
      }
    },
    contentComponent: CustomSidebarMenu,
    drawerWidth:'50%'
    
  });
  
  export default createAppContainer(MyDrawerNavigator);