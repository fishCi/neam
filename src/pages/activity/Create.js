import React, { Component } from 'react';
import {
  PixelRatio,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  Switch
} from 'react-native';
import { Button } from 'native-base';

import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import EmptyView from '../../components/EmptyView'
import { fetchPost } from '../../utils/fetchAPI'
import { getUser } from '../../utils/StorageUtil'



const ACTIVITY_TYPE = [{ key: '02', value: '党员活动' }, { key: '03', value: '团员活动' }, { key: '04', value: '工会活动' }, { key: '05', value: '协会活动' }, { key: '01', value: '其他活动' }];
const ACTIVITY_TPCD = ['营业机构', '党群组织机构'];

export default class CreateActivity extends Component {
  constructor(props) {
    super(props);
    if (this.props.navigation.state.params == undefined) {
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
        regstarttime: form.regstarttime,
        regendtime: form.regendtime,
        host: form.host,
        phone: form.phone,

        hasReg:form.hasReg
      };
    }
  }


  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={[styles.viewdate]} >
            <Text style={[styles.datetext]}>活动名称 </Text>
            <TextInput
              style={styles.textinput}
              onChangeText={(title) => this.setState({ title })}
              value={this.state.title}
            />
          </View>
          <View style={[styles.viewdate]} >
            <Text style={[styles.datetext]}>活动地点 </Text>
            <TextInput
              style={styles.textinput}
              onChangeText={(address) => this.setState({ address })}
              value={this.state.address}
            />
          </View>

          <TextInput
            style={[styles.margintop, styles.largeinput]}
            multiline={true}
            placeholder="活动简介"
            value={this.state.description}
            underlineColorAndroid='transparent'
            onChangeText={(description) => this.setState({ description })}
          />
          <EmptyView h={15} />
          <View style={{ flexDirection: 'row' }} >
            <Text style={[styles.datetext]}>活动类型  </Text>
            <ModalDropdown style={{ flex: 1, borderStyle: 'solid', borderWidth: 1, borderColor: 'grey', marginRight: 3, marginLeft: 55 }}
              textStyle={styles.dropdown_text}
              dropdownStyle={styles.dropdown_dropdown}
              options={ACTIVITY_TYPE.map((item) => item.value)}
              defaultValue={this.state.type == '' ? '请选择...' : this._getddValue(this.state.type)}
              onSelect={(idx, value) => this.setState({ type: ACTIVITY_TYPE[idx].key })}
            />
          </View>
          {
            // <EmptyView h={5} />
            // <View style={styles.viewdate} >
            //   <Text style={styles.datetext}>二级分类 </Text>
            //   <TextInput
            //     style={styles.textinput}
            //     onChangeText={(secondtype) => this.setState({ secondtype })}
            //     value={this.state.secondtype}
            //   />
            // </View>
          }
          <View style={[styles.viewdate]} >
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
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 2,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              minuteInterval={10}
              onDateChange={(date) => { this.setState({ starttime: date }) }}
            />
          </View>

          <View style={[styles.viewdate]} >
            <Text style={[styles.datetext]}>活动结束时间</Text>
            <DatePicker
              style={[styles.datepicker, styles.margintop]}
              date={this.state.endtime}
              mode="datetime"
              placeholder="活动结束时间"
              format="YYYY-MM-DD HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              minuteInterval={10}
              onDateChange={(date) => { this.setState({ endtime: date }) }}
            />
          </View>


          <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }} >
            <Text style={styles.datetext}>是否报名</Text>
            <Switch onTintColor='orange' thumbTintColor='white'
              onValueChange={(value) => this.setState({ isreg: value })}
              value={this.state.isreg} />
          </View>

          {this.state.isreg &&
            <View>
              <View style={[styles.viewdate]} >
                <Text style={[styles.datetext]}>报名开始时间</Text>
                <DatePicker
                  style={[styles.datepicker, styles.margintop]}
                  date={this.state.regstarttime}
                  mode="datetime"
                  placeholder="报名截止时间"
                  format="YYYY-MM-DD HH:mm"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  minuteInterval={10}
                  onDateChange={(date) => { this.setState({ regstarttime: date }) }}
                />
              </View>
              <View style={[styles.viewdate]} >
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
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  minuteInterval={10}
                  onDateChange={(date) => { this.setState({ regendtime: date }) }}
                />
              </View>
            </View>
          }
          <View style={[styles.viewdate]} >
            <Text style={[styles.datetext]}>活动联系人 </Text>
            <TextInput
              style={styles.textinput}
              onChangeText={(host) => this.setState({ host })}
              value={this.state.host}
            />
          </View>
          <View style={[styles.viewdate]} >
            <Text style={[styles.datetext]}>联系人电话 </Text>
            <TextInput
              style={styles.textinput}
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
            />
          </View>
          <TextInput
            style={[styles.margintop, styles.largeinput]}
            multiline={true}
            placeholder="活动详情"
            value={this.state.detail}
            underlineColorAndroid='transparent'
            onChangeText={(detail) => this.setState({ detail })}
          />
          <TextInput
            style={[styles.margintop, styles.largeinput]}
            multiline={true}
            placeholder="温馨提示"
            value={this.state.tip}
            underlineColorAndroid='transparent'
            onChangeText={(tip) => this.setState({ tip })}
          />
          <Button rounded info style={styles.submitbtn} onPress={this._submit}>
            <Text style={{ color: 'white' }}>确定</Text>
          </Button>
          {

            // <Button  info style={styles.submitbtn} onPress={this.clear}>
            //   <Text style={{ color: 'white' }}>clear</Text>
            // </Button>
          }

        </View>
      </ScrollView>
    );
  }

  _submit = async () => {
    u = await getUser();
    if (this.validate() == true) {
      this.state.isEdit
        ? fetchPost('A08464104', { ...this._tranferToJSON(u), thpyadthmsAvyId: this.state.actId }, this._success, this._failure)
        : fetchPost('A08464101', this._tranferToJSON(u), this._success, this._failure)
    } else {
      alert(this.validate());
    }
  }

  _success = resp => {
    if (resp.BK_STATUS == "00") {
      this.props.navigation.navigate('Home')
    } else {
      alert(resp.BK_DESC)
    }
  };

  _failure = error => {
    alert(error);
  };


  _getddValue(k) {
    let r = ''
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
  //       // expires: 1000 * 3600 
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

      thpyadthmsAvyStcd: '04',
      thpyadthmsavyittTpcd:'01',
      ccbinsId:'000000000',
      thpyadthmsOrgId:u.thpyadthmsOrgId,
      thpyadthmsStmUsrId:u.thpyadthmsStmUsrId,
      empeIdLandNm:u.empeIdLandNm,
      hmnrscEmpid:u.hmnrscEmpid,
      usrblngthpyathmsorgnm:u.ptytbrOrgId + ' - ' + u.ptybrchOrgId + ' - ' + u.ptygrpOrgId,
      usrNm:u.usrNm,
      pcpthpyadthmsavyTpcd:this.state.hasReg

      // thpyadthmsStmUsrId: '12345678',
      // empeIdLandNm: 'zhangsan.zh',
      // hmnrscEmpid: '000000000000000',
      // usrNm: '张三',
      // usrblngthpyathmsorgnm: '北京开发中心党总支 - 第一党支部 - 第二党小组',   // 用户所属党群组织名称
      // thpyadthmsAvyStcd: '04',  //默认生效
      // thpyadthmsavyittTpcd: '01', //默认发起组织类型为党群组织
      // ccbinsId: '000000000',
      // thpyadthmsOrgId: '0000000000',
    };
  }

  validate = () => {
    if (this.state.title == undefined || this.state.title == '')
      return '活动名称不能为空！';
    if (this.state.type == undefined || this.state.type == '')
      return '活动类型不能为空！';
    if (this.state.detail == undefined || this.state.detail == '')
      return '活动内容详情不能为空！';
    if (this.state.starttime == undefined || this.state.starttime == '')
      return '活动开始时间不能为空！';
    if (this.state.endtime == undefined || this.state.endtime == '')
      return '活动结束时间不能为空！';
    if (this.state.host == undefined || this.state.host == '')
      return '活动联系人不能为空！';
    if (this.state.phone == undefined || this.state.phone == '')
      return '活动联系人电话不能为空！';
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
  largeinput: {
    fontSize: 12,
    height: 70,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: Dimensions.get('window').width - 30
  },
  margintop: {
    marginTop: 5,
  },

  textinput: {
    fontSize: 12,
    flex: 1,
    // borderColor: 'gray',
    // borderWidth: 1,
    height: 40
  },
  viewdate: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // borderStyle: 'solid', borderWidth: 1, borderColor: 'skyblue' 
  },
  datetext: {
    fontSize: 12,
    textAlign: 'left'
  },
  datepicker: {
    height: 40,
    flex: 1
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

