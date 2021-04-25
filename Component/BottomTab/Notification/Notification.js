import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'


export default class Notification extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            datasource: [
                {picture:"", name:"Firstname Lastname", message:"abcdefg hijklmnop qrstuv w xyz abcdefg hijklmnop qrstuv w xyz abcdefg hijklmnop qrstuv w xyz abcdefg hijklmnop qrstuv w xyz abcdefg hijklmnop qrstuv w xyz"},
        
        ]};
    }

    render(){
        return(
            <View style={{flex:1,marginTop:37}}>
                <View style={{flex:0.05, backgroundColor:'transparent', flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} 
                                    style={{flex:0.15, backgroundColor:'transparent', justifyContent:'center', height:35, width:35}}>
                        <Icon name='menu' />
                    </TouchableOpacity>
                </View>

                <View style={{flex:0.9, marginTop:5}}>
                    <FlatList
                        data={this.state.datasource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => <View style={{flex:1,marginLeft:'2%',width:'96%',marginBottom:20,backgroundColor:'#720DBA',borderRadius:10}}>
                                                    <TouchableOpacity style={{width:'100%'}}
                                                        onPress={() => this.props.navigation.navigate('Contact')}>
                                                        <View style={{flexDirection:'row'}} >
                                                            <View style={{width:80, height:100}} >
                                                                <Image
                                                                    style={{flex:1, justifyContent:'center', margin:10, borderRadius:10}}
                                                                    source={{uri:'https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg'}}
                                                                />
                                                            </View>
                                                            <View style={{marginLeft:10,marginTop:'5%',marginBottom:'5%', width:250, height:60}} >
                                                                <Text style={{color:'white',fontWeight:'bold',fontSize:20, margin:3}}>{item.name}</Text>
                                                                <Text style={{color:'gray',fontWeight:'300',fontSize:16, margin:3, height:20}}>{item.message}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    </View>
                            }
                        style={{marginTop:10,flex:1}}
                    />
                </View>
            </View>
        );
    }
}    