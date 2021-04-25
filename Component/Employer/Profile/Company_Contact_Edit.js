import * as React from 'react';
import { StyleSheet, AsyncStorage, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import {url} from '../../var.js'

export default class Company_Contact_Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            datasource:'',
            contact:'',
            contactTemp:'',
        };
        this.getAnnouncement();
      }

    onSave = async() => {
        var datap = await AsyncStorage.getItem('data');
        datap = JSON.parse(datap);
        var data = {
                Email: this.state.email,
                contact: this.state.contact,
        }
        console.log(data)
        await fetch(url+'/Company_Contact_Edit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('in if')
                this.setState({ contactTemp : this.state.contact });
                this.props.navigation.goBack()
            }
            else
            {
                console.log('in else')
            }
        })
        
    }

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        console.log(email)
        await fetch(url+'/Employer_Profile?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var datax = [];
                var x = JSON.parse(respone.data);
                this.setState({datasource:x});
                console.log(this.state.datasource)
                this.setState({contact : x[0]['contact'], contactTemp : x[0]['contact'], email: x[0]['Email']});
            }
            else
            {
                console.log('inside else')
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }

    pressBack(){
        this.setState({ contact : this.state.contactTemp })
        this.props.navigation.goBack()
    }

    render(){
        return(
            <View style={{flex:1}}>

                <View style={{flex:0.1, justifyContent:'center', backgroundColor:'transparent', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={()=>this.pressBack()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:15}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Cancle</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.7, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Contact</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.onSave()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:10}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flex:0.9, backgroundColor:'#E0E0E0', alignItems:'center'}}>
                    <View style={{flexDirection:'row', backgroundColor:'white', marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'flex-start'}}>
                        <TextInput
                            style={{flex:1, margin:5, borderBottomWidth:1}}
                            value={this.state.contact}
                            onChangeText={text=>this.setState({contact:text})}
                            multiline={true}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </View>     

            </View>
        );
    }
}    