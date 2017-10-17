import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Button,
  PixelRatio,
  FlatList,
  TouchableHighlight
} from 'react-native';
import SideBar from '../components/SideBar';
import { Header, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import EmptyView from '../components/EmptyView';
import contacts from '../utils/data';


const { width, height } = Dimensions.get('window');
const global = require('../utils/global');
const pinyinUtil = require('../utils/pinyinutil.js');

class ChatContainer extends Component {
  static navigationOptions = {
    // title: 'Welcome',
    header: null,
    tabBarLabel: '工作圈',
    tabBarIcon: () => (
      <Image
        source={require('../img/chat/chat.png')}
      />
    ),
  };

  _renderSuccessView = () => {
    var listData = [];
    var headerListData = [];
    var headerImages = [require('../img/message/ic_new_friends.png'), require('../img/message/ic_group_chat.png'),
    require('../img/message/ic_tag.png'), require('../img/message/ic_common.png')];
    var headerTitles = ['新的朋友', '群聊', '标签', '公众号'];
    var index = 0;
    for (var i = 0; i < headerTitles.length; i++) {
      headerListData.push({
        key: index++,
        title: headerTitles[i],
        icon: headerImages[i],
        sectionStart: false,
      });
    }
    for (var i = 0; i < contacts.length; i++) {
      var pinyin = pinyinUtil.getFullChars(contacts[i]);
      var firstLetter = pinyin.substring(0, 1);
      if (firstLetter < 'A' || firstLetter > 'Z') {
        firstLetter = '#';
      }
      listData.push({
        key: index++,
        // icon: { uri: contacts[i].avatar },
        title: contacts[i],
        pinyin: pinyin,
        firstLetter: firstLetter,
        sectionStart: false,
      })
    }
    // 按拼音排序
    listData.sort(function (a, b) {
      if (a.pinyin === undefined || b.pinyin === undefined) {
        return 1;
      }
      if (a.pinyin > b.pinyin) {
        return 1;
      }
      if (a.pinyin < b.pinyin) {
        return -1;
      }
      return 0;
    });
    listData = headerListData.concat(listData);
    // 根据首字母分区
    for (var i = 0; i < listData.length; i++) {
      var obj = listData[i];
      if (obj.pinyin === undefined) {
        continue;
      }
      if (i > 0 && i < listData.length) {
        var preObj = listData[i - 1];
        if (preObj.pinyin === undefined && obj.pinyin !== undefined) {
          obj.sectionStart = true;
        } else if (preObj.pinyin !== undefined && obj.pinyin !== undefined && preObj.firstLetter !== obj.firstLetter) {
          obj.sectionStart = true;
        }
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.divider} />
        <View style={styles.content}>
          <FlatList
            data={listData}
            renderItem={this.renderItem}
          />
          <SideBar />
        </View>
        <View style={styles.divider}></View>
      </View>
    );
  }


  renderItem = (item) => {
    var section = [];
    if (item.item.sectionStart) {
      section.push(<Text key={"section" + item.item.key} style={listItemStyle.sectionView}>{item.item.firstLetter}</Text>);
    }
    return (
      <View>
        {section}
        <TouchableHighlight underlayColor={global.touchableHighlightColor} onPress={() => { this.props.navigation.navigate('ContactDetail', { title: '详细资料', data: item.item }) }}>
          <View style={listItemStyle.container} key={item.item.key}>
            <Image style={listItemStyle.image} source={item.item.icon == null ? require('../img/message/avatar.png') : item.item.icon} />
            <Text style={listItemStyle.itemText}>{item.item.title}</Text>
          </View>
        </TouchableHighlight>
        <View style={{ width: width, height: 1 / PixelRatio.get(), backgroundColor: global.dividerColor }} />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header style={styles.header}>
          <Left>
            <Text style={{ color: '#FFFFFF' }}>工作圈</Text>
          </Left>
          <Right>
            <TouchableHighlight>
              <Icon name='md-search' size={30} color='#FFFFFF' />
            </TouchableHighlight>
            <EmptyView w={10} />
            <TouchableHighlight>
              <Icon name='md-add' size={30} color='#FFFFFF' />
            </TouchableHighlight>
          </Right>
        </Header>
        {this._renderSuccessView()}
      </View>
    );
  }
}

const listItemStyle = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  image: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    width: 35,
    height: 35,
  },
  itemText: {
    fontSize: 15,
    color: '#000000'
  },
  sectionView: {
    width: width,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    color: '#999999'
  }
});

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#D3D3D3'
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    backgroundColor: global.pageBackgroundColor
  },
  tabBarIcon: {
    width: 24,
    height: 24,
  },
});

export default ChatContainer;
