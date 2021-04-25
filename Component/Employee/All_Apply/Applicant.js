import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, Alert,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {url} from '../../var.js'
import { withNavigation } from 'react-navigation';

var dat = ""
var employer = ""

class Applicant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:'',
            text:'',
            employerEmail:''
        };
        //this.getData()
      }
      componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getData()
            
        });
      }
    
      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }
    getData(){
        dat = JSON.stringify(this.props.navigation.getParam('objId'))
        employer = JSON.stringify(this.props.navigation.getParam('employerEmail'))
        this.state.data = dat.replace(/^"(.*)"$/, '$1');
        this.state.employerEmail = employer.replace(/^"(.*)"$/, '$1');
        console.log(this.state.data)
    }
    onSave = async() => {
        var email = await AsyncStorage.getItem('email')
        var token = await AsyncStorage.getItem('token')
        var data = {
            objId: this.state.data,
            email: email,
            token: token,
            employerEmail: this.state.employerEmail,
            mode: 'Employer'
        }
        console.log(data)
        await fetch(url+'/addPending', {
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
            }
            else
            {
                console.log('เพิ่มไม่สำเร็จ!!');
            }
        })
        if(this.state.text.length == 0){
            this.setState({text : '-'})
        }
        var data = {
            objId: this.state.data,
            email: email,
            aboutMe: this.state.text
        }
        console.log(data)
        await fetch(url+'/postAboutMe', {
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
                console.log('เพิ่มไม่สำเร็จ!!');
            }
        })
        this.props.navigation.goBack()
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
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Applicant</Text>
                    </View>
                    <View style={{flex:0.15}}/>
                </View>
                <Text style={{fontSize:24, margin:15}}>About you</Text>
                <View style={{flex:0.9, alignItems:'center'}}>
                    <View style={{flexDirection:'row', backgroundColor:'white', marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'flex-start', borderWidth:1}}>
                        <TextInput
                            style={{flex:1, margin:5, borderBottomWidth:0, height:200}}
                            value={this.state.text}
                            onChangeText={text=>this.setState({text:text})}
                            multiline={true}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                        
                    <View style={{margin:15}}>
                        <TouchableOpacity style={{backgroundColor:'#7F0AFF', alignItems:'center', height:40, width:100, justifyContent:'center', borderRadius:5}}
                                                onPress={() => this.onSave()}>
                            <Text style={{fontSize:20, color:'white'}}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>   
                
            </View>
        );
    }
}    
export default withNavigation(Applicant);