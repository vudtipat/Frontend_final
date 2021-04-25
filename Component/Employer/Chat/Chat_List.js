import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'
import {url} from '../../var.js'
import { withNavigationFocus } from 'react-navigation';
var loop = 1;

class Chat_List extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            datasource: [
                
               // {picture:"", name:"Firstname Lastname", message:"abcdefg hijklmnop qrstuv w xyz abcdefg hijklmnop qrstuv w xyz abcdefg hijklmnop qrstuv w xyz abcdefg hijklmnop qrstuv w xyz abcdefg hijklmnop qrstuv w xyz"},
            ],
            data:[],
            dat:[],
            employer:[],

        };
        this.getChatList()
        
    }
    getChatList = async() =>{
        var email = await AsyncStorage.getItem('email')
        var mode = await AsyncStorage.getItem('mode');
        var data = {
            email: email,
            mode:mode
        }
        console.log(data)
        fetch(url+'/getChatList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var x = JSON.parse(respone.data);
                console.log('getChatList = '+x)
                this.setState({datasource:x})
                console.log('สำเร็จ');
                console.log(this.state.datasource)
            }
            else
            {
                console.log('ไม่สำเร็จ!!');
            }
        })

    }
    
    componentDidUpdate() {
        if (this.props.isFocused) {
            if(loop == 0)
            {
                this._interval = setInterval(() => {
                    this.getChatList()
                  }, 1000);
                  loop = 1
            }
            console.log('chat list');
        }
        else
        {
            clearInterval(this._interval);
            loop = 0
            console.log('false chat list');
        }
      }

    render(){
        return(
            <View style={{flex:1,marginTop:37}}>
                <View style={{flex:0.05, backgroundColor:'transparent', flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:0.15, backgroundColor:'transparent', justifyContent:'center', height:35, width:35}} onPress={() => this.props.navigation.toggleDrawer()}>
                        <Icon name='menu' />
                    </TouchableOpacity>
                    
                </View>

                <View style={{flex:0.9, marginTop:5}}>
                <FlatList
                        data={this.state.datasource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => <View style={{flex:1,marginLeft:'2%',width:'96%',marginBottom:20,backgroundColor:'#720DBA',borderRadius:10}}>
                                                    <TouchableOpacity style={{width:'100%'}}
                                                        onPress={() => this.props.navigation.navigate('Contact',{employer : item._id,name: item.firstName + ' '+item.lastName})}>
                                                        <View style={{flexDirection:'row'}} >
                                                            <View style={{width:80, height:100}} >
                                                                <Image
                                                                    style={{flex:1, justifyContent:'center', margin:10, borderRadius:10}}
                                                                    source={{
                                                                        uri: item.image,
                                                                    }}
                                                                />
                                                            </View>
                                                            <View style={{marginLeft:10,marginTop:'5%',marginBottom:'5%', width:250, height:60}} >
                                                                <Text style={{color:'white',fontWeight:'200',fontSize:20, margin:3}}>{item.firstName} {item.lastName}</Text>
                                                                
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    </View>
                            }
                        style={{marginTop:10,flex:1}}
                    />
                </View>
            </View>
        );
    }
}    


export default withNavigationFocus(Chat_List);