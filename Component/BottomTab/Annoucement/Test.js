import * as React from 'react';
import { AsyncStorage, Alert, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { url  } from '../../var'
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import data from '../../data.json';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Autocomplete from 'react-native-autocomplete-input'


export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: ' ',
            location: '',
            workingAge:'',
            Description:'',
            jobType:'',
            Compensation:'',
            Properties:'',
            Benefits:'',
            province:data.province,
            province_value: '0',
            district_value: '0',
            provinceName:'',
            districtName:'',
            district:[],
            Expert:'',
            status: true,
            data : require('../../address.json'),
            profit:'',
            numberNotify:0,
            apply:[],
            hiring:[],
            textPlaceholder:'',
            hideResults:false,
            pos:data.position,
            height:65
        };
      }
      Press(){
        this.setState({status:false})
        if(this.state.province[Number(this.state.province_value)].info == "Krabi"){
          const dis = data.Krabi
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Kanchanaburi"){
          const dis = data.Kanchanaburi
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Kalasin"){
          const dis = data.Kalasin
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Kalasin"){
          const dis = data.Kalasin
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "KamphaengPhet"){
          const dis = data.KamphaengPhet
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "KhonKaen"){
          const dis = data.KhonKaen
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Chanthaburi"){
          const dis = data.Chanthaburi
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Chachoengsao"){
          const dis = data.Chachoengsao
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "ChonBuri"){
          const dis = data.ChonBuri
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "ChaiNat"){
          const dis = data.ChaiNat
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Chaiyaphum"){
          const dis = data.Chaiyaphum
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Chumphon"){
          const dis = data.Chumphon
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "ChiangRai"){
          const dis = data.ChiangRai
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "ChiangMai"){
          const dis = data.ChiangMai
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Trang"){
          const dis = data.Trang
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Trat"){
          const dis = data.Trat
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Tak"){
          const dis = data.Tak
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "NakhonNayok"){
          const dis = data.NakhonNayok
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "NakhonPathom"){
          const dis = data.NakhonPathom
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "NakhonPhanom"){
          const dis = data.NakhonPhanom
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "NakhonRatchasima"){
          const dis = data.NakhonRatchasima
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "NakhonSiThammarat"){
          const dis = data.NakhonSiThammarat
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "NakhonSawan"){
          const dis = data.NakhonSawan
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Nonthaburi"){
          const dis = data.Nonthaburi
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Narathiwat"){
          const dis = data.Narathiwat
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Nan"){
          const dis = data.Nan
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "BuengKan"){
          const dis = data.BuengKan
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "BuriRam"){
          const dis = data.BuriRam
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "PathumThani"){
          const dis = data.PathumThani
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "PrachuapKhiriKhan"){
          const dis = data.PrachuapKhiriKhan
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "PrachinBuri"){
          const dis = data.PrachinBuri
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Pattani"){
          const dis = data.Pattani
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "PhraNakhonSiAyutthaya"){
          const dis = data.PhraNakhonSiAyutthaya
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Phangnga"){
          const dis = data.Phangnga
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Phatthalung"){
          const dis = data.Phatthalung
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Phichit"){
          const dis = data.Phichit
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Phetchaburi"){
          const dis = data.Phetchaburi
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Phetchabun"){
          const dis = data.Phetchabun
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Phrae"){
          const dis = data.Phrae
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Phayao"){
          const dis = data.Phayao
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Phuket"){
          const dis = data.Phuket
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "MahaSarakham"){
          const dis = data.MahaSarakham
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Mukdahan"){
          const dis = data.Mukdahan
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "MaeHongSon"){
          const dis = data.MaeHongSon
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Yala"){
          const dis = data.Yala
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Yasothon"){
          const dis = data.Yasothon
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "RoiEt"){
          const dis = data.RoiEt
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Ranong"){
          const dis = data.Ranong
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Rayong"){
          const dis = data.Rayong
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Ratchaburi"){
          const dis = data.Ratchaburi
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "LopBuri"){
          const dis = data.LopBuri
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Lampang"){
          const dis = data.Lampang
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Lamphun"){
          const dis = data.Lamphun
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Loei"){
          const dis = data.Loei
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "SiSaKet"){
          const dis = data.SiSaKet
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "SakonNakhon"){
          const dis = data.SakonNakhon
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Songkhla"){
          const dis = data.Songkhla
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Satun"){
          const dis = data.Satun
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "SamutPrakarn"){
          const dis = data.SamutPrakarn
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "SamutSongkhram"){
          const dis = data.SamutSongkhram
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "SamutSakhon"){
          const dis = data.SamutSakhon
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Sakaeo"){
          const dis = data.Sakaeo
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Saraburi"){
          const dis = data.Saraburi
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "SingBuri"){
          const dis = data.SingBuri
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Sukhothai"){
          const dis = data.Sukhothai
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "SuphanBuri"){
          const dis = data.SuphanBuri
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "SuratThani"){
          const dis = data.SuratThani
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Surin"){
          const dis = data.Surin
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "NongKhai"){
          const dis = data.NongKhai
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "NongBuaLamPhu"){
          const dis = data.NongBuaLamPhu
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "AngThong"){
          const dis = data.AngThong
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "UdonThani"){
          const dis = data.UdonThani
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "UthaiThani"){
          const dis = data.UthaiThani
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "Uttaradit"){
          const dis = data.Uttaradit
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "UbonRatchathani"){
          const dis = data.UbonRatchathani
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "AmnatCharoen"){
          const dis = data.AmnatCharoen
          this.setState({district:dis})
        }if(this.state.province[Number(this.state.province_value)].info == "bangkok"){
          const dis = data.bangkok
          this.setState({district:dis})
        }
        
        
      }
    onSave = async() => {
        var datap = await AsyncStorage.getItem('data');
        datap = JSON.parse(datap);
        var province = this.state.province[this.state.province_value].label
        var district = this.state.district[this.state.district_value-1].label
        var location = district + ', ' + province
        console.log(location)
        var data = {
            position: this.state.textPlaceholder,
            location: location,
            workingAge:this.state.workingAge,
            Description:this.state.Description,
            jobType:this.state.jobType,
            Compensation:this.state.Compensation,
            Properties:this.state.Properties,
            Benefits:this.state.Benefits,
            firstName:datap.firstName,
            lastName:datap.lastName,
            owner:datap.Email,
            profit:this.state.profit,
            numberNotify:this.state.numberNotify,
            experience:this.state.Expert,
            applyList:this.state.apply,
            hiring:this.state.hiring,
        }
        console.log(data)
        await fetch(url+'/Employer_Annoucment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                Alert.alert('เพิ่มสำเร็จ');
                this.props.navigation.goBack()
            }
            else
            {
                Alert.alert('เพิ่มไม่สำเร็จ!!');
            }
        })
        
    }

    choose(item){
      console.log("before = "+item)
      
      this.setState({ textPlaceholder: item.value })

    }
    searching(text){
      console.log("searching...")
      if(text.length > 0){
        this.setState({height:300})
      }else{
        this.setState({height:65})
      }
      console.log(text)
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.1, justifyContent:'center', backgroundColor:'transparent', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.goBack()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:15}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Cancle</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.7, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:20, color:'#720DBA', backgroundColor:'transparent'}}>Create Annoucement</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.onSave()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:1, backgroundColor:'blue'}}>
                  <ScrollView>
                    <View style={{flex:0.6, backgroundColor:'red', height:'100%'}}>
                        <Text style={{fontSize:20, color:"#450887", marginTop:10, marginLeft:20, alignSelf:'flex-start'}}>ตำแหน่งงาน</Text>
                        <View style={{ height:50, width:'95%', alignSelf:'center', marginTop:10,}}>
                              <DropDownPicker
                                  items={data.position2}
                                  defaultValue={this.state.textPlaceholder}
                                  containerStyle={{height: 50}}
                                  searchable={true}
                                  style={{backgroundColor: '#fafafa'}}
                                  itemStyle={{
                                      justifyContent: 'flex-start'
                                  }}
                                  //multiple={true}
                                  //multipleText={this.state.textPlaceholder}
                                  //max={4}
                                  isVisible={this.state.hideResults}
                                  dropDownStyle={{backgroundColor: '#fafafa', height:this.state.height}}
                                  onChangeItem={item => this.choose(item)}
                                  onSearch={text => this.searching(text)}
                                  onOpen={() => this.setState({height:65})}

                              />
                              
                        </View>
                    </View>
                  
                  </ScrollView>
                </View>        
            </View>
        );
    }
}    