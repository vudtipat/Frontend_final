import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput, AsyncStorage, TouchableWithoutFeedback,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'
import {url} from '../../var.js'
import { withNavigation } from 'react-navigation';


class Bookmark_Employee extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            search:'หางานช่าง',
            datasource: [],
            tempEmail:'',
            employerData:[],
            temp:[],
            data:[],
        };
        console.log('------------------------------------------------------')
        console.log(this.state.datasource)
        //this.getAnnouncement()
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({re:!this.state.re})
            this.setState({temp:[]})
            this.setState({datasource:[]})
            this.setState({data:[]})
            this.setState({employerData:[]})
            this.getAnnouncement()
        });
      }
    
      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        fetch(url+'/bookmark_Employee?want='+email, {
           method: 'GET',
       }).then((response) => response.json()).then((respone) => {
           if(respone.response == 'Pass')
           {
               //console.log('inside if')
               var x = JSON.parse(respone.data);
               this.setState({datasource:x[0]['bookmark']})
               console.log(this.state.datasource)

               this.state.datasource.forEach(element => {
                   fetch(url+'/Job_Description?want='+element, {
                       method: 'GET',
                   }).then((response) => response.json()).then((respone) => {
                       if(respone.response == 'Pass')
                       {
                           //console.log('inside getProfile')
                           //this.setState({employerData:[]})
                           var x = JSON.parse(respone.data);
                           x.forEach(element => {
                               this.state.employerData.push(element);
                               console.log("element = " + element)
                           });
                           //console.log("employeeData = " + this.state.employerData)
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
               console.log('inside else')
           }
       })
   }

    backBtn(){
        this.setState({temp:[], employerData:[]})
        this.props.navigation.goBack()
    }
   _renderItem(item){
    return(
        
        <View style={{flex:1, backgroundColor:'#690DBA', flexDirection:'row', borderRadius:10, marginBottom:10}}>
                <TouchableOpacity style={{ width:'90%',borderColor: 'gray',borderRadius:10 ,
                                paddingHorizontal:10, alignSelf:'center', margin:10}}
                                onPress={() => this.props.navigation.navigate('Job_Description_Apply',{objId:item._id})}>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1,margin:5 , marginTop:5}}>
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
                        <Text style={{fontSize:24, color:'#720DBA'}}>Bookmark</Text>
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

export default withNavigation(Bookmark_Employee)