import * as React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'
import {url} from '../../var.js'
import { withNavigation } from 'react-navigation';

class All_Apply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            re:false,
            jobTitle: '',
            location: '',
            profit: '',
            jobTypeShow: '',
            experience : 0,
            datarender:[],
            datasource:[],
            temp:[],
        };
        //this.getAnnouncement()
    }
    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        console.log(email)
        await fetch(url+'/getAllApply?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var datax = [];
                var x = JSON.parse(respone.data);
                x.forEach(element => {
                    datax.push(element);
                });
                this.setState({datarender:[]});
                this.setState({datarender:datax[0]['allApply']});
                console.log("datarender = "+this.state.datarender)
                
                this.state.datarender.forEach(element => {
                    fetch(url+'/getJobAnnoucementByObj?want='+element, {
                        method: 'GET',
                    }).then((response) => response.json()).then((respone) => {
                        if(respone.response == 'Pass')
                        {
                            //this.setState({datasource:[]})
                            console.log('inside get job description')
                            var dat = [];
                            var x = JSON.parse(respone.data);
                            x.forEach(element => {
                                this.state.datasource.push(element);
                            });
                            //var setData = new Set (this.state.datasource) 
                            //this.state.datasource = setData
                            this.setState({temp: this.state.datasource})
                        }
                        else
                        {
                            console.log('inside else')
                        }
                    })
                });
            }
            else
            {
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({re:this.state.re})
            this.getAnnouncement()
        });
      }
    
      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }

    _renderItem(item){
        return(
            
            <View style={{flex:1, backgroundColor:'transparent', flexDirection:'row', borderRadius:10, marginBottom:10}}>
                <TouchableOpacity style={{ width:'100%', paddingHorizontal:10, 
                                        backgroundColor:'#6914B3', alignSelf:'center', borderRadius:10}}
                                onPress={() => this.props.navigation.navigate('Job_Description_Apply',{objId:item._id})}>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1,margin:10 , marginTop:5, marginLeft:15}}>
                                        <Text style={{fontSize:26, color:'white', margin:3}}>{item.position}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:3}}>พื้นที่ : {item.location}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:3}}>ค่าตอบแทน : {item.Compensation}</Text>
                                        <Text style={{fontSize:14, color:'white', margin:3}}>ประเภทงาน : {item.jobType}</Text>
                                        
                                    </View>
                                    
                                </View>
                </TouchableOpacity>
            </View>
            
        )
    }

    backBtn(){
        this.setState({datasource:[],temp:[]})
        this.props.navigation.goBack()
    }
      render(){
        return(
            <View style={{flex:1, margin:10}}>
                
                <View style={{flex:0.1, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection:'row',
                             alignItems:'center', backgroundColor:'transparent', marginBottom:20}}>
                    <TouchableOpacity style={{flex:0.1, height:'100%',justifyContent:'center',marginLeft:'2%',backgroundColor:'transparent',
                                    borderRadius:10,flexDirection:'row',alignItems:'center'}} 
                                    onPress={()=>this.backBtn()}>
                        <AntDesign name="left" size={26} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                    </TouchableOpacity> 

                    <View style={{flex:0.8, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA'}}>All Job Apply</Text>
                    </View>
                </View>

                {/* Flat list View */}
                <View style={{flex:1}}>
                    <FlatList  
                        data={this.state.temp}  
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) =>  this._renderItem(item)}  
                        extraData={this.state.re}
                    />  

                        
                </View>

            </View>
        );
    }
}    


export default withNavigation(All_Apply)