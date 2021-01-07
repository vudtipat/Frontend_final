import * as React from 'react';
import { AsyncStorage,Alert, FlatList, TouchableOpacity, View ,Keyboard,TextInput,Text,Image} from 'react-native';
import { Icon  } from 'react-native-elements'
import AntIcon from "react-native-vector-icons/AntDesign";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {url} from '../var.js'
export default class Home_Employee extends React.Component {

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        await fetch(url+'/Employer_Annoucment?want=all', {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var datax = [];
                var x = JSON.parse(respone.data);
                x.forEach(element => {
                    datax.push(element);
                });
                this.setState({datarender:datax});
            }
            else
            {
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }

    constructor(props)
    {
        super(props);
        this.state = {
            search:'หางานช่าง',
            datarender: []
        };
        this.getAnnouncement();

    }

    RedirectAuth = async () => {
        var value = await AsyncStorage.getItem('login');
        var mode = await AsyncStorage.getItem('mode');
        console.log(value+' '+mode)
        if(value == 'yes')
        {
          if(mode == 'Employee')
          {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Employee' }],
              });
          }
          
        }
      }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow'
        );
        this.keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide'

        );
      }
    
      componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }
    
    
    onChangesearch = (Text)=>{
        this.setState({search:Text});
    }

    onSearch = async () =>{
        console.log(this.state.search);
        await fetch(url+'/search_job?search='+this.state.search,{method: 'GET'})
        .then((response) => response.json())
        .then((json) => {
         
          var obj = [];
          for (let userObject of json.response) {
            obj.push(userObject);
          }
          this.setState({datasource:obj});
          console.log(this.state.datasource)
        })
          .catch(err => {
              console.log(err);
              Alert.alert('กรุณาลองอีกครั้ง');
        });
    }
    render(){
        return(
            <View style={{flex:1,width:'100%',marginTop:10}}>
                <View style={{position:'absolute',flex:0.3, backgroundColor:'transparent', flexDirection:'row',height:'20%',width:'100%',alignItems:'flex-start'}}>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={{backgroundColor:'#0099FF',justifyContent:'center',backgroundColor:'transparent', width:'10%',marginLeft:5}} onPress={() => this.props.navigation.toggleDrawer()}>
                                <Icon name='menu' />
                            </TouchableOpacity>
                            <TextInput style={{height: 40, width:'75%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,backgroundColor:'#EBEBEB',paddingHorizontal: 10,}} 
                            placeholder="กรุณากรอกข้อมูลที่ต้องการค้นหา" onSubmitEditing={Keyboard.dismiss} placeholderTextColor='#AAAAAA' onChangeText = {text => this.onChangesearch(text)}/>
                            <TouchableOpacity onPress={()=>this.onSearch()} style={{alignItems:'flex-start',justifyContent:'center',backgroundColor:'transparent', width:'10%',marginLeft:'4%'}}>
                                <AntIcon name="search1" color="green" size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={{height:40,padding:5,alignItems:'flex-end',marginTop:10}}>
                            <TouchableOpacity style={{ borderRadius:10,justifyContent:'center',alignItems:'center',marginBottom:'3%',backgroundColor:'#0099FF',width:'20%',height:'100%'}} onPress={()=>this.onSearch()} >
                                <View style={{height:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize:16, color:'black', alignSelf:'center'}}>Filter</Text>
                                    <MaterialCommunityIcons name="tune" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{flex:1,marginTop:'23%'}}>
                    <FlatList
                        data={this.state.datarender}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => <TouchableOpacity style={{height: 150, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                        paddingHorizontal:10, backgroundColor:'#6914B3', alignSelf:'center', margin:10}}
                        onPress={() => this.props.navigation.navigate('Annoucement_Profile')}>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <Text style={{fontSize:18, color:'white', margin:1}}>{item.position}</Text>
                            
                        </View>
                        
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{ justifyContent:'center'}}>
                                <View style={{ borderRadius:60 }}>
                                    <Image 
                                        style={{width:140, height:80}}
                                        source={require("../image/person.png")}
                                    />
                                </View>
                            </View>

                            <View style={{felx:1, margin:5 ,marginLeft:20,marginTop:10}}>
                                <Text style={{fontSize:16, color:'white', margin:1}}>ประสบการณ์ : {item.workingAge}</Text>
                                <Text style={{fontSize:16, color:'white', margin:1}}>พื้นที่ : {item.location}</Text>
                                <Text style={{fontSize:16, color:'white', margin:1}}>ค่าตอบแทน : {item.Compensation}</Text>
                            </View>
                            
                        </View>
                </TouchableOpacity>
                            }
                        style={{marginTop:5,flex:1}}
                    />
                    </View>
                </View>
        );
    }

    
}    