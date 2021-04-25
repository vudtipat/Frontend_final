import React from 'react';
import { StyleSheet, Text, View, LogBox ,StatusBar,YellowBox  } from 'react-native';
import StackNavigator from './Component/Manage/StackNavigator'
export default class App extends React.Component {
  render(){
    return (
      <View style={{flex:1,marginTop:StatusBar.currentHeight}}>
        {LogBox.ignoreAllLogs()}
        <StackNavigator/>
      </View>
    );
  }
}
