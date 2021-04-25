import React from 'react';
import {SafeAreaView,View,ScrollView,Image,Text,Linking,AsyncStorage} from 'react-native';
import { Icon } from 'react-native-elements'
import {DrawerContentScrollView,DrawerItemList,DrawerItems,} from 'react-navigation-drawer';
import {url} from './var.js'

class CustomSidebarMenu extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      Fname : '',
      Lname : '',
      image:''
    };
    this.getData()
  }
  getData = async() => {
    var email = await AsyncStorage.getItem('email')
    var mode = await AsyncStorage.getItem('mode')
    console.log(mode)
    console.log(email)
    if(mode == 'Employee'){
      console.log('in employee')
      await fetch(url+'/Employee_Profile?want='+email, {
        method: 'GET',
      }).then((response) => response.json()).then((respone) => {
          if(respone.response == 'Pass')
          {
              var x = JSON.parse(respone.data);
              //console.log(x)
              this.setState({Fname:x[0]['firstName'], Lname:x[0]['lastName'], image:x[0]['image']})
          }
      })
    }else{
      console.log('in employer')
      await fetch(url+'/Employer_Profile?want='+email, {
        method: 'GET',
    }).then((response) => response.json()).then((respone) => {
        if(respone.response == 'Pass')
        {
            var x = JSON.parse(respone.data);
            //console.log(x)
            this.setState({Fname:x[0]['firstName'], Lname:x[0]['lastName'], image:x[0]['image']})
        }
    })
    }
  }
  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#720DBA'}}>
        
        <View style={{flex:0.4,alignItems:'center',justifyContent:'center'}}>
          <Image 
            source={{
              uri: this.state.image
            }} 
            style={{width: 140, height: 140, borderRadius: 70}} 
          />
          <View style={{width:'100%',height:'10%',marginTop:10,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'white',marginTop:20}}>{this.state.Fname}&nbsp;&nbsp;{this.state.Lname}</Text>
          </View>
        </View>
        <DrawerItems {...this.props} />
      </SafeAreaView>
    );
  }
}

export default CustomSidebarMenu;
