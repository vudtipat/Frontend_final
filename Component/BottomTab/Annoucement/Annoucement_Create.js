import * as React from 'react';
import { Alert, AsyncStorage, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import {url} from '../../var';

export default class Annoucement_Create extends React.Component {


    createAnnoucement = async() => {
        var datap = await AsyncStorage.getItem('data');
        datap = JSON.parse(datap);
        var data = {
            job: this.state.job,
            type: this.state.type,
            location: this.state.location,
            Compensation: this.state.Compensation,
            exper: this.state.exper,
            firstName:datap.firstName,
            lastName:datap.lastName,
            owner:datap.Email
        }
        await fetch(url+'/Employee_CreateAnnoucment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                Alert.alert('เพิ่มสำเร็จ');
            }
            else
            {
                Alert.alert('เพิ่มไม่สำเร็จ!!');
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            job: 'รับซ่อมเครื่องยนต์ทุกชนิด',
            type: 'ช่างซ่อม,ช่าง,ช่างเทคนิค',
            location: 'Si Racha,Chonburi',
            Compensation: '25000',
            exper: '3',
        };
      }
    
    onChangejob = (text) => {
        this.setState({job:text});
    }

    onChangetype = (text) => {
        this.setState({type:text});
    }

    onChangelocation = (text) => {
        this.setState({location:text});
    }

    onChangeCompensation = (text) => {
        this.setState({Compensation:text});
    }
    
    onChangeexper = (text) => {
        this.setState({exper:text})
    }
    onCreate = async() => {
        this.createAnnoucement()
        this.props.navigation.goBack()
    }
    render(){
        return(
            <View style={{flex:1, marginTop:10,}}>

                <View style={{flex:0.1, justifyContent:'center', backgroundColor:'transparent', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.goBack()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Cancle</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.85, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Annoucement</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.onCreate()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flex:0.9, backgroundColor:'white', alignItems:'center'}}>
                    <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>งานที่ต้องการ</Text>
                        <View style={{flexDirection:'row', height:50, marginTop:10}}>
                            <TextInput style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                            paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}} onChangeText={(text) => this.onChangejob(text)}/>
                        </View>
                    
                    <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>ประเภทงาน</Text>
                        <View style={{flexDirection:'row', height:50, marginTop:10}}>
                            <TextInput style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                            paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}} onChangeText={(text) => this.onChangetype(text)}/>
                        </View>
                    <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>พื้นที่ที่ต้องการ</Text>
                        <View style={{flexDirection:'row', height:50, marginTop:10}}>
                            <TextInput style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                            paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}} onChangeText={(text) => this.onChangelocation(text)}/>
                        </View>
                    <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>ค่าตอบแทน</Text>
                        <View style={{flexDirection:'row', height:50, marginTop:10}}>
                            <TextInput style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                            paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}} onChangeText={(text) => this.onChangeCompensation(text)}/>
                        </View>
                    <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>ประสบการณ์ทำงาน</Text>
                        <View style={{flexDirection:'row', height:50, marginTop:10}}>
                            <TextInput style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                            paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}} onChangeText={(text) => this.onChangeexper(text)}/>
                        </View>
                </View>  
 
            </View>
        );
    }
}    