import * as React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();


export default class Annoucement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'email@example.com',
            tel: '+66 0999493360',
            firstName: 'FirstName',
            lastName: 'LastName',
            age: '25',
            sex: 'Male',
            nation: 'Thailand',
            religion: 'Buddhist',
            degree: 'Bachelor Degree',
            interest :[{1:'ช่างยนต์/ช่างกลโรงงาน'},
                        {2:'ช่างซ่อมบำรุง'},
                        {3:'ช่างอิเล็กทรอนิกส'},
                        {4:'ช่างเทคนิค'}],
            university : 'Stanford University',
            major: 'Mechanical Engineering',
            year: '2021',
        };
      }

    render(){
        return(
            <View style={{flex:1, marginVertical:40, flexDirection:'column'}}>
                <View style={{flex:0.05, alignItems:'flex-start', position:'absolute', marginLeft:10}}>
                    <TouchableOpacity style={{flex:1, backgroundColor:'#0099FF', justifyContent:'center', borderRadius:20,height:25, width:50}}>
                        <Text style={{fontSize:12, color:'white', alignSelf:'center'}}>Save</Text>
                    </TouchableOpacity>
                    
                </View>
                
                <View style={{flex:0.35, backgroundColor:'white', marginTop:25, alignItems:'center'}}>
                    <View style={{ borderRadius:60}}>
                        <Image 
                            style={{width:120, height:120, margin:5, borderRadius:60}}
                            source={require("./image/person.png")}
                        />
                        <TouchableOpacity style={{width:40, height:40, borderRadius:20, position:'absolute',alignSelf:'flex-end', backgroundColor:'#E6E6E6', marginTop:80, justifyContent:'center'}}>
                            <Image
                                style={{width:30, height:30, borderRadius:10, position:'absolute', alignSelf:'center'}}
                                source={require("./image/camera.png")}
                            />
                        </TouchableOpacity>
                    </View>
        <Text style={{fontSize:26, margin:5}}> {this.state.firstName}  {this.state.lastName} </Text>
                    <Text style={{fontSize:18 , margin:5}}> {this.state.email} </Text>
                    <Text style={{fontSize:14 , margin:5}}> {this.state.tel} </Text>
                </View>



                <View style={{flex:0.65, marginTop:10}}>
                    <ScrollView>

                        {/* Education */}
                        <View style={{ backgroundColor:'white', borderWidth:15, borderColor:'transparent'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image
                                    source={require('./image/book.png')}
                                />
                                <Text style={{fontSize:20,}}> Education </Text>
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                    <TouchableOpacity style={styles.purpleBtn}>
                                        <Text style={{fontSize:16, color:'white'}}>  Add  </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.spaceView}/>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:0.5}}>
                                    <Text style={{fontSize:14, fontWeight:'bold'}}>{this.state.university}</Text>
                                    <Text style={{fontSize:14}}>{this.state.year}</Text>
                                    <Text style={{fontSize:14}}>{this.state.major}</Text>
                                </View>
                                <View style={{flex:0.5, justifyContent:'flex-start', alignItems:'flex-end'}}>
                                    <TouchableOpacity style={{margin:10}}>
                                        <Image
                                            style={{height:25, width:25}}
                                            source={require('./image/pencil.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/*End Education*/}

                        <View style={{marginTop:10}}/>

                        {/* Interesting */}
                        <View style={{ backgroundColor:'white', borderWidth:15, borderColor:'transparent'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image
                                    style={{height:35, width:35}}
                                    source={require('./image/share.png')}
                                />
                                <Text style={{fontSize:20,}}> Interesting </Text>
                            </View>
                            <View style={styles.spaceView}/>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:0.5}}>

                                {/* Flat List Print Interest //////// have to edit //////////// later */}
                                
                                <FlatList 
                                    data = {this.state.interest}
                                    renderItem={({item}) => <Text>{item.id}</Text>}/>

                                {/*///////////////////////////////////////////////////////////////////*/}
                                </View>
                                <View style={{flex:0.5, justifyContent:'flex-start', alignItems:'flex-end'}}>
                                    <TouchableOpacity style={{margin:10}}>
                                        <Image
                                            style={{height:25, width:25}}
                                            source={require('./image/pencil.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/*End Interesting*/}
                        
                        <View style={{marginTop:10}}/>


                        {/* Status */}
                        <View style={{ backgroundColor:'white', borderWidth:15, borderColor:'transparent'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image
                                    style={{height:35, width:35}}
                                    source={require('./image/status.png')}
                                />
                                <Text style={{fontSize:20,}}> Interesting </Text>
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                    <TouchableOpacity style={styles.purpleBtn}>
                                        <Text style={{fontSize:16, color:'white'}}>  Edit  </Text>
                                    </TouchableOpacity>
                                </View>
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
                                    <View style={{flexDirection:'row'}}>  
                                        <Text style={{fontSize:16}}>Highest Education : </Text>
                                        <Text style={styles.fontStatus}> {this.state.degree} </Text>
                                    </View>
                                    <View style={styles.statusLine}/>

                                </View>
                
                            </View>
                        </View>
                        {/*End Status*/}


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