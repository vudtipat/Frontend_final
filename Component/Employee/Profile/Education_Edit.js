import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import {url} from '../../var.js'
//Trouble
export default class Education_Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            degree: "",
            university: " ",
            major: " ",
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
                    value: 'ปริญญาเอก',
                },
                {
                    label: 'ปริญญาโท',
                    value: 'ปริญญาโท',
                },
                {
                    label: 'ปริญญาตรี',
                    value: 'ปริญญาตรี',
                },
                {
                    label: 'ปวช.',
                    value: 'ปวช.',
                },
                {
                    label: 'ปวศ.',
                    value: 'ปวศ.',
                },
                {
                    label: 'กศน.',
                    value: 'กศน.',
                },
            ],
            tempDegree:'',
            tempYear:'',
            tempUniversity:'',
            tempMajor:'',
            tempGrade:'',
        };
        this.getAnnouncement()
      }

    onSave = async() => {
        var datap = await AsyncStorage.getItem('data');
        datap = JSON.parse(datap);
        var data = {
                Email: this.state.email,
                degree: this.state.degree,
                university: this.state.university,
                major: this.state.major,
                year: this.state.year,
                grade: this.state.grade,

        }
        console.log(data)
        await fetch(url+'/Education_Edit', {
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
                this.setState({ contactTemp : this.state.contact });
                this.props.navigation.goBack()
            }
            else
            {
                console.log('in else')
            }
        })
        
    }

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        console.log(email)
        this.setState({email:email})
        console.log('mail sed la')
        await fetch(url+'/Employee_Profile?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('inside if')
                var datax = [];
                var x = JSON.parse(respone.data);
                this.setState({datasource:x});
                console.log(this.state.datasource)
                this.setState({ 
                                tempDegree:x[0]['degree'], tempYear:x[0]['year'], grade:x[0]['grade'], 
                                university:x[0]['university'], major:x[0]['major'], tempGrade:x[0]['grade'], tempMajor:x[0]['major'],
                                tempUniversity:x[0]['university'], year:x[0]['year'], degree:x[0]['degree']
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
                        onPress={()=> this.onSave() }
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:0.9, backgroundColor:'#EBEBEB', alignItems:'center'}}>
                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center', justifyContent:'center'}}>
                        <View style={{flex:1, alignItems:'flex-start', height:'100%', justifyContent:'center', margin:10}}>
                            <Picker
                                selectedValue={this.state.degree}
                                
                                style={{height: 50, width:'100%'}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({degree: itemValue})
                                }>
                                <Picker.Item label={this.state.tempDegree} value="placeholder" />
                                <Picker.Item label="ปริญญาเอก" value="ปริญญาเอก" />
                                <Picker.Item label="ปริญญาโท" value="ปริญญาโท" />
                                <Picker.Item label="ปริญญาตรี" value="ปริญญาตรี" />
                                <Picker.Item label="ม.6" value="ม.6" />
                                <Picker.Item label="ม.3" value="ม.3" />
                                <Picker.Item label="ปวช." value="ปวช." />
                                <Picker.Item label="ปวศ." value="ปวศ." />
                                <Picker.Item label="กศน." value="กศน." />
                            </Picker>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <TextInput style={{ margin:10}}
                                placeholder={this.state.tempUniversity} 
                                onChangeText={text => this.setState({university:text})}
                                placeholderTextColor='#AAAAAA' />
                    </View>

                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <TextInput style={{ margin:10}}
                                placeholder={this.state.tempMajor} 
                                onChangeText={text => this.setState({major:text})}
                                placeholderTextColor='#AAAAAA' />
                    </View>

                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:30, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <Text>Year of Graduation</Text>
                        <View style={{flex:0.4}}/>
                        <View style={{flex:1, height:'100%'}}>
                            <Picker
                                selectedValue={this.state.year}
                                
                                style={{height: 50, width:'100%'}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({year: itemValue})
                                }>
                                <Picker.Item label={this.state.tempYear} value="placeholder" />
                                <Picker.Item label="1990" value="1990" />
                                <Picker.Item label="1991" value="1991" />
                                <Picker.Item label="1992" value="1992" />
                                <Picker.Item label="1993" value="1993" />
                                <Picker.Item label="1994" value="1994" />
                                <Picker.Item label="1995" value="1995" />
                                <Picker.Item label="1996" value="1996" />
                                <Picker.Item label="1997" value="1997" />
                                <Picker.Item label="1998" value="1998" />
                                <Picker.Item label="1999" value="1999" />
                                <Picker.Item label="2000" value="2000" />
                                <Picker.Item label="2001" value="2001" />
                                <Picker.Item label="2002" value="2002" />
                                <Picker.Item label="2003" value="2003" />
                                <Picker.Item label="2004" value="2004" />
                                <Picker.Item label="2005" value="2005" />
                                <Picker.Item label="2006" value="2006" />
                                <Picker.Item label="2007" value="2007" />
                                <Picker.Item label="2008" value="2008" />
                                <Picker.Item label="2009" value="2009" />
                                <Picker.Item label="2010" value="2010" />
                                <Picker.Item label="2011" value="2011" />
                                <Picker.Item label="2012" value="2012" />
                                <Picker.Item label="2013" value="2013" />
                                <Picker.Item label="2014" value="2014" />
                                <Picker.Item label="2015" value="2015" />
                                <Picker.Item label="2016" value="2016" />
                                <Picker.Item label="2017" value="2017" />
                                <Picker.Item label="2018" value="2018" />
                                <Picker.Item label="2019" value="2019" />
                                <Picker.Item label="2020" value="2020" />
                                <Picker.Item label="2021" value="2021" />
                                <Picker.Item label="2022" value="2022" />
                                <Picker.Item label="2023" value="2023" />
                                <Picker.Item label="2024" value="2024" />
                                <Picker.Item label="2025" value="2025" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', backgroundColor:'white', height:50, marginTop:30, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center'}}>
                        <Text>Grade (Optional)</Text>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                                <TextInput style={{fontSize:16}}
                                onChangeText={text => this.setState({grade:text})}
                                >{this.state.tempGrade}</TextInput>
                        </View>
                    </View>
                </View>    

            </View>
        );
    }
}    