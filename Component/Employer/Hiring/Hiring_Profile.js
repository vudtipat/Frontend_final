import * as React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,Alert, AsyncStorage,Pressable, Button} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import {url} from '../../var.js'

var dat = ""

export default class Hiring_Profile extends React.Component {
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
            setModalVisible:false,
            isModalVisible:false,
            starColor:['black','black','black','black','black'],
            starSolid:[false, false, false, false, false],
            score:1,
            modalStatus:false,
            bookmarkSolid:false,
            data:'',
            employer:[],
            bookmarkCheck:[],
            datasource:[],
            rating:'',
            countJob:'',
            allRate:[],
            EmployeeOfJob:'',
            jobObj:'',
            agreementID:'',
            interestTemp:[],
            temp:[],
            image:'',
        };
        console.log('****************************************************************************************')
        this.getData()
        this.getAnnouncement()
        this.getEmployerProfile()
        
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
        this.getEmployeeAndJob()
    }

    getData(){
        dat = JSON.stringify(this.props.navigation.getParam('email'))
        this.state.data = dat.replace(/^"(.*)"$/, '$1');
        console.log('data = '+this.state.data)
        console.log('-----------------------------------------------------------------------')
    }

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        console.log(email)
        this.setState({tempEmail:email})
        await fetch(url+'/Application_Profile?want='+this.state.data, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('inside if')
                var datax = [];
                var x = JSON.parse(respone.data);
                this.setState({datasource:x});
                console.log(this.state.datasource)
                this.setState({ email : x[0]['Email'],  tel : x[0]['Phone'],  firstName : x[0]['firstName'],  lastName : x[0]['lastName'],  age : x[0]['age'],
                                sex : x[0]['sex'], nation : x[0]['nation'],  religion : x[0]['relogion'], degree : x[0]['degree'], 
                                university : x[0]['university'],  major : x[0]['major'],  year : x[0]['year'],  grade : x[0]['grade'],  experience : x[0]['experience'],
                                location : x[0]['location'],  compensation : x[0]['Compensation'], rating : x[0]['rating'], countJob : x[0]['countJob'], 
                                allRate:x[0]['allRate'], interestTemp:x[0]['interest'], image:x[0]['image']
                 });
                 var count = 1;
                this.state.interestTemp.forEach(element => {
                    this.state.temp.push({ list:element, num:count})
                    count++
                });
                this.setState({interestTemp:this.state.temp})
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
                console.log('in get employer profile ------------------------------')
                var x = JSON.parse(respone.data);
                this.setState({employer:x});
                this.setState({ bookmarkCheck : x[0]['bookmark'], EmployeeOfJob:x[0]['EmployeeOfJob']});
                console.log('------------------------------------------------------')
                this.bookmarkCheck()
            }
            else
            {
                console.log('inside else')
            }
        })
    }

    getEmployeeAndJob(){
        console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-')
        var temp = []
        var listEmployeeJob = this.state.EmployeeOfJob
        listEmployeeJob.forEach(element => {
            console.log(element)
            var tmp = element.split('/')
            temp.push(tmp)
        });
        console.log('email = ' + this.state.data )
        temp.forEach(element => {
            console.log('element = '+element)
            console.log('element[0] = '+element[0])
            if(element[0] == this.state.data){
                console.log("jobID = " + element[1])
                this.setState({jobObj:element[1], EmployeeOfJob:element[0]+'/'+element[1]})
            }
        }),
        
        console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-')
    }

    getAgreement(email){
        var data = {
            email: this.state.email, 
            employer: email,
            jobID: this.state.jobObj,
        }
        console.log(data)
        fetch(url+'/getAgreement', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var x = JSON.parse(respone.data);
                console.log('-------------------get agreement-----------------------------')
                console.log(x)
                this.setState({agreementID:x[0]['_id']})
                console.log('สำเร็จ');

            }
            else
            {
                console.log('ไม่สำเร็จ!!');
            }
        })
        
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
    pressStar = s =>{
        if(s == 1){
            this.setState({starColor:['yellow','black','black','black','black'], starSolid:[true, false, false, false, false]});
        }if(s == 2){
            this.setState({starColor:['yellow','yellow','black','black','black'], starSolid:[true, true, false, false, false]});
        }if(s == 3){
            this.setState({starColor:['yellow','yellow','yellow','black','black'], starSolid:[true, true, true, false, false]});
        }if(s == 4){
            this.setState({starColor:['yellow','yellow','yellow','yellow','black'], starSolid:[true, true, true, true, false]});
        }if(s == 5){
            this.setState({starColor:['yellow','yellow','yellow','yellow','yellow'], starSolid:[true, true, true, true, true]});
        }
        this.state.score = s
        console.log(this.state.score)
    }

    pressFinish(){
        this.setState({modalStatus:true})
    }
    //                                         rating/employer_mail/employee_mail
    pressOK(){ //press ok after rate
        var count = parseInt(this.state.countJob) + 1
        console.log('count all job= ' + count)

        this.state.allRate.push(this.state.score)
        console.log('allRate list = '+this.state.allRate)
        var allrate = 0
        this.state.allRate.forEach(element => {
            allrate += element;
        });
        console.log('allrate sum = ' + allrate)
        var sum = allrate / count
        console.log('sum = '+ (sum).toFixed(1) )
        console.log('countJob = '+ count )
        this.setState({modalStatus:false, rating:sum, countJob:count})
        this.postRating()
        //this.props.navigation.navigate('All_Hiring')
    }

    postRating = async() => {
        var email = await AsyncStorage.getItem('email') // employer Email
        //this.getAgreement(email)

        var data = {
            email: this.state.email, 
            employer: email,
            jobID: this.state.jobObj,
        }
        console.log(data)
        await fetch(url+'/getAgreement', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var x = JSON.parse(respone.data);
                console.log('-------------------get agreement-----------------------------')
                console.log(x)
                this.setState({agreementID:x[0]['_id']})
                console.log('สำเร็จ');

            }
            else
            {
                console.log('ไม่สำเร็จ!!');
            }
        })


        var data = {
            rating: this.state.rating,
            email: this.state.email, 
            employer: email,
            countJob: this.state.countJob,
            jobID: this.state.jobObj,
            EmployeeOfJob: this.state.EmployeeOfJob,
            jobDone: true,
            agreementId:this.state.agreementID,
            allRate : this.state.score,
        }
        console.log(data)
        await fetch(url+'/finishWork', {
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
                this.props.navigation.goBack()
            }
            else
            {
                console.log('เพิ่มไม่สำเร็จ!!');
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
                    <ScrollView style={{backgroundColor:'white'}}>

                        {/* Education */}
                        <View style={{ backgroundColor:'#7400BD', borderWidth:15, borderColor:'transparent'}}>
                            <Text style={{fontSize:20, color:'white', margin:3}}>ชื่อ-นามสกุล : {this.state.firstName} {this.state.lastName}</Text>
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

                            <View >
                                <Text style={{fontSize:20, width:'85%'}}>ประสบการณ์ทำงาน</Text>
                            </View>
                            <Text style={{fontSize:14, margin: 3}}>{this.state.experience} ปี</Text>

                            
                        </View>

                        <View style={{flex:1, alignItems:'center', backgroundColor:'transparent'}}>
                            <View style={{flex:0.5, alignItems:'center', margin:10}}>
                                <TouchableOpacity style={{width:135, height:45, backgroundColor:'#152D65', borderRadius:10, justifyContent:'center'}}
                                    onPress={() => this.addChat()}>
                                    <Text style={{fontSize:16, color:'white', alignSelf:'center'}}>Contact</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{flex:1}}>
                                <Dialog
                                    visible={this.state.modalStatus}
                                    footer={
                                    <DialogFooter>
                                        <DialogButton
                                        text="CANCEL"
                                        onPress={() => {this.setState({modalStatus:false})}}
                                        />
                                        <DialogButton
                                        text="OK"
                                        onPress={() => this.pressOK()}
                                        />
                                    </DialogFooter>
                                    }
                                >
                                    <DialogContent >
                                            <Text style={{height:40,marginTop:10, fontSize:20}}>Please rate our employee :)</Text>
                                    </DialogContent>
                                    
                                    <View style={{height:50,flexDirection:'row', margin:10, marginBottom:40}}>
                                                <TouchableOpacity style={{flex:1, alignSelf:'flex-end', margin:2}}
                                                        onPress={() => this.pressStar(1)}>
                                                    <Icon name='star' type='font-awesome-5' color={this.state.starColor[0]} size={40} solid={this.state.starSolid[0]} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flex:1, alignSelf:'flex-end', margin:2}}
                                                        onPress={() => this.pressStar(2)}>
                                                    <Icon name='star' type='font-awesome-5' color={this.state.starColor[1]} size={40} solid={this.state.starSolid[1]} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flex:1, alignSelf:'flex-end', margin:2}}
                                                        onPress={() => this.pressStar(3)}>
                                                    <Icon name='star' type='font-awesome-5' color={this.state.starColor[2]} size={40} solid={this.state.starSolid[2]} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flex:1, alignSelf:'flex-end', margin:2}}
                                                        onPress={() => this.pressStar(4)}>
                                                    <Icon name='star' type='font-awesome-5' color={this.state.starColor[3]} size={40} solid={this.state.starSolid[3]} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flex:1, alignSelf:'flex-end', margin:2}}
                                                        onPress={() => this.pressStar(5)}>
                                                    <Icon name='star' type='font-awesome-5' color={this.state.starColor[4]} size={40} solid={this.state.starSolid[4]} />
                                                </TouchableOpacity>
                                    </View>
                                </Dialog>
                            </View>



                            <View style={{flex:0.5, alignItems:'center', margin:10}}>
                                <TouchableOpacity style={{width:135, height:45, backgroundColor:'#00B13F', borderRadius:10, justifyContent:'center'}}
                                    onPress={() => this.pressFinish()}>
                                    <Text style={{fontSize:16, color:'white', alignSelf:'center'}}>Finish</Text>
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
    buttonOpen: {
        backgroundColor: "#F194FF",
      },
    buttonClose: {
        backgroundColor: "#2196F3",
    }, 
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
})