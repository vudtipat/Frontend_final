import * as React from 'react';
import { TouchableOpacity, View ,Text ,AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class HomePage extends React.Component {
  
    constructor(props)
    {
      super(props)
      this.RedirectAuth();
    }

    
    RedirectAuth = async () => {
      var value = await AsyncStorage.getItem('login');
      var mode = await AsyncStorage.getItem('mode');
      console.log(value+' '+mode)
      if(value == 'yes')
      {
        if(mode == 'Employee')
        {
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'Employee' })],
          });
          this.props.navigation.dispatch(resetAction);
        }
        if(mode == 'Employer')
        {
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'Employer' })],
          });
          this.props.navigation.dispatch(resetAction);
        }
        
      }
    }

    render() {
      return (
        <View style={{flex: 1,}}>
            <View style={{flex:0.9,width: '100%',justifyContent: 'center',alignItems: 'center'}}>
                <TouchableOpacity
                    style={{alignItems:'center',justifyContent:'center',width:283,height:199,backgroundColor:'#720DBA',marginTop:'20%',borderRadius:10}}
                    onPress={() => this.props.navigation.navigate('Employer_Login',{Name:'Tum'})}
                ><Text style={{color:'#FFFFFF',fontSize:16,fontWeight:'bold'}}>Employer</Text></TouchableOpacity>
                <TouchableOpacity
                    style={{alignItems:'center',justifyContent:'center',width:283,height:199,backgroundColor:'#720DBA',marginTop:'10%',borderRadius:10}}
                    onPress={() => this.props.navigation.navigate('Employee_Login')}
                ><Text style={{color:'#FFFFFF',fontSize:16,fontWeight:'bold'}}>Employee</Text></TouchableOpacity>
            </View>
            <View style={{flex:0.1,width: '100%',justifyContent: 'center',alignItems: 'center'}}/>
          
        </View>
      );
    }
  }
