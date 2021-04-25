import * as React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 
import {url} from '../../var.js'

var dat = ""

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
            interest :[],
            university : '',
            major: '',
            year: '',
            grade: '',
            degree: '',
            jobTitle: '',
            location: '',
            profit: '',
            jobType: '',
            jobTypeShow: '',
            experience : 0,
            aboutMe:'xxxxxxxx xxxxxxx xxxxxx xxxxxxxxxxxxxxxxxx x xxxxxxx xxxxx xxxxxxxxxx xxxxxxx xxxxxx  xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxx x xxxxxxxxxxxx xxxxxxxx xxxxxxxxxxxxxxx xxxxxxxxxxx xxxxxxxxxxxxxxx xxxx x x x xxxx xxx',
            data:'',
            datasource:[],
            image:''

        };
        this.getData()
        this.getAnnouncement()
        this.getProfile()
      }
    
    getData(){
        dat = JSON.stringify(this.props.navigation.getParam('objId'))
        this.state.data = dat.replace(/^"(.*)"$/, '$1');
        console.log(this.state.data)
    }

    getAnnouncement = async() => {
        console.log('mail sed la')
        await fetch(url+'/Annoucement_Profle?want='+this.state.data, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('inside if')
                var datax = [];
                var x = JSON.parse(respone.data);
                this.setState({datasource:x});
                //console.log(this.state.datasource)
                this.setState({ jobTitle:x[0]['job'], profit:x[0]['Compensation'], location:x[0]['location'], jobTypeShow:x[0]['type'],
                                aboutMe:x[0]['aboutMe'], jobType:x[0]['jobType'], jobTypeShow:x[0]['jobType']
                            });
                            console.log(this.state.jobTypeShow)
            }
            else
            {
                console.log('inside else')
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }
    getProfile = async() => {
        var email = await AsyncStorage.getItem('email')
        await fetch(url+'/Employee_Profile?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('inside if')
                var datax = [];
                var x = JSON.parse(respone.data);
                this.setState({datasource:x});
                //console.log(this.state.datasource)
                this.setState({ firstName: x[0]['firstName'], lastName: x[0]['lastName'], tel: x[0]['Phone'] , email: x[0]['Email'], age:x[0]['age'], sex:x[0]['sex'],
                                nation: x[0]['nation'], religion:x[0]['religion'], degree:x[0]['degree'], year:x[0]['year'], grade:x[0]['grade'], experience:x[0]['experience'],
                                Compensation:x[0]['Compensation'], university:x[0]['university'], major:x[0]['major'], degree:x[0]['degree'],
                                interest:x[0]['interest'], image:x[0]['image']
                            });
            }
            else
            {
                console.log('inside else')
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }

    render(){

        return(
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:0.05, flexDirection:'row', alignItems:'center', backgroundColor:'white'}}>
                    <TouchableOpacity style={{height:'100%',justifyContent:'center',marginLeft:'2%', width:'20%',height:'70%',
                                    borderRadius:10, flexDirection:'row',alignItems:'center'}} 
                                    onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="leftcircleo" size={24} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flex:0.25, backgroundColor:'transparent', alignItems:'center', justifyContent:'center'}}>
                <View style={{ borderRadius:60, marginTop:0, backgroundColor:'transparent', justifyContent:'center', marginLeft:'0%'}}>
                        <Image 
                            style={{width:160, height:160, margin:0, borderRadius:80}}
                            source={{
                                uri: this.state.image,
                            }}
                        />
                    </View>
                </View>

                <View style={{flex:0.75, marginTop:10}}>
                    <ScrollView>

                        {/* Education */}
                        <View style={{ backgroundColor:'#7400BD', borderWidth:15, borderColor:'transparent'}}>
                            
                            <Text style={{fontSize:20, color:'white', margin:3}}>{this.state.jobTitle}</Text>
                            <Text style={{fontSize:18, color:'white', margin:3}}>ชื่อ-นามสกุล : {this.state.firstName} {this.state.lastName}</Text>
                            <Text style={{fontSize:14, color:'white', margin:3}}>อายุ : {this.state.age}</Text>
                            <Text style={{fontSize:14, color:'white', margin:3}}>เพศ : {this.state.sex}</Text>
                            <Text style={{fontSize:14, color:'white', margin:3}}>พื้นที่ที่ต้องการ : {this.state.location}</Text>
                            <Text style={{fontSize:14, color:'white', margin:3}}>ค่าตอบแทน : {this.state.profit}</Text>
                            <Text style={{fontSize:14, color:'white', margin:3}}>ประเภทงาน : {this.state.jobTypeShow}</Text>

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

                        <View style={{ backgroundColor:'white', borderWidth:15, borderColor:'transparent'}}>
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
                            
                            <Text style={{fontSize:14, margin: 3}}>1. {this.state.interest[0]}</Text>
                            <Text style={{fontSize:14, margin: 3}}>2. {this.state.interest[1]}</Text>
                            <Text style={{fontSize:14, margin: 3}}>3. {this.state.interest[2]}</Text>
                            <Text style={{fontSize:14, margin: 3}}>4. {this.state.interest[3]}</Text>

                            <View style={{margin: 20, borderWidth:1, backgroundColor:'gray'}}></View>

                            <View >
                                <Text style={{fontSize:20, width:'85%'}}>ประสบการณ์ทำงาน</Text>
                            </View>
                            <Text style={{fontSize:14, margin: 3}}>{this.state.experience} ปี</Text>

                            
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