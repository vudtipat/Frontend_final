import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DrawerNavigator from './DrawerNavigator'
class Temporary extends React.Component {
  render() {
    return (
        <View style={{flex:1}}>
          <DrawerNavigator/>
        </View>
    );
  }
}

export default Temporary;
