import * as React from 'react';
import { AsyncStorage, FlatList, TouchableOpacity, View ,Text} from 'react-native';
import { Icon  } from 'react-native-elements'
import {url} from './var.js'
export default class Annoucement extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            search:'หางานช่าง',
            datasource: [['ADD']]
        };
    }

    render(){
        return(
            <View style={{flex:1,width:'100%',marginTop:10}}>
                <View style={{flex:0.05, backgroundColor:'transparent', flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} style={{flex:0.15, backgroundColor:'transparent', justifyContent:'center', height:35, width:35}}>
                        <Icon name='menu' />
                    </TouchableOpacity>
                </View>

                <View style={{flex:1}}>
                    <FlatList
                        data={this.state.datasource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => item[0] == 'ADD'? (
                            <View style={{flex:1,marginLeft:'2%',width:'96%',marginBottom:20,backgroundColor:'#6200FF',opacity: 0.5,borderRadius:10}}>
                                <TouchableOpacity style={{width:'100%',height:'100%'}}>
                                    <View style={{marginTop:'15%',marginBottom:'15%'}} >
                                        <Icon name='squared-plus' type='entypo' color='white' size={40}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={{flex:1,marginLeft:'2%',width:'96%',marginBottom:20,backgroundColor:'#720DBA',borderRadius:10}}>
                                <TouchableOpacity style={{width:'100%'}}>
                                    <View style={{marginLeft:'5%',marginTop:'5%'}} >
                                        <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>{item[0]}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                                                
                            }
                        style={{marginTop:10,flex:1}}
                    />
                    </View>
                </View>
        );
    }
}    