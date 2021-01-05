import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'

export default class Job_Annoucement_Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: '',
            location: '',
            workingAge:'',
            Description:'',
            jobType:'',
            Compensation:'',
            Properties:'',
            Benefits:'',
            
        };
      }
    render(){
        return(
            <View style={{flex:1, margin:0}}>

                <View style={{flex:0.1, justifyContent:'center', backgroundColor:'transparent', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.goBack()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:15}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Cancle</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.7, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:20, color:'#720DBA', backgroundColor:'transparent'}}>Create Annoucement</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.goBack()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:1, backgroundColor:'white'}}>
                    <ScrollView>
                    <View style={{flex:0.9, backgroundColor:'white', alignItems:'center'}}>
                        <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>ตำแหน่งงาน</Text>
                            <View style={{flexDirection:'row', height:50, marginTop:10}}>
                                <TextInput style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}} />
                            </View>
                        
                        <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>สถานที่ทำงาน</Text>
                            <View style={{flexDirection:'row', height:50, marginTop:10}}>
                                <TextInput style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}} />
                            </View>
                        <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>อายุงาน</Text>
                            <View style={{flexDirection:'row', height:50, marginTop:10}}>
                                <TextInput style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}} />
                            </View>
                        <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>รายละเอียดงาน</Text>
                            <View style={{flexDirection:'row', height:150, marginTop:10}}>
                                <TextInput
                                    style={{flex:1, height: 150, width:'95%',borderColor: 'gray',borderRadius:10 ,
                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                    value={this.state.contact}
                                    onChangeText={text=>this.setState({contact:text})}
                                    multiline={true}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                        <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>ประเภทงาน</Text>
                            <View style={{flexDirection:'row', height:50, marginTop:10}}>
                                <TextInput style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}} />
                            </View>
                        <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>ค่าตอบแทน</Text>
                            <View style={{flexDirection:'row', height:50, marginTop:10}}>
                                <TextInput style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}} />
                            </View>
                        <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>คุณสมบัติ</Text>
                            <View style={{flexDirection:'row', height:150, marginTop:10}}>
                                <TextInput
                                    style={{flex:1, height: 150, width:'95%',borderColor: 'gray',borderRadius:10 ,
                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                    value={this.state.contact}
                                    onChangeText={text=>this.setState({contact:text})}
                                    multiline={true}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                        <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>สวัสดิการ</Text>
                            <View style={{flexDirection:'row', height:150, marginTop:10}}>
                                <TextInput
                                    style={{flex:1, height: 150, width:'95%',borderColor: 'gray',borderRadius:10 ,
                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                    value={this.state.contact}
                                    onChangeText={text=>this.setState({contact:text})}
                                    multiline={true}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                        <View style={{height:150, backgroundColor:'white'}} />
                    </View>
                    </ScrollView>
                </View>
                
            </View>
        );
    }
}    