import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl, Dimensions ,ActivityIndicator,ToastAndroid,BackHandler} from 'react-native'
import { Container,Root, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator, Left, Right,Button} from 'native-base';
import common from '../../common'
import EmptyView from '../../components/EmptyView'
import Icon from 'react-native-vector-icons/Ionicons';

import { getUser } from '../../utils/StorageUtil'
import { fetchPost } from '../../utils/fetchAPI';

export default class Person extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: true
    }
  }

  name = '';
  dscp = '中国建设银行 北京开发中心';
  department = '';
  departmentIds = '';
  records = [];
  pos = false;


  async componentDidMount() {
    u = await getUser();
    fetchPost('A08463101', {
      thpyadthmsStmUsrId: u.thpyadthmsStmUsrId,
    }, this._success.bind(this), this._failure.bind(this))
  }


  _success = (resp) => {
    if (resp.BK_STATUS == "00") {
      this.name = resp.usrNm;
      if(resp.wrkUnitNm != undefined && resp.blngDeptNm != undefined) {
        this.dscp = resp.wrkUnitNm + ' ' + resp.blngDeptNm;
      }
      
      this.department = resp.ptytbrOrgNm + ' ' + resp.ptybrchOrgNm + ' ' + resp.ptygrpOrgNm;
      this.pos = resp.List3 === undefined? true:false
      for (let i = 0; resp.list1!=undefined && i < resp.list1.length; i++) {
        let item = {
          lineColor: 'red',
          icon: require('../../img/person/dang.png'),
          time: '',
          title: '',
          description: ''
        };
        item.time = resp.list1[i].rsmStdt;
        item.title = resp.list1[i].ptytbrOrgNm + ' ' + resp.list1[i].ptybrchOrgNm + ' ' + resp.list1[i].ptygrpOrgNm
        item.description = '共产党员'
        this.records.push(item);
      }
      this.setState({ ready: true })
      // storage.save({
      //   key: 'partyInfo',
      //   data: JSON.stringify(resp),
      //   // expires: 1000 * 3600 
      // }).then(() => this.setState({ ready: true }))
    } else {
      ToastAndroid.show("革命战友" + resp.BK_DESC, ToastAndroid.SHORT);
    }
  };

  _failure(error) {
    console.log(error);
    ToastAndroid.show("网络连接失败，请稍后再试！", ToastAndroid.LONG);
  };


  _page = () => {
    return (
      <Root>
        <Content>
          <List>
            <ListItem last>
              <Thumbnail square size={80} source={require('../../img/person/hongjun.png')} />
              <Body>
                <Text>{this.name}</Text>
                <Text note>{this.dscp}</Text>
              </Body>
            </ListItem>
            <View sytle={[styles.separator]}><Text> </Text></View>
            <View style={{backgroundColor: '#ffffff'}}>
            <ListItem icon>
              <Left>
                <Icon name='ios-contact-outline' size={25} color='skyblue' />
              </Left>
              <Body>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('PersonInfo')}>
                  <Text>基本信息</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name='ios-arrow-forward-outline' size={25} color='black' />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name='ios-book-outline' size={25} color='skyblue' />
              </Left>
              <Body>
                <Text>岗位能力</Text>
              </Body>
              <Right>
                <Icon name='ios-arrow-forward-outline' size={25} color='black' />
              </Right>
            </ListItem>
            <ListItem icon last>
            <Left>
              <Icon name='ios-hand-outline' size={25} color='skyblue' />
            </Left>
            <Body>
              <Text>我的权益</Text>
            </Body>
            <Right>
              <Icon name='ios-arrow-forward-outline' size={25} color='black' />
            </Right>
          </ListItem>
            </View>
            
            <View sytle={[styles.separator]}><Text> </Text></View>
            <View style={{backgroundColor: '#ffffff'}}>
            <ListItem icon>
              <Left>
                <Icon name='ios-aperture-outline' size={25} color='skyblue' />
              </Left>
              <Body>
                <TouchableOpacity onPress={() => {
                  if(this.records.length == 0) {
                    ToastAndroid.show("暂时未录入党员履历！",ToastAndroid.SHORT);
                  } else {
                    this.props.navigation.navigate('Party', { name: this.name, department: this.department, records: this.records,pos:this.pos})}
                  }
                }>
                  <Text>党员历程</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name='ios-arrow-forward-outline' size={25} color='black' />
              </Right>
            </ListItem>
            <ListItem icon>
            <Left>
              <Icon name='ios-people-outline' size={25} color='skyblue' />
            </Left>
            <Body>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PartyInfo',{department:this.department,pos:this.pos})} >
                <Text>革命战友</Text>
              </TouchableOpacity>
            </Body>
            <Right>
              <Icon name='ios-arrow-forward-outline' size={25} color='black' />
            </Right>
          </ListItem>
          <ListItem icon>
          <Left>
            <Icon name='ios-pricetags-outline' size={25} color='skyblue' />
          </Left>
          <Body>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('PartyFee')}>
              <Text>缴纳党费</Text>
            </TouchableOpacity>
          </Body>
          <Right>
            <Icon name='ios-arrow-forward-outline' size={25} color='black' />
          </Right>
        </ListItem>
            </View>

            
            <View sytle={[styles.separator]}><Text> </Text></View>
            <ListItem icon last>
              <Left>
                <Icon name='ios-build-outline' size={25} color='skyblue' />
              </Left>
              <Body>
                <Text>设置</Text>
              </Body>
              <Right>
                <Icon name='ios-arrow-forward-outline' size={25} color='black' />
              </Right>
            </ListItem>
            <View sytle={[styles.separator]}><Text> </Text></View>
            <Button full onPress={this._logout}>
            <Text>退出</Text>
           </Button>
         </List>       
       </Content>
     </Root>
   );
 }

 _logout=()=>{
   storage.clearMapForKey('user');
  //  this.props.navigation.navigate('Login',{logout:true});
  // this.props.navigation.goBack('Login');
  BackHandler.exitApp();
 }

  render() {
    return (
      <Container>
        {this.state.ready ? this._page() : <ActivityIndicator size="large" />}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  separator : {flex:1, backgroundColor: '#f0f0f0',height:20}
});