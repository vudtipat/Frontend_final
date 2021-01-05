import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';

export default class Education extends React.Component {

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{marginLeft:10,flex:0.1, justifyContent:'center', backgroundColor:'transparent', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Profile')}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Cancle</Text>
                        
                    </TouchableOpacity>

                    <View style={{flex:0.85, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Education</Text>
                    </View>

                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Profile')}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:0.9, backgroundColor:'#E0E0E0', alignItems:'center'}}>
                    <TextInput style={{height: 50, width:'95%',borderColor: 'gray' ,
                                paddingHorizontal:10, backgroundColor:'white', marginTop:10}}
                                placeholder='Education Level' placeholderTextColor='#AAAAAA' />
                    <TextInput style={{height: 50, width:'95%',borderColor: 'gray' ,
                                paddingHorizontal:10, backgroundColor:'white', marginTop:5}}
                                placeholder='Institue' placeholderTextColor='#AAAAAA' />
                    <TextInput style={{height: 50, width:'95%',borderColor: 'gray' ,
                                paddingHorizontal:10, backgroundColor:'white', marginTop:5}}
                                placeholder='Major' placeholderTextColor='#AAAAAA' />
                    <TextInput style={{height: 50, width:'95%',borderColor: 'gray' ,
                                paddingHorizontal:10, backgroundColor:'white', marginTop:30}}
                                placeholder='Year of Graduation' placeholderTextColor='#AAAAAA' />
                    <TextInput style={{height: 50, width:'95%',borderColor: 'gray' ,
                                paddingHorizontal:10, backgroundColor:'white', marginTop:30}}
                                placeholder='Grade (Optional)' placeholderTextColor='#AAAAAA' />
                </View>    
 
            </View>
        );
    }
}    