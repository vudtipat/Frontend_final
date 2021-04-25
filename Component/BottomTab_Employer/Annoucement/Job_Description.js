import * as React from 'react';
import { StyleSheet, AsyncStorage, TouchableOpacity, View ,Text,TextInput,Image, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome,Feather } from '@expo/vector-icons'; 
import {url} from '../../var.js'

var dat = ""

export default class Job_Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: '',
            profit: '',
            location: '',
            description: '',
            properties: '',
            benefit: '',
            expert: '',
            numberNotify: 0,
            data:'',
            image:'',
        };
        this.getData()
        this.getAnnouncement();
      }
    getData(){
        dat = JSON.stringify(this.props.navigation.getParam('objId'))
        this.state.data = dat.replace(/^"(.*)"$/, '$1');
        console.log(this.state.data)
    }

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        console.log(email)
        console.log('mail sed la')
        await fetch(url+'/Job_Description?want='+this.state.data, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('inside if')
                var datax = [];
                var x = JSON.parse(respone.data);
                this.setState({datasource:x});
                console.log(this.state.datasource)
                this.setState({ jobTitle:x[0]['position'], profit:x[0]['profit'], location:x[0]['location'], 
                                description:x[0]['Description'], properties:x[0]['Properties'],
                                benefit:x[0]['Benefits'], expert:x[0]['experience'], image:x[0]['image']});
            }
            else
            {
                console.log('inside else')
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }
    render(){
        const { navigation } = this.props;
        return(
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:0.1, flexDirection:'row', alignItems:'center', backgroundColor:'white'}}>
                    <TouchableOpacity style={{height:'100%',justifyContent:'center',marginLeft:'2%', width:'20%',height:'70%',
                                    borderRadius:10, flexDirection:'row',alignItems:'center'}} 
                                    onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="leftcircleo" size={24} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flex:0.8, backgroundColor:'transparent', borderRadius:10}}>
                    <Image 
                        style={{flex:1}}
                        source={{
                            uri: this.state.image,
                        }}
                    />
                </View>
                
                <View style={{flex:1}}>
                <ScrollView>
                    <View style={{ borderColor:'transparent', height:190}}>
                        <View style={{flex:1, backgroundColor:'#B8B8B8', marginTop:5, opacity:10}}>
                            <TouchableOpacity >
                                <View style={{flexDirection:'row', marginTop:15, margin:5}}>
                                    <Text style={{fontSize:22}}>{this.state.jobTitle}</Text>
                                </View>
                                <Text style={{fontSize:14, margin:5}}>พื้นที่ : {this.state.location}</Text>
                                <Text style={{fontSize:14, margin:5}}>ค่าตอบแทน : {this.state.profit}</Text>
                                <Text style={{fontSize:14, margin:5}}>ประสบการณ์ : {this.state.expert}</Text>
                            </TouchableOpacity>
                            
                            <View style={{justifyContent:'flex-end', flexDirection:'row', marginRight:10,}}>
                                
                                <TouchableOpacity style={{height:30,borderWidth:1, borderRadius:5, marginRight:5, marginTop:5}}
                                    onPress={() => this.props.navigation.navigate('Application', {objId : this.state.data})}>
                                        <Text style={{fontSize:14, margin:5}}>All Application</Text>
                                </TouchableOpacity>
                                {/**<View style={{position:"absolute"}}>
                                    <FontAwesome name="circle" size={14} color="red" />
                                </View> **/}

                            </View>

                        </View>
                    </View>

                    <View style={{marginTop:15}}>
                        <Text style={{fontSize:22, margin:5}}>Job Description</Text>
                        <Text style={{fontSize:14, margin:5}}>{this.state.description}</Text>

                    </View>

                    <View style={{marginTop:15}}>
                        <Text style={{fontSize:22, margin:5}}>Properties</Text>
                        <Text style={{fontSize:14, margin:5}}>{this.state.properties}</Text>

                    </View>

                    
                    <View style={{marginTop:15}}>
                        <Text style={{fontSize:22, margin:5}}>Benefits</Text>
                        <Text style={{fontSize:14, margin:5}}>{this.state.benefit}</Text>

                    </View>

                    <View style={{height:100, justifyContent:'center'}} />

                </ScrollView>
                </View>
            </View>
        );
    }
}    