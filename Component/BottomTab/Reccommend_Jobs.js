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
            await fetch(url+'/Emplyee_Rec', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            
    }

    recoment = async () => {
        var email = await AsyncStorage.getItem('email')
        await fetch(url+'/Emplyee_Rec?want='+email, {
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

    onpress = async (va1) => {
        var press = await AsyncStorage.getItem('press');
        console.log(press)
        if(press == '0')
        {
            console.log('rrrrrrrrr')
            this.updateal(va1)
            this.setUpdate()
        }
        this.props.navigation.navigate('Job_Description', {objId:va1})
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
                                onPress={() => this.onpress(item._id)}>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{ justifyContent:'center'}}>
                                        <View style={{ borderRadius:60, margin:5}}>
                                            <Image 
                                                style={{width:80, height:80, borderRadius:80}}
                                                source={{
                                                    uri: item.image,
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View style={{felx:1 ,margin:5, marginTop:15, marginBottom:15, width:220}}>
                                        <Text style={{fontSize:18, color:'white', margin:1}}>{item.position}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>ประสบการณ์ : {item.experience}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>พื้นที่ : {item.location}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>ค่าตอบแทน : {item.Compensation}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>ประเภทงาน : {item.jobType}</Text>
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