import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'
import {url} from '../../var.js'
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import data from '../../data.json';

export default class Interesting_Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listInteereesting:["", "", "", ""],
            int1:'',
            int2:'',
            int3:'',
            int4:'',
            tmp1:'Select your position...',
            tmp2:'Select your position...',
            tmp3:'Select your position...',
            tmp4:'Select your position...',
            interestTemp:[],
            temp:[],
        };
        this.getAnnouncement()
      }

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        await fetch(url+'/Employee_Profile?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('inside if')
                var datax = [];
                var x = JSON.parse(respone.data);
                this.setState({   interestTemp:x[0]['interest'] });
                console.log(this.state.interestTemp)
                var count = 1;
                this.state.interestTemp.forEach(element => {
                    this.state.temp.push({ list:element, num:count})
                    count++
                });
                this.setState({interestTemp:this.state.temp, tmp1:this.state.temp[0].list, tmp2:this.state.temp[1].list,
                                tmp3:this.state.temp[2].list, tmp4:this.state.temp[3].list
                })
                this.setState({ int1:this.state.tmp1, int2:this.state.tmp2, int3:this.state.tmp3, int4:this.state.tmp4 })
            }
            else
            {
                console.log('inside else')
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }

    onSave = async() => {
        var email = await AsyncStorage.getItem('email')
        var data = {
            email : email,
            interest : [this.state.int1, this.state.int2, this.state.int3, this.state.int4]
        } 
        await fetch(url+'/Employee_Interesting', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('เพิ่มสำเร็จ');
                //this.props.navigation.goBack()
            }
            else
            {
                console.log('เพิ่มไม่สำเร็จ!!');
            }
        })
    }



    render(){
        return(
            <View style={{flex:1, marginTop:32}}>

                <View style={{flex:0.1, justifyContent:'center', backgroundColor:'transparent', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Profile')}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Cancle</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.85, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Interesting</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.onSave()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flex:0.9, backgroundColor:'white', alignItems:'center'}}>
                    <View style={{ backgroundColor:'white', height:50, marginTop:10, width:'100%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <DropDownPicker
                            items={data.position2}
                            defaultValue={this.state.int1}
                            containerStyle={{height: 50, width:'100%'}}
                            searchable={true}
                            placeholder={this.state.tmp1}
                            style={{backgroundColor: '#EBEBEB'}}
                            itemStyle={{  justifyContent: 'flex-start'  }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => this.setState({int1: item.value})}
                        />
                        <View style={{ backgroundColor:'white', height:50, marginTop:10, width:'100%',
                                borderColor:'#EBEBEB',  alignItems:'center'}}>
                            <DropDownPicker
                                items={data.position2}
                                defaultValue={this.state.int2}
                                containerStyle={{height: 50, width:'100%'}}
                                searchable={true}
                                placeholder={this.state.tmp2}
                                style={{backgroundColor: '#EBEBEB'}}
                                itemStyle={{  justifyContent: 'flex-start'  }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => this.setState({int2: item.value})}
                            />
                            <View style={{ backgroundColor:'white', height:50, marginTop:10, width:'100%',
                                            borderColor:'#EBEBEB',  alignItems:'center'}}>
                                <DropDownPicker
                                    items={data.position2}
                                    defaultValue={this.state.int3}
                                    containerStyle={{height: 50, width:'100%'}}
                                    searchable={true}
                                    placeholder={this.state.tmp3}
                                    style={{backgroundColor: '#EBEBEB'}}
                                    itemStyle={{  justifyContent: 'flex-start'  }}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => this.setState({int3: item.value})}
                                />
                                <View style={{ backgroundColor:'white', height:50, marginTop:10, width:'100%',
                                                borderColor:'#EBEBEB',  alignItems:'center'}}>
                                    <DropDownPicker
                                        items={data.position2}
                                        defaultValue={this.state.int4}
                                        containerStyle={{height: 50, width:'100%'}}
                                        searchable={true}
                                        placeholder={this.state.tmp4}
                                        style={{backgroundColor: '#EBEBEB'}}
                                        itemStyle={{  justifyContent: 'flex-start'  }}
                                        dropDownStyle={{backgroundColor: '#fafafa'}}
                                        onChangeItem={item => this.setState({int4: item.value})}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>     

            </View>
        );
    }
}    