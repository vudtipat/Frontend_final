import * as React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import {url} from '../../var.js'
import { withNavigation } from 'react-navigation';

var dat = ""

class Watch_Profile_Employer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            tel: '',
            firstName: '',
            lastName: '',
            companyName : '',
            information: '',
            contact: '',
            data:'',
        };
        this.getData()
        this.getAnnouncement()
      }

      componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getData()
            this.getAnnouncement()
        });
      }
    
      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }

    
    getData(){
        dat = JSON.stringify(this.props.navigation.getParam('owner'))
        this.state.data = dat.replace(/^"(.*)"$/, '$1');
        console.log(this.state.data)
    }

    getAnnouncement = async() => {
        await fetch(url+'/Employer_Profile?want='+this.state.data, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var datax = [];
                var x = JSON.parse(respone.data);
                x.forEach(element => {
                    datax.push(element);
                });
                this.setState({email:datax[0]['Email'], tel:datax[0]['Phone'], firstName:datax[0]['firstName'], lastName:datax[0]['lastName'], 
                                companyName:datax[0]['companyName'], information:datax[0]['information'], contact:datax[0]['contact'], 
                                img:x[0]['image']
                });
            }
            else
            {
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }
    render(){
        return(
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:0.05, alignItems:'flex-start', backgroundColor:'white'}}>
                    <TouchableOpacity style={{height:'100%',justifyContent:'center',marginLeft:'2%', width:'20%',height:'70%',
                                    borderRadius:10, flexDirection:'row',alignItems:'center'}} 
                                    onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="leftcircleo" size={24} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.3, backgroundColor:'white', alignItems:'center'}}>
                    <View style={{ borderRadius:60}}>
                        <Image 
                            style={{width:140, height:140, margin:5, borderRadius:75}}
                            source={{
                                uri: this.state.img,
                            }}
                        />
                        
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

export default withNavigation(Watch_Profile_Employer)