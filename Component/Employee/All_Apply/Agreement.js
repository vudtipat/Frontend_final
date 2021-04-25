import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {url} from '../../var.js'
import { withNavigation } from 'react-navigation';

var dat = ""
var mail = ""
var owner = ""
var obj = ""
class Agreement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:'',
            employeeEmail:'',
            employerEmail:'',
            EmployeeStatus:false,
            objId:'',

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
        dat = JSON.stringify(this.props.navigation.getParam('agreementID'))
        mail = JSON.stringify(this.props.navigation.getParam('EmployeeID'))
        obj = JSON.stringify(this.props.navigation.getParam('objID'))
        owner = JSON.stringify(this.props.navigation.getParam('EmployerID'))
        this.state.data = dat.replace(/^"(.*)"$/, '$1');
        this.state.employeeEmail = mail.replace(/^"(.*)"$/, '$1');
        this.state.objId = obj.replace(/^"(.*)"$/, '$1');
        this.state.employerEmail = owner.replace(/^"(.*)"$/, '$1');
        console.log(this.state.data)
        console.log(this.state.employeeEmail)
        console.log(this.state.objId)
        console.log(this.state.employerEmail)
    }
      
    employeeUpdateAgreement = async() => {
        var token = await AsyncStorage.getItem('token')
        this.state.EmployeeStatus = true;
        console.log('inside employeeUpdateAgreement')
        var data ={
            agreementID : this.state.data,
            EmployeeStatus : this.state.EmployeeStatus,
            objId : this.state.objId,
            employeeEmail : this.state.employeeEmail,
            employerEmail : this.state.employerEmail,
            EmployeeOfJob : this.state.employeeEmail + '/' + this.state.objId,
            mode:'Employer',
            token:token,
        }
        console.log(data)
        fetch(url+'/employeeUpdateAgreement?want='+this.state.employeeEmail, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
             body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                Alert.alert('ทำสัญญาเสร็จสิ้น');
                this.props.navigation.goBack()
            }
            else
            {
                Alert.alert('ทำสัญญาไม่สำเร็จ');
            }
        })
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
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Agreement</Text>
                    </View>
                    <View style={{flex:0.15}}/>
                </View>
                <View style={{backgroundColor:'gray',borderWidth:0.5, margin:15}}/>
                <View style={{flex:1}}>
                    <Text style={{fontSize:20, margin:5}}>แบบฟอร์มการร่วมงาน</Text>
                    <Text style={{fontSize:14, margin:5}}>แบบฟอร์มการร่วมงานฉบับนี้ เพื่อเป็นการยืนยันว่าทั้งสองฝ่ายมีการตกลงร่วมงานกันเกิดขึ้นภายใน Application แห่งนี้ และเพื่อแสดงความบริสุทธิใจของทั้งสองฝ่ายทางเราจึงได้ทำแบบฟอร์มการร่วมงานนี้ขึ้น</Text>
                
                    <Text style={{fontSize:20, margin:5}}>กฎและข้อตกลงร่วมกัน</Text>
                    <Text style={{fontSize:14, margin:5}}>	    1. เมื่อมีการโกงกันเกิดขึ้น ฝ่ายที่โดนโกงสามารถที่จะร้องขอข้อมูลของฝ่ายที่ได้ทำการโกงเพื่อใช้ในการดำเนินการทางกฏหมายได้	</Text>
                    <Text style={{fontSize:14, margin:5}}>      2. หลังจากที่ได้ทำการร่วมงานกันเสร็จสิ้น จะต้องประเมินการทำงานร่วมกันตามความเป็นจริงเพื่อเป็นการปรับปรุงคุณภาพของระบบให้สามารถแนะนำได้ดียิ่งขึ้น </Text>
                
                </View>
                <View style={{flex:0.2, alignItems:'center'}}>
                    <View style={{margin:5}}>
                        <TouchableOpacity style={{backgroundColor:'blue', alignItems:'center', height:40, width:100, justifyContent:'center', borderRadius:5}}
                            onPress={() => this.employeeUpdateAgreement()}>
                            <Text style={{fontSize:20, color:'white'}}>Accept</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{margin:5}}>
                        <TouchableOpacity style={{backgroundColor:'blue', alignItems:'center', height:40, width:100, justifyContent:'center', borderRadius:5}}
                            onPress={() => this.props.navigation.goBack()}>
                            <Text style={{fontSize:20, color:'white'}}>Deny</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}    
export default withNavigation(Agreement);