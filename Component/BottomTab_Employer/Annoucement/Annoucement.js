import * as React from 'react';
import { AsyncStorage, FlatList, TouchableOpacity, View ,Text,Image,Alert} from 'react-native';
import { Icon  } from 'react-native-elements'
import {url} from '../../var.js'
export default class Annoucement extends React.Component {

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        await fetch(url+'/Employer_Annoucment?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var datax = [];
                var x = JSON.parse(respone.data);
                x.forEach(element => {
                    datax.push(element);
                });
                datax.push({
                    job:'add'
                });
                this.setState({datarender:datax});
            }
            else
            {
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('didFocus', () => {
            this.getAnnouncement();
        });
      }
    
    componentWillUnmount() {
        this._unsubscribe();
    }

    deleteAnnoucement = async(data) => {
        console.log(data)
        await fetch(url+'/Employer_Annoucment?want='+data, {
            method: 'DELETE',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                this.getAnnouncement()
                Alert.alert('ลบสำเร็จ!!');
            }
            else
            {
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            datarender : [],
        };
        //this.getAnnouncement();
      }
    render(){
        return(
            <View style={{flex:1,width:'100%',marginTop:37}}>
                <View style={{flex:0.05, backgroundColor:'transparent', flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:0.15, backgroundColor:'transparent', justifyContent:'center', height:35, width:35}} onPress={() => this.props.navigation.toggleDrawer()}>
                        <Icon name='menu' />
                    </TouchableOpacity>
                    
                </View>

                <View style={{flex:1}}>
                    <FlatList
                        data={this.state.datarender}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => item.job == 'add' ?
                                                <TouchableOpacity style={{height:150 ,width:'95%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                                    paddingHorizontal:10, backgroundColor:'#B794F0', alignSelf:'center', marginTop:10}}
                                                    onPress={() => this.props.navigation.navigate('Job_Annoucement_Create')}>
                                                    <View style={{flex:1,justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                                                        <Icon name='add' 
                                                            size={60}
                                                            color='white'
                                                            style={{borderWidth:2, height:63, width:63, borderRadius:10, borderColor:'white'}}/>
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity style={{width:'95%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                                                        paddingHorizontal:10, backgroundColor:'#6914B3', alignSelf:'center', marginTop:10}}
                                                                        onPress={() => this.props.navigation.navigate('Job_Description',{objId : item._id})}>
                                
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:1,justifyContent:'center', marginTop:10, backgroundColor:'transparent', marginLeft:15}}>
                                        <Text style={{fontSize:26, color:'white'}}>{item.position}</Text>
                                    </View>
                                    

                                    <View style={{marginTop:5, alignItems:'flex-end', backgroundColor:'transparent'}}>
                                        <TouchableOpacity style={{alignSelf:'flex-end'}}
                                            onPress={()=>this.deleteAnnoucement(item._id)}>
                                            <Image 
                                                style={{ width:20, height:20, borderRadius:20}}
                                                source={require("../../image/trash.png")}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{alignSelf:'flex-end', marginTop:10}}
                                                          onPress={() => this.props.navigation.navigate('Job_Annoucement_Edit',{objId : item._id})}>
                                            <Image 
                                                style={{ width:20, height:20, borderRadius:20}}
                                                source={require("../../image/pencil.png")}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                
                                <View style={{flex:1, flexDirection:'row', margin:5, backgroundColor:'transparent'}}>
                                    <View style={{marginLeft:10, width:'70%',marginBottom:10,}}>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>ประสบการณ์ : {item.experience}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>พื้นที่ : {item.location}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>ค่าตอบแทน : {item.Compensation}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>ประเภทงาน : {item.jobType}</Text>
                                    </View>
                                    
                                </View>
                        </TouchableOpacity>
                    }style={{marginTop:5,flex:1}}/>
                    </View>
                </View>
               
        );
    }
}    