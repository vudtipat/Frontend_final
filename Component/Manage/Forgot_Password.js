import * as React from 'react';
import { StyleSheet, TouchableOpacity, View ,Text,TextInput,AsyncStorage,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {url} from '../var';

const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 45,
    },
  });
var Mode = ""
export default class Forgot_Password extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            Question:'0',
            Answer:'',
            ID:'',
            Email:'',
        }
        this.getData()
    }
    getData(){
        Mode = JSON.stringify(this.props.navigation.getParam('mode'))
        this.state.mode = Mode.replace(/^"(.*)"$/, '$1');
        console.log("mode = " + this.state.mode)
    }
    agree = async() => {
        var data = {
                Email: this.state.Email,
                mode: this.state.mode,
                ID: this.state.ID,
                Question: this.state.Question,
                Answer: this.state.Answer,

        }
        console.log(data)
        await fetch(url+'/forgotPassword', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log("email = "+this.state.Email)
                console.log("mode = "+this.state.mode)
                this.props.navigation.navigate('Reset_Password',{id:this.state.Email, mode:this.state.mode})
            }
            else
            {
                Alert.alert('ไม่พบผู้ใช้งาน')
            }
        })
        
    }
    onChangeQuesTion = (Text)=>{
        this.setState({Question:Text});
    }

    onChangeAnswer = (Text)=>{
        this.setState({Answer:Text});
    }

    onChangeEmail = (Text)=>{
        this.setState({Email:Text});
    }

    onChangeID = (Text)=>{
        this.setState({ID:Text});
    }
    render(){
        return(

            <View style={{flex:1, backgroundColor:'#ffffff'}}>
                <View style={{flex:0.12, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection:'row',
                             alignItems:'center', marginTop:20, backgroundColor:'transparent', marginBottom:10, height:80}}>
                    <TouchableOpacity style={{flex:0.1, height:'100%',justifyContent:'center',marginLeft:'2%',backgroundColor:'transparent',
                                    opacity:10,width:'20%',height:'70%',borderRadius:10,flexDirection:'row',alignItems:'center'}} 
                                    onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="left" size={26} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                    </TouchableOpacity> 

                    <View style={{flex:0.8, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA'}}>Forgot Password</Text>
                    </View>
                </View>
                
                <View style={{flex:0.8, margin:5, backgroundColor:'transparent', flexDirection:'column', alignItems:'center'}}>
                    <Text style={{fontSize:20, color:'black', alignSelf:'flex-start', marginLeft:'5%', margin:5}}>E-mail</Text>
                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="E-mail" placeholderTextColor='#AAAAAA' 
                                onChangeText={ Text => this.onChangeEmail(Text)}/>

                    <Text style={{fontSize:20, color:'black', alignSelf:'flex-start', marginLeft:'5%', margin:5}}>ID card number</Text>
                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="ID card number" placeholderTextColor='#AAAAAA' 
                                onChangeText={ Text => this.onChangeID(Text)}/>

                    <Text style={{fontSize:20, color:'black', alignSelf:'flex-start', marginLeft:'5%', margin:5}}>Your Question</Text>
                    <View style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:5, justifyContent:'center'}}>
                            <Picker
                                selectedValue={this.state.Question}
                                
                                style={{height: 50, width:'100%'}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.onChangeQuesTion(itemValue)
                                }>
                                <Picker.Item label="สถานที่ที่คุณชอบ" value="สถานที่ที่คุณชอบ" />
                                <Picker.Item label="โรงพยาบาลที่คุณเกิด" value="โรงพยาบาลที่คุณเกิด" />
                                <Picker.Item label="โรงเรียนที่มัธยมของคุณ" value="โรงเรียนที่มัธยมของคุณ" />
                                <Picker.Item label="ชื่อสัตว์เลี้ยงของคุณ" value="ชื่อสัตว์เลี้ยงของคุณ" />
                                <Picker.Item label="ชื่อแฟนที่ทิ้งคุณคนล่าสุด" value="ชื่อแฟนที่ทิ้งคุณคนล่าสุด" />
                                <Picker.Item label="ชื่ออาจารย์ที่ให้ F คุณ" value="ชื่ออาจารย์ที่ให้ F คุณ" />
                                <Picker.Item label="วิชาที่คุณดรอปเป็นตัวแรก" value="วิชาที่คุณดรอปเป็นตัวแรก" />
                                <Picker.Item label="เพลงที่ฟังแล้วคิดถึงแฟนเก่า" value="เพลงที่ฟังแล้วคิดถึงแฟนเก่า" />
                                <Picker.Item label="ร้องเพลงท่อนที่คุณชอบี่สุด" value="ร้องเพลงท่อนที่คุณชอบี่สุด" />
                                <Picker.Item label="ชื่อเพื่อนที่คู่โปรเจคกับคุณ" value="ชื่อเพื่อนที่คู่โปรเจคกับคุณ" />
                            </Picker>
                    </View>

                    <Text style={{fontSize:20, color:'black', alignSelf:'flex-start', marginLeft:'5%', margin:5}}>Your Answer</Text>
                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="Your Answer" placeholderTextColor='#AAAAAA'
                                onChangeText={ Text => this.onChangeAnswer(Text)} />
                </View>
                
                
                <TouchableOpacity style={{height: 50, width:'90%',borderRadius:10 , alignSelf:'center',
                                paddingHorizontal:10, backgroundColor:'#720DBA', margin:5, flexDirection:'column', justifyContent:'center'}}
                                onPress={() => this.agree()}>
                        <Text style={{fontSize:20, color:'white',alignSelf:'center', backgroundColor:'transparent'}}>Reset</Text>
                </TouchableOpacity>

            </View>

        );
    }
}