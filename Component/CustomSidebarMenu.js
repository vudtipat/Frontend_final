import React from 'react';
import {SafeAreaView,View,ScrollView,Image,Text,Linking} from 'react-native';
import { Icon } from 'react-native-elements'
import {DrawerContentScrollView,DrawerItemList,DrawerItems,} from 'react-navigation-drawer';
class CustomSidebarMenu extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      Fname : 'First Name',
      Lname : 'Last Name',
      url:'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png'
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#720DBA'}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:'15%',}}>
            <Icon name='star-outlined' type='entypo' color='yellow' size={26}/>
            <Icon name='star-outlined' type='entypo' color='yellow' size={26}/>
            <Icon name='star-outlined' type='entypo' color='yellow' size={26}/>
            <Icon name='star-outlined' type='entypo' color='yellow' size={26}/>
            <Icon name='star-outlined' type='entypo' color='yellow' size={26}/>
        </View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <Image 
            source={{
              uri: this.state.url
            }} 
            style={{width: 60, height: 60, borderRadius: 30}} 
          />
        </View>
        <View style={{width:'100%',height:'10%',marginTop:10,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>{this.state.Fname}&nbsp;&nbsp;{this.state.Lname}</Text>
        </View>
        <DrawerItems {...this.props} />
      </SafeAreaView>
    );
  }
}

export default CustomSidebarMenu;
