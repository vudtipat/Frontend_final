import * as React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import {url} from '../../var.js'
import {image} from '../../imageurl'
var dat = ""

export default class Watch_Profile_Employee extends React.Component {
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
            interest :[],
            university : '',
            major: '',
            year: '',
            grade:'',
            experience:'',
            location:'',
            Compensation:'',
            degree:'',
            interestTemp:[],
            temp:[],
            img:image,
            data:'',
        };
        this.getData()
        this.getAnnouncement()
      }
    
    getData(){
        dat = JSON.stringify(this.props.navigation.getParam('owner'))
        this.state.data = dat.replace(/^"(.*)"$/, '$1');
        console.log(this.state.data)
    }

    getAnnouncement = async() => {
        await fetch(url+'/Employee_Profile?want='+this.state.data, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var datax = [];
                var x = JSON.parse(respone.data);
                x.forEach(element => {
                    datax.push(element);
                });
                this.setState({firstName: x[0]['firstName'], lastName: x[0]['lastName'], tel: x[0]['Phone'] , email: x[0]['Email'], age:x[0]['age'], sex:x[0]['sex'],
                                nation: x[0]['nation'], religion:x[0]['religion'], degree:x[0]['degree'], year:x[0]['year'], grade:x[0]['grade'], experience:x[0]['experience'],
                                location:x[0]['location'], Compensation:x[0]['Compensation'], university:x[0]['university'], major:x[0]['major'], degree:x[0]['degree'],
                                interestTemp:x[0]['interest'], img:x[0]['image']
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
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }
    render(){
        return(
            <View style={{flex:1, flexDirection:'column'}}>
               <View style={{flex:0.05, alignItems:'flex-start', backgroundColor:'white', flexDirection:'row'}}>
                    <View style={{flex:0.2}}>
                        <TouchableOpacity style={{flex:1,justifyContent:'center',marginLeft:'2%',backgroundColor:'transparent',
                                        width:'50%',height:'50%',borderRadius:10,flexDirection:'row',alignItems:'center'}} 
                                        onPress={()=>this.props.navigation.goBack()}>
                            <AntDesign name="left" size={26} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                        </TouchableOpacity> 
                    </View>

                    <View style={{flex:0.7}}/>

                </View>
                
                <View style={{flex:0.3, backgroundColor:'white', alignItems:'center'}}>
                    <View style={{ borderRadius:60}}>
                        <Image 
                            style={{width:140, height:140, margin:5, borderRadius:75}}
                            source={{
                                uri: this.state.img,
                              }}
                        />
                        
                </View>
                <Text style={{fontSize:22, margin:0}}> {this.state.firstName}  {this.state.lastName} </Text>
                    <Text style={{fontSize:16 , margin:2}}> {this.state.email} </Text>
                    <Text style={{fontSize:14 , margin:2}}> {this.state.tel} </Text>
                </View>



                <View style={{flex:0.65, marginTop:10}}>
                    <ScrollView>

                        <View style={{ backgroundColor:'white', borderWidth:15, borderColor:'transparent'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image
                                    source={require('../../image/book.png')}
                                />
                                <Text style={{fontSize:20,}}> Education </Text>
                                <View style={{flex:1,alignItems:'flex-end'}}>

                                </View>
                            </View>
                            <View style={styles.spaceView}/>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:0.9}}>
                                    <Text style={{fontSize:18, fontWeight:'bold', margin:3}}>{this.state.university}</Text>
                                    <Text style={{fontSize:18, margin:3}}>{this.state.degree}</Text>
                                    <Text style={{fontSize:16, margin:3}}>Graduated year : {this.state.year}</Text>
                                    <Text style={{fontSize:16, margin:3}}>Major : {this.state.major}</Text>
                                    <Text style={{fontSize:16, margin:3}}>GPA : {this.state.grade}</Text>
                                </View>
                                
                            </View>
                        </View>

                        <View style={{marginTop:10}}/>

                        <View style={{ backgroundColor:'white', borderWidth:15, borderColor:'transparent'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image
                                    style={{height:35, width:35}}
                                    source={require('../../image/share.png')}
                                />
                                <Text style={{fontSize:20,}}> Interesting </Text>
                            </View>
                            <View style={styles.spaceView}/>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:0.7}}>

                                    <FlatList
                                        data={this.state.interestTemp}
                                        renderItem={({item}) => <Text style={{fontSize:14, margin:5}}>{item.num}. {item.list}</Text>}
                                        style={{marginTop:10,flex:1}}
                                    />

                                </View>
 
                            </View>
                        </View>
                        
                        <View style={{marginTop:10}}/>

                        <View style={{ backgroundColor:'white', borderWidth:15, borderColor:'transparent'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image
                                    style={{height:35, width:35}}
                                    source={require('../../image/status.png')}
                                />
                                <Text style={{fontSize:20,}}> Status </Text>
                            </View>
                            <View style={styles.spaceView}/>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                    
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:16}}>Age : </Text>
                                        <Text style={styles.fontStatus}> {this.state.age} </Text>
                                    </View> 
                                    <View style={styles.statusLine}/>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:16}}>Sex :</Text>
                                        <Text style={styles.fontStatus}> {this.state.sex} </Text>
                                    </View>
                                    <View style={styles.statusLine}/>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:16}}>Nationality : </Text>
                                        <Text style={styles.fontStatus}> {this.state.nation} </Text>
                                    </View>
                                    <View style={styles.statusLine}/>
                                    <View style={{flexDirection:'row'}}>  
                                        <Text style={{fontSize:16}}>Religion : </Text>
                                        <Text style={styles.fontStatus}> {this.state.religion} </Text>
                                    </View>
                                    <View style={styles.statusLine}/>

                                </View>
                
                            </View>
                        </View>

                        <View style={{height:50, backgroundColor:'white'}}/>

                    </ScrollView>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    statusLine : {
        borderWidth:0.5,
        borderColor:'#B2B3B3', 
        width:'95%', 
        alignSelf:'center', 
        margin:10
    },
    fontStatus : {
        fontSize:16, 
        fontWeight:'bold'
    },
    purpleBtn : {
        backgroundColor:'#720DBA', 
        borderRadius:15, 
        height:30, 
        justifyContent:'center'
    },
    spaceView : {
        borderWidth:1, 
        borderColor:'gray', 
        width:'90%', 
        alignSelf:'center', 
        margin:20
    }
})