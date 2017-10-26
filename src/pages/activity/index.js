/*
 * @Author: zhaozheng1.zh 
 * @Date: 2017-09-09 22:10:22 
 * @Last Modified by: fishci
 * @Last Modified time: 2017-10-26 15:18:00
 */


import React, { Component } from 'react';
import { Image, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Card, CardItem, Root } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';
import { ACTIVITY_TYPE } from '../../constants/ActivityFilterType';
import Icon from 'react-native-vector-icons/Ionicons';
import EmptyView from '../../components/EmptyView';
import { fetchPost } from '../../utils/fetchAPI';
import { getUser } from '../../utils/StorageUtil';
import W from '../../common/index';
import Cell from '../activity/Cell';


const butts = [{ name: '全部', type: '00' }, { name: '党', type: '01' }, { name: '团', type: '02' }, { name: '工会', type: '03' }, { name: '协会', type: '04' }, { name: '其他', type: '99' }];
const buttonmenus = ['我发起的', '我参与的']
export default class activity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      ready: false,
      pager: false,
      type: '00',
      flag: '00'
    };
  }

  pageNo = 1;
  pageCount = 10;
  listPageEnd = false;

  componentDidMount() {
   this.fetchData(this.pageNo, this.pageCount, this.state.type, this.state.flag);
  }

  render() {
    const { activities, ready, pager } = this.state;

    return (
      <Root>
        <Header style={styles.header}>
          <Left>
            <Text>活动</Text>
          </Left>
          <Right>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Create',{title:'创建活动'})}>
              <Icon name='md-add' size={30} color='skyblue' />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={styles.filter}>
          <FlatList
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            numColumns={4}
            keyExtractor={(item, index) => item}
            data={butts}
            renderItem={this._renderButtonItem}
          />
        </View>
        <View style={styles.activityList}>
          {ready ? activities.length > 0 ? <FlatList
            data={activities}
            keyExtractor={(item, index) => item.thpyadthmsAvyId}
            renderItem={this._renderActivityItem}
            ItemSeparatorComponent={() => <EmptyView h={1} bc='darkgrey'/>}
            onEndReached={this.fetchMore}
            ListFooterComponent={() => {
              return pager &&
                <ActivityIndicator size="large" style={styles.loading} />
            }}
          /> : <Text style={{ fontSize: 16 }}> 无活动 </Text>
            : <ActivityIndicator size="large" style={styles.loading} />}
        </View>
      </Root>
    );
  }

  // fetchData = async () => {
  //   this.setState({
  //     refreshing: true,
  //   });
  //   this.refreshing = true;
  //   return await storage.getAllDataForKey('Activity')
  // };


  fetchData = async (pageNo, pageCount, type, flag) => {
    const now = new Date();
    const beginDate = now.getFullYear() + "" + this.formatTime(now.getMonth() + 1) + "" + this.formatTime(now.getDate());
    const beginTime = '000000';
    const end = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);
    const endDate = end.getFullYear() + "" + this.formatTime(end.getMonth() + 1) + "" + this.formatTime(end.getDate());
    const endTime = '235959';
    u = await getUser();
    
    fetchPost('A08464102', {
      thpyadthmsStmUsrId: u.thpyadthmsStmUsrId,
      thpyadthmsAvyStdt: beginDate,
      thpyadthmsAvySttm: beginTime,
      thpyadthmsAvyEddt: endDate,
      thpyadthmsAvyEdtm: endTime,
      thpyadthmsAvyClcd: type,
      ptyGrpEnqrInd: flag,
      _pagination: {
        REC_IN_PAGE: pageCount,
        PAGE_JUMP: pageNo,
        sortFields: []
      }
    }, this._success.bind(this), this._failure.bind(this))
  };

  _success(resp) {
    //console.log(resp);
    if (resp.BK_STATUS == "00") {
      const acts = [];
      if (resp.list != undefined && resp.list != null && resp.list.length > 0) {
        acts = this.state.activities.concat(resp.list)
      } else {
        acts = this.state.activities
      }
      console.log("------------------------------");
      // resp.list.map((item)=>{console.log(item.thpyadthmsAvyId)}) 
      this.setState({
        activities: acts
      },
        () => {
          if (resp.comb.curr_total_page == resp.comb.total_page) {
            this.listPageEnd = true;
          }
          this.setState({
            ready: true,
            pager: false
          })
        }
      );
    } else {
      ToastAndroid.show(resp.BK_DESC, ToastAndroid.SHORT);
      this.setState({
        ready: true,
        pager: false
      })
    }
  };

  _failure(error) {
    console.log(error);
    ToastAndroid.show("网络连接失败，请稍后再试！", ToastAndroid.LONG);
    this.setState({
      ready: true,
      pager: false
    })
  };



  fetchMore = () => {
    if (this.state.pager || this.listPageEnd) {
      return
    }
    // if (this.listPageEnd) {
    //   Toast.show({
    //     text: '没有更多数据了~~~  =.=!',
    //     position: 'bottom',
    //     buttonText: 'OK',
    //     type: 'warning',
    //     duration: 2000
    //   })
    //   return
    // }
    this.pageNo += 1;
    this.setState({
      pager: true
    }, () => this.fetchData(this.pageNo, this.pageCount, this.state.type, this.state.flag));
  };


  formatTime = i => {
    if (i < 10) {
      return "0" + i;
    } else {
      return i;
    }
  }


  _renderActivityItem = ({ item }) => <Cell item={item} navigate = {this.props.navigation.navigate}/>
  

  _renderButtonItem = ({ item }) => {
    return (
      this.state.type === item.type ?
        <Button primary style={styles.butt} onPress={() => this._filterActivities(item.type)}>
          <Text style={{ textAlign: 'center' }}>{item.name}</Text>
        </Button>
        : <Button bordered style={styles.butt} onPress={() => this._filterActivities(item.type)}>
          <Text style={{ textAlign: 'center' }}>{item.name}</Text>
        </Button>
    );
  }


  _filterActivities = async type => {
    this.listPageEnd = false;
    this.setState({
      ready: false,
      type,
      activities: []
    }, () => this.fetchData(1, 10, type, '00'));
  }

}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: 'aliceblue'
  },
  dropdown: {
    // width: 100,
    // height: 40,
  },
  filter: {
    backgroundColor:'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderStyle: 'solid',
    borderColor: 'aliceblue',
  },
  butt: {
    width: W.width / 4 - 15,
    height: 28,
    marginHorizontal: 5,
    justifyContent: 'center'
  },
  activityList: {
    marginTop:10,
    backgroundColor:'white',
    flex: 1,
  }
});
