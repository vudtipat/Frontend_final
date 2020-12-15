import * as React from 'react';
import { TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { StackActions, NavigationActions } from 'react-navigation';
export default class Employer_Login extends React.Component {
    constructor(props)
    {
      super(props)
      
      
    }

    onPress_login = async () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Employer' })],
      });
      this.props.navigation.dispatch(resetAction);
    }

    render() {
      
      return (
        <View style={{flex: 1,backgroundColor:'#E7E7E7'}}>
        <View style={{flex:0.05}}></View>
          <View style={{flex:0.1,justifyContent:'center'}}>
          <TouchableOpacity style={{height:40,justifyContent:'center',marginLeft:'2%',backgroundColor:'rgba(0, 153, 255,0.1)',opacity:10,width:'20%',borderRadius:10,flexDirection:'row',alignItems:'center'}} onPress={()=>this.props.navigation.goBack()}>
              <AntDesign name="leftcircleo" size={24} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
              <Text>Back</Text>
         </TouchableOpacity> 
          </View>
          <View style={{flex:0.3}}>
            
            
          </View>
        
          <View style={{flex:0.6,backgroundColor:'#E7E7E7',flexDirection:'column',alignItems:'center'}}>
            <Text style={{color:'#000000',fontSize:24,fontWeight:'bold',padding:'5%'}}>Employer Sign In</Text>
            <TextInput style={{height: 40, width:'80%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,paddingHorizontal:10,backgroundColor:'#EBEBEB'}} 
                placeholder="E-mail" placeholderTextColor='#AAAAAA'/>

            <TextInput style={{marginTop:'5%', height: 40, width:'80%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,paddingHorizontal:10,backgroundColor:'#EBEBEB'}} 
                placeholder="Password" placeholderTextColor='#AAAAAA' secureTextEntry={true}/>

            <TouchableOpacity onPress={() => this.onPress_login()}
                    style={{alignItems:'center',justifyContent:'center',marginTop:'5%',height: 40, width:'80%',borderRadius:10 ,paddingHorizontal:10,backgroundColor:'#720DBA'}}>
              <Text style={{fontSize:14,fontWeight:'bold',color:'#FFFFFF'} }>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'flex-end',justifyContent:'center',height: 40, width:'80%',borderRadius:10 ,paddingHorizontal:10}}
                              onPress={() => this.props.navigation.navigate('Forget_Password')}>
              <Text style={{fontSize:12,fontWeight:'bold',color:'#636363'}}>Forgot Password</Text>
            </TouchableOpacity>
            
            <View style={{backgroundColor:'#707070',height:1,width:'100%',marginTop:'10%'}}/>
            <TouchableOpacity style={{marginTop:5,alignItems:'center',justifyContent:'center',height: 40, width:'80%',borderRadius:10 ,paddingHorizontal:10}}
                              onPress={() => this.props.navigation.navigate('Create_Account')}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#636363'}}>Create an account? Register</Text>
            </TouchableOpacity>
          </View>
       
          
         
        </View>
        
      );
    }
  }

