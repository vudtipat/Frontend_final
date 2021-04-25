import * as React from 'react';
import { AsyncStorage, FlatList, TouchableOpacity, View ,Text,Image} from 'react-native';
import { Icon  } from 'react-native-elements'
import {url} from '../var.js'

export default class Reccommend_Jobs extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            search:'หางานช่าง',
            datasource: []
        };
        this.recoment()
    }

    setUpdate = async() => {
        await AsyncStorage.setItem(
            'press','1'
        );
    }

    updateal = async(va) => {
            var email = await AsyncStorage.getItem('email')
            var data = {
                id_u: email ,
                id_j: va
            }
            await fetch(url+'/Emplyer_Rec', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            this.setUpdate()
    }

    recoment = async () => {
        var email = await AsyncStorage.getItem('email')
        await fetch(url+'/Emplyer_Rec?want='+email, {
            method: 'GET',
          }).then((response) => response.json()).then((respone) => {
              if(respone.response == 'Pass')
              {
                 var x = JSON.parse(respone.data);
                 this.setState({datasource:x})
                 console.log(this.state.datasource)
              } 
          })
    }

    onpress = async (va1,v2) => {
        var press = await AsyncStorage.getItem('press');
        console.log(press)
        if(press == '0')
        {
            console.log('rrrrrrrrr')
            this.updateal(v2)
            this.setUpdate()
        }
        this.props.navigation.navigate('Annoucement_Profile',{email : va1})
    }

    render(){
        return(
            <View style={{flex:1,marginTop:37}}>
                <View style={{flex:0.05, backgroundColor:'transparent', flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} style={{flex:0.15, backgroundColor:'transparent', justifyContent:'center', height:35, width:35}}>
                        <Icon name='menu' />
                    </TouchableOpacity>
                </View>

                <View style={{flex:1}}>
                <FlatList
                        data={this.state.datasource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => 
                                                    <TouchableOpacity style={{width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#6914B3', alignSelf:'center', margin:10}}
                                onPress={() => this.onpress(item.owner,item._id)}>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{felx:1 ,margin:5, marginTop:15, marginBottom:15, width:'90%'}}>
                                        <Text style={{fontSize:26,marginLeft:5, color:'white', margin:1,fontWeight:'bold'}}>{item.job}</Text>
                                        <Text style={{fontSize:18,marginLeft:5, color:'white', margin:1}}>{item.firstName} {item.lastName}</Text>
                                        <Text style={{fontSize:16,marginLeft:5, color:'white', margin:1}}>ประสบการณ์ : {item.experience}</Text>
                                        <Text style={{fontSize:20,marginLeft:5, color:'white', margin:1}}>Rate : {item.rating}</Text>
                                    </View>
                                </View>
                        </TouchableOpacity>

                            }
                        style={{marginTop:5,flex:1}}
                    />
                </View>
            </View>
        );
    }

}    