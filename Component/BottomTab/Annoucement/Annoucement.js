import * as React from 'react';
import { AsyncStorage, FlatList, TouchableOpacity, View ,Text,Image,Alert} from 'react-native';
import { Icon  } from 'react-native-elements'
import {url} from '../../var.js'
export default class Annoucement extends React.Component {

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        console.log(email)
        await fetch(url+'/Employee_Annoucment?want='+email, {
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
        await fetch(url+'/Employee_Annoucment?want='+data, {
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
      }
    render(){
        return(
            <View style={{flex:1,width:'100%',marginTop:10}}>
                <View style={{flex:0.05, backgroundColor:'transparent', flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:0.15, backgroundColor:'transparent', justifyContent:'center', height:35, width:35}} onPress={() => this.props.navigation.toggleDrawer()}>
                        <Icon name='menu' />
                    </TouchableOpacity>
                    
                </View>

                <View style={{flex:1,marginTop:5}}>
                    <FlatList
                        data={this.state.datarender}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => item.job == 'add' ?
                                                <TouchableOpacity style={{height: 150, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                                    paddingHorizontal:10, backgroundColor:'#B794F0', alignSelf:'center', margin:10}}
                                                    onPress={() => this.props.navigation.navigate('Annoucement_Create')}>
                                                    <View style={{flex:1,justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                                                        <Icon name='add' 
                                                            size={60}
                                                            color='white'
                                                            style={{borderWidth:2, height:63, width:63, borderRadius:10, borderColor:'white'}}/>
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity style={{height: 150, width:'90%',borderColor: 'gray', borderWidth: 1,borderRadius:10 ,
                                paddingHorizontal:10, backgroundColor:'#6914B3', alignSelf:'center', margin:10}}
                                onPress={() => this.props.navigation.navigate('Annoucement_Profile')}>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{ justifyContent:'center'}}>
                                        <View style={{ borderRadius:60 }}>
                                            <Image 
                                                style={{width:70, height:70, borderRadius:60}}
                                                source={require("../../image/person.png")}
                                            />
                                        </View>
                                    </View>

                                    <View style={{felx:1, margin:5 , marginTop:15}}>
                                        <Text style={{fontSize:18, color:'white', margin:1}}>{item.job}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>{item.firstName} {item.lastName}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>พื้นที่ : {item.location}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>ค่าตอบแทน : {item.Compensation}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:1}}>ประเภทงาน : {item.type}</Text>
                                    </View>
                                    <View style={{flex:1, marginTop:10}}>
                                        <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>this.deleteAnnoucement(item._id)}>
                                            <Image 
                                                style={{ width:20, height:20, borderRadius:20}}
                                                source={require("../../image/trash.png")}
                                            />
                                        </TouchableOpacity>

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