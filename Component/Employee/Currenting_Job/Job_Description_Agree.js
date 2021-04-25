import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, Image,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import {url} from '../../var.js'

var dat = ""

export default class Job_Description_Agree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: '',
            profit: '',
            location: '',
            description: '',
            properties: '',
            benefit: '',
            experience: '',
            bookmarkColor:'',
            bookmarkSolid:false,
            datarender:[],
            data:'',
            owner:'',
            bookmarkCheck:[],
            jobObj:'',
            tempEmail:'',
            image:'',
            exist:0,
        };
        this.getData()
        this.getAnnouncement()
    }

    getData(){
        dat = JSON.stringify(this.props.navigation.getParam('objId'))
        this.state.data = dat.replace(/^"(.*)"$/, '$1');
        console.log(this.state.data)
    }
    bookmarkCheck(){
        console.log('inside bookmark Check')
        console.log('bookmark check = ' + this.state.bookmarkCheck)
        console.log('data check = ' + this.state.data)
        console.log(this.state.bookmarkCheck.indexOf(this.state.data))
        if(this.state.bookmarkCheck.indexOf(this.state.data) > -1){
            console.log('inside if bookmark check')
            this.setState({bookmarkColor:'yellow', bookmarkSolid:true});
        }else{
            this.setState({bookmarkColor:'black', bookmarkSolid:false});
        }
    }
    pressBookmark(){
        if(!this.state.bookmarkSolid){
            this.setState({bookmarkColor:'yellow', bookmarkSolid:true});
        }else{
            this.setState({bookmarkColor:'black', bookmarkSolid:false});
        }
        var data = {
            Email : this.state.tempEmail,
            jobObj: this.state.data,
            checkBookmark: this.state.bookmarkSolid
        }
        console.log(data)
        fetch(url+'/bookmark2', {
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
            }
            else
            {
                console.log('in else')
            }
        })
    }
    pressAgree(){
        this.props.navigation.navigate('Applicant', {objId: this.state.data})
    }

    addChat(){
        console.log('addChat')
        var temp = this.state.tempEmail+':'+this.state.owner
        if(this.state.exist == 0){
            var data = {
                _id : temp,
                data:[],
            }
            fetch(url+'/insertChat', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => response.json()).then((respone) => {
                if(respone.response == 'Pass')
                {
                    console.log('add chat')
                }
            });
        }
        this.props.navigation.navigate('Contact',{employer:this.state.owner})

    }

    getAnnouncement = async() => {
        await fetch(url+'/getJobAnnoucementByObj?want='+this.state.data, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var datax = [];
                var x = JSON.parse(respone.data);
                x.forEach(element => {
                    datax.push(element);
                });
                this.setState({jobTitle:datax[0]['position'], profit:datax[0]['Compensation'], location:datax[0]['location'],
                            description:datax[0]['Description'], properties:datax[0]['Properties'], benefit:x[0]['Benefits'],
                            experience:datax[0]['experience'], owner:datax[0]['owner'], image:datax[0]['image']
                });
                this.getEmployeeProfile()
                
            }
            else
            {
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }
    getEmployeeProfile = async() => {
        var email = await AsyncStorage.getItem('email')
        this.setState({tempEmail:email})
        await fetch(url+'/Employee_Profile?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var x = JSON.parse(respone.data);
                this.setState({ bookmarkCheck:x[0]['bookmark']});
                this.bookmarkCheck()
            }
            else
            {
                console.log('inside else')
            }
        })
        /////////////////////////////////////////////////////////
        var data = {
            email: email
        }
        console.log(data)
        fetch(url+'/getChatList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('chat list')
                var x = JSON.parse(respone.data);
                console.log(x)
                var exist = 0
                var temp = this.state.owner+':'+email
                x.forEach(element => {
                    console.log(element['_id'])
                    console.log(temp)
                    if(element['_id'] == temp){
                        exist = 1
                    }
                });
                console.log(exist)
                this.setState({exist:exist})
                
            }
        });
        ////////////////////////////////////////////////////////
    }
    render(){
        return(
            <View style={{flex:1, flexDirection:'column', marginTop:32}}>
                <View style={{flex:0.1, flexDirection:'row', alignItems:'center', backgroundColor:'transparent'}}>
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
                    <View style={{ borderColor:'transparent', flexDirection:'row', height:180}}>
                        <View style={{flex:0.9, backgroundColor:'#B8B8B8', marginTop:5, opacity:10}}>
                            <TouchableOpacity >
                                <View style={{flexDirection:'row', marginTop:15, margin:5}}>
                                    <Text style={{fontSize:22}}>{this.state.jobTitle}</Text>
                                </View>
                                <Text style={{fontSize:14, margin:5}}>พื้นที่ : {this.state.location}</Text>
                                <Text style={{fontSize:14, margin:5}}>ค่าตอบแทน : {this.state.profit}</Text>
                                <Text style={{fontSize:14, margin:5}}>ประสบการณ์ : {this.state.experience}</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{flex:0.25, backgroundColor:'#B8B8B8', marginTop:5}}>
                            <TouchableOpacity style={{flex:0.2, borderRadius:10, backgroundColor:'#720DBA', margin:5, justifyContent:'center', 
                                                alignItems:'center', width:70, height:30, marginTop: 10}}
                                                onPress={() => this.addChat()}>
                                <Text style={{fontSize:12, color:'white'}}>Contact</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex:0.2, borderRadius:10, margin:5, justifyContent:'center', 
                                                alignItems:'center', width:70, height:30, marginTop: 10}}
                                                onPress={() => this.pressBookmark()}>
                                <Icon name='bookmark' type='font-awesome-5' color={this.state.bookmarkColor} size={30} solid={this.state.bookmarkSolid} />

                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{marginTop:15}}>
                        <Text style={{fontSize:22, margin:5}}>Job Description</Text>
                        <Text style={{fontSize:14, margin:5}}>{this.state.description}</Text>

                    </View>

                    <View style={{marginTop:15}}>
                        <Text style={{fontSize:22, margin:5}}>Properties</Text>
                        <Text style={{fontSize:14, margin:5}}>{this.state.description}</Text>

                    </View>

                    
                    <View style={{marginTop:15}}>
                        <Text style={{fontSize:22, margin:5}}>Benefits</Text>
                        <Text style={{fontSize:14, margin:5}}>{this.state.description}</Text>

                    </View>

                    <View style={{height:100, justifyContent:'center'}}> 
                        <TouchableOpacity style={{borderRadius:5, borderWidth:1, alignSelf:'center'}}
                            onPress={() => this.props.navigation.navigate('Watch_Profile_Employer', {owner:this.state.owner})}>
                            <Text> Employer Information </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                </View>
            </View>
        );
    }
}    