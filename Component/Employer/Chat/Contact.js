import React from 'react';
import { Alert, Text, View, StatusBar,TextInput,TouchableOpacity,Keyboard,FlatList,Image,AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons'; 
import { Icon  } from 'react-native-elements'
import {url} from '../../var.js'
import { withNavigationFocus } from 'react-navigation';

var dat = ""
var loop = 1;
var ok = 1
var name = ''
class Contact extends React.Component {

  getChat = async() => {
    this.setState({Name:this.props.navigation.getParam('name')})
    await fetch(url+'/chat?u1='+this.state.employer+'&u2='+this.state.name, {
      method: 'GET',
    }).then((response) => response.json()).then((respone) => {
        if(respone.response == 'Pass')
        {
           var x = JSON.parse(respone.data);
           this.setState({datarender:x})
        } 
    })
  }

  getDat(){
    name = this.props.navigation.getParam('name')
    dat = JSON.stringify(this.props.navigation.getParam('employer'))
    this.state.Name = name
    this.state.employer = dat.replace(/^"(.*)"$/, '$1');
    console.log('employer = '+this.state.employer)
    console.log('-----------------------------------------------------------------------')
  }

  getData = async(va) => {
    var x = await AsyncStorage.getItem(va);
    console.log(x)
    return x
  }

  constructor(props)
  {
        super(props);
        this.state = {
          Name: '',
          name: '',
          textData:'',
          ip:url,
          datarender:[],
          selectimg:'',
          type:'txt',
          employer:'',
        }
        
        AsyncStorage.getItem('email').then((name) => {
          console.log(name)
          this.setState({
            name: name,
          });
        });
        this.getDat()
        this.getChat()
        this._interval = setInterval(() => {
          this.getChat()
        }, 1000);
        console.log(this.state.name)
  }

  componentDidUpdate() {
    if (this.props.isFocused) {
        ok = 1
        this.getDat()
        console.log(this.state.Name)

        if(loop == 0)
        {
            this._interval = setInterval(() => {
                this.getChat()
              }, 1000);
              loop = 1
        }
        console.log(true);
      
    }
    else
    {
        clearInterval(this._interval);
        if(ok == 1)
        {
          this.setState({employer: ''});
          this.setState({Name: ''});
          this.setState({datarender:[]});
          ok = 0
        }
        loop = 0
        console.log(false);
    }
  }

  onChangeText = (text) => {
    this.setState({textData:text})
  }

  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    else{
      let pickerResult = await ImagePicker.launchImageLibraryAsync({base64:true,allowsEditing: true,
        aspect: [4,3]});
      if(!pickerResult.cancelled)
      {
        let imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null;
      //console.log(imageUri);
      //console.log(pickerResult.uri);
      this.setState({textData:imageUri}) 
      this.setState({type:'img'})
      }
    } 
  }

  onClick = async() => {
    var mode = await AsyncStorage.getItem('mode');
    var data = {
      u1:this.state.employer,
      u2:this.state.name,
      text:this.state.textData,
      own:this.state.name,
      type:this.state.type,
      mode:mode
    }
    if(this.state.textData != "")
    {
      await fetch(url+'/chat', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((json) => {
        if(json.response != "Pass")
        {
          Alert.alert("กรุณาลองใหม่อีกครั้ง")
        }
    })
      console.log(this.state.textData)
    }
    Keyboard.dismiss()
    this.textInput.clear()
    this.setState({textData:''})
    this.setState({type:'txt'})
  }

  goback = () => {
    this.props.navigation.goBack()
    clearInterval(this._interval);
  }

  render(){
    if(!this.props.isFocused)
    {
      clearInterval(this._interval);
    }
    return (
      <View style={{flex:1,width:'100%'}}>
        <View style={{flex:0.13, backgroundColor:'#720DBA', flexDirection:'row'}}>

            <TouchableOpacity style={{justifyContent:'center',marginLeft:'2%',
                                opacity:10,width:40,borderRadius:10,flexDirection:'row',alignItems:'center'}} 
                                onPress={()=>this.goback()}>
                    <AntDesign name="left" size={26} color="white" style={{marginLeft:'5%',marginRight:'10%'}}/>
            </TouchableOpacity> 
            <TouchableOpacity style={{justifyContent:'center'}}
                onPress={() => this.props.navigation.navigate('Watch_Profile_Employer',{owner:this.state.employer})}>
                <Text style={{color:'white', fontSize:26, marginTop:10, marginLeft:10, height:50}}>{this.state.Name}</Text>
            </TouchableOpacity>
        </View>
        
        <View style={{flex:1,backgroundColor:'white'}}>
          <FlatList
            inverted
            data={this.state.datarender}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => 
            item.own == this.state.name ?
              item.type == 'txt'?
              <View style={{borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
              paddingHorizontal:10, backgroundColor:'#7800BD', alignSelf:'flex-end', margin:10}}>
                <Text style={{fontSize:16, color:'white', margin:5}}>{item.text}</Text>
                <Text style={{fontSize:8,alignItems:'flex-end',color:'white', margin:5}}>{item.date}</Text>
              </View>
              :
              <Image source={{uri: item.text, scale: 1}} style={{ height: 250, width: 250,paddingHorizontal:10,alignSelf:'flex-end', margin:10}}/>
              :
              item.type == 'txt'?
              <View style={{borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
              paddingHorizontal:10, backgroundColor:'#B682C7', alignSelf:'flex-start', margin:10}}>
                <Text style={{fontSize:16,color:'white', margin:5}}>{item.text}</Text>
                <Text style={{fontSize:8,alignItems:'flex-end',color:'white', margin:5}}>{item.date}</Text>
              </View> 
              :
              <Image source={{uri: item.text, scale: 1}} style={{ height: 250, width: 250,paddingHorizontal:10,alignSelf:'flex-start', margin:10}}/>
            }
            style={{marginTop:5,flex:1}}
          />
        </View>
        <View style={{height:50,backgroundColor:'#720DBA',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
            <TouchableOpacity style={{width:40,height:40,margin:5,borderRadius:100}} onPress={() => this.openImagePickerAsync()}>
                <Image
                    style={{height:30, width:30, margin:5}}
                    source={require('../../image/picture.png')}
                />
            </TouchableOpacity>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1 ,width:'70%',borderRadius:10,backgroundColor:'white',
                                paddingHorizontal:10}} onChangeText={Text => this.onChangeText(Text)} 
                                ref={input => { this.textInput = input }} value = {this.state.textData}>

            </TextInput>
            <TouchableOpacity style={{width:40,height:40,backgroundColor:'#720DBA',marginLeft:5,borderRadius:100}} onPress={() => this.onClick()}>
                <Icon
                    name='send'
                    type='material'
                    color='white'
                    size={30}
                />
            </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}
export default withNavigationFocus(Contact);