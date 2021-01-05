import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'


export default class Interesting_Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listInteereesting:["one", "", "", ""]
        };
      }
    render(){
        return(
            <View style={{flex:1}}>

                <View style={{flex:0.1, justifyContent:'center', backgroundColor:'transparent', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Profile')}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Cancle</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.85, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Interesting</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Profile')}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flex:0.9, backgroundColor:'#E0E0E0', alignItems:'center'}}>
                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <TextInput style={{fontSize:18}}
                                    placeholder="1.Interesting">{this.state.listInteereesting[0]}</TextInput>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <TextInput style={{fontSize:18}}
                                    placeholder="2.Interesting">{this.state.listInteereesting[1]}</TextInput>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <TextInput style={{fontSize:18}}
                                    placeholder="3.Interesting">{this.state.listInteereesting[2]}</TextInput>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <TextInput style={{fontSize:18}}
                                    placeholder="4.Interesting">{this.state.listInteereesting[3]}</TextInput>
                    </View>
                </View>     

            </View>
        );
    }
}    