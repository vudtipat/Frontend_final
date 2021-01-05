import * as React from 'react';
import { StyleSheet, TouchableOpacity, View ,Text,TextInput, Picker} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 45,
    },
  });

export default class Forgot_Password extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            Question:'0',
            Answer:'',
            ID:'',
            Email:''
        }
    }

    onChangeQuesTion = (Text)=>{
        this.setState({Question:Text});
    }

    render(){
        return(
            <ScrollView>
            <View style={{flex:1, backgroundColor:'#ffffff'}}>
                <View style={{flex:0.12, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection:'row',
                             alignItems:'center', marginTop:20, backgroundColor:'transparent', marginBottom:20, height:80}}>
                    <TouchableOpacity style={{flex:0.1, height:'100%',justifyContent:'center',marginLeft:'2%',backgroundColor:'transparent',
                                    opacity:10,width:'20%',height:'70%',borderRadius:10,flexDirection:'row',alignItems:'center'}} 
                                    onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="left" size={26} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                    </TouchableOpacity> 

                    <View style={{flex:0.85, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA'}}>Forgot Password</Text>
                    </View>
                </View>
                
                <View style={{flex:0.8, margin:5, backgroundColor:'transparent', flexDirection:'column', alignItems:'center'}}>
                    <Text style={{fontSize:20, color:'black', alignSelf:'flex-start', marginLeft:'5%', margin:10}}>E-mail</Text>
                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="E-mail" placeholderTextColor='#AAAAAA' />

                    <Text style={{fontSize:20, color:'black', alignSelf:'flex-start', marginLeft:'5%', margin:10}}>ID card number</Text>
                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="ID card number" placeholderTextColor='#AAAAAA' />

                    <Text style={{fontSize:20, color:'black', alignSelf:'flex-start', marginLeft:'5%', margin:10}}>Your Question</Text>
                    
                    <View style={{height:70, width: '100%', backgroundColor:'transparent', margin:10}}>
                        <TouchableOpacity style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', alignSelf:'center'}}>
                        
                        <Picker
                            
                            selectedValue={this.state.Question}
                            style={{ height: 50, width: '105%' }}
                            onValueChange={(itemValue, itemIndex) => this.onChangeQuesTion(itemValue)}
                        >
                            <Picker.Item label="สถานที่เกิดของคุณ" value="0" />
                            <Picker.Item label="เพื่อนสนิทของคุณ" value="1" />
                            <Picker.Item label="เพลงโปรดในดวงใจคุณ" value="2" />
                            <Picker.Item label="สถานที่ที่คุณชอบ" value="3" />
                        </Picker>
                        </TouchableOpacity>
                    </View>

                    <Text style={{fontSize:20, color:'black', alignSelf:'flex-start', marginLeft:'5%'}}>Your Answer</Text>
                    <TextInput style={{height: 50, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                placeholder="Your Answer" placeholderTextColor='#AAAAAA' />
                </View>
                
                
                <TouchableOpacity style={{height: 50, width:'90%',borderRadius:10 , alignSelf:'center',
                                paddingHorizontal:10, backgroundColor:'#720DBA', margin:10, flexDirection:'column', justifyContent:'center'}}
                                onPress={() => console.log(this.state.Question)}>
                        <Text style={{fontSize:20, color:'white',alignSelf:'center', backgroundColor:'transparent'}}>Reset</Text>
                </TouchableOpacity>

            </View>
            </ScrollView>
        );
    }
}