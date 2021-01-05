import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const Tab = createBottomTabNavigator();


export default class Agreement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: 'ต้องการผู้ช่วยซ่อมเรือดำน้ำ',
            profit: '2,5000',
            location: 'Si Racha, Chonburi',
        };
      }
    render(){
        return(
            <View style={{flex:1, margin:10, marginVertical:40}}>
                <View style={{flex:0.06, flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity style={{height:'100%',justifyContent:'center',marginLeft:'2%',backgroundColor:'rgba(0, 153, 255,0.1)',opacity:10,width:'20%',height:'70%',borderRadius:10,flexDirection:'row',alignItems:'center'}} onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="leftcircleo" size={24} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.75, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Agreement</Text>
                    </View>
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
                        <TouchableOpacity style={{backgroundColor:'blue', alignItems:'center', height:40, width:100, justifyContent:'center', borderRadius:5}}>
                            <Text style={{fontSize:20, color:'white'}}>Accept</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{margin:5}}>
                        <TouchableOpacity style={{backgroundColor:'blue', alignItems:'center', height:40, width:100, justifyContent:'center', borderRadius:5}}>
                            <Text style={{fontSize:20, color:'white'}}>Deny</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}    