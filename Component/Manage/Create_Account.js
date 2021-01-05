import * as React from 'react';
import { StyleSheet, Picker, TouchableOpacity, View ,Text,TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements'
import {url} from '../var';
const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 14,
      height: 50,
    },
  });

export default class Create_Account extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            Question:'0',
            checked:false,
            firstName:'vudtipat',
            lastName:'saichana',
            ID:'1250800074251',
            Phone:'0961912151',
            Email:'vudtipat@gmail.com',
            ConfirmEmail:'vudtipat@gmail.com',
            Password:'123456',
            ConfirmPass:'123456',
            Answer:'ttt'
        }
    }

    onChangeQuesTion = (Text)=>{
        this.setState({Question:Text});
    }

    onChangefirstName = (Text)=>{
        this.setState({firstName:Text});
    }

    onChangelastName = (Text)=>{
        this.setState({lastName:Text});
    }

    onChangeID = (Text)=>{
        this.setState({ID:Text});
    }

    onChangePhone = (Text)=>{
        this.setState({Phone:Text});
    }

    onChangeEmail = (Text)=>{
        this.setState({Email:Text});
    }

    onChangeConfirmEmail = (Text)=>{
        this.setState({ConfirmEmail:Text});
    }

    onChangePassword = (Text)=>{
        this.setState({Password:Text});
    }

    onChangeConfirmPass = (Text)=>{
        this.setState({ConfirmPass:Text});
    }

    onChangeAnswer = (Text)=>{
        this.setState({Answer:Text});
    }
        
    checkBox(){
        if(this.state.checked == true){
            this.setState({checked:false})
        }else{
            this.setState({checked:true})
        }
    }

    onSummit = async () =>
    {
        if(this.state.Email != this.state.ConfirmEmail)
        {
            Alert.alert("กรุณาตรวจสอบ Email !!")
        }
        else{
            if(this.state.Password != this.state.ConfirmPass)
            {
                Alert.alert("กรุณาตรวจสอบรหัสผ่าน !!")
            }
            else
            {
                if(this.state.ID.length != 13)
                {
                    Alert.alert("กรุณาตรวจสอบรหัสบัตรประชาชน!!")
                }
                else
                {
                    if(this.state.Phone.length != 10)
                    {
                        Alert.alert("กรุณาตรวจสอบเบอโทรศัพท์!!")
                    }
                    else
                    {
                        if(this.state.checked != true)
                        {
                            Alert.alert("กรุณายอมรับเงื่อนไข!!")
                        }
                        else
                        {
                            var data = {
                            "_id" : this.state.Email,
                            "Answer": this.state.Answer,
                            "Email": this.state.Email,
                            "ID": this.state.ID,
                            "Password": this.state.Password,
                            "Phone": this.state.Phone,
                            "Question": this.state.Question,
                            "firstName": this.state.firstName,
                            "lastName": this.state.lastName,
                            "mode":this.props.navigation.getParam('mode', 'NO-ID'),
                            "age": '',
                            "sex": '',
                            "nation": '',
                            "religion": '',
                            "degree": '',
                            "interest" :['','','',''],
                            };
                            console.log(data)
                            if(data.mode == "Employee")
                            {
                                await fetch(url+'/Employee_Register', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                }).then((response) => response.json())
                                .then((json) => {
                                    if(json.response == "Pass")
                                    {
                                        Alert.alert("ลงทะเบียนสำเร็จ!!")
                                        this.props.navigation.navigate('Employee_Login')
                                    }
                                    else if(json.response == "Not Pass")
                                    {
                                        Alert.alert("กรุณาตรวจสอบข้อมูล")
                                    }
                                    else
                                    {
                                        Alert.alert("ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง")
                                    }
                                })
                            }
                            else if(data.mode == "Employer")
                            {
                                await fetch(url+'/Employer_Register', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                }).then((response) => response.json())
                                .then((json) => {
                                    if(json.response == "Pass")
                                    {
                                        Alert.alert("ลงทะเบียนสำเร็จ!!")
                                        this.props.navigation.navigate('Employer_Login')
                                    }
                                    else if(json.response == "Not Pass")
                                    {
                                        Alert.alert("กรุณาตรวจสอบข้อมูล")
                                    }
                                    else
                                    {
                                        Alert.alert("ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง")
                                    }
                                })
                            }
                            
                        }
                        
                    }
                }
            }
        }
    }

    render(){
        return(
            <ScrollView>
            <View style={{flex:1, backgroundColor:'#ffffff'}}>
                <View style={{flex:0.12, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection:'row',
                             alignItems:'center',  backgroundColor:'transparent', marginBottom:20, height:80}}>
                    <TouchableOpacity style={{flex:0.1, height:'100%',justifyContent:'center',marginLeft:'2%',backgroundColor:'transparent',
                                    opacity:10,width:'20%',height:'70%',borderRadius:10,flexDirection:'row',alignItems:'center'}} 
                                    onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="left" size={26} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                    </TouchableOpacity> 

                    <View style={{flex:0.85, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Register</Text>
                    </View>
                </View>
                
                <View style={{flex:0.72, margin:5, backgroundColor:'transparent', flexDirection:'column', alignItems:'center'}}>

                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder='First Name' placeholderTextColor='#AAAAAA' 
                                onChangeText={ Text => this.onChangefirstName(Text)} />

                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="Last Name" placeholderTextColor='#AAAAAA' 
                                onChangeText={ Text => this.onChangelastName(Text)} />

                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="ID" placeholderTextColor='#AAAAAA' 
                                onChangeText={ Text => this.onChangeID(Text)} />

                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="Phone" placeholderTextColor='#AAAAAA' 
                                onChangeText={ Text => this.onChangePhone(Text)} />
                    
                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="E-mail" placeholderTextColor='#AAAAAA' 
                                onChangeText={ Text => this.onChangeEmail(Text)} />

                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="Confirm E-mail" placeholderTextColor='#AAAAAA'
                                onChangeText={ Text => this.onChangeConfirmEmail(Text)}  />

                    <View style={{backgroundColor:'transparent', width:'100%'}}>            
                        <TextInput  secureTextEntry={true}
                                    style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10, alignSelf:'center'}}
                                    placeholder="Password" placeholderTextColor='#AAAAAA' 
                                    onChangeText={ Text => this.onChangePassword(Text)} />
                    </View>

                    <View style={{backgroundColor:'transparent', width:'100%'}}>            
                        <TextInput  secureTextEntry={true}
                                    style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10, alignSelf:'center'}}
                                    placeholder="Confirm Password" placeholderTextColor='#AAAAAA' 
                                    onChangeText={ Text => this.onChangeConfirmPass(Text)} />
                    </View>

                    <View style={{height:50, width: '90%', backgroundColor:'transparent', margin:10}}>
                        <TouchableOpacity style={{height: 50, width:'100%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:0}}>
                        <Picker
                            
                            selectedValue={this.state.Question}
                            style={{ height: 50, width: '105%' }}
                            onValueChange={(itemValue, itemIndex) => this.onChangeQuesTion(itemValue)}
                        >
                            <Picker.Item label="ชื่อแม่ของคุณ" value="0" />
                            <Picker.Item label="ชื่อพ่อของคุณ" value="1" />
                            <Picker.Item label="ชื่อสัตว์เลี้ยงตัวแรกของคุณ" value="2" />
                            <Picker.Item label="โรงพยาบาลที่คุณเกิด" value="3" />
                            <Picker.Item label="หนังที่คุณชอบ" value="4" />
                            <Picker.Item label="ชื่อคนที่คุณชอบ" value="5" />
                        </Picker>
                        </TouchableOpacity>
                    </View>

                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="Your Answer?" placeholderTextColor='#AAAAAA' 
                                onChangeText={ Text => this.onChangeAnswer(Text)} />
                    

                </View>
                <View style={{flex:0.18, backgroundColor:'transparent', width:'90%', alignSelf:'center', flexDirection:'row'}}>
                    <CheckBox   style={{alignSelf:'center'}}
                                onPress={()=>this.checkBox()}
                                checked={this.state.checked}>
                    </CheckBox>
                    <View style={{flexDirection:'column', color:'red', margin:5}}>
                        <Text style={{fontSize:14, marginLeft: '0%'}}>I agree to ..... </Text>
                        <TouchableOpacity>
                            <Text style={{fontSize:14, marginLeft: '0%', color:'#720DBA'}}>Term of Service Agreement</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize:14, marginLeft: '0%'}}>and Privacy Policy</Text>
                    </View>

                </View>

                <TouchableOpacity onPress={()=> this.onSummit()} style={{height: 50, width:'90%',borderRadius:10 , alignSelf:'center',
                                paddingHorizontal:10, backgroundColor:'#720DBA', margin:10, flexDirection:'column', justifyContent:'center'}}>
                        <Text style={{fontSize:20, color:'white',alignSelf:'center', backgroundColor:'transparent'}}>Register</Text>
                </TouchableOpacity>

            </View>
            </ScrollView>
        );
    }
}