import * as React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import {url} from '../../var.js'
import {image} from '../../imageurl'

var dat = ""
var objId = ""

export default class Application_Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            tel: '',
            firstName: '',
            lastName: '',
            age: '',
            sex: '',
            nation: '',
            religion: '',
            degree: '',
            interest :[{num:1, interest:'ช่างยนต์/ช่างกลโรงงาน'},
                        {num:2, interest:'ช่างซ่อมบำรุง'},
                        {num:3, interest:'ช่างอิเล็กทรอนิกส'},
                        {num:4, interest:'ช่างเทคนิค'}],
            university : '',
            major: '',
            year: '',
            grade: '',
            degree: '',
            jobTitle: '',
            location: '',
            compensation: '',
            jobType: ['ช่างซ่อม','ช่าง','ช่งเทคนิค'],
            jobTypeShow: 'ช่างซ่อม,ช่าง,ช่างเทคนิค',
            experience : 0,
            aboutMe:'xxxxxxxx xxxxxxx xxxxxx xxxxxxxxxxxxxxxxxx x xxxxxxx xxxxx xxxxxxxxxx xxxxxxx xxxxxx  xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxx x xxxxxxxxxxxx xxxxxxxx xxxxxxxxxxxxxxx xxxxxxxxxxx xxxxxxxxxxxxxxx xxxx x x x xxxx xxx',
            data:'',
            bookmarkSolid:false,
            tempEmail:'',
            datasource:[],
            bookmarkCheck:[],
            employer:[],
            objId:'',
            interestTemp:[],
            temp:[],
            image:image,
            exist:0
        };
        console.log('------------------------------START HERE--------------------------------------')
        this.getData()
        this.getAnnouncement()
        this.getEmployerProfile()
        this.getAboutMe()
        console.log('--------------------------------------------------------------------')
      }

    bookmarkCheck(){
        console.log('inside bookmark Check')
        console.log('bookmark check = ' + this.state.bookmarkCheck)
        console.log('email check = ' + this.state.data)
        console.log(this.state.bookmarkCheck.indexOf(this.state.data))
        if(this.state.bookmarkCheck.indexOf(this.state.data) > -1){
            console.log('inside if bookmark check')
            this.setState({bookmarkColor:'yellow', bookmarkSolid:true});
        }else{
            this.setState({bookmarkColor:'black', bookmarkSolid:false});
        }
    }
      

    addChat(){
        console.log('addChat')
        var temp = this.state.tempEmail+':'+this.state.data
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
        this.props.navigation.navigate('Contact',{employee:this.state.data})

    }

    pressBookmark(){
        if(!this.state.bookmarkSolid){
            this.setState({bookmarkColor:'yellow', bookmarkSolid:true});
        }else{
            this.setState({bookmarkColor:'black', bookmarkSolid:false});
        }
        var data = {
            Email : this.state.tempEmail,
            Employee_Email: this.state.email,
            checkBookmark: this.state.bookmarkSolid
        }
        console.log(data)
        fetch(url+'/bookmark', {
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
    getData(){
        dat = JSON.stringify(this.props.navigation.getParam('email'))
        objId = JSON.stringify(this.props.navigation.getParam('objId'))
        this.state.data = dat.replace(/^"(.*)"$/, '$1');
        this.state.objId = objId.replace(/^"(.*)"$/, '$1');
        console.log('data = '+this.state.data)
        console.log('-----------------------------------------------------------------------')
    }

    getAboutMe = async() => {
        var email = await AsyncStorage.getItem('email')
        var data = {
            objId: this.state.objId,
            email: this.state.data,
        }
        console.log(this.state.text)
        await fetch(url+'/getAboutMe', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('inside if')
                var x = JSON.parse(respone.data);
                this.setState({ aboutMe : x[0]['aboutMe']  });
            }
            else
            {
                console.log('inside else')
            }
        })
    }

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        this.setState({tempEmail:email})
        console.log('mail sed la')
        console.log(dat)
        await fetch(url+'/Application_Profile?want='+this.state.data, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var x = JSON.parse(respone.data);
                this.setState({datasource:x});
                this.setState({ email : x[0]['Email'],  tel : x[0]['Phone'],  firstName : x[0]['firstName'],  lastName : x[0]['lastName'],  age : x[0]['age'],
                                sex : x[0]['sex'], nation : x[0]['nation'],  religion : x[0]['relogion'], degree : x[0]['degree'], 
                                university : x[0]['university'],  major : x[0]['major'],  year : x[0]['year'],  grade : x[0]['grade'],  experience : x[0]['experience'],
                                location : x[0]['location'],  compensation : x[0]['Compensation'], interestTemp:x[0]['interest'], image: x[0]['image']
                 });
                if(this.state.image.length == 0){
                    this.setState({image:image})
                }
                var count = 1;
                this.state.interestTemp.forEach(element => {
                    this.state.temp.push({ list:element, num:count})
                    count++
                });
                this.setState({interestTemp:this.state.temp})
                ////////////////////////////////////////////////////////////////
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
                        var temp = email+':'+this.state.data
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
                //////////////////////////////////////////////////////////////////
            }
            else
            {
                console.log('inside else')
            }
        })
    }

    getEmployerProfile = async() => {
        console.log('---------------------------------getEmployerProfile--------------------------------------')
        var email = await AsyncStorage.getItem('email')
        await fetch(url+'/Employer_Profile?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var x = JSON.parse(respone.data);
                this.setState({employer:x});
                console.log("employer data = "+this.state.employer)
                this.setState({ bookmarkCheck : x[0]['bookmark'] });
                console.log('get bookmark data = ' + this.state.bookmarkCheck)
                this.bookmarkCheck()
            }
            else
            {
                console.log('inside else')
            }
        })
    }


    render(){

        return(
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:0.1}}>
                    <TouchableOpacity style={{ height:50,justifyContent:'center',marginLeft:'2%',
                                        opacity:10,width:40,borderRadius:10,flexDirection:'row',alignItems:'center', marginTop:30}} 
                                        onPress={()=>this.props.navigation.goBack()}>
                            <AntDesign name="left" size={26} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                    </TouchableOpacity> 
                </View>
                <View style={{flex:0.25, alignItems:'center', flexDirection:'row', justifyContent:'center', backgroundColor:'transparent'}}>
                    
                    <View style={{ borderRadius:60, marginTop:0, backgroundColor:'transparent', justifyContent:'center', marginLeft:'30%'}}>
                        <Image 
                            style={{width:160, height:160, margin:0, borderRadius:80}}
                            source={{
                                uri: this.state.image,
                            }}
                        />
                    </View>
                    <View style={{ alignSelf:'flex-end', marginLeft:'25%'}}>
                        <TouchableOpacity style={{flex:1, alignSelf:'flex-end', margin:20}}
                                                    onPress={() => this.pressBookmark()}>
                                    <Icon name='bookmark' type='font-awesome-5' color={this.state.bookmarkColor} size={30} solid={this.state.bookmarkSolid} />

                        </TouchableOpacity>
                    </View>
                </View>
                
                
                <View style={{flex:0.75, marginTop:10}}>
                    <ScrollView style={{backgroundColor:'white'}}>

                        {/* Education */}
                        <View style={{ backgroundColor:'#7400BD', borderWidth:15, borderColor:'transparent'}}>
                            <Text style={{fontSize:20, color:'white', margin:3}}>ชื่อ-นามสกุล : {this.state.firstName} {this.state.lastName}</Text>
                            <Text style={{fontSize:16, color:'white', margin:3}}>อายุ : {this.state.age}</Text>
                            <Text style={{fontSize:16, color:'white', margin:3}}>เพศ : {this.state.sex}</Text>
                            <Text style={{fontSize:16, color:'white', margin:3}}>ที่อยู่ : {this.state.location}</Text>
                            <Text style={{fontSize:16, color:'white', margin:3}}>ค่าตอบแทน : {this.state.compensation}</Text>
                            <Text style={{fontSize:16, color:'white', margin:3}}>ประเภทงาน : {this.state.jobTypeShow}</Text>

                        </View>

                        <View style={{marginTop:10}}/>

                        <View style={{ marginTop:10, margin:15, borderWidth:1}}>
                            <View style={{flexDirection:'row', margin:10}}>
                                <Text style={{fontSize:20}}>About me</Text>
                            </View>
                            <View style={{flexDirection:'row', marginBottom:15, marginLeft:15}}>
                                <Text style={{fontSize:16, width:'90%'}}>{this.state.aboutMe}</Text>
                            </View>
                        </View>


                        <View style={{ backgroundColor:'white', margin:15, borderColor:'transparent'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:20, width:'85%'}}>ข้อมูลการศึกษา</Text>
                            </View>
                            
                            <Text style={{fontSize:14, margin: 3}}>มหาวิทยาลัย : {this.state.university}</Text>
                            <Text style={{fontSize:14, margin: 3}}>ระดับการศึกษา : {this.state.degree}</Text>
                            <Text style={{fontSize:14, margin: 3}}>สาขา : {this.state.major}</Text>
                            <Text style={{fontSize:14, margin: 3}}>ปีที่จบ : {this.state.year}</Text>
                            <Text style={{fontSize:14, margin: 3}}>เกรดเฉลี่ย : {this.state.grade}</Text>

                            <View style={{margin: 20, borderWidth:1, backgroundColor:'gray'}}></View>

                            <View >
                                <Text style={{fontSize:20, width:'85%'}}>งานที่ต้องการ</Text>
                            </View>
                            
                                    <FlatList
                                        data={this.state.interestTemp}
                                        renderItem={({item}) => <Text style={{fontSize:14, margin:5}}>{item.num}. {item.list}</Text>}
                                        style={{marginTop:10,flex:1}}
                                    />
                            <View style={{margin: 20, borderWidth:1, backgroundColor:'gray'}}></View>

                            <View >
                                <Text style={{fontSize:20, width:'85%'}}>ประสบการณ์ทำงาน</Text>
                            </View>
                            <Text style={{fontSize:14, margin: 3}}>{this.state.experience} ปี</Text>

                            
                        </View>

                        <View style={{flex:1, flexDirection:'row', alignItems:'center', backgroundColor:'transparent'}}>
                            <View style={{flex:0.5, alignItems:'center', margin:10}}>
                                <TouchableOpacity style={{width:135, height:45, backgroundColor:'#152D65', borderRadius:10, justifyContent:'center'}}
                                    onPress={() => this.addChat()}>
                                    <Text style={{fontSize:16, color:'white', alignSelf:'center'}}>Contact</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{flex:0.5, alignItems:'center', margin:10}}>
                                <TouchableOpacity style={{width:135, height:45, backgroundColor:'#027500', borderRadius:10, justifyContent:'center'}}
                                    onPress={() => this.props.navigation.navigate('Agreement', {objId:this.state.objId, email:this.state.data})}>
                                    <Text style={{fontSize:16, color:'white', alignSelf:'center'}}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{height:50}}/>
                        


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