import * as React from 'react';
import { Alert, AsyncStorage, TouchableOpacity, View ,Text,TextInput,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import {url} from '../../var.js'
import data from '../../data.json';
import Modal from 'react-native-modal';
import Autocomplete from 'react-native-autocomplete-input';
var dat = ""

export default class Annoucement_Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle:'',
            textPlaceholder:"Select your position...",
            jobType:"Select your type...",
            province_value: '0',
            district_value: '0',
            Expert : '',
            province:data.province,
            district:[],
            provincePlaceholder:'',
            districtPlaceholder:'',
            status: true,
            provinceName:'',
            districtName:'',
            modalStatus:false,
            text:'',
            data : require('../../address.json'),
            Compensation:'',
            hideResults:false,
            pos:data.position,
            height:65,
            datasource:[],
            aboutMe:'',
            param:'',
            temp:[],
            typeJob:'',
            MainJSON:[],
            FilterData:[],
            selectedItem:[],
            txt:'',
        };
        console.log('---------------------------------------------------------------------------')
        this.getData()
        this.getAnnouncement()
    }
  getData(){
      dat = JSON.stringify(this.props.navigation.getParam('objId'))
      this.state.param = dat.replace(/^"(.*)"$/, '$1');
      console.log(this.state.param)
  }
  pickJobType(item){
    var temp = this.state.temp
    if(temp.indexOf(item) == -1){
      temp.push(item)
    }
    else{
      temp.pull(item)
    }
    this.setState({temp:temp[this.state.temp.length-1]})
    console.log(this.state.temp)
  }
  SearchDataFromJSON = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      this.setState({FilterData:this.state.MainJSON.filter((data) => data.title.search(regex) >= 0)})
      this.setState({txt:query})
    } else {
      this.setState({FilterData:[]})
    }
  };
  getAnnouncement = async() => {
    console.log('mail sed la')
    await fetch(url+'/Annoucement_by_objId?want='+this.state.param, {
        method: 'GET',
    }).then((response) => response.json()).then((respone) => {
        if(respone.response == 'Pass')
        {
            console.log('inside if')
            var datax = [];
            var x = JSON.parse(respone.data);
            this.setState({datasource:x});
            console.log(this.state.datasource)
            this.setState({ jobTitle:x[0]['job'], Compensation:x[0]['Compensation'], location:x[0]['location'], jobType:x[0]['type'],
                            Expert:x[0]['experience'], aboutMe:x[0]['aboutMe'], jobType: x[0]['jobType'], temp: x[0]['jobType'],
                            textPlaceholder:x[0]['job'],
            });
            this.location()
            this.getAllAnnouncement()
        }
        else
        {
            console.log('inside else')
        }
    })
  }
  getAllAnnouncement = async() => {
    await fetch(url+'/Employer_Annoucment?want=all', {
        method: 'GET',
    }).then((response) => response.json()).then((respone) => {
        if(respone.response == 'Pass')
        {
            var datax = [];
            var x = JSON.parse(respone.data);
            x.forEach(element => {
                datax.push(element);
            });
            this.setState({FilterData:datax});
        }
        else
        {
            Alert.alert('กรุณาลองอีกครั้ง!!');
        }
    })
}
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then((res) => res.json())
      .then((json) => {
        this.setState({MainJSON:json})
      })
  }
  componentDidUpdate() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then((res) => res.json())
      .then((json) => {
        this.setState({MainJSON:json})
      })
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
    onChangejob = (text) => {
        this.setState({job:text});
    }

    onChangetype = (text) => {
        this.setState({type:text});
    }

    onChangelocation = (text) => {
        this.setState({location:text});
    }

    onChangeCompensation = (text) => {
        this.setState({Compensation:text});
    }
    
    onChangeexper = (text) => {
        this.setState({exper:text})
    }
    onSavebtn(){
      this.setState({modalStatus:true})
    }
    onCreate = async() => {
      //this.setState({modalStatus:false})
      this.onSave()
      this.props.navigation.goBack()
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
    location(){
      var text = this.state.location
      console.log(text)
      text = text.split(", ")
      console.log('location = ' + text)
      this.setState({districtPlaceholder:text[0], provincePlaceholder:text[1]})
    }

  onSave = async() => {
    this.setState({aboutMe:this.state.text, modalStatus:false})
    var datap = await AsyncStorage.getItem('data');
    datap = JSON.parse(datap);
    try{
      var province = this.state.province[this.state.province_value].label
      var district = this.state.district[this.state.district_value-1].label
      var location = district + ', ' + province
      console.log('---------------------**************************----------------------------')
      console.log(this.state.jobType)
      console.log(this.state.typeJob)
      var data = {
          objId:this.state.param,
          job: this.state.jobTitle,
          location: location,
          experience:this.state.Expert,
          jobType:this.state.jobType,
          Compensation:this.state.Compensation,
          aboutMe:this.state.aboutMe,
      }
      await fetch(url+'/Employee_Annoucement_Edit', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }).then((response) => response.json()).then((respone) => {
          if(respone.response == 'Pass')
          {
            console.log('เพิ่มสำเร็จ');
              this.props.navigation.goBack()
          }
          else
          {
              console.log('เพิ่มไม่สำเร็จ!!');
          }
      })
    }catch{
      Alert.alert("กรุณาเลือก/แก้ไขสถานที่ทำงานใหม่อีกครั้ง")
    }
    
}
    render(){
        return(
            <View style={{flex:1}}>

                <View style={{flex:0.1, justifyContent:'center', backgroundColor:'white', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.goBack()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:10}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Cancle</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.85, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Annoucement Edit</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.onSave()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:1, backgroundColor:'white'}}>
                <View style={{flex:1}}>
                      <ScrollView >
                        <Text style={{fontSize:20, color:"#450887", marginTop:0, marginLeft:20, alignSelf:'flex-start', marginTop:10}}>Job Title</Text>
                        <View style={{flex:1, margin:10, width:'95%'}}>
                              <TextInput
                                  style={{flex:1, height: 50, width:'95%',borderColor: 'gray',borderRadius:10 ,
                                  paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                  onChangeText={text=>this.setState({txt:text, jobTitle:text})}
                                  value={this.state.jobTitle}
                                  placeholder={this.state.jobTitle}
                                  underlineColorAndroid='transparent'
                              />
                            <View style={{ height:'100%'}}>
                                <View style={{flex:0.3, margin:10, width:'100%', alignSelf:'center'}}>

                            <View style={{flex:1, alignItems:'center'}}>
                                <Text style={{fontSize:20, color:"#450887", marginLeft:10, alignSelf:'flex-start', marginTop:10}}>Job Title</Text>
                                <View style={{height: 50, width:'95%',borderColor: 'gray',borderRadius:10 , alignSelf:'center',
                                              paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10, justifyContent:'center', marginTop:20}}>
                                  <Picker
                                    selectedValue={this.state.jobType}
                                    style={{flex:1, height: 50,borderColor: 'gray',borderRadius:10 ,
                                            paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10}}
                                    onValueChange={(itemValue, itemIndex) =>
                                      this.setState({jobType: itemValue})
                                    }>
                                    <Picker.Item label="Select your type..." value="Select your type..." />
                                    <Picker.Item label="กฎหมาย" value="กฎหมาย" />
                                    <Picker.Item label="การตลาด" value="การตลาด" />
                                    <Picker.Item label="เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่" value="เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่" />
                                    <Picker.Item label="ขาย" value="ขาย" />
                                    <Picker.Item label="เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม" value="เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม" />
                                    <Picker.Item label="คอมพิวเตอร์/IT/โปรแกรมเมอร์" value="คอมพิวเตอร์/IT/โปรแกรมเมอร์" />
                                    <Picker.Item label="งานการเงิน-ธนาคาร" value="งานการเงิน-ธนาคาร" />
                                    <Picker.Item label="งานขนส่ง-คลังสินค้า" value="งานขนส่ง-คลังสินค้า" />
                                    <Picker.Item label="งานนำเข้า-ส่งออก" value="งานนำเข้า-ส่งออก" />
                                    <Picker.Item label="งานบริการลูกค้า-Call Center" value="งานบริการลูกค้า-Call Center" />
                                    <Picker.Item label="งานบัญชี" value="งานบัญชี" />
                                    <Picker.Item label="งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume" value="งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume" />
                                    <Picker.Item label="จัดซื้อ/ธุรการ/ประสานงานทั่วไป" value="จัดซื้อ/ธุรการ/ประสานงานทั่วไป" />
                                    <Picker.Item label="เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO" value="เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO" />
                                    <Picker.Item label="ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์" value="ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์" />
                                    <Picker.Item label="นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา" value="นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา" />
                                    <Picker.Item label="บุคคล/ฝึกอบรม" value="บุคคล/ฝึกอบรม" />
                                    <Picker.Item label="ผลิต/ควบคุมคุณภาพ/โรงงาน" value="ผลิต/ควบคุมคุณภาพ/โรงงาน" />
                                    <Picker.Item label="ผู้จัดการ/ผู้อำนวยการ/MD/CEO" value="ผู้จัดการ/ผู้อำนวยการ/MD/CEO" />
                                    <Picker.Item label="แผนกรักษาความปลอดภัย/งานอาคารจอดรถ" value="แผนกรักษาความปลอดภัย/งานอาคารจอดรถ" />
                                    <Picker.Item label="แพทย์/เภสัชกร/สาธารณสุข" value="แพทย์/เภสัชกร/สาธารณสุข" />
                                    <Picker.Item label="ภูมิศาสตร์/แผนที่/GIS/ผังเมือง" value="ภูมิศาสตร์/แผนที่/GIS/ผังเมือง" />
                                    <Picker.Item label="แม่บ้าน/พี่เลี้ยง/คนสวน" value="แม่บ้าน/พี่เลี้ยง/คนสวน" />
                                    <Picker.Item label="โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา" value="โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา" />
                                    <Picker.Item label="ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว" value="ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว" />
                                    <Picker.Item label="เลขานุการ" value="เลขานุการ" />
                                    <Picker.Item label="วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)" value="วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)" />
                                    <Picker.Item label="วิทยาศาสตร์/Lab/วิจัยพัฒนา" value="วิทยาศาสตร์/Lab/วิจัยพัฒนา" />
                                    <Picker.Item label="วิศวกร" value="วิศวกร" />
                                    <Picker.Item label="ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ" value="ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ" />
                                    <Picker.Item label="ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์" value="ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์" />
                                    <Picker.Item label="สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์" value="สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์" />
                                    <Picker.Item label="สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา" value="สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา" />
                                    <Picker.Item label="เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น" value="เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น" />
                                    <Picker.Item label="ออกแบบเว็บไซต์/Web" value="ออกแบบเว็บไซต์/Web" />
                                    <Picker.Item label="อัญมณีและเครื่องประดับ" value="อัญมณีและเครื่องประดับ" />
                                    <Picker.Item label="อาจารย์/ครู/งานวิชาการ" value="อาจารย์/ครู/งานวิชาการ" />
                                    <Picker.Item label="อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ" value="อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ" />
                                    <Picker.Item label="งาน Part-time/พนักงานชั่วคราว" value="งาน Part-time/พนักงานชั่วคราว" />
                                    <Picker.Item label="Freelance" value="Freelance" />
                                    <Picker.Item label="อื่นๆ" value="อื่นๆ" />
                                  </Picker>
                                </View>
                                <Text style={{fontSize:20, color:"#450887", marginLeft:10, alignSelf:'flex-start', marginTop:20}}>Location</Text>
                                <View style={{flex:1, marginTop:10, width:'100%'}}>
                                    <View style={{flex:0.85, margin:10}}>
                                        <DropDownPicker
                                            items={this.state.province}
                                            defaultValue={data.value}
                                            containerStyle={{height: 50}}
                                            style={{width:'100%'}}
                                            itemStyle={{ justifyContent: 'flex-start' }}
                                            dropDownStyle={{width:'100%'}}
                                            placeholder={this.state.provincePlaceholder}
                                            labelStyle={{color:'black'}}
                                            searchable={true} 
                                            searchablePlaceholder="Search for a province"
                                            searchablePlaceholderTextColor="gray"
                                            placeholderStyle={{ fontWeight: 'bold',  textAlign: 'center', color:'black'}}
                                            onChangeItem={item => this.setState({ province_value: item.value })}
                                        />
                                        <View style={{flex:0.15, alignSelf:'flex-end', margin:10}}>
                                            <TouchableOpacity style={{borderWidth:0.5, borderRadius:10, justifyContent:'center' ,width:50, height:30}}
                                                                onPress={()=>this.Press()}>
                                                <Text style={{alignSelf:'center'}}> OK </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flex:1, margin:10, width:'100%', alignSelf:'center'}}>
                                            <DropDownPicker
                                                items={this.state.district}
                                                defaultValue={data.value}
                                                disabled={this.state.status}
                                                containerStyle={{height: 50}}
                                                style={{width:'100%'}}
                                                itemStyle={{ justifyContent: 'flex-start' }}
                                                dropDownStyle={{width:'100%'}}
                                                placeholder={this.state.districtPlaceholder}
                                                labelStyle={{color:'black'}}
                                                searchable={true} 
                                                searchablePlaceholder="Search for a district"
                                                searchablePlaceholderTextColor="gray"
                                                placeholderStyle={{ fontWeight: 'bold',  textAlign: 'center' , color:'black'}}
                                                onChangeItem={item => this.setState({ district_value: item.value })}
                                            /> 
                                            <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>Compensation</Text>
                                            <View style={{height: 50, width:'100%',borderColor: 'gray',borderRadius:10 , alignSelf:'center',
                                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10, justifyContent:'center'}}>
                                                <Picker
                                                          selectedValue={this.state.Compensation}
                                                          
                                                          style={{height: 50, width:'100%'}}
                                                          onValueChange={(itemValue, itemIndex) =>
                                                              this.setState({Compensation: itemValue})
                                                          }>
                                                          <Picker.Item label="ตามตกลง" value="ตามตกลง" />
                                                          <Picker.Item label="ต่ำกว่า 9,000 บาท" value="ต่ำกว่า 9,000 บาท" />
                                                          <Picker.Item label="9,000 - 10,000 บาท" value="9,000 - 10,000 บาท" />
                                                          <Picker.Item label="10,000 - 15,000 บาท" value="10,000 - 15,000 บาท" />
                                                          <Picker.Item label="15,000 - 20,000 บาท" value="15,000 - 20,000 บาท" />
                                                          <Picker.Item label="20,000 - 25,000 บาท" value="20,000 - 25,000 บาท" />
                                                          <Picker.Item label="25,000 - 30,000 บาท" value="25,000 - 30,000 บาท" />
                                                          <Picker.Item label="30,000 - 35,000 บาท" value="30,000 - 35,000 บาท" />
                                                          <Picker.Item label="35,000 - 40,000 บาท" value="35,000 - 40,000 บาท" />
                                                          <Picker.Item label="40,000 - 45,000 บาท" value="40,000 - 45,000 บาท" />
                                                          <Picker.Item label="45,000 - 50,000 บาท" value="45,000 - 50,000 บาท" />
                                                          <Picker.Item label="50,000 - 55,000 บาท" value="50,000 - 55,000 บาท" />
                                                          <Picker.Item label="55,000 - 60,000 บาท" value="55,000 - 60,000 บาท" />
                                                          <Picker.Item label="60,000 - 65,000 บาท" value="60,000 - 65,000 บาท" />
                                                          <Picker.Item label="65,000 - 70,000 บาท" value="65,000 - 70,000 บาท" />
                                                          <Picker.Item label="70,000 - 75,000 บาท" value="70,000 - 75,000 บาท" />
                                                          <Picker.Item label="75,000 - 80,000 บาท" value="75,000 - 80,000 บาท" />
                                                          <Picker.Item label="80,000 - 85,000 บาท" value="80,000 - 85,000 บาท" />
                                                          <Picker.Item label="85,000 - 90,000 บาท" value="85,000 - 90,000 บาท" />
                                                          <Picker.Item label="90,000 - 95,000 บาท" value="90,000 - 95,000 บาท" />
                                                          <Picker.Item label="มากกว่า 100,000 บาท" value="มากกว่า 100,000 บาท" />
                                                      </Picker>
                                            </View>
                                            <Text style={{fontSize:20, color:"#450887", marginTop:20, marginLeft:10, alignSelf:'flex-start'}}>Experience</Text>
                                            <View style={{height: 50, width:'100%',borderColor: 'gray',borderRadius:10 , alignSelf:'center',
                                                    paddingHorizontal:10, backgroundColor:'#EBEBEB', margin:10, justifyContent:'center'}}>
                                                <Picker
                                                  selectedValue={this.state.Expert}
                                                  style={{height: 50, width:'100%'}}
                                                        onValueChange={(itemValue, itemIndex) =>
                                                              this.setState({Expert: itemValue})
                                                          }>
                                                          <Picker.Item label="0 ปี" value="0 ปี" />
                                                          <Picker.Item label="น้อยกว่า 1 ปี" value="น้อยกว่า 1 ปี" />
                                                          <Picker.Item label="1 - 2 ปี" value="1 - 2 ปี" />
                                                          <Picker.Item label="2 - 3 ปี" value="2 - 3 ปี" />
                                                          <Picker.Item label="3 - 4 ปี" value="3 - 4 ปี" />
                                                          <Picker.Item label="4 - 5 ปี" value="4 - 5 ปี" />
                                                          <Picker.Item label="5 - 6 ปี" value="5 - 6 ปี" />
                                                          <Picker.Item label="6 - 7 ปี" value="6 - 7 ปี" />
                                                          <Picker.Item label="มากกว่า 7 ปี" value="มากกว่า 7 ปี" />
                                                </Picker>
                                            </View>

                                            <Text style={{fontSize:24, width:300, marginLeft:10,  marginTop:10}}> About me </Text>
                                                <View style={{flex:1, backgroundColor:'#EBEBEB'}}>
                                                  <TextInput
                                                      style={{ borderBottomWidth:0,  backgroundColor:'#EBEBEB', height:200, marginTop:10, margin:10}}
                                                      value={this.state.aboutMe}
                                                      placeholder={this.state.aboutMe}
                                                      onChangeText={text=>this.setState({text:text, aboutMe:text})}
                                                      multiline={true}
                                                      underlineColorAndroid='transparent'
                                                  />
                                                </View>

                                        </View>
                                    </View>

                                    
                                  </View>
                                </View>
                            </View>
                            </View>
                        </View>
                        </ScrollView>
                </View>
                </View>  
 
            </View>
        );
    }
}    