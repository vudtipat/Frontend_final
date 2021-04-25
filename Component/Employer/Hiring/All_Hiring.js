import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import { StyleSheet, Text, TextInput,  TouchableOpacity, View,
         Image, AppRegistry, SafeAreaView, FlatList, AsyncStorage
} from 'react-native';
import { Ionicons,Entypo } from '@expo/vector-icons'
import { Avatar, Card, Icon} from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
import {url} from '../../var.js'
import { withNavigation } from 'react-navigation';

class All_Hiring extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            datasource:[],
            temp:[],
            EmployerEmail:'',
        };
        console.log('---------------------------------------------------')
        //this.getData()
        

    }
    getData = async() => {
        var email = await AsyncStorage.getItem('email')
        this.setState({EmployerEmail:email})
        this.getAnnouncement()
        
    }

    getAnnouncement = () =>{
         fetch(url+'/Hiring?want='+this.state.EmployerEmail, {
            method: 'GET',
       }).then((response) => response.json()).then((respone) => {
           if(respone.response == 'Pass')
           {
                var x = JSON.parse(respone.data);
                this.setState({data:x[0]['hiringList']})
                this.state.data.forEach(element => {
                    fetch(url+'/Employee_Profile?want='+element, {
                        method: 'GET',
                    }).then((response) => response.json()).then((respone) => {
                        if(respone.response == 'Pass')
                        {
                            this.setState({datasource:[]})
                            var x = JSON.parse(respone.data);
                            var dat = []
                            x.forEach(element => {
                                this.state.datasource.push(element);
                            });
                            this.setState({temp:this.state.datasource})
                            this.getAgreement(this.state.EmployerEmail)
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
               console.log('inside else')
           }
       })
   }

   componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
        this.setState({temp:[]})
        this.getData()
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

   getAgreement(email) {
        console.log('----------------------------- get Agreement---------------------------')
        this.state.temp.forEach(element => {
            console.log('agreement email = ' + element['Email'])
            var data = {
                EmployeeID:element['Email'],
                EmployerID: email,
                EmployeeStatus: true,
                EmployerStatus: true,
                jobDone: false,
            }
            fetch(url+'/getJobIdFromAgreement', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => response.json()).then((respone) => {
                if(respone.response == 'Pass')
                {
                    console.log('---------------- in get Agreement ----------------')
                    var x = JSON.parse(respone.data);
                    var jobID = x[0]['jobID']
                    console.log('x = ' + x[0]['jobID'])
                    console.log('x = ' + x[0]['EmployeeID'])
                    
                    fetch(url+'/Job_Description?want='+ jobID, {
                        method: 'GET',
                    }).then((response) => response.json()).then((respone) => {
                        if(respone.response == 'Pass')
                        {
                            console.log('---------------- in get Job ----------------')
                            var x = JSON.parse(respone.data);
                            var temp = x[0]['position']
                            var dat = this.state.temp
                            for(var index=0; index<this.state.temp.length; index++){
                                dat[index].position = temp
                            }
                            console.log(dat)
                            this.setState({temp:dat})
                            
                        }
                        else
                        {
                            console.log('inside else')
                        }
                    })

                    
                }
                else
                {
                    console.log('inside else')
                }
            })

        });
   }

   
    _renderItem(item){
        return(
            
            <View style={{flex:1, backgroundColor:'#690DBA', flexDirection:'row', borderRadius:10, marginBottom:10}}>
                <TouchableOpacity style={{flex:1, backgroundColor:'transparent', flexDirection:'row'}}
                                   onPress={() => this.props.navigation.navigate('Hiring_Profile',{email : item.Email})}>
                    <View style={{flex:0.97 ,backgroundColor:'transparent', alignSelf:'center', margin:10}}>
                        <Text style={{fontSize:26, color:'white', margin:3, backgroundColor:'transparent'}}>{item.position}</Text>
                        <Text style={{fontSize:20, color:'white', margin:3}}>{item.firstName} {item.lastName}</Text>
                        <Text style={{fontSize:18, color:'white', margin:3}}>อายุ : {item.age}</Text>
                        <Text style={{fontSize:18, color:'white', margin:3}}>Rating : {item.rating}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
        )
    }
    backBtn(){
        this.setState({temp:[], dat:[]})
        this.props.navigation.goBack()
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.1, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection:'row',
                             alignItems:'center', backgroundColor:'transparent', marginBottom:20}}>
                    <TouchableOpacity style={{flex:0.1, height:'100%',justifyContent:'center',marginLeft:'2%',backgroundColor:'transparent',
                                    borderRadius:10,flexDirection:'row',alignItems:'center'}} 
                                    onPress={()=>this.backBtn()}>
                        <AntDesign name="left" size={26} color="black" style={{marginLeft:'5%',marginRight:'10%'}}/>
                    </TouchableOpacity> 

                    <View style={{flex:0.8, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA'}}>All Hiring</Text>
                    </View>
                </View>

                <View style={{flex:1, margin:10}}>

                    <FlatList  
                        data={this.state.temp}  
                        renderItem={({item}) =>  this._renderItem(item)}  
                    />  

                    </View>
                </View>
        );
    }

}    

export default withNavigation(All_Hiring)