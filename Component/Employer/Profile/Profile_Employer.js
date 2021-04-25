import * as React from 'react';
import { Image, StyleSheet, AsyncStorage, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 
import {url} from '../../var.js'
import {image} from '../../imageurl'
import * as ImagePicker from 'expo-image-picker';
import { withNavigation } from 'react-navigation';


class Profile_Employer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            tel: '',
            firstName: '',
            lastName: '',
            companyName : 'S T R(2003) Co.,Ltd',
            datasource: [],
            information: '',
            contact:'',
            img:image,
        };
        this.getAnnouncement();
      }

      componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getAnnouncement()
        });
      }
    
      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        console.log(email)
        console.log('mail sed la')
        await fetch(url+'/Employer_Profile?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('inside if')
                var datax = [];
                var x = JSON.parse(respone.data);
                this.setState({datasource:x});
                console.log(this.state.datasource)
                this.setState({  firstName: x[0]['firstName'], lastName: x[0]['lastName'], tel: x[0]['Phone'] , information: x[0]['information'], 
                                contact:x[0]['contact'], email:x[0]['Email'], companyName:x[0]['companyName'], img:x[0]['image']});
            }
            else
            {
                console.log('inside else')
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }
    
    openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
        else{
          let pickerResult = await ImagePicker.launchImageLibraryAsync({base64:true,allowsEditing: true,
            aspect: [4,3]});
          if(!pickerResult.cancelled)
          {
            let imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null;
            this.setState({img:imageUri})
            var data = {
                email:this.state.email,
                image:imageUri,
            }
            fetch(url+'/Employer_Image', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => response.json())
            .then((json) => {
                if(json.response != "Pass")
                {
                  console.log("pass")
                  
                }
            })
          }
        } 
    }
    render(){
        return(
            <View style={{flex:1, flexDirection:'column'}}>

                <View style={{flex:0.05, alignItems:'flex-start', backgroundColor:'white', flexDirection:'row'}}>
                    <View style={{flex:0.2}}>
                        <TouchableOpacity style={{flex:1,justifyContent:'center',marginLeft:'2%',backgroundColor:'transparent',
                                        width:'50%',height:'60%',borderRadius:10,flexDirection:'row',alignItems:'center'}} 
                                        onPress={()=>this.props.navigation.goBack()}>
                            <AntDesign name="left" size={26} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                        </TouchableOpacity> 
                    </View>

                    <View style={{flex:0.7}}/>
                    
                </View>
                
                <View style={{flex:0.3, backgroundColor:'white', alignItems:'center'}}>
                    <View style={{ borderRadius:60}}>
                        <Image 
                            style={{width:140, height:140, margin:5, borderRadius:75}}
                            source={{
                                uri: this.state.img,
                            }}
                        />
                        <TouchableOpacity style={{width:40, height:40, borderRadius:20, position:'absolute',alignSelf:'flex-end', 
                                                backgroundColor:'#E6E6E6', marginTop:90, justifyContent:'center'}}
                                                onPress={() => this.openImagePickerAsync()}>
                            <Image
                                style={{width:30, height:30, borderRadius:10, position:'absolute', alignSelf:'center'}}
                                source={require("../../image/camera.png")}
                            />
                        </TouchableOpacity>
                        
                    </View>
                <Text style={{fontSize:22, margin:0}}> {this.state.firstName}  {this.state.lastName} </Text>
                    <Text style={{fontSize:16 , margin:2}}> {this.state.email} </Text>
                    <Text style={{fontSize:14 , margin:2}}> {this.state.tel} </Text>
                </View>



                <View style={{flex:0.65, marginTop:10}}>
                    <ScrollView>

                        {/* Information */}
                        <View style={{ backgroundColor:'white', borderWidth:15, borderColor:'transparent'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image
                                    source={require('../../image/book.png')}
                                />
                                <Text style={{fontSize:20,}}> Company Information </Text>

                            </View>
                            <View style={styles.spaceView}/>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize:14, fontWeight:'bold'}}>{this.state.companyName}</Text>
                                    <Text style={{fontSize:14}}>{this.state.information}</Text>

                                </View>
                                <View style={{flex:0.1, justifyContent:'flex-start', alignItems:'flex-start'}}>
                                    <TouchableOpacity style={{margin:0}}
                                                    onPress={() => this.props.navigation.navigate('Company_Information_Edit')}>
                                        <Image
                                            style={{height:25, width:25}}
                                            source={require('../../image/pencil.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/*End Information*/}

                        <View style={{marginTop:10}}/>

                        {/* Contact */}
                        <View style={{ backgroundColor:'white', borderWidth:15, borderColor:'transparent'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image
                                    style={{height:35, width:35}}
                                    source={require('../../image/phone.png')}
                                />
                                <Text style={{fontSize:20,}}> Contact </Text>
                            </View>
                            <View style={styles.spaceView}/>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                
                                <Text style={{fontSize:14, margin:5}}>{this.state.contact}</Text>

                                </View>
                                <View style={{flex:0.1, justifyContent:'flex-start', alignItems:'flex-start'}}>
                                    <TouchableOpacity style={{margin:0}}
                                                        onPress={() => this.props.navigation.navigate('Company_Contact_Edit')}>
                                                    
                                        <Image
                                            style={{height:25, width:25}}
                                            source={require('../../image/pencil.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/*End Contact*/}
                        <View style={{height:50, backgroundColor:'white'}}/>


                    </ScrollView>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    statusLine : {
        borderWidth:0.5,
        borderColor:'#B2B3B3', 
        width:'95%', 
        alignSelf:'center', 
        margin:10
    },
    fontStatus : {
        fontSize:16, 
        fontWeight:'bold'
    },
    purpleBtn : {
        backgroundColor:'#720DBA', 
        borderRadius:15, 
        height:30, 
        justifyContent:'center'
    },
    spaceView : {
        borderWidth:1, 
        borderColor:'gray', 
        width:'90%', 
        alignSelf:'center', 
        margin:20
    }
})

export default withNavigation(Profile_Employer)