import * as React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View ,Text,AsyncStorage,Alert, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import {url} from '../../var.js'
import {image} from '../../imageurl'
import { withNavigation } from 'react-navigation';


class Profile_Employee extends React.Component {

    _getData = async() => {
        var data = await AsyncStorage.getItem('data');
        data = JSON.parse(data)
        console.log(data)
        this.setState({dataUser:data})
    }

    constructor(props) {
        super(props);
        this.state = {
            re:false,
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
        };
        //this._getData();
        this.getAnnouncement()
      }

      componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({re:!this.state.re})
            this.getAnnouncement()
        });
      }
    
      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }
    
      openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
        else{
          let pickerResult = await ImagePicker.launchImageLibraryAsync({base64:true,allowsEditing: true,
            aspect: [4,3]});
          if(!pickerResult.cancelled)
          {
            let imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null;
            this.setState({img:imageUri})
            var data = {
                email:this.state.email,
                image:imageUri,
            }
            fetch(url+'/Employee_Image', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => response.json())
            .then((json) => {
                if(json.response != "Pass")
                {
                  console.log("pass")
                  
                }
            })
          }
        } 
      }

      getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        this.setState({interest:[]})
        this.setState({interestTemp:[]})
        this.setState({temp:[]})
        console.log(email)
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
                this.setState({ firstName: x[0]['firstName'], lastName: x[0]['lastName'], tel: x[0]['Phone'] , email: x[0]['Email'], age:x[0]['age'], sex:x[0]['sex'],
                                nation: x[0]['nation'], religion:x[0]['religion'], degree:x[0]['degree'], year:x[0]['year'], grade:x[0]['grade'], experience:x[0]['experience'],
                                location:x[0]['location'], Compensation:x[0]['Compensation'], university:x[0]['university'], major:x[0]['major'], degree:x[0]['degree'],
                                interestTemp:x[0]['interest'], img:x[0]['image']
                });
                console.log(this.state.interestTemp)
                var count = 1;
                this.state.interestTemp.forEach(element => {
                    this.state.temp.push({ list:element, num:count})
                    count++
                });
                this.setState({interestTemp:this.state.temp})
                console.log('temp = '+ this.state.temp)
                console.log(this.state.temp)
                console.log(this.state.interest)

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
                        <TouchableOpacity style={{width:40, height:40, borderRadius:20, position:'absolute',alignSelf:'flex-end', 
                                        backgroundColor:'#E6E6E6', marginTop:100, justifyContent:'center'}}
                                        onPress={() => this.openImagePickerAsync()}>
                            <Image
                                style={{width:30, height:30, borderRadius:10, position:'absolute', alignSelf:'center'}}
                                source={require("../../image/camera.png")}
                            />
                        </TouchableOpacity>
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
                                <View style={{flex:0.1, justifyContent:'flex-start', alignItems:'flex-end'}}>
                                    <TouchableOpacity style={{margin:10}}
                                                    onPress={() => this.props.navigation.navigate('Education_Edit')}>
                                        <Image
                                            style={{height:25, width:25}}
                                            source={require('../../image/pencil.png')}
                                        />
                                    </TouchableOpacity>
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
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({item}) => <Text style={{fontSize:14, margin:5}}>{item.num}. {item.list}</Text>}
                                        extraData={this.state.re}
                                        style={{marginTop:10,flex:1}}
                                    />

                                </View>
                                <View style={{flex:0.3, justifyContent:'flex-start', alignItems:'flex-end'}}>
                                    <TouchableOpacity style={{margin:10}}
                                                        onPress={() => this.props.navigation.navigate('Interesting_Edit')}>
                                                    
                                        <Image
                                            style={{height:25, width:25}}
                                            source={require('../../image/pencil.png')}
                                        />
                                    </TouchableOpacity>
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
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                    <TouchableOpacity style={styles.purpleBtn}
                                        onPress={() => this.props.navigation.navigate('Status_Edit')}>
                                        <Text style={{fontSize:16, color:'white'}}>  Edit  </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.spaceView}/>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                    
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:16, fontWeight:'bold'}}>Age : </Text>
                                        <Text style={styles.fontStatus}> {this.state.age} </Text>
                                    </View> 
                                    <View style={styles.statusLine}/>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:16, fontWeight:'bold'}}>Sex :</Text>
                                        <Text style={styles.fontStatus}> {this.state.sex} </Text>
                                    </View>
                                    <View style={styles.statusLine}/>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:16, fontWeight:'bold'}}>Nationality : </Text>
                                        <Text style={styles.fontStatus}> {this.state.nation} </Text>
                                    </View>
                                    <View style={styles.statusLine}/>
                                    <View style={{flexDirection:'row'}}>  
                                        <Text style={{fontSize:16, fontWeight:'bold'}}>Religion : </Text>
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

export default withNavigation(Profile_Employee)