import * as React from 'react';
import { TouchableOpacity, View ,Text,TextInput,Alert, AsyncStorage ,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { StackActions, NavigationActions } from 'react-navigation';
import {url} from '../var.js'
export default class Employee_Login extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      user:'vudtipat@gmail.com',
      pass:'123456',
      dataUser : {}
    }
    
  }
  onChangeuser = (Text)=>{
    this.setState({user:Text});
  }

  onChangepass = (Text)=>{
    this.setState({pass:Text});
  } 

  _getData = async(item) => {
    var data = await AsyncStorage.getItem(item);
    return data;
  }

  _setLogin = async (data) => {
    try {
      await AsyncStorage.setItem(
        'mode','Employee'
      );
      await AsyncStorage.setItem(
        'login','yes'
      );
      await AsyncStorage.setItem(
        'email',data.Email
      );
      await AsyncStorage.setItem(
        'data',JSON.stringify(data)
      );
      var v3 = await AsyncStorage.getItem('data');
      v3 = JSON.parse(v3);
      v3 = await AsyncStorage.getItem('email');
      this.setState({dataUser:v3})
    } catch (error) {
      // Error saving data
    }
  }

  setToken = async() => {
    console.log(token)
    var token = await AsyncStorage.getItem('token')
    var mode = await AsyncStorage.getItem('mode');
    var email = await AsyncStorage.getItem('email');
    console.log('token = '+token)
    var data = {
      "email":email,
      "mode":mode,
      "token":token
    }
    await fetch(url+'/set_Token', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  onPress_login = async () => {
    if(this.state.user.length != 0 && this.state.pass.length != 0)
    {
      await fetch(url+'/login_employee?name='+this.state.user+'&pass='+this.state.pass ,{method: 'GET'})
        .then((response) => response.json())
        .then(async (json) => {
          if(json.response == "Pass")
          {
            var data = JSON.parse(json.data)
            this._setLogin(data);
            this.setToken()
            setTimeout(() => {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Employee'})],
              });
              this.props.navigation.dispatch(resetAction);
              Alert.alert("เข้าสู่ระบบสำเร็จ");
            }, 500)
            
          }
          else if(json.response == "Not Pass")
          {
            Alert.alert("กรุณาตรวจสอบข้อมูล");
          }
          else
          {
            Alert.alert("ไม่สามารถเข้าสู่ระบบได้ กรุณาลองอีกครั้ง");
          }
          
        })
          .catch(err => {console.log(err);});
    }
    else
    {
      Alert.alert("กรุณากรอกข้อมูล")
    }
  }

    render() {
      return (
        <View style={{flex: 1,backgroundColor:'#E7E7E7'}}>
          <View style={{flex:0.05}}></View>
          <View style={{flex:0.1,justifyContent:'center'}}>
          <TouchableOpacity style={{height:40,justifyContent:'center',marginLeft:'2%',width:'20%',borderRadius:10,flexDirection:'row',alignItems:'center'}} onPress={()=>this.props.navigation.goBack()}>
              <AntDesign name="leftcircleo" size={24} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
              <Text>Back</Text>
         </TouchableOpacity> 
          </View>
          <View style={{flex:0.3, justifyContent:'center', alignItems:'center'}}>
              <Image 
                  style={{width:400, height:200}}
                  source={require("../image/white_logo.png")}
              />

          </View>

          <View style={{flex:0.5,backgroundColor:'#E7E7E7',flexDirection:'column',alignItems:'center'}}>
            <Text style={{color:'#000000',fontSize:24,fontWeight:'bold',padding:'5%'}}>Employee Sign In</Text>
            <TextInput style={{height: 40, width:'80%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,paddingHorizontal:10,backgroundColor:'#EBEBEB'}} 
                placeholder="E-mail" placeholderTextColor='#AAAAAA'
                onChangeText={ Text => this.onChangeuser(Text)} />

            <TextInput style={{marginTop:'5%', height: 40, width:'80%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,paddingHorizontal:10,backgroundColor:'#EBEBEB'}} 
                placeholder="Password" placeholderTextColor='#AAAAAA' secureTextEntry={true}
                onChangeText={ Text => this.onChangepass(Text)} />

            <TouchableOpacity onPress={() => this.onPress_login()}
                    style={{alignItems:'center',justifyContent:'center',marginTop:'5%',height: 40, width:'80%',borderRadius:10 ,paddingHorizontal:10,backgroundColor:'#720DBA'}}>
              <Text style={{fontSize:14,fontWeight:'bold',color:'#FFFFFF'} }>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'flex-end',justifyContent:'center',height: 40, width:'80%',borderRadius:10 ,paddingHorizontal:10, marginTop:10}}
                              onPress={() => this.props.navigation.navigate('Forget_Password',{mode:'Employee'})}>
              <Text style={{fontSize:12,fontWeight:'bold',color:'#636363'}}>Forgot Password</Text>
            </TouchableOpacity>
            
            <View style={{flex:0.3,flexDirection:'column',alignItems:'center', width:'90%', marginTop:30,}}>
              <View style={{backgroundColor:'#707070',height:'2%',width:'100%'}}/>

              <TouchableOpacity style={{marginTop:'5%',alignItems:'center',justifyContent:'center',height: '100%', width:'80%',borderRadius:10 ,paddingHorizontal:10}}
                                onPress={() => this.props.navigation.navigate('Create_Account',{mode:'Employee'})}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#636363'}}>Create an account? Register</Text>
              </TouchableOpacity>
            </View>
          </View>
       
          
         
        </View>
        



      );
    }
  }

