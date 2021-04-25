import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class Education extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: "",
            university: " ",
            faculty: " ",
            year: '',
            grade: '',
            items: [
                {
                    label: '1999',
                    value: '1',
                },
                {
                    label: '2000',
                    value: '2',
                },
                {
                    label: '2001',
                    value: '3',
                },
                {
                    label: '2002',
                    value: '4',
                },
                {
                    label: '2003',
                    value: '5',
                },
                {
                    label: '2004',
                    value: '6',
                },
            ],
            levels: [
                {
                    label: 'ปริญญาเอก',
                    value: '1',
                },
                {
                    label: 'ปริญญาโท',
                    value: '2',
                },
                {
                    label: 'ปริญญาตรี',
                    value: '3',
                },
                {
                    label: 'ปวช.',
                    value: '4',
                },
                {
                    label: 'ปวศ.',
                    value: '5',
                },
                {
                    label: 'กศน.',
                    value: '6',
                },
            ],
        };
      }
    render(){
        return(
            <View style={{flex:1, marginTop:32}}>
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
                    <View style={{ alignItems:'flex-start', height:50, justifyContent:'center', width:'95%', backgroundColor:'white', margin:10}}>
                            <View style={{margin:10}}>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'ระดับการศึกษา',
                                    value: null,
                                    fontSize: 28,
                                }}
                                    items={this.state.levels}
                                    onValueChange={(value) => {this.setState({ level: value});
                                }}
                                style={{ fontSize: 28,paddingTop: 13,paddingHorizontal: 10,paddingBottom: 12,borderWidth: 1,
                                        borderColor: 'gray', borderRadius: 4 ,color: 'black', alignItem:'flex-end'}}
                                value={this.state.level}

                            />
                            </View>
                        </View>
                    <TextInput style={{height: 50, width:'95%',borderColor: 'gray' ,
                                paddingHorizontal:10, backgroundColor:'white', marginTop:5}}
                                placeholder='Institue' placeholderTextColor='#AAAAAA' />
                    <TextInput style={{height: 50, width:'95%',borderColor: 'gray' ,
                                paddingHorizontal:10, backgroundColor:'white', marginTop:5}}
                                placeholder='Major' placeholderTextColor='#AAAAAA' />
                                
                    <View style={{ alignItems:'flex-start', height:50, justifyContent:'center', width:'95%', backgroundColor:'white', margin:10}}>
                            <View style={{margin:10}}>
                                <RNPickerSelect
                                    placeholder={{
                                        label: 'ปีที่จบการศึกษา',
                                        value: null,
                                        fontSize: 28,
                                    }}
                                        items={this.state.items}
                                        onValueChange={(value) => {this.setState({ year: value});
                                    }}
                                    style={{ fontSize: 28,paddingTop: 13,paddingHorizontal: 10,paddingBottom: 12,borderWidth: 1,
                                            borderColor: 'gray', borderRadius: 4 ,color: 'black', alignItem:'flex-end'}}
                                    value={this.state.year}

                                />
                            </View>
                    </View>

                    <TextInput style={{height: 50, width:'95%',borderColor: 'gray' ,
                                paddingHorizontal:10, backgroundColor:'white', marginTop:30}}
                                placeholder='Grade (Optional)' placeholderTextColor='#AAAAAA' />
                </View>    
 
            </View>
        );
    }
}    