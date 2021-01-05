import * as React from 'react';

import Bookmark_Employee from './Bookmark_Employee';

import Annoucement from './Annoucement/Annoucement';


import Home_Employee from './Home_Employee';
import Reccommend_Jobs from './Reccommend_Jobs';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AntIcon from "react-native-vector-icons/AntDesign";
import { FontAwesome,Feather } from '@expo/vector-icons'; 

const stackPage1 = createStackNavigator({
  Page1Screen:{screen:Home_Employee,navigationOptions: {
  headerShown:false}},
});

const stackPage2 = createStackNavigator({
  Page2Screen:{screen:Reccommend_Jobs,navigationOptions: {
    headerShown:false}},
});

const stackPage3 = createStackNavigator({
  Page3Screen:{screen:Annoucement,navigationOptions: {
    headerShown:false}},
});

const stackPage4 = createStackNavigator({
  Page4Screen:{screen:Bookmark_Employee,navigationOptions: {
    headerShown:false}},
},);

const navigator = createBottomTabNavigator({
  buttomPage1:{screen:stackPage1,navigationOptions: {
  title: 'Home'}},
  buttomPage2:{screen:stackPage2,navigationOptions: {
  title: 'Recommend'}},
  buttomPage3:{screen:stackPage3,navigationOptions: {
  title: 'Annoucement'}},
  buttomPage4:{screen:stackPage4,navigationOptions: {
  title: 'Bookmark'}},

},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      if (routeName == 'buttomPage1') {
        return <AntIcon name="home" color={tintColor} size={20} />;
      }
      else if(routeName == 'buttomPage2'){
        return <Feather name="users" color={tintColor} size={20} />;
      }
      else if(routeName == 'buttomPage3'){
        return <FontAwesome name="pencil-square-o" size={20} color={tintColor}/>;
      }
      else if(routeName == 'buttomPage4'){
        return <Feather name="bookmark" size={24} color={tintColor} />;
      }
    },
  }),

  tabBarOptions: {
    showLabel: true,
    tabStyle:{alignItems:'center',justifyContent:'center'},
    activeTintColor: 'white',
    activeBackgroundColor: '#720DBA',
    inactiveTintColor: 'black',
    labelStyle:{fontSize:15},
    style: {
      backgroundColor: '#FFFFFF',
    },
  }

})

export default createAppContainer(navigator);
