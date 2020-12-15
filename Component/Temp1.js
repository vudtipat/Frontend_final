import * as React from 'react';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import StackNavigator from './StackNavigator'
export default class Temp1 extends React.Component {

  constructor(props)
    {
        super(props);
        this.logout();
    }

    logout = async() => {
        await AsyncStorage.removeItem('login');
        await AsyncStorage.removeItem('mode');
    }

  render() {
    return (
      <StackNavigator/>
    );
  }
}
