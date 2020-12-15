import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TopNavigator from './TopNavigator.js'
import DrawerNavigator from './DrawerNavigator'
export default class Temporary extends React.Component {
  render() {
    return (
        <View style={{flex:1}}>
          <DrawerNavigator/>
        </View>
    );
  }
}
