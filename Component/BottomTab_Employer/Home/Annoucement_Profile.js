import * as React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'
import {url} from '../../var.js'


var dat = ""
var title = ""

export default class Annoucement_Profile extends React.Component {
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
            jobTitle: '',
            location: '',
            compensation: '',
            jobType: ['ช่างซ่อม','ช่าง','ช่งเทคนิค'],
            jobTypeShow: 'ช่างซ่อม,ช่าง,ช่างเทคนิค',
            experience : 0,
            bookmarkColor:'black',
            bookmarkSolid:false,
            score:0,
            data:'',
            employer:[],
            bookmarkCheck:[],
            datasource:[],
            tempEmail:'',
            interestTemp:[],
            temp:[],
            image:''
            
        };
        this.getData()
        this.getEmployerProfile()
        this.getEmployeeProfile()
    }
    
    getData(){
        dat = JSON.stringify(this.props.navigation.getParam('email'))
        this.state.data = dat.replace(/^"(.*)"$/, '$1');
        console.log('data = '+this.state.data)
        console.log('-----------------------------------------------------------------------')
    }
    bookmarkCheck(){
        console.log('inside bookmark Check')
        console.log('bookmark check = ' + this.state.bookmarkCheck)
        console.log('email check = ' + this.state.data)
        console.log(this.state.bookmarkCheck.indexOf(this.state.data))
        if(this.state.bookmarkCheck.indexOf(this.state.data) > -1){
            console.log('inside if bookmark check')
            this.setState({bookmarkColor:'yellow', bookmarkSolid:true});
        }
    }
    addChat(){
        console.log('addChat')
        /*
        var temp = this.state.owner+':'+this.state.tempEmail
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
        }*/
        this.props.navigation.navigate('Contact',{employer : this.state.data,name: this.state.firstName + ' '+this.state.lastName})
    
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

    getEmployeeProfile = async() => {
        var email = await AsyncStorage.getItem('email')
        this.setState({tempEmail:email})
        console.log('---------------------------------getEmployee Profile--------------------------------------')
        await fetch(url+'/Employee_Profile?want='+this.state.data, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var x = JSON.parse(respone.data);
                this.setState({employer:x});
                this.setState({ email : x[0]['Email'],  tel : x[0]['Phone'],  firstName : x[0]['firstName'],  lastName : x[0]['lastName'],  age : x[0]['age'],
                                sex : x[0]['sex'], nation : x[0]['nation'],  religion : x[0]['relogion'], degree : x[0]['degree'], 
                                university : x[0]['university'],  major : x[0]['major'],  year : x[0]['year'],  grade : x[0]['grade'],  experience : x[0]['experience'],
                                location : x[0]['location'],  compensation : x[0]['Compensation'], interestTemp:x[0]['interest'], image:x[0]['image']
                });
                var count = 1;
                this.state.interestTemp.forEach(element => {
                    this.state.temp.push({ list:element, num:count})
                    count++
                });
                this.setState({interestTemp:this.state.temp})
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
                    <TouchableOpacity style={{ height:50,justifyContent:'center',marginLeft:'2%',backgroundColor:'transparent',
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
                    <ScrollView>

                        {/* Education */}
                        <View style={{ backgroundColor:'#7400BD', borderWidth:15, borderColor:'transparent'}}>
                            
                            <Text style={{fontSize:18, color:'white', margin:3}}>ชื่อ-นามสกุล : {this.state.firstName} {this.state.lastName}</Text>
                            <Text style={{fontSize:16, color:'white', margin:3}}>อายุ : {this.state.age}</Text>
                            <Text style={{fontSize:16, color:'white', margin:3}}>เพศ : {this.state.sex}</Text>
                            <Text style={{fontSize:16, color:'white', margin:3}}>พื้นที่ที่ต้องการ : {this.state.location}</Text>
                            <Text style={{fontSize:16, color:'white', margin:3}}>ค่าตอบแทน : {this.state.profit}</Text>
                            <Text style={{fontSize:16, color:'white', margin:3}}>ประเภทงาน : {this.state.jobTypeShow}</Text>

                        </View>

                        <View style={{marginTop:10}}/>

                        <View style={{ backgroundColor:'white', borderWidth:15, borderColor:'transparent'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:20, width:'85%'}}>ข้อมูลการศึกษา</Text>
                            </View>
                            
                            <Text style={{fontSize:14, margin: 3}}>มหาวิทยาลัย : {this.state.university}</Text>
                            <Text style={{fontSize:14, margin: 3}}>ระดับการศึกษา : {this.state.degree}</Text>
                            <Text style={{fontSize:14, margin: 3}}>สาขา : {this.state.major}</Text>
                            <Text style={{fontSize:14, margin: 3}}>ปีที่จบ : {this.state.year}</Text>
                            <Text style={{fontSize:14, margin: 3}}>เกรดเฉลี่ย : {this.state.gpa}</Text>

                            <View style={{margin: 20, borderWidth:1, backgroundColor:'gray'}}></View>

                            <View >
                                <Text style={{fontSize:20, width:'85%'}}>งานที่ต้องการ</Text>
                            </View>
                            
                            <FlatList
                                data={this.state.interestTemp}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => <Text style={{fontSize:14, margin:5}}>{item.num}. {item.list}</Text>
                                    }
                                style={{marginTop:10,flex:1}}
                            />

                            <View style={{margin: 20, borderWidth:1, backgroundColor:'gray'}}></View>

                            <View style={{flex:0.5}}>
                                <Text style={{fontSize:20, width:'85%'}}>ประสบการณ์ทำงาน</Text>
                                <Text style={{fontSize:14, margin: 3}}>{this.state.experience} ปี</Text>
                            </View>
                           

                            <View style={{flex:0.5, alignItems:'center', marginTop:30}}>
                                <TouchableOpacity style={{width:135, height:45, backgroundColor:'#152D65', borderRadius:10, justifyContent:'center'}}
                                    onPress={() => this.addChat()}>
                                    <Text style={{fontSize:16, color:'white', alignSelf:'center'}}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>

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