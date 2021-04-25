import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View ,Text,TextInput,AsyncStorage, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Icon  } from 'react-native-elements'
import {url} from '../../var.js'
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import data from '../../data.json';

export default class Interesting_Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listInteereesting:["", "", "", ""],
            int1:'',
            int2:'',
            int3:'',
            int4:'',
            tmp1:'Select your interesting...',
            tmp2:'Select your interesting...',
            tmp3:'Select your interesting...',
            tmp4:'Select your interesting...',
            interestTemp:[],
            temp:[],
        };
        this.getAnnouncement()
      }

    getAnnouncement = async() => {
        var email = await AsyncStorage.getItem('email')
        await fetch(url+'/Employee_Profile?want='+email, {
            method: 'GET',
        }).then((response) => response.json()).then((respone) => {
            if(respone.response == 'Pass')
            {
                console.log('inside if')
                var datax = [];
                var x = JSON.parse(respone.data);
                this.setState({   interestTemp:x[0]['interest'] });
                console.log(this.state.interestTemp)
                var count = 1;
                this.state.interestTemp.forEach(element => {
                    this.state.temp.push({ list:element, num:count})
                    count++
                });
                this.setState({interestTemp:this.state.temp, tmp1:this.state.temp[0].list, tmp2:this.state.temp[1].list,
                                tmp3:this.state.temp[2].list, tmp4:this.state.temp[3].list
                })
                this.setState({ int1:this.state.tmp1, int2:this.state.tmp2, int3:this.state.tmp3, int4:this.state.tmp4 })
            }
            else
            {
                console.log('inside else')
                Alert.alert('กรุณาลองอีกครั้ง!!');
            }
        })
    }

    onSave = async() => {
        var email = await AsyncStorage.getItem('email')
        var data = {
            email : email,
            interest : [this.state.int1, this.state.int2, this.state.int3, this.state.int4]
        } 
        await fetch(url+'/Employee_Interesting', {
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
    }



    render(){
        return(
            <View style={{flex:1}}>

                <View style={{flex:0.1, justifyContent:'center', backgroundColor:'transparent', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Profile')}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Cancle</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.85, justifyContent:'center', backgroundColor:'transparent', alignItems:'center'}}>
                        <Text style={{fontSize:24, color:'#720DBA', backgroundColor:'transparent'}}>Interesting</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.onSave()}
                        style={{ flex:0.15, height:40, justifyContent:'center', margin:5}}> 
                        <Text style={{color:'#720DBA', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flex:0.9, backgroundColor:'white', alignItems:'center'}}>
                    <View style={{ backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center', borderWidth:0.5,
                                borderColor:'black', margin:5}}>
                        <Picker
                            selectedValue={this.state.tmp1}                       
                            style={{height: 50, width:'100%'}}
                            onValueChange={(itemValue, itemIndex) =>
                            this.setState({tmp1: itemValue, int1: itemValue})
                         }>
                            <Picker.Item label="Select your interesting..." value= {this.state.tmp1}/>
                            <Picker.Item label="กฎหมาย" value= "กฎหมาย"/>
                            <Picker.Item label="การตลาด" value= "การตลาด"/>
                            <Picker.Item label="กิจกรรมการตลาด" value="กิจกรรมการตลาด"/>
                            <Picker.Item label="พัฒนาธุรกิจ" value= "พัฒนาธุรกิจ"/>
                            <Picker.Item label="วิจัยตลาด" value= "วิจัยตลาด"/>
                            <Picker.Item label="หัวหน้า/ผู้จัดการ/ผู้บริหาร" value= "หัวหน้า/ผู้จัดการ/ผู้บริหาร"/>
                            <Picker.Item label="Advertising/Creative" value= "Advertising/Creative"/>
                            <Picker.Item label="Brand/Product Marketing" value= "Brand/Product Marketing"/>
                            <Picker.Item label="Digital Marketing" value= "Digital Marketing"/>
                            <Picker.Item label="Pretty/MC" value= "Pretty/MC"/>
                            <Picker.Item label="PR Marketing/Marketing Communications" value= "PR Marketing/Marketing Communications"/>
                            <Picker.Item label="เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่" value= "เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่"/>
                            <Picker.Item label="ขาย" value= "ขาย"/>
                            <Picker.Item label="ประสานงานขาย" value= "ประสานงานขาย"/>
                            <Picker.Item label="พนักงานขายทางโทรศัพท์/Telesales" value= "พนักงานขายทางโทรศัพท์/Telesales"/>
                            <Picker.Item label="พนักงานขาย/Sales/AE" value= "พนักงานขาย/Sales/AE"/>
                            <Picker.Item label="พนักงานแนะนำสินค้าประจำร้าน/PC" value= "พนักงานแนะนำสินค้าประจำร้าน/PC"/>
                            <Picker.Item label="วิศวกรขาย" value= "วิศวกรขาย"/>
                            <Picker.Item label="เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม" value= "เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม"/>
                            <Picker.Item label="พนักงานเขียนแบบ/AutoCad/Draftman" value= "พนักงานเขียนแบบ/AutoCad/Draftman"/>
                            <Picker.Item label="วิศวกรออกแบบ" value= "วิศวกรออกแบบ"/>
                            <Picker.Item label="คอมพิวเตอร์/IT/โปรแกรมเมอร์" value= "คอมพิวเตอร์/IT/โปรแกรมเมอร์"/>
                            <Picker.Item label="วิศวกรคอมพิวเตอร์" value= "วิศวกรคอมพิวเตอร์"/>
                            <Picker.Item label="Data Scientist" value= "Data Scientist"/>
                            <Picker.Item label="IT/Admin/Network Admin" value= "IT/Admin/Network Admin"/>
                            <Picker.Item label="IT Manager/Senior Programmer" value= "IT Manager/Senior Programmer"/>
                            <Picker.Item label="Mobile Application" value= "Mobile Application"/>
                            <Picker.Item label="Programmer" value= "Programmer"/>
                            <Picker.Item label="System Analyst" value= "System Analyst"/>
                            <Picker.Item label="Technical Support/Help Desk" value= "Technical Support/Help Desk"/>
                            <Picker.Item label="Tester" value= "Tester"/>
                            <Picker.Item label="UX/UI" value= "UX/UI"/>
                            <Picker.Item label="Web Programmer/Web Master" value= "Web Programmer/Web Master"/>
                            <Picker.Item label="งานการเงิน-ธนาคาร" value= "งานการเงิน-ธนาคาร"/>
                            <Picker.Item label="แคชเชียร์" value= "แคชเชียร์"/>
                            <Picker.Item label="งานการเงิน" value= "งานการเงิน"/>
                            <Picker.Item label="งานบริการด้านการเงิน" value= "งานบริการด้านการเงิน"/>
                            <Picker.Item label="งานเร่งรัดหนี้สิน" value= "งานเร่งรัดหนี้สิน"/>
                            <Picker.Item label="งานวิเคราะห์การลงทุน-กองทุน" value= "งานวิเคราะห์การลงทุน-กองทุน"/>
                            <Picker.Item label="งานสินเชื่อ-วิเคราะห์สินเชื่อ" value= "งานสินเชื่อ-วิเคราะห์สินเชื่อ"/>
                            <Picker.Item label="งานขนส่ง-คลังสินค้า" value= "งานขนส่ง-คลังสินค้า"/>
                            <Picker.Item label="งานขนส่ง" value= "งานขนส่ง"/>
                            <Picker.Item label="งานคลังสินค้า" value= "งานคลังสินค้า"/>
                            <Picker.Item label="เจ้าหน้าที่สิ่งแวดล้อม" value= "เจ้าหน้าที่สิ่งแวดล้อม"/>
                            <Picker.Item label="Shipping" value= "Shipping"/>
                            <Picker.Item label="Supply Chain" value= "Supply Chain"/>
                            <Picker.Item label="งานนำเข้า-ส่งออก" value= "งานนำเข้า-ส่งออก"/>
                            <Picker.Item label="พัฒนาองค์กร/ISO" value= "พัฒนาองค์กร/ISO"/>
                            <Picker.Item label="BOI" value= "BOI"/>
                            <Picker.Item label="งานต้อนรับลูกค้า" value= "งานต้อนรับลูกค้า"/>
                            <Picker.Item label="งานบริการลูกค้า" value= "งานบริการลูกค้า"/>
                            <Picker.Item label="ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์" value= "ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์"/>
                            <Picker.Item label="Call Center" value= "Call Center"/>
                            <Picker.Item label="งานบัญชี" value= "งานบัญชี"/>
                            <Picker.Item label="งานตรวจสอบบัญชี" value= "งานตรวจสอบบัญชี"/>
                            <Picker.Item label="งานธุรการบัญชี" value= "งานธุรการบัญชี"/>
                            <Picker.Item label="งานบัญชีทั่วไป" value= "งานบัญชีทั่วไป"/>
                            <Picker.Item label="งานบัญชีภาษีอากร" value= "งานบัญชีภาษีอากร"/>
                            <Picker.Item label="งานบัญชีรับ-จ่าย" value= "งานบัญชีรับ-จ่าย"/>
                            <Picker.Item label="งานบัญชีลูกหนี้-เจ้าหนี้" value= "งานบัญชีลูกหนี้-เจ้าหนี้"/>
                            <Picker.Item label="ช่างซ่อมบำรุง" value= "ช่างซ่อมบำรุง"/>
                            <Picker.Item label="งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume" value= "งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume"/>
                            <Picker.Item label="จัดซื้อ/ธุรการ/ประสานงานทั่วไป" value= "จัดซื้อ/ธุรการ/ประสานงานทั่วไป"/>
                            <Picker.Item label="จัดซื้อ" value= "จัดซื้อ"/>
                            <Picker.Item label="ธุรการทั่วไป" value= "ธุรการทั่วไป"/>
                            <Picker.Item label="ประสานงานทั่วไป" value= "ประสานงานทั่วไป"/>
                            <Picker.Item label="ป้อนข้อมูล" value= "ป้อนข้อมูล"/>
                            <Picker.Item label="เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO" value= "เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO"/>
                            <Picker.Item label="ช่างเทคนิค" value= "ช่างเทคนิค"/>
                            <Picker.Item label="ช่างพิมพ์" value= "ช่างพิมพ์"/>
                            <Picker.Item label="ช่างไฟฟ้า/อิเลคโทรนิค/คอมพิวเตอร์/สื่อสาร" value= "ช่างไฟฟ้า/อิเลคโทรนิค/คอมพิวเตอร์/สื่อสาร"/>
                            <Picker.Item label="ช่างยนต์/ช่างกลโรงงาน" value= "ช่างยนต์/ช่างกลโรงงาน"/>
                            <Picker.Item label="ช่างCNC/Mold/กลึง/เจียระไน" value= "ช่างCNC/Mold/กลึง/เจียระไน"/>
                            <Picker.Item label="นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา" value= "นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา"/>
                            <Picker.Item label="บุคคล/ฝึกอบรม" value= "บุคคล/ฝึกอบรม"/>
                            <Picker.Item label="งานว่าจ้างและเงินเดือน" value= "งานว่าจ้างและเงินเดือน"/>
                            <Picker.Item label="เจ้าหน้าที่ฝึกอบรม/วิทยากร" value= "เจ้าหน้าที่ฝึกอบรม/วิทยากร"/>
                            <Picker.Item label="พนักงานฝ่ายบุคคล" value= "พนักงานฝ่ายบุคคล"/>
                            <Picker.Item label="ผลิต/ควบคุมคุณภาพ/โรงงาน" value= "ผลิต/ควบคุมคุณภาพ/โรงงาน"/>
                            <Picker.Item label="ควบคุมคุณภาพ/QC/QA/QM" value= "ควบคุมคุณภาพ/QC/QA/QM"/>
                            <Picker.Item label="ควบคุมดูแลเครื่องจักร" value= "ควบคุมดูแลเครื่องจักร"/>
                            <Picker.Item label="ฝ่ายผลิต/โรงงาน" value= "ฝ่ายผลิต/โรงงาน"/>
                            <Picker.Item label="วางแผนการผลิต" value= "วางแผนการผลิต"/>
                            <Picker.Item label="ผู้จัดการ/ผู้อำนวยการ/MD/CEO" value= "ผู้จัดการ/ผู้อำนวยการ/MD/CEO"/>
                            <Picker.Item label="ผู้จัดการทั่วไป" value= "ผู้จัดการทั่วไป"/>
                            <Picker.Item label="ผู้จัดการฝ่ายการเงิน/CFO" value= "ผู้จัดการฝ่ายการเงิน/CFO"/>
                            <Picker.Item label="ผู้อำนวยการ/รองผู้อำนวยการ" value= "ผู้อำนวยการ/รองผู้อำนวยการ"/>
                            <Picker.Item label="MD/CEO" value= "MD/CEO"/>
                            <Picker.Item label="แผนกรักษาความปลอดภัย/งานอาคารจอดรถ" value= "แผนกรักษาความปลอดภัย/งานอาคารจอดรถ"/>
                            <Picker.Item label="แพทย์/เภสัชกร/สาธารณสุข" value= "แพทย์/เภสัชกร/สาธารณสุข"/>
                            <Picker.Item label="ทันตแพทย์" value= "ทันตแพทย์"/>
                            <Picker.Item label="เทคนิคการแพทย์" value= "เทคนิคการแพทย์"/>
                            <Picker.Item label="นักกายภาพบำบัด" value= "นักกายภาพบำบัด"/>
                            <Picker.Item label="นักโภชนาการ" value= "นักโภชนาการ"/>
                            <Picker.Item label="ผู้ช่วยทางการแพทย์" value= "ผู้ช่วยทางการแพทย์"/>
                            <Picker.Item label="พยาบาล" value= "พยาบาล"/>
                            <Picker.Item label="แพทย์" value= "แพทย์"/>
                            <Picker.Item label="เภสัชกร" value= "เภสัชกร"/>
                            <Picker.Item label="สัตวแพทย์/สัตวบาล" value= "สัตวแพทย์/สัตวบาล"/>
                            <Picker.Item label="ภูมิศาสตร์/แผนที่/GIS/ผังเมือง" value= "ภูมิศาสตร์/แผนที่/GIS/ผังเมือง"/>
                            <Picker.Item label="แม่บ้าน/พี่เลี้ยง/คนสวน" value= "แม่บ้าน/พี่เลี้ยง/คนสวน"/>
                            <Picker.Item label="คนสวน" value= "คนสวน"/>
                            <Picker.Item label="พนักงานทำความสะอาด/แม่บ้าน" value= "พนักงานทำความสะอาด/แม่บ้าน"/>
                            <Picker.Item label="พี่เลี้ยงเด็ก" value= "พี่เลี้ยงเด็ก"/>
                            <Picker.Item label="โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา" value= "โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา"/>
                            <Picker.Item label="ช่าง/คนงานทั่วไป" value= "ช่าง/คนงานทั่วไป"/>
                            <Picker.Item label="ประเมินราคา" value= "ประเมินราคา"/>
                            <Picker.Item label="ผู้บริหารโครงการ" value= "ผู้บริหารโครงการ"/>
                            <Picker.Item label="โฟร์แมน" value= "โฟร์แมน"/>
                            <Picker.Item label="ภูมิสถาปัตย์" value= "ภูมิสถาปัตย์"/>
                            <Picker.Item label="มัณฑนากร" value= "มัณฑนากร"/>
                            <Picker.Item label="วิศวกรโยธา/ก่อสร้าง" value= "วิศวกรโยธา/ก่อสร้าง"/>
                            <Picker.Item label="สถาปนิก" value= "สถาปนิก"/>
                            <Picker.Item label="สำรวจ" value= "สำรวจ"/>
                            <Picker.Item label="ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว" value= "ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว"/>
                            <Picker.Item label="จองห้อง/จองตั๋ว/Tour Operations" value= "จองห้อง/จองตั๋ว/Tour Operations"/>
                            <Picker.Item label="มัคคุเทศก์" value= "มัคคุเทศก์"/>
                            <Picker.Item label="ล่าม/นักแปล" value= "ล่าม/นักแปล"/>
                            <Picker.Item label="เลขานุการ" value= "เลขานุการ"/>
                            <Picker.Item label="ผู้ช่วยเลขานุการ" value= "ผู้ช่วยเลขานุการ"/>
                            <Picker.Item label="เลขานุการ/เลขานุการผู้บริหาร" value= "เลขานุการ/เลขานุการผู้บริหาร"/>
                            <Picker.Item label="วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)" value= "วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)"/>
                            <Picker.Item label="วิเคราะห์ข้อมูลทั่วไป" value= "วิเคราะห์ข้อมูลทั่วไป"/>
                            <Picker.Item label="Data Scientist" value= "Data Scientist"/>
                            <Picker.Item label="วิทยาศาสตร์/Lab/วิจัยพัฒนา" value= "วิทยาศาสตร์/Lab/วิจัยพัฒนา"/>
                            <Picker.Item label="เจ้าหน้าที่ห้องปฎิบัติการ(LAB)" value= "เจ้าหน้าที่ห้องปฎิบัติการ(LAB)"/>
                            <Picker.Item label="นักวิจัยและพัฒนาผลิตภัณฑ์" value= "นักวิจัยและพัฒนาผลิตภัณฑ์"/>
                            <Picker.Item label="นักวิทยาศาสตร์/เคมี/ชีวะ/ฟิสิกส์" value= "นักวิทยาศาสตร์/เคมี/ชีวะ/ฟิสิกส์"/>
                            <Picker.Item label="วิทยาศาสตร์การอาหาร" value= "วิทยาศาสตร์การอาหาร"/>
                            <Picker.Item label="วิศวกร" value= "วิศวกร"/>
                            <Picker.Item label="วิศวกรการผลิต" value= "วิศวกรการผลิต"/>
                            <Picker.Item label="วิศวกรคอมพิวเตอร์" value= "วิศวกรคอมพิวเตอร์"/>
                            <Picker.Item label="วิศวกรเคมี/ปิโตรเลียม" value= "วิศวกรเคมี/ปิโตรเลียม"/>
                            <Picker.Item label="วิศวกรเครื่องกล/ยานยนต์" value= "วิศวกรเครื่องกล/ยานยนต์"/>
                            <Picker.Item label="วิศวกรบำรุงรักษา" value= "วิศวกรบำรุงรักษา"/>
                            <Picker.Item label="วิศวกรประเมินราคา" value= "วิศวกรประเมินราคา"/>
                            <Picker.Item label="วิศวกรไฟฟ้า/อิเลคโทรนิค/สื่อสาร" value= "วิศวกรไฟฟ้า/อิเลคโทรนิค/สื่อสาร"/>
                            <Picker.Item label="วิศวกรโยธา/ก่อสร้าง" value= "วิศวกรโยธา/ก่อสร้าง"/>
                            <Picker.Item label="วิศวกรรมงานระบบประกอบอาคาร" value= "วิศวกรรมงานระบบประกอบอาคาร"/>
                            <Picker.Item label="วิศวกรสำรวจ" value= "วิศวกรสำรวจ"/>
                            <Picker.Item label="วิศวกรสิ่งแวดล้อม" value= "วิศวกรสิ่งแวดล้อม"/>
                            <Picker.Item label="วิศวกรอุตสาหการ/โรงงาน" value= "วิศวกรอุตสาหการ/โรงงาน"/>
                            <Picker.Item label="ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ" value= "ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ"/>
                            <Picker.Item label="ช่างภาพ" value= "ช่างภาพ"/>
                            <Picker.Item label="ช่างศิลป์(Sculpture/Print/Paint/Drawing)" value= "ช่างศิลป์(Sculpture/Print/Paint/Drawing)"/>
                            <Picker.Item label="ออกแบบเครื่องประดับ" value= "ออกแบบเครื่องประดับ"/>
                            <Picker.Item label="ออกแบบผลิตภัณฑ์/ออกแบบบรรจุภัณฑ์" value= "ออกแบบผลิตภัณฑ์/ออกแบบบรรจุภัณฑ์"/>
                            <Picker.Item label="Computer Graphic/3D/Animation" value= "Computer Graphic/3D/Animation"/>
                            <Picker.Item label="Graphic Design/สิ่งพิมพ์" value= "Graphic Design/สิ่งพิมพ์"/>
                            <Picker.Item label="Web Design" value= "Web Design"/>
                            <Picker.Item label="ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์" value= "ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์"/>
                            <Picker.Item label="ขับรถส่งเอกสาร/ส่งผลิตภัณฑ์" value= "ขับรถส่งเอกสาร/ส่งผลิตภัณฑ์"/>
                            <Picker.Item label="พนักงานขับรถ/ขับรถผู้บริหาร" value= "พนักงานขับรถ/ขับรถผู้บริหาร"/>
                            <Picker.Item label="สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์" value= "สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์"/>
                            <Picker.Item label="สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา" value= "สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา"/>
                            <Picker.Item label="เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น" value= "เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น"/>
                            <Picker.Item label="ช่างแพทเทิร์น/มาร์ก/ตัดผ้า" value= "ช่างแพทเทิร์น/มาร์ก/ตัดผ้า"/>
                            <Picker.Item label="พนักงานโรงงานเสื้อผ้า/สิ่งทอ" value= "พนักงานโรงงานเสื้อผ้า/สิ่งทอ"/>
                            <Picker.Item label="ออกแบบลายผ้า/เสื้อผ้า" value= "ออกแบบลายผ้า/เสื้อผ้า"/>
                            <Picker.Item label="Merchandiser" value= "Merchandiser"/>
                            <Picker.Item label="ออกแบบเว็บไซต์/Web" value= "ออกแบบเว็บไซต์/Web"/>
                            <Picker.Item label="Web Content" value= "Web Content"/>
                            <Picker.Item label="Web Programmer/Web Master" value= "Web Programmer/Web Master"/>
                            <Picker.Item label="อัญมณีและเครื่องประดับ" value= "อัญมณีและเครื่องประดับ"/>
                            <Picker.Item label="ช่าง Jewelry/ทอง/เงิน" value= "ช่าง Jewelry/ทอง/เงิน"/>
                            <Picker.Item label="ตรวจสอบคุณภาพอัญมณี" value= "ตรวจสอบคุณภาพอัญมณี"/>
                            <Picker.Item label="อาจารย์/ครู/งานวิชาการ" value= "อาจารย์/ครู/งานวิชาการ"/>
                            <Picker.Item label="อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ" value= "อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ"/>
                            <Picker.Item label="กุ๊กอาหารไทย/นานาชาติ" value= "กุ๊กอาหารไทย/นานาชาติ"/>
                            <Picker.Item label="บาร์เทนเดอร์" value= "บาร์เทนเดอร์"/>
                            <Picker.Item label="พนักงานต้อนรับ" value= "พนักงานต้อนรับ"/>
                            <Picker.Item label="พนักงานร้านกาแฟ/Barista" value= "พนักงานร้านกาแฟ/Barista"/>
                            <Picker.Item label="พนักงานเสิร์ฟ" value= "พนักงานเสิร์ฟ"/>
                            <Picker.Item label="งาน Part-time/พนักงานชั่วคราว" value= "งาน Part-time/พนักงานชั่วคราว"/>
                            <Picker.Item label="นักศึกษาฝึกงาน" value= "นักศึกษาฝึกงาน"/>
                            <Picker.Item label="พนักงานชั่วคราว(Temporary)" value= "พนักงานชั่วคราว(Temporary)"/>
                            <Picker.Item label="พนักงานPart-time(รายวัน/รายชั่วโมง)" value= "พนักงานPart-time(รายวัน/รายชั่วโมง)"/>
                            <Picker.Item label="Freelance" value= "Freelance"/>
                            <Picker.Item label="กราฟฟิค/สื่อสิงพิมพ์/Designer" value= "กราฟฟิค/สื่อสิงพิมพ์/Designer"/>
                            <Picker.Item label="การตลาด" value= "การตลาด"/>
                            <Picker.Item label="ไกด์/มัคคุเทศก์" value= "ไกด์/มัคคุเทศก์"/>
                            <Picker.Item label="ขับรถ" value= "ขับรถ"/>
                            <Picker.Item label="ขาย" value= "ขาย"/>
                            <Picker.Item label="คีย์ข้อมูล" value= "คีย์ข้อมูล"/>
                            <Picker.Item label="งานบันเทิง/นักแสดง/นางแบบ/นักร้อง" value= "งานบันเทิง/นักแสดง/นางแบบ/นักร้อง"/>
                            <Picker.Item label="ช่างภาพ/VDO" value= "ช่างภาพ/VDO"/>
                            <Picker.Item label="ติวเตอร์/สอนพิเศษ" value= "ติวเตอร์/สอนพิเศษ"/>
                            <Picker.Item label="แต่งหน้า/ทำผม/Stylist" value= "แต่งหน้า/ทำผม/Stylist"/>
                            <Picker.Item label="ทำสวน" value= "ทำสวน"/>
                            <Picker.Item label="นักเขียน/นักแปลภาษา" value= "นักเขียน/นักแปลภาษา"/>
                            <Picker.Item label="โปรแกรมเมอร์/IT" value= "โปรแกรมเมอร์/IT"/>
                            <Picker.Item label="ออแกไนซ์/อีเว้นท์" value= "ออแกไนซ์/อีเว้นท์"/>
                                                          
                        </Picker>
                    </View>
                    <View style={{ backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center', borderWidth:0.5,
                                borderColor:'black', margin:5}}>
                        <Picker
                            selectedValue={this.state.tmp2}                       
                            style={{height: 50, width:'100%'}}
                            onValueChange={(itemValue, itemIndex) =>
                            this.setState({tmp2: itemValue, int2: itemValue})
                         }>
                            <Picker.Item label="Select your interesting..." value= {this.state.tmp2}/>
                            <Picker.Item label="กฎหมาย" value= "กฎหมาย"/>
                            <Picker.Item label="การตลาด" value= "การตลาด"/>
                            <Picker.Item label="กิจกรรมการตลาด" value="กิจกรรมการตลาด"/>
                            <Picker.Item label="พัฒนาธุรกิจ" value= "พัฒนาธุรกิจ"/>
                            <Picker.Item label="วิจัยตลาด" value= "วิจัยตลาด"/>
                            <Picker.Item label="หัวหน้า/ผู้จัดการ/ผู้บริหาร" value= "หัวหน้า/ผู้จัดการ/ผู้บริหาร"/>
                            <Picker.Item label="Advertising/Creative" value= "Advertising/Creative"/>
                            <Picker.Item label="Brand/Product Marketing" value= "Brand/Product Marketing"/>
                            <Picker.Item label="Digital Marketing" value= "Digital Marketing"/>
                            <Picker.Item label="Pretty/MC" value= "Pretty/MC"/>
                            <Picker.Item label="PR Marketing/Marketing Communications" value= "PR Marketing/Marketing Communications"/>
                            <Picker.Item label="เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่" value= "เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่"/>
                            <Picker.Item label="ขาย" value= "ขาย"/>
                            <Picker.Item label="ประสานงานขาย" value= "ประสานงานขาย"/>
                            <Picker.Item label="พนักงานขายทางโทรศัพท์/Telesales" value= "พนักงานขายทางโทรศัพท์/Telesales"/>
                            <Picker.Item label="พนักงานขาย/Sales/AE" value= "พนักงานขาย/Sales/AE"/>
                            <Picker.Item label="พนักงานแนะนำสินค้าประจำร้าน/PC" value= "พนักงานแนะนำสินค้าประจำร้าน/PC"/>
                            <Picker.Item label="วิศวกรขาย" value= "วิศวกรขาย"/>
                            <Picker.Item label="เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม" value= "เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม"/>
                            <Picker.Item label="พนักงานเขียนแบบ/AutoCad/Draftman" value= "พนักงานเขียนแบบ/AutoCad/Draftman"/>
                            <Picker.Item label="วิศวกรออกแบบ" value= "วิศวกรออกแบบ"/>
                            <Picker.Item label="คอมพิวเตอร์/IT/โปรแกรมเมอร์" value= "คอมพิวเตอร์/IT/โปรแกรมเมอร์"/>
                            <Picker.Item label="วิศวกรคอมพิวเตอร์" value= "วิศวกรคอมพิวเตอร์"/>
                            <Picker.Item label="Data Scientist" value= "Data Scientist"/>
                            <Picker.Item label="IT/Admin/Network Admin" value= "IT/Admin/Network Admin"/>
                            <Picker.Item label="IT Manager/Senior Programmer" value= "IT Manager/Senior Programmer"/>
                            <Picker.Item label="Mobile Application" value= "Mobile Application"/>
                            <Picker.Item label="Programmer" value= "Programmer"/>
                            <Picker.Item label="System Analyst" value= "System Analyst"/>
                            <Picker.Item label="Technical Support/Help Desk" value= "Technical Support/Help Desk"/>
                            <Picker.Item label="Tester" value= "Tester"/>
                            <Picker.Item label="UX/UI" value= "UX/UI"/>
                            <Picker.Item label="Web Programmer/Web Master" value= "Web Programmer/Web Master"/>
                            <Picker.Item label="งานการเงิน-ธนาคาร" value= "งานการเงิน-ธนาคาร"/>
                            <Picker.Item label="แคชเชียร์" value= "แคชเชียร์"/>
                            <Picker.Item label="งานการเงิน" value= "งานการเงิน"/>
                            <Picker.Item label="งานบริการด้านการเงิน" value= "งานบริการด้านการเงิน"/>
                            <Picker.Item label="งานเร่งรัดหนี้สิน" value= "งานเร่งรัดหนี้สิน"/>
                            <Picker.Item label="งานวิเคราะห์การลงทุน-กองทุน" value= "งานวิเคราะห์การลงทุน-กองทุน"/>
                            <Picker.Item label="งานสินเชื่อ-วิเคราะห์สินเชื่อ" value= "งานสินเชื่อ-วิเคราะห์สินเชื่อ"/>
                            <Picker.Item label="งานขนส่ง-คลังสินค้า" value= "งานขนส่ง-คลังสินค้า"/>
                            <Picker.Item label="งานขนส่ง" value= "งานขนส่ง"/>
                            <Picker.Item label="งานคลังสินค้า" value= "งานคลังสินค้า"/>
                            <Picker.Item label="เจ้าหน้าที่สิ่งแวดล้อม" value= "เจ้าหน้าที่สิ่งแวดล้อม"/>
                            <Picker.Item label="Shipping" value= "Shipping"/>
                            <Picker.Item label="Supply Chain" value= "Supply Chain"/>
                            <Picker.Item label="งานนำเข้า-ส่งออก" value= "งานนำเข้า-ส่งออก"/>
                            <Picker.Item label="พัฒนาองค์กร/ISO" value= "พัฒนาองค์กร/ISO"/>
                            <Picker.Item label="BOI" value= "BOI"/>
                            <Picker.Item label="งานต้อนรับลูกค้า" value= "งานต้อนรับลูกค้า"/>
                            <Picker.Item label="งานบริการลูกค้า" value= "งานบริการลูกค้า"/>
                            <Picker.Item label="ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์" value= "ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์"/>
                            <Picker.Item label="Call Center" value= "Call Center"/>
                            <Picker.Item label="งานบัญชี" value= "งานบัญชี"/>
                            <Picker.Item label="งานตรวจสอบบัญชี" value= "งานตรวจสอบบัญชี"/>
                            <Picker.Item label="งานธุรการบัญชี" value= "งานธุรการบัญชี"/>
                            <Picker.Item label="งานบัญชีทั่วไป" value= "งานบัญชีทั่วไป"/>
                            <Picker.Item label="งานบัญชีภาษีอากร" value= "งานบัญชีภาษีอากร"/>
                            <Picker.Item label="งานบัญชีรับ-จ่าย" value= "งานบัญชีรับ-จ่าย"/>
                            <Picker.Item label="งานบัญชีลูกหนี้-เจ้าหนี้" value= "งานบัญชีลูกหนี้-เจ้าหนี้"/>
                            <Picker.Item label="ช่างซ่อมบำรุง" value= "ช่างซ่อมบำรุง"/>
                            <Picker.Item label="งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume" value= "งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume"/>
                            <Picker.Item label="จัดซื้อ/ธุรการ/ประสานงานทั่วไป" value= "จัดซื้อ/ธุรการ/ประสานงานทั่วไป"/>
                            <Picker.Item label="จัดซื้อ" value= "จัดซื้อ"/>
                            <Picker.Item label="ธุรการทั่วไป" value= "ธุรการทั่วไป"/>
                            <Picker.Item label="ประสานงานทั่วไป" value= "ประสานงานทั่วไป"/>
                            <Picker.Item label="ป้อนข้อมูล" value= "ป้อนข้อมูล"/>
                            <Picker.Item label="เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO" value= "เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO"/>
                            <Picker.Item label="ช่างเทคนิค" value= "ช่างเทคนิค"/>
                            <Picker.Item label="ช่างพิมพ์" value= "ช่างพิมพ์"/>
                            <Picker.Item label="ช่างไฟฟ้า/อิเลคโทรนิค/คอมพิวเตอร์/สื่อสาร" value= "ช่างไฟฟ้า/อิเลคโทรนิค/คอมพิวเตอร์/สื่อสาร"/>
                            <Picker.Item label="ช่างยนต์/ช่างกลโรงงาน" value= "ช่างยนต์/ช่างกลโรงงาน"/>
                            <Picker.Item label="ช่างCNC/Mold/กลึง/เจียระไน" value= "ช่างCNC/Mold/กลึง/เจียระไน"/>
                            <Picker.Item label="นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา" value= "นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา"/>
                            <Picker.Item label="บุคคล/ฝึกอบรม" value= "บุคคล/ฝึกอบรม"/>
                            <Picker.Item label="งานว่าจ้างและเงินเดือน" value= "งานว่าจ้างและเงินเดือน"/>
                            <Picker.Item label="เจ้าหน้าที่ฝึกอบรม/วิทยากร" value= "เจ้าหน้าที่ฝึกอบรม/วิทยากร"/>
                            <Picker.Item label="พนักงานฝ่ายบุคคล" value= "พนักงานฝ่ายบุคคล"/>
                            <Picker.Item label="ผลิต/ควบคุมคุณภาพ/โรงงาน" value= "ผลิต/ควบคุมคุณภาพ/โรงงาน"/>
                            <Picker.Item label="ควบคุมคุณภาพ/QC/QA/QM" value= "ควบคุมคุณภาพ/QC/QA/QM"/>
                            <Picker.Item label="ควบคุมดูแลเครื่องจักร" value= "ควบคุมดูแลเครื่องจักร"/>
                            <Picker.Item label="ฝ่ายผลิต/โรงงาน" value= "ฝ่ายผลิต/โรงงาน"/>
                            <Picker.Item label="วางแผนการผลิต" value= "วางแผนการผลิต"/>
                            <Picker.Item label="ผู้จัดการ/ผู้อำนวยการ/MD/CEO" value= "ผู้จัดการ/ผู้อำนวยการ/MD/CEO"/>
                            <Picker.Item label="ผู้จัดการทั่วไป" value= "ผู้จัดการทั่วไป"/>
                            <Picker.Item label="ผู้จัดการฝ่ายการเงิน/CFO" value= "ผู้จัดการฝ่ายการเงิน/CFO"/>
                            <Picker.Item label="ผู้อำนวยการ/รองผู้อำนวยการ" value= "ผู้อำนวยการ/รองผู้อำนวยการ"/>
                            <Picker.Item label="MD/CEO" value= "MD/CEO"/>
                            <Picker.Item label="แผนกรักษาความปลอดภัย/งานอาคารจอดรถ" value= "แผนกรักษาความปลอดภัย/งานอาคารจอดรถ"/>
                            <Picker.Item label="แพทย์/เภสัชกร/สาธารณสุข" value= "แพทย์/เภสัชกร/สาธารณสุข"/>
                            <Picker.Item label="ทันตแพทย์" value= "ทันตแพทย์"/>
                            <Picker.Item label="เทคนิคการแพทย์" value= "เทคนิคการแพทย์"/>
                            <Picker.Item label="นักกายภาพบำบัด" value= "นักกายภาพบำบัด"/>
                            <Picker.Item label="นักโภชนาการ" value= "นักโภชนาการ"/>
                            <Picker.Item label="ผู้ช่วยทางการแพทย์" value= "ผู้ช่วยทางการแพทย์"/>
                            <Picker.Item label="พยาบาล" value= "พยาบาล"/>
                            <Picker.Item label="แพทย์" value= "แพทย์"/>
                            <Picker.Item label="เภสัชกร" value= "เภสัชกร"/>
                            <Picker.Item label="สัตวแพทย์/สัตวบาล" value= "สัตวแพทย์/สัตวบาล"/>
                            <Picker.Item label="ภูมิศาสตร์/แผนที่/GIS/ผังเมือง" value= "ภูมิศาสตร์/แผนที่/GIS/ผังเมือง"/>
                            <Picker.Item label="แม่บ้าน/พี่เลี้ยง/คนสวน" value= "แม่บ้าน/พี่เลี้ยง/คนสวน"/>
                            <Picker.Item label="คนสวน" value= "คนสวน"/>
                            <Picker.Item label="พนักงานทำความสะอาด/แม่บ้าน" value= "พนักงานทำความสะอาด/แม่บ้าน"/>
                            <Picker.Item label="พี่เลี้ยงเด็ก" value= "พี่เลี้ยงเด็ก"/>
                            <Picker.Item label="โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา" value= "โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา"/>
                            <Picker.Item label="ช่าง/คนงานทั่วไป" value= "ช่าง/คนงานทั่วไป"/>
                            <Picker.Item label="ประเมินราคา" value= "ประเมินราคา"/>
                            <Picker.Item label="ผู้บริหารโครงการ" value= "ผู้บริหารโครงการ"/>
                            <Picker.Item label="โฟร์แมน" value= "โฟร์แมน"/>
                            <Picker.Item label="ภูมิสถาปัตย์" value= "ภูมิสถาปัตย์"/>
                            <Picker.Item label="มัณฑนากร" value= "มัณฑนากร"/>
                            <Picker.Item label="วิศวกรโยธา/ก่อสร้าง" value= "วิศวกรโยธา/ก่อสร้าง"/>
                            <Picker.Item label="สถาปนิก" value= "สถาปนิก"/>
                            <Picker.Item label="สำรวจ" value= "สำรวจ"/>
                            <Picker.Item label="ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว" value= "ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว"/>
                            <Picker.Item label="จองห้อง/จองตั๋ว/Tour Operations" value= "จองห้อง/จองตั๋ว/Tour Operations"/>
                            <Picker.Item label="มัคคุเทศก์" value= "มัคคุเทศก์"/>
                            <Picker.Item label="ล่าม/นักแปล" value= "ล่าม/นักแปล"/>
                            <Picker.Item label="เลขานุการ" value= "เลขานุการ"/>
                            <Picker.Item label="ผู้ช่วยเลขานุการ" value= "ผู้ช่วยเลขานุการ"/>
                            <Picker.Item label="เลขานุการ/เลขานุการผู้บริหาร" value= "เลขานุการ/เลขานุการผู้บริหาร"/>
                            <Picker.Item label="วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)" value= "วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)"/>
                            <Picker.Item label="วิเคราะห์ข้อมูลทั่วไป" value= "วิเคราะห์ข้อมูลทั่วไป"/>
                            <Picker.Item label="Data Scientist" value= "Data Scientist"/>
                            <Picker.Item label="วิทยาศาสตร์/Lab/วิจัยพัฒนา" value= "วิทยาศาสตร์/Lab/วิจัยพัฒนา"/>
                            <Picker.Item label="เจ้าหน้าที่ห้องปฎิบัติการ(LAB)" value= "เจ้าหน้าที่ห้องปฎิบัติการ(LAB)"/>
                            <Picker.Item label="นักวิจัยและพัฒนาผลิตภัณฑ์" value= "นักวิจัยและพัฒนาผลิตภัณฑ์"/>
                            <Picker.Item label="นักวิทยาศาสตร์/เคมี/ชีวะ/ฟิสิกส์" value= "นักวิทยาศาสตร์/เคมี/ชีวะ/ฟิสิกส์"/>
                            <Picker.Item label="วิทยาศาสตร์การอาหาร" value= "วิทยาศาสตร์การอาหาร"/>
                            <Picker.Item label="วิศวกร" value= "วิศวกร"/>
                            <Picker.Item label="วิศวกรการผลิต" value= "วิศวกรการผลิต"/>
                            <Picker.Item label="วิศวกรคอมพิวเตอร์" value= "วิศวกรคอมพิวเตอร์"/>
                            <Picker.Item label="วิศวกรเคมี/ปิโตรเลียม" value= "วิศวกรเคมี/ปิโตรเลียม"/>
                            <Picker.Item label="วิศวกรเครื่องกล/ยานยนต์" value= "วิศวกรเครื่องกล/ยานยนต์"/>
                            <Picker.Item label="วิศวกรบำรุงรักษา" value= "วิศวกรบำรุงรักษา"/>
                            <Picker.Item label="วิศวกรประเมินราคา" value= "วิศวกรประเมินราคา"/>
                            <Picker.Item label="วิศวกรไฟฟ้า/อิเลคโทรนิค/สื่อสาร" value= "วิศวกรไฟฟ้า/อิเลคโทรนิค/สื่อสาร"/>
                            <Picker.Item label="วิศวกรโยธา/ก่อสร้าง" value= "วิศวกรโยธา/ก่อสร้าง"/>
                            <Picker.Item label="วิศวกรรมงานระบบประกอบอาคาร" value= "วิศวกรรมงานระบบประกอบอาคาร"/>
                            <Picker.Item label="วิศวกรสำรวจ" value= "วิศวกรสำรวจ"/>
                            <Picker.Item label="วิศวกรสิ่งแวดล้อม" value= "วิศวกรสิ่งแวดล้อม"/>
                            <Picker.Item label="วิศวกรอุตสาหการ/โรงงาน" value= "วิศวกรอุตสาหการ/โรงงาน"/>
                            <Picker.Item label="ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ" value= "ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ"/>
                            <Picker.Item label="ช่างภาพ" value= "ช่างภาพ"/>
                            <Picker.Item label="ช่างศิลป์(Sculpture/Print/Paint/Drawing)" value= "ช่างศิลป์(Sculpture/Print/Paint/Drawing)"/>
                            <Picker.Item label="ออกแบบเครื่องประดับ" value= "ออกแบบเครื่องประดับ"/>
                            <Picker.Item label="ออกแบบผลิตภัณฑ์/ออกแบบบรรจุภัณฑ์" value= "ออกแบบผลิตภัณฑ์/ออกแบบบรรจุภัณฑ์"/>
                            <Picker.Item label="Computer Graphic/3D/Animation" value= "Computer Graphic/3D/Animation"/>
                            <Picker.Item label="Graphic Design/สิ่งพิมพ์" value= "Graphic Design/สิ่งพิมพ์"/>
                            <Picker.Item label="Web Design" value= "Web Design"/>
                            <Picker.Item label="ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์" value= "ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์"/>
                            <Picker.Item label="ขับรถส่งเอกสาร/ส่งผลิตภัณฑ์" value= "ขับรถส่งเอกสาร/ส่งผลิตภัณฑ์"/>
                            <Picker.Item label="พนักงานขับรถ/ขับรถผู้บริหาร" value= "พนักงานขับรถ/ขับรถผู้บริหาร"/>
                            <Picker.Item label="สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์" value= "สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์"/>
                            <Picker.Item label="สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา" value= "สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา"/>
                            <Picker.Item label="เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น" value= "เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น"/>
                            <Picker.Item label="ช่างแพทเทิร์น/มาร์ก/ตัดผ้า" value= "ช่างแพทเทิร์น/มาร์ก/ตัดผ้า"/>
                            <Picker.Item label="พนักงานโรงงานเสื้อผ้า/สิ่งทอ" value= "พนักงานโรงงานเสื้อผ้า/สิ่งทอ"/>
                            <Picker.Item label="ออกแบบลายผ้า/เสื้อผ้า" value= "ออกแบบลายผ้า/เสื้อผ้า"/>
                            <Picker.Item label="Merchandiser" value= "Merchandiser"/>
                            <Picker.Item label="ออกแบบเว็บไซต์/Web" value= "ออกแบบเว็บไซต์/Web"/>
                            <Picker.Item label="Web Content" value= "Web Content"/>
                            <Picker.Item label="Web Programmer/Web Master" value= "Web Programmer/Web Master"/>
                            <Picker.Item label="อัญมณีและเครื่องประดับ" value= "อัญมณีและเครื่องประดับ"/>
                            <Picker.Item label="ช่าง Jewelry/ทอง/เงิน" value= "ช่าง Jewelry/ทอง/เงิน"/>
                            <Picker.Item label="ตรวจสอบคุณภาพอัญมณี" value= "ตรวจสอบคุณภาพอัญมณี"/>
                            <Picker.Item label="อาจารย์/ครู/งานวิชาการ" value= "อาจารย์/ครู/งานวิชาการ"/>
                            <Picker.Item label="อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ" value= "อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ"/>
                            <Picker.Item label="กุ๊กอาหารไทย/นานาชาติ" value= "กุ๊กอาหารไทย/นานาชาติ"/>
                            <Picker.Item label="บาร์เทนเดอร์" value= "บาร์เทนเดอร์"/>
                            <Picker.Item label="พนักงานต้อนรับ" value= "พนักงานต้อนรับ"/>
                            <Picker.Item label="พนักงานร้านกาแฟ/Barista" value= "พนักงานร้านกาแฟ/Barista"/>
                            <Picker.Item label="พนักงานเสิร์ฟ" value= "พนักงานเสิร์ฟ"/>
                            <Picker.Item label="งาน Part-time/พนักงานชั่วคราว" value= "งาน Part-time/พนักงานชั่วคราว"/>
                            <Picker.Item label="นักศึกษาฝึกงาน" value= "นักศึกษาฝึกงาน"/>
                            <Picker.Item label="พนักงานชั่วคราว(Temporary)" value= "พนักงานชั่วคราว(Temporary)"/>
                            <Picker.Item label="พนักงานPart-time(รายวัน/รายชั่วโมง)" value= "พนักงานPart-time(รายวัน/รายชั่วโมง)"/>
                            <Picker.Item label="Freelance" value= "Freelance"/>
                            <Picker.Item label="กราฟฟิค/สื่อสิงพิมพ์/Designer" value= "กราฟฟิค/สื่อสิงพิมพ์/Designer"/>
                            <Picker.Item label="การตลาด" value= "การตลาด"/>
                            <Picker.Item label="ไกด์/มัคคุเทศก์" value= "ไกด์/มัคคุเทศก์"/>
                            <Picker.Item label="ขับรถ" value= "ขับรถ"/>
                            <Picker.Item label="ขาย" value= "ขาย"/>
                            <Picker.Item label="คีย์ข้อมูล" value= "คีย์ข้อมูล"/>
                            <Picker.Item label="งานบันเทิง/นักแสดง/นางแบบ/นักร้อง" value= "งานบันเทิง/นักแสดง/นางแบบ/นักร้อง"/>
                            <Picker.Item label="ช่างภาพ/VDO" value= "ช่างภาพ/VDO"/>
                            <Picker.Item label="ติวเตอร์/สอนพิเศษ" value= "ติวเตอร์/สอนพิเศษ"/>
                            <Picker.Item label="แต่งหน้า/ทำผม/Stylist" value= "แต่งหน้า/ทำผม/Stylist"/>
                            <Picker.Item label="ทำสวน" value= "ทำสวน"/>
                            <Picker.Item label="นักเขียน/นักแปลภาษา" value= "นักเขียน/นักแปลภาษา"/>
                            <Picker.Item label="โปรแกรมเมอร์/IT" value= "โปรแกรมเมอร์/IT"/>
                            <Picker.Item label="ออแกไนซ์/อีเว้นท์" value= "ออแกไนซ์/อีเว้นท์"/>
                                                          
                        </Picker>
                    </View>
                    <View style={{ backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center', borderWidth:0.5,
                                borderColor:'black', margin:5}}>
                        <Picker
                            selectedValue={this.state.tmp3}                       
                            style={{height: 50, width:'100%'}}
                            onValueChange={(itemValue, itemIndex) =>
                            this.setState({tmp3: itemValue, int3: itemValue})
                         }>
                            <Picker.Item label="Select your interesting..." value= {this.state.tmp3}/>
                            <Picker.Item label="กฎหมาย" value= "กฎหมาย"/>
                            <Picker.Item label="การตลาด" value= "การตลาด"/>
                            <Picker.Item label="กิจกรรมการตลาด" value="กิจกรรมการตลาด"/>
                            <Picker.Item label="พัฒนาธุรกิจ" value= "พัฒนาธุรกิจ"/>
                            <Picker.Item label="วิจัยตลาด" value= "วิจัยตลาด"/>
                            <Picker.Item label="หัวหน้า/ผู้จัดการ/ผู้บริหาร" value= "หัวหน้า/ผู้จัดการ/ผู้บริหาร"/>
                            <Picker.Item label="Advertising/Creative" value= "Advertising/Creative"/>
                            <Picker.Item label="Brand/Product Marketing" value= "Brand/Product Marketing"/>
                            <Picker.Item label="Digital Marketing" value= "Digital Marketing"/>
                            <Picker.Item label="Pretty/MC" value= "Pretty/MC"/>
                            <Picker.Item label="PR Marketing/Marketing Communications" value= "PR Marketing/Marketing Communications"/>
                            <Picker.Item label="เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่" value= "เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่"/>
                            <Picker.Item label="ขาย" value= "ขาย"/>
                            <Picker.Item label="ประสานงานขาย" value= "ประสานงานขาย"/>
                            <Picker.Item label="พนักงานขายทางโทรศัพท์/Telesales" value= "พนักงานขายทางโทรศัพท์/Telesales"/>
                            <Picker.Item label="พนักงานขาย/Sales/AE" value= "พนักงานขาย/Sales/AE"/>
                            <Picker.Item label="พนักงานแนะนำสินค้าประจำร้าน/PC" value= "พนักงานแนะนำสินค้าประจำร้าน/PC"/>
                            <Picker.Item label="วิศวกรขาย" value= "วิศวกรขาย"/>
                            <Picker.Item label="เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม" value= "เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม"/>
                            <Picker.Item label="พนักงานเขียนแบบ/AutoCad/Draftman" value= "พนักงานเขียนแบบ/AutoCad/Draftman"/>
                            <Picker.Item label="วิศวกรออกแบบ" value= "วิศวกรออกแบบ"/>
                            <Picker.Item label="คอมพิวเตอร์/IT/โปรแกรมเมอร์" value= "คอมพิวเตอร์/IT/โปรแกรมเมอร์"/>
                            <Picker.Item label="วิศวกรคอมพิวเตอร์" value= "วิศวกรคอมพิวเตอร์"/>
                            <Picker.Item label="Data Scientist" value= "Data Scientist"/>
                            <Picker.Item label="IT/Admin/Network Admin" value= "IT/Admin/Network Admin"/>
                            <Picker.Item label="IT Manager/Senior Programmer" value= "IT Manager/Senior Programmer"/>
                            <Picker.Item label="Mobile Application" value= "Mobile Application"/>
                            <Picker.Item label="Programmer" value= "Programmer"/>
                            <Picker.Item label="System Analyst" value= "System Analyst"/>
                            <Picker.Item label="Technical Support/Help Desk" value= "Technical Support/Help Desk"/>
                            <Picker.Item label="Tester" value= "Tester"/>
                            <Picker.Item label="UX/UI" value= "UX/UI"/>
                            <Picker.Item label="Web Programmer/Web Master" value= "Web Programmer/Web Master"/>
                            <Picker.Item label="งานการเงิน-ธนาคาร" value= "งานการเงิน-ธนาคาร"/>
                            <Picker.Item label="แคชเชียร์" value= "แคชเชียร์"/>
                            <Picker.Item label="งานการเงิน" value= "งานการเงิน"/>
                            <Picker.Item label="งานบริการด้านการเงิน" value= "งานบริการด้านการเงิน"/>
                            <Picker.Item label="งานเร่งรัดหนี้สิน" value= "งานเร่งรัดหนี้สิน"/>
                            <Picker.Item label="งานวิเคราะห์การลงทุน-กองทุน" value= "งานวิเคราะห์การลงทุน-กองทุน"/>
                            <Picker.Item label="งานสินเชื่อ-วิเคราะห์สินเชื่อ" value= "งานสินเชื่อ-วิเคราะห์สินเชื่อ"/>
                            <Picker.Item label="งานขนส่ง-คลังสินค้า" value= "งานขนส่ง-คลังสินค้า"/>
                            <Picker.Item label="งานขนส่ง" value= "งานขนส่ง"/>
                            <Picker.Item label="งานคลังสินค้า" value= "งานคลังสินค้า"/>
                            <Picker.Item label="เจ้าหน้าที่สิ่งแวดล้อม" value= "เจ้าหน้าที่สิ่งแวดล้อม"/>
                            <Picker.Item label="Shipping" value= "Shipping"/>
                            <Picker.Item label="Supply Chain" value= "Supply Chain"/>
                            <Picker.Item label="งานนำเข้า-ส่งออก" value= "งานนำเข้า-ส่งออก"/>
                            <Picker.Item label="พัฒนาองค์กร/ISO" value= "พัฒนาองค์กร/ISO"/>
                            <Picker.Item label="BOI" value= "BOI"/>
                            <Picker.Item label="งานต้อนรับลูกค้า" value= "งานต้อนรับลูกค้า"/>
                            <Picker.Item label="งานบริการลูกค้า" value= "งานบริการลูกค้า"/>
                            <Picker.Item label="ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์" value= "ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์"/>
                            <Picker.Item label="Call Center" value= "Call Center"/>
                            <Picker.Item label="งานบัญชี" value= "งานบัญชี"/>
                            <Picker.Item label="งานตรวจสอบบัญชี" value= "งานตรวจสอบบัญชี"/>
                            <Picker.Item label="งานธุรการบัญชี" value= "งานธุรการบัญชี"/>
                            <Picker.Item label="งานบัญชีทั่วไป" value= "งานบัญชีทั่วไป"/>
                            <Picker.Item label="งานบัญชีภาษีอากร" value= "งานบัญชีภาษีอากร"/>
                            <Picker.Item label="งานบัญชีรับ-จ่าย" value= "งานบัญชีรับ-จ่าย"/>
                            <Picker.Item label="งานบัญชีลูกหนี้-เจ้าหนี้" value= "งานบัญชีลูกหนี้-เจ้าหนี้"/>
                            <Picker.Item label="ช่างซ่อมบำรุง" value= "ช่างซ่อมบำรุง"/>
                            <Picker.Item label="งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume" value= "งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume"/>
                            <Picker.Item label="จัดซื้อ/ธุรการ/ประสานงานทั่วไป" value= "จัดซื้อ/ธุรการ/ประสานงานทั่วไป"/>
                            <Picker.Item label="จัดซื้อ" value= "จัดซื้อ"/>
                            <Picker.Item label="ธุรการทั่วไป" value= "ธุรการทั่วไป"/>
                            <Picker.Item label="ประสานงานทั่วไป" value= "ประสานงานทั่วไป"/>
                            <Picker.Item label="ป้อนข้อมูล" value= "ป้อนข้อมูล"/>
                            <Picker.Item label="เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO" value= "เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO"/>
                            <Picker.Item label="ช่างเทคนิค" value= "ช่างเทคนิค"/>
                            <Picker.Item label="ช่างพิมพ์" value= "ช่างพิมพ์"/>
                            <Picker.Item label="ช่างไฟฟ้า/อิเลคโทรนิค/คอมพิวเตอร์/สื่อสาร" value= "ช่างไฟฟ้า/อิเลคโทรนิค/คอมพิวเตอร์/สื่อสาร"/>
                            <Picker.Item label="ช่างยนต์/ช่างกลโรงงาน" value= "ช่างยนต์/ช่างกลโรงงาน"/>
                            <Picker.Item label="ช่างCNC/Mold/กลึง/เจียระไน" value= "ช่างCNC/Mold/กลึง/เจียระไน"/>
                            <Picker.Item label="นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา" value= "นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา"/>
                            <Picker.Item label="บุคคล/ฝึกอบรม" value= "บุคคล/ฝึกอบรม"/>
                            <Picker.Item label="งานว่าจ้างและเงินเดือน" value= "งานว่าจ้างและเงินเดือน"/>
                            <Picker.Item label="เจ้าหน้าที่ฝึกอบรม/วิทยากร" value= "เจ้าหน้าที่ฝึกอบรม/วิทยากร"/>
                            <Picker.Item label="พนักงานฝ่ายบุคคล" value= "พนักงานฝ่ายบุคคล"/>
                            <Picker.Item label="ผลิต/ควบคุมคุณภาพ/โรงงาน" value= "ผลิต/ควบคุมคุณภาพ/โรงงาน"/>
                            <Picker.Item label="ควบคุมคุณภาพ/QC/QA/QM" value= "ควบคุมคุณภาพ/QC/QA/QM"/>
                            <Picker.Item label="ควบคุมดูแลเครื่องจักร" value= "ควบคุมดูแลเครื่องจักร"/>
                            <Picker.Item label="ฝ่ายผลิต/โรงงาน" value= "ฝ่ายผลิต/โรงงาน"/>
                            <Picker.Item label="วางแผนการผลิต" value= "วางแผนการผลิต"/>
                            <Picker.Item label="ผู้จัดการ/ผู้อำนวยการ/MD/CEO" value= "ผู้จัดการ/ผู้อำนวยการ/MD/CEO"/>
                            <Picker.Item label="ผู้จัดการทั่วไป" value= "ผู้จัดการทั่วไป"/>
                            <Picker.Item label="ผู้จัดการฝ่ายการเงิน/CFO" value= "ผู้จัดการฝ่ายการเงิน/CFO"/>
                            <Picker.Item label="ผู้อำนวยการ/รองผู้อำนวยการ" value= "ผู้อำนวยการ/รองผู้อำนวยการ"/>
                            <Picker.Item label="MD/CEO" value= "MD/CEO"/>
                            <Picker.Item label="แผนกรักษาความปลอดภัย/งานอาคารจอดรถ" value= "แผนกรักษาความปลอดภัย/งานอาคารจอดรถ"/>
                            <Picker.Item label="แพทย์/เภสัชกร/สาธารณสุข" value= "แพทย์/เภสัชกร/สาธารณสุข"/>
                            <Picker.Item label="ทันตแพทย์" value= "ทันตแพทย์"/>
                            <Picker.Item label="เทคนิคการแพทย์" value= "เทคนิคการแพทย์"/>
                            <Picker.Item label="นักกายภาพบำบัด" value= "นักกายภาพบำบัด"/>
                            <Picker.Item label="นักโภชนาการ" value= "นักโภชนาการ"/>
                            <Picker.Item label="ผู้ช่วยทางการแพทย์" value= "ผู้ช่วยทางการแพทย์"/>
                            <Picker.Item label="พยาบาล" value= "พยาบาล"/>
                            <Picker.Item label="แพทย์" value= "แพทย์"/>
                            <Picker.Item label="เภสัชกร" value= "เภสัชกร"/>
                            <Picker.Item label="สัตวแพทย์/สัตวบาล" value= "สัตวแพทย์/สัตวบาล"/>
                            <Picker.Item label="ภูมิศาสตร์/แผนที่/GIS/ผังเมือง" value= "ภูมิศาสตร์/แผนที่/GIS/ผังเมือง"/>
                            <Picker.Item label="แม่บ้าน/พี่เลี้ยง/คนสวน" value= "แม่บ้าน/พี่เลี้ยง/คนสวน"/>
                            <Picker.Item label="คนสวน" value= "คนสวน"/>
                            <Picker.Item label="พนักงานทำความสะอาด/แม่บ้าน" value= "พนักงานทำความสะอาด/แม่บ้าน"/>
                            <Picker.Item label="พี่เลี้ยงเด็ก" value= "พี่เลี้ยงเด็ก"/>
                            <Picker.Item label="โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา" value= "โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา"/>
                            <Picker.Item label="ช่าง/คนงานทั่วไป" value= "ช่าง/คนงานทั่วไป"/>
                            <Picker.Item label="ประเมินราคา" value= "ประเมินราคา"/>
                            <Picker.Item label="ผู้บริหารโครงการ" value= "ผู้บริหารโครงการ"/>
                            <Picker.Item label="โฟร์แมน" value= "โฟร์แมน"/>
                            <Picker.Item label="ภูมิสถาปัตย์" value= "ภูมิสถาปัตย์"/>
                            <Picker.Item label="มัณฑนากร" value= "มัณฑนากร"/>
                            <Picker.Item label="วิศวกรโยธา/ก่อสร้าง" value= "วิศวกรโยธา/ก่อสร้าง"/>
                            <Picker.Item label="สถาปนิก" value= "สถาปนิก"/>
                            <Picker.Item label="สำรวจ" value= "สำรวจ"/>
                            <Picker.Item label="ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว" value= "ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว"/>
                            <Picker.Item label="จองห้อง/จองตั๋ว/Tour Operations" value= "จองห้อง/จองตั๋ว/Tour Operations"/>
                            <Picker.Item label="มัคคุเทศก์" value= "มัคคุเทศก์"/>
                            <Picker.Item label="ล่าม/นักแปล" value= "ล่าม/นักแปล"/>
                            <Picker.Item label="เลขานุการ" value= "เลขานุการ"/>
                            <Picker.Item label="ผู้ช่วยเลขานุการ" value= "ผู้ช่วยเลขานุการ"/>
                            <Picker.Item label="เลขานุการ/เลขานุการผู้บริหาร" value= "เลขานุการ/เลขานุการผู้บริหาร"/>
                            <Picker.Item label="วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)" value= "วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)"/>
                            <Picker.Item label="วิเคราะห์ข้อมูลทั่วไป" value= "วิเคราะห์ข้อมูลทั่วไป"/>
                            <Picker.Item label="Data Scientist" value= "Data Scientist"/>
                            <Picker.Item label="วิทยาศาสตร์/Lab/วิจัยพัฒนา" value= "วิทยาศาสตร์/Lab/วิจัยพัฒนา"/>
                            <Picker.Item label="เจ้าหน้าที่ห้องปฎิบัติการ(LAB)" value= "เจ้าหน้าที่ห้องปฎิบัติการ(LAB)"/>
                            <Picker.Item label="นักวิจัยและพัฒนาผลิตภัณฑ์" value= "นักวิจัยและพัฒนาผลิตภัณฑ์"/>
                            <Picker.Item label="นักวิทยาศาสตร์/เคมี/ชีวะ/ฟิสิกส์" value= "นักวิทยาศาสตร์/เคมี/ชีวะ/ฟิสิกส์"/>
                            <Picker.Item label="วิทยาศาสตร์การอาหาร" value= "วิทยาศาสตร์การอาหาร"/>
                            <Picker.Item label="วิศวกร" value= "วิศวกร"/>
                            <Picker.Item label="วิศวกรการผลิต" value= "วิศวกรการผลิต"/>
                            <Picker.Item label="วิศวกรคอมพิวเตอร์" value= "วิศวกรคอมพิวเตอร์"/>
                            <Picker.Item label="วิศวกรเคมี/ปิโตรเลียม" value= "วิศวกรเคมี/ปิโตรเลียม"/>
                            <Picker.Item label="วิศวกรเครื่องกล/ยานยนต์" value= "วิศวกรเครื่องกล/ยานยนต์"/>
                            <Picker.Item label="วิศวกรบำรุงรักษา" value= "วิศวกรบำรุงรักษา"/>
                            <Picker.Item label="วิศวกรประเมินราคา" value= "วิศวกรประเมินราคา"/>
                            <Picker.Item label="วิศวกรไฟฟ้า/อิเลคโทรนิค/สื่อสาร" value= "วิศวกรไฟฟ้า/อิเลคโทรนิค/สื่อสาร"/>
                            <Picker.Item label="วิศวกรโยธา/ก่อสร้าง" value= "วิศวกรโยธา/ก่อสร้าง"/>
                            <Picker.Item label="วิศวกรรมงานระบบประกอบอาคาร" value= "วิศวกรรมงานระบบประกอบอาคาร"/>
                            <Picker.Item label="วิศวกรสำรวจ" value= "วิศวกรสำรวจ"/>
                            <Picker.Item label="วิศวกรสิ่งแวดล้อม" value= "วิศวกรสิ่งแวดล้อม"/>
                            <Picker.Item label="วิศวกรอุตสาหการ/โรงงาน" value= "วิศวกรอุตสาหการ/โรงงาน"/>
                            <Picker.Item label="ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ" value= "ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ"/>
                            <Picker.Item label="ช่างภาพ" value= "ช่างภาพ"/>
                            <Picker.Item label="ช่างศิลป์(Sculpture/Print/Paint/Drawing)" value= "ช่างศิลป์(Sculpture/Print/Paint/Drawing)"/>
                            <Picker.Item label="ออกแบบเครื่องประดับ" value= "ออกแบบเครื่องประดับ"/>
                            <Picker.Item label="ออกแบบผลิตภัณฑ์/ออกแบบบรรจุภัณฑ์" value= "ออกแบบผลิตภัณฑ์/ออกแบบบรรจุภัณฑ์"/>
                            <Picker.Item label="Computer Graphic/3D/Animation" value= "Computer Graphic/3D/Animation"/>
                            <Picker.Item label="Graphic Design/สิ่งพิมพ์" value= "Graphic Design/สิ่งพิมพ์"/>
                            <Picker.Item label="Web Design" value= "Web Design"/>
                            <Picker.Item label="ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์" value= "ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์"/>
                            <Picker.Item label="ขับรถส่งเอกสาร/ส่งผลิตภัณฑ์" value= "ขับรถส่งเอกสาร/ส่งผลิตภัณฑ์"/>
                            <Picker.Item label="พนักงานขับรถ/ขับรถผู้บริหาร" value= "พนักงานขับรถ/ขับรถผู้บริหาร"/>
                            <Picker.Item label="สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์" value= "สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์"/>
                            <Picker.Item label="สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา" value= "สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา"/>
                            <Picker.Item label="เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น" value= "เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น"/>
                            <Picker.Item label="ช่างแพทเทิร์น/มาร์ก/ตัดผ้า" value= "ช่างแพทเทิร์น/มาร์ก/ตัดผ้า"/>
                            <Picker.Item label="พนักงานโรงงานเสื้อผ้า/สิ่งทอ" value= "พนักงานโรงงานเสื้อผ้า/สิ่งทอ"/>
                            <Picker.Item label="ออกแบบลายผ้า/เสื้อผ้า" value= "ออกแบบลายผ้า/เสื้อผ้า"/>
                            <Picker.Item label="Merchandiser" value= "Merchandiser"/>
                            <Picker.Item label="ออกแบบเว็บไซต์/Web" value= "ออกแบบเว็บไซต์/Web"/>
                            <Picker.Item label="Web Content" value= "Web Content"/>
                            <Picker.Item label="Web Programmer/Web Master" value= "Web Programmer/Web Master"/>
                            <Picker.Item label="อัญมณีและเครื่องประดับ" value= "อัญมณีและเครื่องประดับ"/>
                            <Picker.Item label="ช่าง Jewelry/ทอง/เงิน" value= "ช่าง Jewelry/ทอง/เงิน"/>
                            <Picker.Item label="ตรวจสอบคุณภาพอัญมณี" value= "ตรวจสอบคุณภาพอัญมณี"/>
                            <Picker.Item label="อาจารย์/ครู/งานวิชาการ" value= "อาจารย์/ครู/งานวิชาการ"/>
                            <Picker.Item label="อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ" value= "อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ"/>
                            <Picker.Item label="กุ๊กอาหารไทย/นานาชาติ" value= "กุ๊กอาหารไทย/นานาชาติ"/>
                            <Picker.Item label="บาร์เทนเดอร์" value= "บาร์เทนเดอร์"/>
                            <Picker.Item label="พนักงานต้อนรับ" value= "พนักงานต้อนรับ"/>
                            <Picker.Item label="พนักงานร้านกาแฟ/Barista" value= "พนักงานร้านกาแฟ/Barista"/>
                            <Picker.Item label="พนักงานเสิร์ฟ" value= "พนักงานเสิร์ฟ"/>
                            <Picker.Item label="งาน Part-time/พนักงานชั่วคราว" value= "งาน Part-time/พนักงานชั่วคราว"/>
                            <Picker.Item label="นักศึกษาฝึกงาน" value= "นักศึกษาฝึกงาน"/>
                            <Picker.Item label="พนักงานชั่วคราว(Temporary)" value= "พนักงานชั่วคราว(Temporary)"/>
                            <Picker.Item label="พนักงานPart-time(รายวัน/รายชั่วโมง)" value= "พนักงานPart-time(รายวัน/รายชั่วโมง)"/>
                            <Picker.Item label="Freelance" value= "Freelance"/>
                            <Picker.Item label="กราฟฟิค/สื่อสิงพิมพ์/Designer" value= "กราฟฟิค/สื่อสิงพิมพ์/Designer"/>
                            <Picker.Item label="การตลาด" value= "การตลาด"/>
                            <Picker.Item label="ไกด์/มัคคุเทศก์" value= "ไกด์/มัคคุเทศก์"/>
                            <Picker.Item label="ขับรถ" value= "ขับรถ"/>
                            <Picker.Item label="ขาย" value= "ขาย"/>
                            <Picker.Item label="คีย์ข้อมูล" value= "คีย์ข้อมูล"/>
                            <Picker.Item label="งานบันเทิง/นักแสดง/นางแบบ/นักร้อง" value= "งานบันเทิง/นักแสดง/นางแบบ/นักร้อง"/>
                            <Picker.Item label="ช่างภาพ/VDO" value= "ช่างภาพ/VDO"/>
                            <Picker.Item label="ติวเตอร์/สอนพิเศษ" value= "ติวเตอร์/สอนพิเศษ"/>
                            <Picker.Item label="แต่งหน้า/ทำผม/Stylist" value= "แต่งหน้า/ทำผม/Stylist"/>
                            <Picker.Item label="ทำสวน" value= "ทำสวน"/>
                            <Picker.Item label="นักเขียน/นักแปลภาษา" value= "นักเขียน/นักแปลภาษา"/>
                            <Picker.Item label="โปรแกรมเมอร์/IT" value= "โปรแกรมเมอร์/IT"/>
                            <Picker.Item label="ออแกไนซ์/อีเว้นท์" value= "ออแกไนซ์/อีเว้นท์"/>
                                                          
                        </Picker>
                    </View>
                    <View style={{ backgroundColor:'white', height:50, marginTop:10, width:'95%',
                                borderColor:'#EBEBEB', paddingHorizontal:10, alignItems:'center', borderWidth:0.5,
                                borderColor:'black', margin:5}}>
                        <Picker
                            selectedValue={this.state.tmp4}                       
                            style={{height: 50, width:'100%'}}
                            onValueChange={(itemValue, itemIndex) =>
                            this.setState({tmp4: itemValue, int4: itemValue})
                         }>
                            <Picker.Item label="Select your interesting..." value= {this.state.tmp4}/>
                            <Picker.Item label="กฎหมาย" value= "กฎหมาย"/>
                            <Picker.Item label="การตลาด" value= "การตลาด"/>
                            <Picker.Item label="กิจกรรมการตลาด" value="กิจกรรมการตลาด"/>
                            <Picker.Item label="พัฒนาธุรกิจ" value= "พัฒนาธุรกิจ"/>
                            <Picker.Item label="วิจัยตลาด" value= "วิจัยตลาด"/>
                            <Picker.Item label="หัวหน้า/ผู้จัดการ/ผู้บริหาร" value= "หัวหน้า/ผู้จัดการ/ผู้บริหาร"/>
                            <Picker.Item label="Advertising/Creative" value= "Advertising/Creative"/>
                            <Picker.Item label="Brand/Product Marketing" value= "Brand/Product Marketing"/>
                            <Picker.Item label="Digital Marketing" value= "Digital Marketing"/>
                            <Picker.Item label="Pretty/MC" value= "Pretty/MC"/>
                            <Picker.Item label="PR Marketing/Marketing Communications" value= "PR Marketing/Marketing Communications"/>
                            <Picker.Item label="เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่" value= "เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่"/>
                            <Picker.Item label="ขาย" value= "ขาย"/>
                            <Picker.Item label="ประสานงานขาย" value= "ประสานงานขาย"/>
                            <Picker.Item label="พนักงานขายทางโทรศัพท์/Telesales" value= "พนักงานขายทางโทรศัพท์/Telesales"/>
                            <Picker.Item label="พนักงานขาย/Sales/AE" value= "พนักงานขาย/Sales/AE"/>
                            <Picker.Item label="พนักงานแนะนำสินค้าประจำร้าน/PC" value= "พนักงานแนะนำสินค้าประจำร้าน/PC"/>
                            <Picker.Item label="วิศวกรขาย" value= "วิศวกรขาย"/>
                            <Picker.Item label="เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม" value= "เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม"/>
                            <Picker.Item label="พนักงานเขียนแบบ/AutoCad/Draftman" value= "พนักงานเขียนแบบ/AutoCad/Draftman"/>
                            <Picker.Item label="วิศวกรออกแบบ" value= "วิศวกรออกแบบ"/>
                            <Picker.Item label="คอมพิวเตอร์/IT/โปรแกรมเมอร์" value= "คอมพิวเตอร์/IT/โปรแกรมเมอร์"/>
                            <Picker.Item label="วิศวกรคอมพิวเตอร์" value= "วิศวกรคอมพิวเตอร์"/>
                            <Picker.Item label="Data Scientist" value= "Data Scientist"/>
                            <Picker.Item label="IT/Admin/Network Admin" value= "IT/Admin/Network Admin"/>
                            <Picker.Item label="IT Manager/Senior Programmer" value= "IT Manager/Senior Programmer"/>
                            <Picker.Item label="Mobile Application" value= "Mobile Application"/>
                            <Picker.Item label="Programmer" value= "Programmer"/>
                            <Picker.Item label="System Analyst" value= "System Analyst"/>
                            <Picker.Item label="Technical Support/Help Desk" value= "Technical Support/Help Desk"/>
                            <Picker.Item label="Tester" value= "Tester"/>
                            <Picker.Item label="UX/UI" value= "UX/UI"/>
                            <Picker.Item label="Web Programmer/Web Master" value= "Web Programmer/Web Master"/>
                            <Picker.Item label="งานการเงิน-ธนาคาร" value= "งานการเงิน-ธนาคาร"/>
                            <Picker.Item label="แคชเชียร์" value= "แคชเชียร์"/>
                            <Picker.Item label="งานการเงิน" value= "งานการเงิน"/>
                            <Picker.Item label="งานบริการด้านการเงิน" value= "งานบริการด้านการเงิน"/>
                            <Picker.Item label="งานเร่งรัดหนี้สิน" value= "งานเร่งรัดหนี้สิน"/>
                            <Picker.Item label="งานวิเคราะห์การลงทุน-กองทุน" value= "งานวิเคราะห์การลงทุน-กองทุน"/>
                            <Picker.Item label="งานสินเชื่อ-วิเคราะห์สินเชื่อ" value= "งานสินเชื่อ-วิเคราะห์สินเชื่อ"/>
                            <Picker.Item label="งานขนส่ง-คลังสินค้า" value= "งานขนส่ง-คลังสินค้า"/>
                            <Picker.Item label="งานขนส่ง" value= "งานขนส่ง"/>
                            <Picker.Item label="งานคลังสินค้า" value= "งานคลังสินค้า"/>
                            <Picker.Item label="เจ้าหน้าที่สิ่งแวดล้อม" value= "เจ้าหน้าที่สิ่งแวดล้อม"/>
                            <Picker.Item label="Shipping" value= "Shipping"/>
                            <Picker.Item label="Supply Chain" value= "Supply Chain"/>
                            <Picker.Item label="งานนำเข้า-ส่งออก" value= "งานนำเข้า-ส่งออก"/>
                            <Picker.Item label="พัฒนาองค์กร/ISO" value= "พัฒนาองค์กร/ISO"/>
                            <Picker.Item label="BOI" value= "BOI"/>
                            <Picker.Item label="งานต้อนรับลูกค้า" value= "งานต้อนรับลูกค้า"/>
                            <Picker.Item label="งานบริการลูกค้า" value= "งานบริการลูกค้า"/>
                            <Picker.Item label="ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์" value= "ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์"/>
                            <Picker.Item label="Call Center" value= "Call Center"/>
                            <Picker.Item label="งานบัญชี" value= "งานบัญชี"/>
                            <Picker.Item label="งานตรวจสอบบัญชี" value= "งานตรวจสอบบัญชี"/>
                            <Picker.Item label="งานธุรการบัญชี" value= "งานธุรการบัญชี"/>
                            <Picker.Item label="งานบัญชีทั่วไป" value= "งานบัญชีทั่วไป"/>
                            <Picker.Item label="งานบัญชีภาษีอากร" value= "งานบัญชีภาษีอากร"/>
                            <Picker.Item label="งานบัญชีรับ-จ่าย" value= "งานบัญชีรับ-จ่าย"/>
                            <Picker.Item label="งานบัญชีลูกหนี้-เจ้าหนี้" value= "งานบัญชีลูกหนี้-เจ้าหนี้"/>
                            <Picker.Item label="ช่างซ่อมบำรุง" value= "ช่างซ่อมบำรุง"/>
                            <Picker.Item label="งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume" value= "งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume"/>
                            <Picker.Item label="จัดซื้อ/ธุรการ/ประสานงานทั่วไป" value= "จัดซื้อ/ธุรการ/ประสานงานทั่วไป"/>
                            <Picker.Item label="จัดซื้อ" value= "จัดซื้อ"/>
                            <Picker.Item label="ธุรการทั่วไป" value= "ธุรการทั่วไป"/>
                            <Picker.Item label="ประสานงานทั่วไป" value= "ประสานงานทั่วไป"/>
                            <Picker.Item label="ป้อนข้อมูล" value= "ป้อนข้อมูล"/>
                            <Picker.Item label="เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO" value= "เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO"/>
                            <Picker.Item label="ช่างเทคนิค" value= "ช่างเทคนิค"/>
                            <Picker.Item label="ช่างพิมพ์" value= "ช่างพิมพ์"/>
                            <Picker.Item label="ช่างไฟฟ้า/อิเลคโทรนิค/คอมพิวเตอร์/สื่อสาร" value= "ช่างไฟฟ้า/อิเลคโทรนิค/คอมพิวเตอร์/สื่อสาร"/>
                            <Picker.Item label="ช่างยนต์/ช่างกลโรงงาน" value= "ช่างยนต์/ช่างกลโรงงาน"/>
                            <Picker.Item label="ช่างCNC/Mold/กลึง/เจียระไน" value= "ช่างCNC/Mold/กลึง/เจียระไน"/>
                            <Picker.Item label="นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา" value= "นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา"/>
                            <Picker.Item label="บุคคล/ฝึกอบรม" value= "บุคคล/ฝึกอบรม"/>
                            <Picker.Item label="งานว่าจ้างและเงินเดือน" value= "งานว่าจ้างและเงินเดือน"/>
                            <Picker.Item label="เจ้าหน้าที่ฝึกอบรม/วิทยากร" value= "เจ้าหน้าที่ฝึกอบรม/วิทยากร"/>
                            <Picker.Item label="พนักงานฝ่ายบุคคล" value= "พนักงานฝ่ายบุคคล"/>
                            <Picker.Item label="ผลิต/ควบคุมคุณภาพ/โรงงาน" value= "ผลิต/ควบคุมคุณภาพ/โรงงาน"/>
                            <Picker.Item label="ควบคุมคุณภาพ/QC/QA/QM" value= "ควบคุมคุณภาพ/QC/QA/QM"/>
                            <Picker.Item label="ควบคุมดูแลเครื่องจักร" value= "ควบคุมดูแลเครื่องจักร"/>
                            <Picker.Item label="ฝ่ายผลิต/โรงงาน" value= "ฝ่ายผลิต/โรงงาน"/>
                            <Picker.Item label="วางแผนการผลิต" value= "วางแผนการผลิต"/>
                            <Picker.Item label="ผู้จัดการ/ผู้อำนวยการ/MD/CEO" value= "ผู้จัดการ/ผู้อำนวยการ/MD/CEO"/>
                            <Picker.Item label="ผู้จัดการทั่วไป" value= "ผู้จัดการทั่วไป"/>
                            <Picker.Item label="ผู้จัดการฝ่ายการเงิน/CFO" value= "ผู้จัดการฝ่ายการเงิน/CFO"/>
                            <Picker.Item label="ผู้อำนวยการ/รองผู้อำนวยการ" value= "ผู้อำนวยการ/รองผู้อำนวยการ"/>
                            <Picker.Item label="MD/CEO" value= "MD/CEO"/>
                            <Picker.Item label="แผนกรักษาความปลอดภัย/งานอาคารจอดรถ" value= "แผนกรักษาความปลอดภัย/งานอาคารจอดรถ"/>
                            <Picker.Item label="แพทย์/เภสัชกร/สาธารณสุข" value= "แพทย์/เภสัชกร/สาธารณสุข"/>
                            <Picker.Item label="ทันตแพทย์" value= "ทันตแพทย์"/>
                            <Picker.Item label="เทคนิคการแพทย์" value= "เทคนิคการแพทย์"/>
                            <Picker.Item label="นักกายภาพบำบัด" value= "นักกายภาพบำบัด"/>
                            <Picker.Item label="นักโภชนาการ" value= "นักโภชนาการ"/>
                            <Picker.Item label="ผู้ช่วยทางการแพทย์" value= "ผู้ช่วยทางการแพทย์"/>
                            <Picker.Item label="พยาบาล" value= "พยาบาล"/>
                            <Picker.Item label="แพทย์" value= "แพทย์"/>
                            <Picker.Item label="เภสัชกร" value= "เภสัชกร"/>
                            <Picker.Item label="สัตวแพทย์/สัตวบาล" value= "สัตวแพทย์/สัตวบาล"/>
                            <Picker.Item label="ภูมิศาสตร์/แผนที่/GIS/ผังเมือง" value= "ภูมิศาสตร์/แผนที่/GIS/ผังเมือง"/>
                            <Picker.Item label="แม่บ้าน/พี่เลี้ยง/คนสวน" value= "แม่บ้าน/พี่เลี้ยง/คนสวน"/>
                            <Picker.Item label="คนสวน" value= "คนสวน"/>
                            <Picker.Item label="พนักงานทำความสะอาด/แม่บ้าน" value= "พนักงานทำความสะอาด/แม่บ้าน"/>
                            <Picker.Item label="พี่เลี้ยงเด็ก" value= "พี่เลี้ยงเด็ก"/>
                            <Picker.Item label="โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา" value= "โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา"/>
                            <Picker.Item label="ช่าง/คนงานทั่วไป" value= "ช่าง/คนงานทั่วไป"/>
                            <Picker.Item label="ประเมินราคา" value= "ประเมินราคา"/>
                            <Picker.Item label="ผู้บริหารโครงการ" value= "ผู้บริหารโครงการ"/>
                            <Picker.Item label="โฟร์แมน" value= "โฟร์แมน"/>
                            <Picker.Item label="ภูมิสถาปัตย์" value= "ภูมิสถาปัตย์"/>
                            <Picker.Item label="มัณฑนากร" value= "มัณฑนากร"/>
                            <Picker.Item label="วิศวกรโยธา/ก่อสร้าง" value= "วิศวกรโยธา/ก่อสร้าง"/>
                            <Picker.Item label="สถาปนิก" value= "สถาปนิก"/>
                            <Picker.Item label="สำรวจ" value= "สำรวจ"/>
                            <Picker.Item label="ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว" value= "ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว"/>
                            <Picker.Item label="จองห้อง/จองตั๋ว/Tour Operations" value= "จองห้อง/จองตั๋ว/Tour Operations"/>
                            <Picker.Item label="มัคคุเทศก์" value= "มัคคุเทศก์"/>
                            <Picker.Item label="ล่าม/นักแปล" value= "ล่าม/นักแปล"/>
                            <Picker.Item label="เลขานุการ" value= "เลขานุการ"/>
                            <Picker.Item label="ผู้ช่วยเลขานุการ" value= "ผู้ช่วยเลขานุการ"/>
                            <Picker.Item label="เลขานุการ/เลขานุการผู้บริหาร" value= "เลขานุการ/เลขานุการผู้บริหาร"/>
                            <Picker.Item label="วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)" value= "วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)"/>
                            <Picker.Item label="วิเคราะห์ข้อมูลทั่วไป" value= "วิเคราะห์ข้อมูลทั่วไป"/>
                            <Picker.Item label="Data Scientist" value= "Data Scientist"/>
                            <Picker.Item label="วิทยาศาสตร์/Lab/วิจัยพัฒนา" value= "วิทยาศาสตร์/Lab/วิจัยพัฒนา"/>
                            <Picker.Item label="เจ้าหน้าที่ห้องปฎิบัติการ(LAB)" value= "เจ้าหน้าที่ห้องปฎิบัติการ(LAB)"/>
                            <Picker.Item label="นักวิจัยและพัฒนาผลิตภัณฑ์" value= "นักวิจัยและพัฒนาผลิตภัณฑ์"/>
                            <Picker.Item label="นักวิทยาศาสตร์/เคมี/ชีวะ/ฟิสิกส์" value= "นักวิทยาศาสตร์/เคมี/ชีวะ/ฟิสิกส์"/>
                            <Picker.Item label="วิทยาศาสตร์การอาหาร" value= "วิทยาศาสตร์การอาหาร"/>
                            <Picker.Item label="วิศวกร" value= "วิศวกร"/>
                            <Picker.Item label="วิศวกรการผลิต" value= "วิศวกรการผลิต"/>
                            <Picker.Item label="วิศวกรคอมพิวเตอร์" value= "วิศวกรคอมพิวเตอร์"/>
                            <Picker.Item label="วิศวกรเคมี/ปิโตรเลียม" value= "วิศวกรเคมี/ปิโตรเลียม"/>
                            <Picker.Item label="วิศวกรเครื่องกล/ยานยนต์" value= "วิศวกรเครื่องกล/ยานยนต์"/>
                            <Picker.Item label="วิศวกรบำรุงรักษา" value= "วิศวกรบำรุงรักษา"/>
                            <Picker.Item label="วิศวกรประเมินราคา" value= "วิศวกรประเมินราคา"/>
                            <Picker.Item label="วิศวกรไฟฟ้า/อิเลคโทรนิค/สื่อสาร" value= "วิศวกรไฟฟ้า/อิเลคโทรนิค/สื่อสาร"/>
                            <Picker.Item label="วิศวกรโยธา/ก่อสร้าง" value= "วิศวกรโยธา/ก่อสร้าง"/>
                            <Picker.Item label="วิศวกรรมงานระบบประกอบอาคาร" value= "วิศวกรรมงานระบบประกอบอาคาร"/>
                            <Picker.Item label="วิศวกรสำรวจ" value= "วิศวกรสำรวจ"/>
                            <Picker.Item label="วิศวกรสิ่งแวดล้อม" value= "วิศวกรสิ่งแวดล้อม"/>
                            <Picker.Item label="วิศวกรอุตสาหการ/โรงงาน" value= "วิศวกรอุตสาหการ/โรงงาน"/>
                            <Picker.Item label="ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ" value= "ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ"/>
                            <Picker.Item label="ช่างภาพ" value= "ช่างภาพ"/>
                            <Picker.Item label="ช่างศิลป์(Sculpture/Print/Paint/Drawing)" value= "ช่างศิลป์(Sculpture/Print/Paint/Drawing)"/>
                            <Picker.Item label="ออกแบบเครื่องประดับ" value= "ออกแบบเครื่องประดับ"/>
                            <Picker.Item label="ออกแบบผลิตภัณฑ์/ออกแบบบรรจุภัณฑ์" value= "ออกแบบผลิตภัณฑ์/ออกแบบบรรจุภัณฑ์"/>
                            <Picker.Item label="Computer Graphic/3D/Animation" value= "Computer Graphic/3D/Animation"/>
                            <Picker.Item label="Graphic Design/สิ่งพิมพ์" value= "Graphic Design/สิ่งพิมพ์"/>
                            <Picker.Item label="Web Design" value= "Web Design"/>
                            <Picker.Item label="ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์" value= "ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์"/>
                            <Picker.Item label="ขับรถส่งเอกสาร/ส่งผลิตภัณฑ์" value= "ขับรถส่งเอกสาร/ส่งผลิตภัณฑ์"/>
                            <Picker.Item label="พนักงานขับรถ/ขับรถผู้บริหาร" value= "พนักงานขับรถ/ขับรถผู้บริหาร"/>
                            <Picker.Item label="สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์" value= "สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์"/>
                            <Picker.Item label="สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา" value= "สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา"/>
                            <Picker.Item label="เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น" value= "เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น"/>
                            <Picker.Item label="ช่างแพทเทิร์น/มาร์ก/ตัดผ้า" value= "ช่างแพทเทิร์น/มาร์ก/ตัดผ้า"/>
                            <Picker.Item label="พนักงานโรงงานเสื้อผ้า/สิ่งทอ" value= "พนักงานโรงงานเสื้อผ้า/สิ่งทอ"/>
                            <Picker.Item label="ออกแบบลายผ้า/เสื้อผ้า" value= "ออกแบบลายผ้า/เสื้อผ้า"/>
                            <Picker.Item label="Merchandiser" value= "Merchandiser"/>
                            <Picker.Item label="ออกแบบเว็บไซต์/Web" value= "ออกแบบเว็บไซต์/Web"/>
                            <Picker.Item label="Web Content" value= "Web Content"/>
                            <Picker.Item label="Web Programmer/Web Master" value= "Web Programmer/Web Master"/>
                            <Picker.Item label="อัญมณีและเครื่องประดับ" value= "อัญมณีและเครื่องประดับ"/>
                            <Picker.Item label="ช่าง Jewelry/ทอง/เงิน" value= "ช่าง Jewelry/ทอง/เงิน"/>
                            <Picker.Item label="ตรวจสอบคุณภาพอัญมณี" value= "ตรวจสอบคุณภาพอัญมณี"/>
                            <Picker.Item label="อาจารย์/ครู/งานวิชาการ" value= "อาจารย์/ครู/งานวิชาการ"/>
                            <Picker.Item label="อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ" value= "อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ"/>
                            <Picker.Item label="กุ๊กอาหารไทย/นานาชาติ" value= "กุ๊กอาหารไทย/นานาชาติ"/>
                            <Picker.Item label="บาร์เทนเดอร์" value= "บาร์เทนเดอร์"/>
                            <Picker.Item label="พนักงานต้อนรับ" value= "พนักงานต้อนรับ"/>
                            <Picker.Item label="พนักงานร้านกาแฟ/Barista" value= "พนักงานร้านกาแฟ/Barista"/>
                            <Picker.Item label="พนักงานเสิร์ฟ" value= "พนักงานเสิร์ฟ"/>
                            <Picker.Item label="งาน Part-time/พนักงานชั่วคราว" value= "งาน Part-time/พนักงานชั่วคราว"/>
                            <Picker.Item label="นักศึกษาฝึกงาน" value= "นักศึกษาฝึกงาน"/>
                            <Picker.Item label="พนักงานชั่วคราว(Temporary)" value= "พนักงานชั่วคราว(Temporary)"/>
                            <Picker.Item label="พนักงานPart-time(รายวัน/รายชั่วโมง)" value= "พนักงานPart-time(รายวัน/รายชั่วโมง)"/>
                            <Picker.Item label="Freelance" value= "Freelance"/>
                            <Picker.Item label="กราฟฟิค/สื่อสิงพิมพ์/Designer" value= "กราฟฟิค/สื่อสิงพิมพ์/Designer"/>
                            <Picker.Item label="การตลาด" value= "การตลาด"/>
                            <Picker.Item label="ไกด์/มัคคุเทศก์" value= "ไกด์/มัคคุเทศก์"/>
                            <Picker.Item label="ขับรถ" value= "ขับรถ"/>
                            <Picker.Item label="ขาย" value= "ขาย"/>
                            <Picker.Item label="คีย์ข้อมูล" value= "คีย์ข้อมูล"/>
                            <Picker.Item label="งานบันเทิง/นักแสดง/นางแบบ/นักร้อง" value= "งานบันเทิง/นักแสดง/นางแบบ/นักร้อง"/>
                            <Picker.Item label="ช่างภาพ/VDO" value= "ช่างภาพ/VDO"/>
                            <Picker.Item label="ติวเตอร์/สอนพิเศษ" value= "ติวเตอร์/สอนพิเศษ"/>
                            <Picker.Item label="แต่งหน้า/ทำผม/Stylist" value= "แต่งหน้า/ทำผม/Stylist"/>
                            <Picker.Item label="ทำสวน" value= "ทำสวน"/>
                            <Picker.Item label="นักเขียน/นักแปลภาษา" value= "นักเขียน/นักแปลภาษา"/>
                            <Picker.Item label="โปรแกรมเมอร์/IT" value= "โปรแกรมเมอร์/IT"/>
                            <Picker.Item label="ออแกไนซ์/อีเว้นท์" value= "ออแกไนซ์/อีเว้นท์"/>
                                                          
                        </Picker>
                    </View>

                </View>     

            </View>
        );
    }
}    