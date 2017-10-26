import React, { Component } from 'react';
import {
  Keyboard,
  PixelRatio,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  Switch,
  ToastAndroid
} from 'react-native';
import {Button,ListItem,Item,Label,Input,Right,Body,ActivityIndicator,ActionSheet,Toast, Root} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import EmptyView from '../../components/EmptyView'
import { fetchPost } from '../../utils/fetchAPI'
import { getUser } from '../../utils/StorageUtil'
import LoadingView from '../../components/LoadingView';


const ACTIVITY_TYPE = [{ key: '01', value: '党员活动' }, { key: '02', value: '团员活动' }, { key: '03', value: '工会活动' }, { key: '04', value: '协会活动' }, { key: '99', value: '其他活动' }];
const ACTIVITY_TPCD = ['营业机构', '党群组织机构'];
// var BUTTONS = [{ key: '02', text: '党员活动' }, { key: '03', text: '团员活动' }, { key: '04', text: '工会活动' }, { key: '05', text: '协会活动' }, { key: '01', text: '其他活动' }];

const types = ['党员活动', '团员活动', '工会活动', '协会活动', '其他活动' ]
const typeValue = ['01', '02', '03', '04', '99' ]
const title = '请选择活动类型'
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

const reNum = /^[0-9]+.?[0-9]*$/

export default class CreateActivity extends Component {
  static navigationOptions = ({navigation})=>({title:navigation.state.params.title});

  isSubmit = false;
  constructor(props) {
    super(props);
    if (this.props.navigation.state.params.form == undefined) {
      this.state = {
        isEdit: false,
        title: '',
        address: '',
        description: '',
        type: '',
        // secondtype: '',
        detail: '',
        tip: '',
        isreg: false,
        starttime: '',
        endtime: '',
        regstarttime: '',
        regendtime: '',
        host: '',
        phone: '',
        showLoading: false,
        hasReg:'00'
      }
    } else {
      form = this.props.navigation.state.params.form;
      this.state = {
        isEdit: true,

        actId: form.actId,
        title: form.title,
        address: form.address,
        description: form.description,
        type: form.type,
        // secondtype: form.secondtype,
        detail: form.detail,
        tip: form.tip,
        isreg: form.isreg,
        starttime: form.starttime,
        endtime: form.endtime,
        regstarttime: form.isreg ? form.regstarttime : "",
        regendtime: form.isreg ? form.regendtime : "",
        host: form.host,
        phone: form.phone,
        showLoading: false,
        hasReg:form.hasReg
      };
    }
  }

