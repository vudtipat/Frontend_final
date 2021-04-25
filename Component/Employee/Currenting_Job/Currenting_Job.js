import * as React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'
import {url} from '../../var.js'
import { withNavigation } from 'react-navigation';

class Currenting_Job extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: '',
            location: '',
            profit: '',
            jobTypeShow: '',
            experience : 0,
            data:[],
            Currenting_Job:[],
            datasource:[],
            employerData:[],
            temp:[]

        };
        //this.Currenting_Job()
      }

    Currenting_Job = async() => {
        var email = await AsyncStorage.getItem('email')
        await fetch(url+'/Currenting_Job?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                var datax = [];
                var x = JSON.parse(respone.data);
                x.forEach(element => {
                    datax.push(element);
                });
                //this.setState({data:datax});
                this.setState({Currenting_Job:datax[0]['Currenting']});
                console.log(this.state.Currenting_Job)
                this.state.Currenting_Job.forEach(element => {
                    fetch(url+'/getJobAnnoucement?want='+element, {
                        method: 'GET',
                    }).then((response) => response.json()).then((respone) => {
                        if(respone.response == 'Pass')
                        {
                            console.log('inside getProfile')
                            var x = JSON.parse(respone.data);
                            x.forEach(element => {
                                this.state.employerData.push(element);
                                console.log("element = " + element)
                            });
                            console.log("employeeData = " + this.state.employerData)
                            this.setState({temp:this.state.employerData})

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
                console.log('กรุณาลองอีกครั้ง!!');
            }
        })
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.Currenting_Job()
        });
      }
    
      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }




    
    _renderItem(item){
        return(
            
            <View style={{flex:1, backgroundColor:'#690DBA', flexDirection:'row', borderRadius:10, marginBottom:10}}>
                <TouchableOpacity style={{ width:'90%',borderColor: 'gray',borderRadius:10 ,
                                paddingHorizontal:10, alignSelf:'center', margin:10}}
                                onPress={() => this.props.navigation.navigate('Job_Description_Agree',{objId : item._id})}>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{ justifyContent:'center', borderRadius:60, marginRight:5 }}>
                                        <Image 
                                            style={{width:100, height:80}}
                                            source={{
                                                uri: item.image,
                                            }}
                                        />
                                    </View>
                                    <View style={{flex:1,margin:5 , marginTop:5}}>
                                        <Text style={{fontSize:18, color:'white', margin:3}}>{item.position}</Text>
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
        this.setState({temp:[], employerData:[]})
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
                        <Text style={{fontSize:24, color:'#720DBA'}}>Currenting Jobs</Text>
                    </View>
                </View>

                {/* Flat list View */}
                <View style={{flex:1}}>
                        <FlatList  
                            data={this.state.temp}  
                            renderItem={({item}) =>  this._renderItem(item)}  
                        />
                </View>

            </View>
        );
    }
}    


export default withNavigation(Currenting_Job)