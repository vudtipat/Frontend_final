import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import StackNavigator from '../BottomTab/StackNavigator'
import Temp1 from '../Manage/Temp1'
import { Icon } from 'react-native-elements'
import CustomSidebarMenu from '../CustomSidebarMenu'
import { FontAwesome,Feather } from '@expo/vector-icons'; 
//====================Profile============================
import Profile_Employee from './Profile/Profile_Employee';
import Education from './Profile/Education';
import Education_Edit from './Profile/Education_Edit';
import Interesting_Edit from './Profile/Interesting_Edit';
import Status_Edit from './Profile/Status_Edit';
import Currenting_Job from './Currenting_Job/Currenting_Job';
import Job_Description from './Currenting_Job/Job_Description'
import Job_Description_Agree from './Currenting_Job/Job_Description_Agree'
import Watch_Profile_Employer from './Currenting_Job/Watch_Profile_Employer'
import Contact from './Chat/Contact'
import All_Apply from './All_Apply/All_Apply'
import Agreement from './All_Apply/Agreement'
//import Chat_List from './Chat/Chat_List'
import Bookmark_Employee from '../BottomTab/Bookmark/Bookmark_Employee';
import Applicant from './All_Apply/Applicant'
import Job_Description_Apply from './Currenting_Job/Job_Description_Apply'

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
      screen: Currenting_Job,
      navigationOptions: {
        headerShown:false,
        drawerLabel: 'Currenting Job',
        drawerIcon:() => (
          <Icon name='filetext1' type='antdesign' color='white' size={24}/>
        )
      }
    },
    
    All_Apply: {
      screen: All_Apply,
      navigationOptions: {
        headerShown:false,
        drawerLabel: 'All Apply',
        drawerIcon:() => (
          <Icon name='copy1' type='antdesign' color='white' size={24}/>
        )
      }
    },
    Bookmark_Employee: {
      screen: Bookmark_Employee,
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
    //                     Profile
    Education:{screen:Education,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Education_Edit:{screen:Education_Edit,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Interesting_Edit:{screen:Interesting_Edit,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Status_Edit:{screen:Status_Edit,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Job_Description_Agree:{screen:Job_Description_Agree,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Watch_Profile_Employer:{screen:Watch_Profile_Employer,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Contact:{screen:Contact,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Job_Description:{screen:Job_Description,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Agreement:{screen:Agreement,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Applicant:{screen:Applicant,navigationOptions: {
    drawerLabel: () => null,headerShown:false}},
    Job_Description_Apply:{screen:Job_Description_Apply,navigationOptions: {
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