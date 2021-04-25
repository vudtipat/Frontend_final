import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import { StyleSheet, Text, TextInput,  TouchableOpacity, View,
         Image, AppRegistry, SafeAreaView, FlatList, AsyncStorage
} from 'react-native';
import { Ionicons,Entypo } from '@expo/vector-icons'
import { Avatar, Card, Icon} from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
import {url} from '../../var.js'
import {image} from '../../imageurl'

var dat = ""

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            objId:'',
            datasource:[],
            prev:[],
        };
        console.log('------------------------------------------------------------')
        this.getData()
        this.getAnnouncement()
    }

    getData(){
        dat = JSON.stringify(this.props.navigation.getParam('objId'))
        this.state.objId = dat.replace(/^"(.*)"$/, '$1');
        console.log(this.state.objId)
    }
    getAnnouncement = () => {
         fetch(url+'/Application?want='+this.state.objId, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('inside if')
                var x = JSON.parse(respone.data);
                this.setState({data:x[0]['applyList']})
                console.log("data = "+this.state.data)

                this.state.data.forEach(element => {
                    fetch(url+'/Employee_Profile?want='+element, {
                        method: 'GET',
                    }).then((response) => response.json()).then((respone) => {
                        if(respone.response == 'Pass')
                        {
                            console.log('inside getProfile')
                            var x = JSON.parse(respone.data);
                            x.forEach(element => {
                                this.state.datasource.push(element);
                                console.log("element = " + element)
                            });
                            console.log("datasource = " + this.state.datasource)
                            this.setState({prev:this.state.datasource})
                        }
                        else
                        {
                            console.log('inside else')
                        }
                    })
                });
                
            }
            else
            {
                console.log('inside else')
            }
        })
    }
    

    _renderItem(item){
        return(
            
            <View style={{flex:1, backgroundColor:'#690DBA', flexDirection:'row', borderRadius:10, marginBottom:10}}>
                <TouchableOpacity style={{flex:1, backgroundColor:'transparent', flexDirection:'row'}}
                                   onPress={() => this.props.navigation.navigate('Application_Profile',{email : item.Email, objId:this.state.objId})}>

                    <View style={{ borderRadius:90,justifyContent:'center', margin:10}}>
                        <Image 
                            style={{width:90, height:90, borderRadius:90}}
                            source={{
                                uri: item.image,
                            }}
                        />
                    </View>

                    <View style={{flex:0.9 ,backgroundColor:'transparent', alignSelf:'center'}}>
                        <Text style={{fontSize:20, color:'white', margin:3}}>{item.firstName} {item.lastName}</Text>
                        <Text style={{fontSize:18, color:'white', margin:3}}>อายุ : {item.age}</Text>
                        <Text style={{fontSize:14, color:'white', margin:3}}>Rating : {item.rating}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
        )
    }
    render(){
        return(
            <View style={{flex:1,width:'100%',marginTop:37}}>
                <View style={{flex:0.05, alignItems:'flex-start', backgroundColor:'transparent'}}>
                <TouchableOpacity style={{height:'100%',justifyContent:'center',marginLeft:'2%', width:'20%',height:'70%',
                                    borderRadius:10, flexDirection:'row',alignItems:'center'}} 
                                    onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="leftcircleo" size={24} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                        <Text>Back</Text>
                    </TouchableOpacity>
                    
                </View>

                <View style={{flex:1, margin:10}}>

                    <FlatList  
                        data={this.state.prev}  
                        renderItem={({item}) =>  this._renderItem(item)}  
                    />  

                    </View>
                </View>
        );
    }

}    