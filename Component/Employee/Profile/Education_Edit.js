import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';



export default class Education_Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: "Degree",
            university: "Stanford University",
            faculty: "Mechanical Engineering",
            year: 2020,
            grade: 3.55
        };
      }
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

                <View style={{flex:0.9, backgroundColor:'#EBEBEB', alignItems:'center'}}>
                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <Text>{this.state.level}</Text>
                    </View>

                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <Text>{this.state.university}</Text>
                    </View>

                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <Text>{this.state.faculty}</Text>
                    </View>

                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:30, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <Text>Year of Graduation</Text>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                                <TextInput style={{fontSize:18}}>{this.state.year}</TextInput>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:30, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <Text>Grade (Optional)</Text>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                                <TextInput style={{fontSize:18}}>{this.state.grade}</TextInput>
                        </View>
                    </View>
                </View>    

            </View>
        );
    }
}    