  componentWillMount() {
    console.log("create mount");
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    console.log("create unmount");
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide = () => {
    this.refs.textInput7.blur();
    this.refs.textInput1.blur();
    this.refs.textInput2.blur();
    this.refs.textInput3.blur();
    this.refs.textInput4.blur();
    this.refs.textInput5.blur();
    this.refs.textInput6.blur();
  }


  render() {
    console.log("create render");
    return (
      <Root>
      <ScrollView style={{backgroundColor: '#f0f0f0'}}>
        <View sytle={[styles.separator]}><Text> </Text></View>
        <View style={{backgroundColor: '#ffffff'}}>
            <ListItem style={{height:48}}>
              <View style={[styles.viewdate]} >
              <Text style={{color:'#ff5000'}}>*</Text>
                <Text style={[styles.datetext]}>活动名称 </Text>
                <TextInput
                  style={styles.textinput}
                  onChangeText={(title) => this.setState({ title })}
                  underlineColorAndroid="transparent"
                  placeholder="20字以内"
                  placeholderTextColor="#c9c9c9"
                  maxLength={20}
                  value={this.state.title}
                  ref="textInput1"
                />
              </View>
            </ListItem>
            <ListItem style={{height:48}}>
            <View style={[styles.viewdate]} >
            <Text style={[styles.datetext]}>活动地点 </Text>
            <TextInput
              style={styles.textinput}
              onChangeText={(address) => this.setState({ address })}
              underlineColorAndroid="transparent"
              placeholder="活动地点"
              placeholderTextColor="#c9c9c9"
              value={this.state.address}
              ref="textInput2"
            />
            </View>
            </ListItem>
            <ListItem>
              <View style={[styles.viewdate]} >
                <Text style={[styles.datetext]}>活动简介 </Text>
                <TextInput
                style={[styles.margintop, styles.largeinput]}
                multiline={true}
                placeholder="请简要描述活动内容"
                placeholderTextColor="#c9c9c9"
                ref="textInput3"
                value={this.state.description}
                underlineColorAndroid='transparent'
                onChangeText={(description) => this.setState({ description })}
              />
              </View>
            </ListItem>
            <ListItem style={{height:48}} last>
            <View style={[styles.viewdate]}>
            <Text style={{color:'#ff5000'}}>*</Text>
              <Text style={[styles.datetext]}>活动类型  </Text>
              <Body>
              <Text
                  style={[styles.datetext]}
                  onPress={() =>{
                    ActionSheet.show(
                      {
                        options: types,
                        cancelButtonIndex: CANCEL_INDEX,
                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                        title: "请选择活动类型"
                      },
                      buttonIndex => {
                        console.log(buttonIndex);
                        this.setState({type : typeValue[buttonIndex]});
                      }
                    )}
                  }
                >{this.state.type == ''?'请选择类型':this._getddValue(this.state.type)}</Text>
              
                </Body>
              
              <Right>
                <Icon name="ios-arrow-forward-outline" />
              </Right>
            </View>
          </ListItem>
          </View>

        <View sytle={[styles.separator]}><Text> </Text></View>

          <View style={{backgroundColor: '#ffffff'}}>
          <ListItem style={{height:48}}>
            <View style={[styles.viewdate]} >
              <Text style={{color:'#ff5000'}}>*</Text>
              <Text style={[styles.datetext]}>活动开始时间</Text>
              <DatePicker
                style={[styles.datepicker, styles.margintop]}
                date={this.state.starttime}
                mode="datetime"
                placeholder="活动开始时间"
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    borderColor:'#ffffff',
                    marginLeft: 20,
                    
                  }
                }}
                showIcon={false}
                minuteInterval={10}
                onDateChange={(date) => { 
                  if(this.state.endtime != '' && this.state.endtime != undefined 
                    && this.state.endtime < date) {
                      ToastAndroid.show("活动开始时间不能晚于结束时间！",ToastAndroid.LONG);
                      
                  } else {
                    this.setState({ starttime: date })
                  }
                }}
              />
              <Right>
                <Icon name="ios-arrow-forward-outline" />
              </Right>
            </View>
          </ListItem>
          <ListItem style={{height:48}}>
            <View style={[styles.viewdate]} >
              <Text style={{color:'#ff5000'}}>*</Text>
              <Text style={[styles.datetext]}>活动结束时间</Text>
              <DatePicker
                style={[styles.datepicker]}
                date={this.state.endtime}
                mode="datetime"
                placeholder="活动结束时间"
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    borderColor:'#ffffff',
                    marginLeft: 20,
                    
                  }
                }}
                showIcon={false}
                minuteInterval={10}
                onDateChange={(date) => { 
                  if(this.state.starttime != '' && this.state.starttime != undefined 
                    && this.state.starttime > date) {
                      ToastAndroid.show("活动结束时间不能早于开始时间！",ToastAndroid.LONG);
                     
                  } else if(this.state.regstarttime != '' && this.state.regstarttime != undefined 
                  && this.state.regstarttime  > date){
                      ToastAndroid.show("活动结束时间不能早于报名开始时间！",ToastAndroid.LONG);
                  } else {
                      this.setState({ endtime: date })
                  }
                }}
              />
              <Right>
                <Icon name="ios-arrow-forward-outline" />
              </Right>
          </View>
        </ListItem>
        {this.state.isreg ? <ListItem style={{height:48}}>
          <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }} >
            <Text style={styles.datetext}>是否报名</Text>
            <Switch onTintColor='orange' thumbTintColor='white'
              onValueChange={(value) => this.setState({ isreg: value })}
              value={this.state.isreg} />
            </View>
        </ListItem> :   
        <ListItem style={{height:48}} last> 
        <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }} >
          <Text style={styles.datetext}>是否报名</Text>
          <Switch onTintColor='orange' thumbTintColor='white'
            onValueChange={(value) => this.setState({ isreg: value })}
            value={this.state.isreg} />
          </View>
      </ListItem>}
      { this.state.isreg &&
          <ListItem style={{height:48}}>
            <View style={[styles.viewdate]} >
              <Text style={{color:'#ff5000'}}>*</Text>
              <Text style={[styles.datetext]}>报名开始时间</Text>
              <DatePicker
                style={[styles.datepicker, styles.margintop]}
                date={this.state.regstarttime}
                mode="datetime"
                placeholder="报名开始时间"
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    borderColor:'#ffffff',
                    marginLeft: 20,
                    
                  }
                }}
                showIcon={false}
                minuteInterval={10}
                onDateChange={(date) => { 
                  if(this.state.regendtime != '' && this.state.regendtime != undefined 
                    && this.state.regendtime < date) {
                      ToastAndroid.show("报名开始时间不能晚于截止时间！",ToastAndroid.LONG);
                      
                  } else if(this.state.endtime != '' && this.state.endtime != undefined 
                    && this.state.endtime  < date){
                      ToastAndroid.show("报名开始时间不能晚于活动结束时间！",ToastAndroid.LONG);
                  } else {
                    this.setState({ regstarttime: date })
                  }
                }}
                
              />
              <Right>
                <Icon name="ios-arrow-forward-outline" />
              </Right>
              </View>
            </ListItem>
          }
          { this.state.isreg &&
            <ListItem style={{height:48}} last>
            <View style={[styles.viewdate]} >
              <Text style={{color:'#ff5000'}}>*</Text>
              <Text style={[styles.datetext]}>报名截止时间 </Text>
              <DatePicker
                style={[styles.datepicker, styles.margintop]}
                date={this.state.regendtime}
                mode="datetime"
                placeholder="报名截止时间"
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    borderColor:'#ffffff',
                    marginLeft: 20,
                    
                  }
                }}
                showIcon={false}
                minuteInterval={10}
                onDateChange={(date) => { 
                  if(this.state.regstarttime != '' && this.state.regstarttime != undefined 
                    && this.state.regstarttime > date) {
                      ToastAndroid.show("报名截止时间不能早于开始时间！",ToastAndroid.LONG);
                
                  } else {
                    this.setState({ regendtime: date })
                  }
                }}
              />
              <Right>
               <Icon name="ios-arrow-forward-outline" />
              </Right>
            </View>
          </ListItem>
        }
        </View>

        <View sytle={[styles.separator]}><Text> </Text></View>
        <View style={{backgroundColor: '#ffffff'}}>
        <ListItem>
          <View style={[styles.viewdate]} >
          <Text style={{color:'#ff5000'}}>*</Text>
          <Text style={[styles.datetext]}>活动详情 </Text>
          <TextInput
          style={[styles.margintop, styles.largeinput]}
          multiline={true}
          placeholder="请填写活动详细内容"
          placeholderTextColor="#c9c9c9"
          value={this.state.detail}
          underlineColorAndroid='transparent'
          onChangeText={(detail) => this.setState({ detail })}
          ref="textInput4"
          />
          </View>
        </ListItem>
                
        <ListItem last>
          <View style={[styles.viewdate]} >
          <Text style={[styles.datetext]}>温馨提示 </Text>
          <TextInput
          style={[styles.margintop, styles.largeinput]}
          multiline={true}
          p placeholder="请填写活动注意事项"
          placeholderTextColor="#c9c9c9"
          value={this.state.tip}
          underlineColorAndroid='transparent'
          onChangeText={(tip) => this.setState({ tip })}
          ref="textInput5"
          />
          </View>
        </ListItem>
        </View>

        <View sytle={[styles.separator]}><Text> </Text></View>
        <View style={{backgroundColor: '#ffffff'}}>
        
                
        <ListItem style={{height:48}}>
          <View style={[styles.viewdate]} >
          <Text style={{color:'#ff5000'}}>*</Text>
          <Text style={[styles.datetext]}>活动联系人 </Text>
          <TextInput
            style={styles.textinput}
            placeholder="联系人姓名"
            placeholderTextColor="#c9c9c9"
            onChangeText={(host) => this.setState({ host })}
            value={this.state.host}
            underlineColorAndroid='transparent'
            ref="textInput7"
          />
          </View>
        </ListItem>

        <ListItem style={{height:48}} last>
          <View style={[styles.viewdate]} >
          <Text style={{color:'#ff5000'}}>*</Text>
          <Text style={[styles.datetext]}>联系人电话 </Text>
          <TextInput
            style={styles.textinput}
            placeholder="联系人电话"
            placeholderTextColor="#c9c9c9"
            onChangeText={(phone) => this.setState({ phone })}
            value={this.state.phone}
            underlineColorAndroid='transparent'
            ref="textInput6"
          />
          </View>
        </ListItem>

        </View>

        <View sytle={[styles.separator]}><Text> </Text></View>
        <Button rounded info style={styles.submitbtn} onPress={this._submit}>
          <Text style={{ color: 'white' }}>确定</Text>
        </Button>
        <View sytle={[styles.separator]}><Text> </Text></View>
        <LoadingView showLoading={this.state.showLoading} backgroundColor='#323233' opacity={0.8} />
        <ActionSheet ref={(c)=>{ActionSheet.actionsheetInstance = c}} />
      </ScrollView>
      </Root>
    );
  }

  _submit = async () => {
    if(this.isSubmit) {
      return;
    }
    this.isSubmit = true;
    let u = await getUser();
    if (this.validate() == true) {
      this.setState({
        showLoading: true,
      },
      this.state.isEdit
        ? fetchPost('A08464104', { ...this._tranferToJSON(u), thpyadthmsAvyId: this.state.actId }, this._success, this._failure)
        : fetchPost('A08464101', this._tranferToJSON(u), this._success, this._failure));
    } else {
      ToastAndroid.show(this.validate(),ToastAndroid.LONG);
      this.isSubmit = false;
    }
  }

  _success = resp => {
    if (resp.BK_STATUS == "00") {
        this.setState({
            showLoading: false,
        },() => this.props.navigation.navigate('Home'));
    } else {
      this.setState({
        showLoading: false,
      },
      ToastAndroid.show(resp.BK_DESC,ToastAndroid.LONG));
      this.isSubmit = false;
    }
  };

  _failure = error => {
    this.isSubmit = false;
    console.log(error);
    this.setState({
      showLoading: false,
    },
    ()=>ToastAndroid.show("网络连接失败，请稍后再试！", ToastAndroid.LONG));
  };


  _getddValue(k) {
    let r = ''
    console.log("type");
    ACTIVITY_TYPE.forEach((item) => {
      if (item.key === k) {
        r = item.value;
      }
    })
    return r;
  }
  // _submit = () => {
  //   if (this.validate() == true) {
  //     storage.save({
  //       key: 'Activity',
  //       id: this.state.title,
  //       data: JSON.stringify(this.state),
  //       // expires: 2000 * 3600 
  //     }).then(() => {
  //       this.props.navigation.navigate('Home')
  //     }
  //       )
  //   } else {
  //     alert(this.validate());
  //   }
  // }

  _tranferToJSON = (u) => {
    return {
      thpyadthmsAvyNm: this.state.title, 
      thpyadthmavyplccntdsc: this.state.address,
      thpyadthmsAvyCntdsc: this.state.description,
      thpyadthmsAvyClcd: this.state.type,
      thpyadthmsAvyStdt: this.state.starttime.split(' ')[0].replace(/-/g, ''),	    //活动开始日期         
      thpyadthmsAvySttm: this.state.starttime.split(' ')[1].replace(':', '') + "00",
      thpyadthmsAvyEddt: this.state.endtime.split(' ')[0].replace(/-/g, ''),		//活动结束日期
      thpyadthmsAvyEdtm: this.state.endtime.split(' ')[1].replace(':', '') + "00",
      thpyadthmsavyrgstInd: this.state.isreg ? '1' : '0',
      thpyadthmsavyrgststdt: this.state.isreg ? this.state.regstarttime.split(' ')[0].replace(/-/g, '') : '00000000',		    //活动报名开始日期
      thpyadthmsavyrgststtm: this.state.isreg ? this.state.regstarttime.split(' ')[1].replace(':', '') + "00" : '000000',
      thpyadthmsavyrgstcodt: this.state.isreg ? this.state.regendtime.split(' ')[0].replace(/-/g, '') : '00000000',			//活动报名结束日期
      thpyadthmsargstctoftm: this.state.isreg ? this.state.regendtime.split(' ')[1].replace(':', '') + "00" : '000000',
      thpyadthmsavyctcpsnnm: this.state.host,
      thpyadthmactcpsntelno: this.state.phone,
      thpyadthmavydtlcntdsc: this.state.detail,
      thpyadthmayancmcntdsc: this.state.tip,

      rmrk1:'',
      rmrk2:'',
      rmrk3:'',
      thpyadthmsAvyStcd: '04',
      thpyadthmsavyittTpcd:'01',
      thpyadthmsOrgNm:'',
      thpyadathmsOrgTpcd:'',
      ccbinsId:'000000000',
      thpyadthmsOrgId:u.thpyadthmsOrgId,
      thpyadthmsStmUsrId:u.thpyadthmsStmUsrId,
      empeIdLandNm:u.empeIdLandNm,
      hmnrscEmpid:u.hmnrscEmpid,
      usrblngthpyathmsorgnm:u.ptytbrOrgId + ' - ' + u.ptybrchOrgId + ' - ' + u.ptygrpOrgId,
      usrNm:u.usrNm,
      pcpthpyadthmsavyTpcd:this.state.hasReg

    };
  }

  validate = () => {
    if (this.state.title == undefined || this.state.title == '')
      return '活动名称不能为空！';
    if (this.state.type == '')
      return '活动类型不能为空！';
    if (this.state.starttime == undefined || this.state.starttime == '')
      return '活动开始时间不能为空！';
    if (this.state.endtime == undefined || this.state.endtime == '')
      return '活动结束时间不能为空！';

    if (this.state.isreg) {
      if (this.state.regstarttime == undefined || this.state.regstarttime == '')
        return '活动报名开始时间不能为空！';
      if (this.state.regendtime == undefined || this.state.regendtime == '')
        return '活动报名截止时间不能为空！';
    }

    if (this.state.detail == undefined || this.state.detail == '')
      return '活动内容详情不能为空！';
    if (this.state.host == undefined || this.state.host == '')
      return '活动联系人不能为空！';
    if (this.state.phone == undefined || this.state.phone == '')
      return '活动联系人电话不能为空！';
    if (this.state.phone.length != 11 || !reNum.test(this.state.phone))
      return '电话号码为11位数字！'
    return true;
  }


  clear = () => {
    storage.clearMap();
  }

  _dropdown_renderRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.dropdown_row, { backgroundColor: evenRow ? 'lemonchiffon' : 'white' }]}>
          <Text style={[styles.dropdown_row_text, highlighted && { color: 'mediumaquamarine' }]}>
            {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

//定义样
const styles = StyleSheet.create({
  separator : {flex:1, backgroundColor: '#f0f0f0',height:20},
  largeinput: {
    flex:1,
    fontSize: 16,
    height: 70,
    justifyContent: 'flex-start',
    padding:0
    //borderWidth: 1,
    //borderColor: '#ccc',
    //borderRadius: 4,
    //width: Dimensions.get('window').width - 30
  },
  margintop: {
    //marginTop: 5,
  },

  textinput: {
    fontSize: 16,
    flex: 1,
    padding:0,
    // borderColor: 'gray',
    // borderWidth: 1,
  },
  viewdate: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    // borderStyle: 'solid', borderWidth: 1, borderColor: 'skyblue' 
  },
  datetext: {
    fontSize: 16,
    textAlign: 'left',
    width: 100
  },
  datepicker: {
    borderColor:'#ffffff',
    height: 40,
    flex: 1,
    padding:0
  },
  dropdown_text: {
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    // color:'lightgrey'
  },
  dropdown_dropdown: {
    width: 200,
    height: 150,
    // alignItems:'center',    
    justifyContent: 'center',
    // borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdown_row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dropdown_image: {
    marginLeft: 4,
    width: 30,
    height: 30,
  },
  dropdown_row_text: {
    marginHorizontal: 4,
    fontSize: 12,
    color: 'navy',
    textAlignVertical: 'center',
  },
  submitbtn: {
    marginTop: 10,
    alignSelf: 'center',
    width: Dimensions.get('window').width / 3,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});