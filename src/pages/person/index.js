import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl, Dimensions ,ActivityIndicator } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator, Left, Right} from 'native-base';
import common from '../../common'
import EmptyView from '../../components/EmptyView'
import Icon from 'react-native-vector-icons/Ionicons';

import { getUser } from '../../utils/StorageUtil'
import { fetchPost } from '../../utils/fetchAPI';

export default class Person extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false
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
      this.dscp = resp.wrkUnitNm + ' ' + resp.blngDeptNm;
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
        item.description = '党员'
        this.records.push(item);
      }
      this.setState({ ready: true })
      // storage.save({
      //   key: 'partyInfo',
      //   data: JSON.stringify(resp),
      //   // expires: 1000 * 3600 
      // }).then(() => this.setState({ ready: true }))
    } else {
      alert(resp.BK_DESC)
    }
  };

  _failure(error) {
    alert(error);
  };


  _page = () => {
    return (
        <Content>
          <List>
            <ListItem>
              <Thumbnail square size={80} source={require('../../img/person/hongjun.png')} />
              <Body>
                <Text>{this.name}</Text>
                <Text note>{this.dscp}</Text>
              </Body>
            </ListItem>
            <Separator />
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
                <Icon name='ios-people-outline' size={25} color='skyblue' />
              </Left>
              <Body>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Party', { name: this.name, department: this.department, records: this.records,pos:this.pos})}>
                  <Text>组织关系</Text>
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
            <Separator />
            <ListItem icon>
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
            <Separator />
            <ListItem icon>
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
            <Separator />
          </List>
        </Content>
    );

  }

  render() {
    return (
      <Container>
        {this.state.ready ? this._page() : <ActivityIndicator size="large" />}
      </Container>
    );
  }
}