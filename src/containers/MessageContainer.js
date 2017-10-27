import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableHighlight
} from 'react-native';
import { ListItem, Header,Left, Body, Right, Text, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import common from '../common'

const notices = [
  { title: '关于2017年度国庆节放假安排通知', note: '10月1日（星期日）至8日放假调休', time: '13:49' },
  { title: '因公出国（境）团组公示', note: '马德里分行技术支持', time: '08:10' },
  { title: '关于禁止快递、外卖进入汇融大厦通知', note: '维护世界和平', time: '12:00', last:true }
];


class MessageContainer extends Component {
  static navigationOptions = {
    // title: 'Welcome',
    header: null,
    tabBarLabel: '通知',
    tabBarIcon: () => (
      <Icon name='ios-chatboxes-outline' size={30}/>      
    ),
  };

  _renderNoticeList = ({ item }) => (
    item.last == undefined ?
    <ListItem avatar>
      <Left>
        <Image source={require('../img/message/notice.png')} />
      </Left>
      <Body>
        <Text>{item.title}</Text>
        <Text note>{item.note}</Text>
      </Body>
      <Right>
        <Text note>{item.time}</Text>
      </Right>
    </ListItem> :
    <ListItem avatar last>
    <Left>
      <Image source={require('../img/message/notice.png')} />
    </Left>
    <Body>
      <Text>{item.title}</Text>
      <Text note>{item.note}</Text>
    </Body>
    <Right>
      <Text note>{item.time}</Text>
    </Right>
  </ListItem> 
  )

  render() {
    return (
      <View style={{ flex: 1}}>
        <Header style={styles.header}>
          <Left>
            <Text style={{ color: '#FFFFFF' }}>通知</Text>
          </Left>
          <Right>
          </Right>
        </Header>
        {
        // <View style={{backgroundColor: '#ffffff'}}>
        //   <FlatList
        //     data={notices}
        //     keyExtractor={(item, index) => item.title}
        //     renderItem={this._renderNoticeList}
        //   />
        // </View>
        }
        <Image style={{ width: common.width, height:common.height-120}} source={require('../img/constructing.jpg')} />        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: 'black'
  }
});

export default MessageContainer;