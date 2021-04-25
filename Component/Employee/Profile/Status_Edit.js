import * as React from 'react';
import { Alert } from 'react-native';
import { AsyncStorage, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import {url} from '../../var';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';

export default class Status_Edit extends React.Component {

    updateData = async() => {
        var email = await AsyncStorage.getItem('email')
        var data = {
            age: this.state.age,
            sex: this.state.sex,
            nation: this.state.nation,
            religion: this.state.religion,
            email:email,
        }
        console.log(data)
        await fetch(url+'/Employee_StatusEdit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                Alert.alert('แก้ไขสำเร็จ');
            }
            else
            {
                Alert.alert('แก้ไขไม่สำเร็จ!!');
            }
        })
    }

    _getData = async() => {
        var data = await AsyncStorage.getItem('data');
        data = JSON.parse(data)
        this.setState({dataUser:data})
        this.setState({age: data.age})
        if(data.sex == '')
            this.setState({sex: 'Male'})
        else
            this.setState({sex: data.sex})
        this.setState({nation: data.nation})
        this.setState({degree: data.degree})
        this.setState({religion: data.religion})
    }

    onChangeage = (text) =>
    {
        this.setState({age:text})
    }

    onChangesex = (text) =>
    {
        this.setState({sex:text})
    }
    onChangenation = (text) =>
    {
        this.setState({nation:text})
    }
    onChangereligion = (text) =>
    {
        this.setState({religion:text})
    }
    onChangedegree = (text) =>
    {
        this.setState({degree:text})
    }

    onSave = async() => {
        this.state.dataUser.age = this.state.age;
        this.state.dataUser.sex = this.state.sex;
        this.state.dataUser.nation = this.state.nation;
        this.state.dataUser.religion = this.state.religion;
        this.state.dataUser.degree = this.state.degree;
        await AsyncStorage.setItem('data',JSON.stringify(this.state.dataUser))
        this.updateData();
        this.props.navigation.navigate('Profile')
    }

    constructor(props) {
        super(props);
        this.state = {
            age: '',
            sex: 'Male',
            nation: '',
            religion: '',
            degree: '',
            dataUser:{},
            sex_choose: [{label: 'Male', value:'Male'},
                        {label: 'Female', value:'Female'}]
        };
        this._getData();
        console.log(this.state.dataUser)
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
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Status</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.onSave()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flex:0.9, backgroundColor:'#E0E0E0', alignItems:'center'}}>
                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <TextInput style={{fontSize:18,width:'95%'}}
                            onChangeText={(text) => this.onChangeage(text)} placeholder="Age">{this.state.age}</TextInput>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                       <View style={{flex:1, height:'100%', justifyContent:'center', width:'100%'}}>
                       <Picker
                                    selectedValue={this.state.sex}
                                    style={{flex:1, height: '100%',borderColor: 'white' , backgroundColor:'white'}}
                                    onValueChange={(itemValue, itemIndex) =>
                                      this.setState({sex: itemValue})
                                    }>
                                    <Picker.Item label="ชาย" value="ชาย" />
                                    <Picker.Item label="หญิง" value="หญิง" />
                                  </Picker>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <TextInput style={{fontSize:18,width:'95%'}}
                            onChangeText={(text) => this.onChangenation(text)} placeholder="Nationality">{this.state.nation}</TextInput>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <TextInput style={{fontSize:18,width:'95%'}}
                            onChangeText={(text) => this.onChangereligion(text)} placeholder="Religion">{this.state.religion}</TextInput>
                    </View>
                </View>  
 
            </View>
        );
    }
}    