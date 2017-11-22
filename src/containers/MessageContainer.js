import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableHighlight,
  WebView
} from 'react-native';
import { ListItem, Header, Left, Body, Right, Text, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import common from '../common'

const notices = [
  { title: '关于2017年度国庆节放假安排通知', note: '10月1日（星期日）至8日放假调休', time: '13:49' },
  { title: '因公出国（境）团组公示', note: '马德里分行技术支持', time: '08:10' },
  { title: '关于禁止快递、外卖进入汇融大厦通知', note: '维护世界和平', time: '12:00', last: true }
];


class MessageContainer extends Component {
  static navigationOptions = {
    // title: 'Welcome',
    header: null,
    tabBarLabel: '通知',
    tabBarIcon: ({ tintColor }) => <Icon name='ios-chatboxes-outline' size={30} color={tintColor} />

  };

  constructor(props) {
    super(props);
    this.state = {
      url: 'https://www.baidu.com',
      title: '',
      canBack: false
    }
  }


  onBack() {
    //如果网页还有上级页面（可返回）
    if (this.state.canBack) {
      this.webView.goBack();
    } else {
      //提示不能返回上一页面了
      alert('再点击就退出啦', DURATION.LENGTH_SHORT);
    }
  }

  onNext() {
    this.setState({
      //设置请求地址
      url: this.text
    })
  }

  onNavigationStateChange(e) {
    this.setState({
      title: e.title,
      //设置是否要以返回上级页面
      canBack: e.canGoBack
    })
  }

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

  componentWillMount() {
    console.log("message mount");
  }

  render() {
    console.log("message render");
    return (
      <View style={{ flex: 1 }}>
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
        <View style={styles.container}>
          <View style={styles.item}>
            <Text style={styles.text} onPress={() => { this.onBack() }}>返回</Text>
            <TextInput style={styles.input}
              defaultValue={'https://www.baidu.com'}
              onChangeText={text => this.text = text}></TextInput>
            <Text style={styles.text} onPress={() => { this.onNext() }}>GO</Text>
          </View>
          <WebView source={{ uri: this.state.url }}
            onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
            ref={webView => this.webView = webView}></WebView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: 'black'
  },
  container: {
    flex: 1
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginLeft: 10
  },
  input: {
    height: 40,
    marginLeft: 10,
    flex: 1,
    borderWidth: 1
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    marginRight: 10
  }
});

export default MessageContainer;