import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {url} from '../../var.js'

var email = ""
var objId = ""

export default class Agreement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            objId:'',
            time:'',
        };
        console.log('-------------------------------Agreement----------------------------------------')
        this.getData()
      }
    getData(){
        email = JSON.stringify(this.props.navigation.getParam('email'))
        objId = JSON.stringify(this.props.navigation.getParam('objId'))
        this.state.email = email.replace(/^"(.*)"$/, '$1');
        this.state.objId = objId.replace(/^"(.*)"$/, '$1');
        console.log('email = '+this.state.email)
        console.log('objId = '+this.state.objId)
        console.log("Timestamp = " + new Date().getTime()); 
        var time = new Date().getTime();
        this.state.time = time;
        console.log('-----------------------------------------------------------------------')
    }
    onSave = async() => {
        var email = await AsyncStorage.getItem('email')
        var data = {
            objId: this.state.objId,
            email: this.state.email,
            employer: email
        }
        console.log(data)
        await fetch(url+'/addHiring', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('เซฟสำเร็จ');
                this.postAgreement()
                this.props.navigation.goBack()
            }
            else
            {
                console.log('เพิ่มไม่สำเร็จ!!');
            }
        })
        
    }
    postAgreement = async() => {
        var email = await AsyncStorage.getItem('email')
        var token = await AsyncStorage.getItem('token')
        var data = {
            jobID : this.state.objId,
            EmployeeID : this.state.email,
            EmployerID : email,
            Time :this.state.time,
            EmployeeStatus : false,
            EmployerStatus : true,
            jobDone : false,
            mode:'Employee',
            token:token
        }
        console.log(data)
        await fetch(url+'/postAgreement', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                Alert.alert('ทำสัญญาเสร็จสิ้น');
                this.props.navigation.goBack()
            }
            else
            {
                Alert.alert('ทำสัญญาไม่สำเร็จ');
            }
        })
    }


    render(){
        return(
            <View style={{flex:1, margin:10, marginTop:37}}>
                <View style={{flex:0.06, flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity style={{flex:0.15,height:50,justifyContent:'center',backgroundColor:'transparent',
                                        width:40,borderRadius:10,flexDirection:'row',alignItems:'center'}} 
                                        onPress={()=>this.props.navigation.goBack()}>
                            <AntDesign name="left" size={26} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                    </TouchableOpacity> 
                    <View style={{flex:0.75, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Agreement</Text>
                    </View>
                    <View style={{flex:0.15}}/>
                </View>
                <View style={{backgroundColor:'gray',borderWidth:0.5, margin:15}}/>
                <View style={{flex:1}}>
                    <Text style={{fontSize:20, margin:5}}>แบบฟอร์มการร่วมงาน</Text>
                    <Text style={{fontSize:14, margin:5}}>แบบฟอร์มการร่วมงานฉบับนี้ เพื่อเป็นการยืนยันว่าทั้งสองฝ่ายมีการตกลงร่วมงานกันเกิดขึ้นภายใน Application แห่งนี้ และเพื่อแสดงความบริสุทธิใจของทั้งสองฝ่ายทางเราจึงได้ทำแบบฟอร์มการร่วมงานนี้ขึ้น</Text>
                
                    <Text style={{fontSize:20, margin:5}}>กฎและข้อตกลงร่วมกัน</Text>
                    <Text style={{fontSize:14, margin:5}}>	    1. เมื่อมีการโกงกันเกิดขึ้น ฝ่ายที่โดนโกงสามารถที่จะร้องขอข้อมูลของฝ่ายที่ได้ทำการโกงเพื่อใช้ในการดำเนินการทางกฏหมายได้	</Text>
                    <Text style={{fontSize:14, margin:5}}>      2. หลังจากที่ได้ทำการร่วมงานกันเสร็จสิ้น จะต้องประเมินการทำงานร่วมกันตามความเป็นจริงเพื่อเป็นการปรับปรุงคุณภาพของระบบให้สามารถแนะนำได้ดียิ่งขึ้น </Text>
                
                </View>
                <View style={{flex:0.2, alignItems:'center'}}>
                    <View style={{margin:5}}>
                        <TouchableOpacity style={{backgroundColor:'blue', alignItems:'center', height:40, width:100, justifyContent:'center', borderRadius:5}}
                            onPress={() => this.postAgreement()}>
                            <Text style={{fontSize:20, color:'white'}}>Accept</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{margin:5}}>
                        <TouchableOpacity style={{backgroundColor:'blue', alignItems:'center', height:40, width:100, justifyContent:'center', borderRadius:5}}>
                            <Text style={{fontSize:20, color:'white'}}>Deny</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}    