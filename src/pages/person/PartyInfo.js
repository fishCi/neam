/*
* @Author: miaoxinyu.zh
* @Date:   2017-08-22 06:06:10
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-13 16:40:25
*/

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  ScrollView,
  Image
} from 'react-native';
import { Button } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';
import { getPartyInfoData } from '../../utils/PartyData'
import { getPartyPieData } from '../../utils/PartyData'
import Icon from 'react-native-vector-icons/Ionicons';
import { PieChart } from 'react-native-charts-wrapper';
import { getUser } from '../../utils/StorageUtil'
import { fetchPost } from '../../utils/fetchAPI';

const legend = {
  enabled: true,
  textSize: 8,
  form: 'CIRCLE',
  position: 'RIGHT_OF_CHART',
  wordWrapEnabled: true
}

class PartyInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      position: this.props.navigation.state.params.pos, //enum：zongzhi，zhibu
      branch: '第一党支部',
      group: '第一党小组',
      data: getPartyPieData('sex')
    }
  }
  
  department = this.props.navigation.state.params.department.split(' ');
  info = {
    centerData: {
      sj: '',
      fsj: '',
      jw: '',
      zw: '',
      xw: ''
    },
    branchData: {
      sj: '',
      fsj: '',
      jw: '',
      zw: '',
      xw: ''
    },
    groupData: {
      zz: '',
      zy: '',
    }
  };

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null })
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
    }
  }


  _dropdown_onSelect = (idx, value) => {
    this.setState({ branch: value });
  }

  _dropdown_onSelect2 = (idx, value) => {
    this.setState({ group: value });
  }

  _onClickPie = (value) => {
    this.setState({ data: getPartyPieData(value) })
  }


  render() {
    // info = getPartyInfoData(this.state.branch, this.state.group)
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <ScrollView>
          <View style={{ height: 100, backgroundColor: 'white', flexDirection: 'row', borderTopWidth: 6, borderBottomWidth: 6, borderColor: 'darkblue', marginVertical: 5 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: 'red', fontWeight: 'bold', marginTop: 10, fontSize: 14 }}>{this.department[0]}</Text>
              <Image source={require('../../img/person/zongzhi.png')} style={{ marginTop: 10 }} />
            </View>
            <View style={{ flex: 2, paddingVertical: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ flex: 1, fontSize: 12 }}>书记: {this.info.centerData.sj}</Text>
                <Text style={{ flex: 1, fontSize: 12 }}>副书记：{this.info.centerData.fsj}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ flex: 1, fontSize: 12 }}>纪检委员：{this.info.centerData.jw}</Text>
                <Text style={{ flex: 1, fontSize: 12 }}>组织委员：{this.info.centerData.zw}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ flex: 1, fontSize: 12 }}>宣传委员：{this.info.centerData.xw}</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 100, backgroundColor: 'white', flexDirection: 'row', borderTopWidth: 6, borderBottomWidth: 6, borderColor: 'darkblue', marginVertical: 5 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              {
                // this.state.position === 'zongzhi' ?
                // <ModalDropdown dropdownStyle={{ height: 20, width: 40, marginTop: 10 }}
                //   options={['第一党支部', '第二党支部']}
                //   dropdownStyle={{ alignSelf: 'center', height: 80, borderWidth: 1, borderRadius: 3 }}
                //   onSelect={this._dropdown_onSelect}>
                //   <View style={{ marginTop: 10, flexDirection: 'row' }}>
                //     <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>{this.state.branch} </Text>
                //     <Icon name='ios-arrow-dropdown' size={18} color='skyblue' />
                //   </View>
                // </ModalDropdown>
                // : 
                <Text style={{ color: 'red', fontWeight: 'bold', marginTop: 10, fontSize: 14 }}>{this.department[1]}</Text>

              }
              <Image source={require('../../img/person/zhibu.png')} style={{ marginTop: 10 }} />
            </View>

            <View style={{ flex: 2, paddingVertical: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ flex: 1, fontSize: 12 }}>书记: {this.info.branchData.sj}</Text>
                <Text style={{ flex: 1, fontSize: 12 }}>副书记：{this.info.branchData.fsj}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ flex: 1, fontSize: 12 }}>纪检委员：{this.info.branchData.jw}</Text>
                <Text style={{ flex: 1, fontSize: 12 }}>组织委员：{this.info.branchData.zw}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ flex: 1, fontSize: 12 }}>宣传委员：{this.info.branchData.xw}</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 100, backgroundColor: 'white', flexDirection: 'row', borderTopWidth: 6, borderBottomWidth: 6, borderColor: 'darkblue', marginVertical: 5 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              {
                // this.state.position === '' ?
                <Text style={{ color: 'red', fontWeight: 'bold', marginTop: 10, fontSize: 14 }}>{this.department[2]}</Text>
                // : <ModalDropdown dropdownStyle={{ height: 20, width: 40, marginTop: 10 }}
                //   options={['第一党小组', '第二党小组']}
                //   dropdownStyle={{ alignSelf: 'center', height: 80, borderWidth: 1, borderRadius: 3 }}
                //   onSelect={this._dropdown_onSelect2}>
                //   <View style={{ marginTop: 10, flexDirection: 'row' }}>
                //     <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>{this.state.group} </Text>
                //     <Icon name='ios-arrow-dropdown' size={18} color='skyblue' />
                //   </View>
                // </ModalDropdown>
              }
              <Image source={require('../../img/person/xiaozu.png')} style={{ marginTop: 10 }} />
            </View>
            <View style={{ flex: 2, paddingVertical: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ flex: 1, fontSize: 12 }}>党小组组长：{this.info.groupData.zz}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ flex: 1, fontSize: 12 }}>党小组组员：{this.info.groupData.zy}</Text>
              </View>
            </View>
          </View>
          {this.state.position !== '00' &&
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderColor: 'lightgrey', marginVertical: 5, paddingVertical: 5 }}>
                <Button rounded light style={{ justifyContent: 'center', height: 20 }} onPress={() => { this._onClickPie('sex') }}><Text>性  别</Text></Button>
                <Button rounded light style={{ justifyContent: 'center', height: 20 }} onPress={() => { this._onClickPie('diploma') }}><Text>学  历</Text></Button>
                <Button rounded light style={{ justifyContent: 'center', height: 20 }} onPress={() => { this._onClickPie('type') }}><Text>党员类型</Text></Button>
              </View>
              <View style={{ height: 200 }}>
                <PieChart
                  style={styles.chart}
                  logEnabled={true}
                  data={this.state.data}
                  legend={legend}
                  entryLabelColor={processColor('black')}
                  entryLabelTextSize={12}
                  rotationEnabled={false}
                  drawSliceText={true}
                  usePercentValues={false}
                  centerText={'党员信息统计图'}
                  centerTextRadiusPercent={100}
                  holeRadius={40}
                  holeColor={processColor('#f0f0f0')}
                  transparentCircleRadius={45}
                  transparentCircleColor={processColor('#f0f0f088')}
                  maxAngle={360}
                  onSelect={this.handleSelect.bind(this)}
                />
              </View>
            </View>
          }
        </ScrollView>
      </View>
    );
  }

  async componentDidMount() {
    let u = await getUser();
    fetchPost('A08463105', {
      ptytbrOrgId: u.ptytbrOrgId,
      ptybrchOrgId: u.ptybrchOrgId,
      ptygrpOrgId: u.ptygrpOrgId
    }, this._success.bind(this), this._failure.bind(this))
  }


  _rolemap = (parGrp, list) => {
    list.map(item=>{
      switch(item.ptymbrPostTpcd) {
        case '01':
          parGrp.sj = item.usrNm;
          break;
        case '02':
          parGrp.fsj = item.usrNm;
          break;
        case '03':
          parGrp.dw = item.usrNm;
          break;
        case '04':
          parGrp.xw = item.usrNm;
          break;
        case '05':
          parGrp.zw = item.usrNm;
          break;
        case '06':
          parGrp.jw = item.usrNm;
          break;
        case '07':
          parGrp.qw = item.usrNm;
          break;
        case '08':
          parGrp.qg = item.usrNm;
          break;
        case '09':
          parGrp.bw = item.usrNm;
          break;
        case '10':
          parGrp.zz = item.usrNm;
          break;
        default:
          break;
      }
    });
  }

  _success = (resp) => {
    
    alert(JSON.stringify(resp))
    if (resp.BK_STATUS == "00") {
      this._rolemap(this.info.centerData, resp.list1);
      this._rolemap(this.info.branchData, resp.list2);
      // this.info.centerDate.sj = resp.list1[0].usrNm
      // this.info.centerDate.fsj = resp.list1[1].usrNm
      // this.info.centerDate.jw = resp.list1[2].usrNm
      // this.info.centerDate.zw = resp.list1[3].usrNm
      // this.info.centerDate.xw = resp.list1[4].usrNm

      // this.info.branchDate.sj = resp.list2[0].usrNm
      // this.info.branchDate.fsj = resp.list2[1].usrNm
      // this.info.branchDate.jw = resp.list2[2].usrNm
      // this.info.branchDate.zw = resp.list2[3].usrNm
      // this.info.branchDate.xw = resp.list2[4].usrNm

      this.info.groupData.zz = resp.usrNm;
      this.info.groupData.zy = resp.list3.map((item)=>item.usrNm).join();
 
      this.setState({ ready: true })
    } else {
      alert(resp.BK_DESC)
    }
  };

  _failure(error) {
    alert(error);
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1
  }
});

export default PartyInfo;