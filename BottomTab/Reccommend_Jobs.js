import * as React from 'react';
import { AsyncStorage, FlatList, TouchableOpacity, View ,Text} from 'react-native';
import { Icon  } from 'react-native-elements'
import {url} from '../var.js'

export default class Reccommend_Jobs extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            search:'หางานช่าง',
            datasource: []
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
                        renderItem={({item}) => <View style={{flex:1,marginLeft:'2%',width:'96%',marginBottom:20,backgroundColor:'#720DBA',borderRadius:10}}>
                                                    <TouchableOpacity style={{width:'100%'}}>
                                                        <View style={{marginLeft:'5%',marginTop:'5%'}} >
                                                            <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>{item[0]}</Text>
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