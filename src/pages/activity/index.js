/*
 * @Author: zhaozheng1.zh 
 * @Date: 2017-09-09 22:10:22 
 * @Last Modified by: zhaozheng1.zh
 * @Last Modified time: 2017-10-12 20:08:39
 */


import React, { Component } from 'react';
import { Image, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Card, CardItem, Root, Toast } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';
import { ACTIVITY_TYPE } from '../../constants/ActivityFilterType';
import Icon from 'react-native-vector-icons/Ionicons';
import FC from './FlipCard';
import EmptyView from '../../components/EmptyView';
import { fetchPost } from '../../utils/fetchAPI';
import { getUser } from '../../utils/StorageUtil';


const butts = [{ name: '全部', type: '00' }, { name: '党', type: '02' }, { name: '团', type: '03' }, { name: '工会', type: '04' }, { name: '协会', type: '05' }, { name: '其他', type: '01' }];
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
            <Icon name='ios-paper-plane-outline' size={30} color='red' />
          </Left>
          <Right>
            <TouchableOpacity>
              <Icon name='md-search' size={30} color='skyblue' />
            </TouchableOpacity>
            <EmptyView w={10} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Create')}>
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
          <ModalDropdown style={{ alignSelf: 'center' }}
            options={buttonmenus}
            dropdownStyle={{ alignSelf: 'center', width: 200, height: 70, borderWidth: 2, borderRadius: 3 }}
            onSelect={(idx, value) => this._dropdown_onSelect(idx, value)}>
            <View style={{ width: 200, alignItems: 'center' }}>
              <Image
                source={require('../../img/activity/unfold.png')}
              />
            </View>
          </ModalDropdown>
        </View>
        <View style={styles.activityList}>
          {ready ? <FlatList
            data={activities}
            keyExtractor={(item, index) => item.thpyadthmsAvyId}
            renderItem={this._renderActivityItem}
            onEndReached={this.fetchMore}
            ListFooterComponent={() => {
              return pager &&
                <ActivityIndicator size="large" style={styles.loading} />
            }}
          />
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


  fetchData = (pageNo, pageCount, type, flag) => {
    const now = new Date();
    const beginDate = now.getFullYear() + "" + this.formatTime(now.getMonth() + 1) + "" + this.formatTime(now.getDate());
    const beginTime = '000000';
    const end = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);
    const endDate = end.getFullYear() + "" + this.formatTime(end.getMonth() + 1) + "" + this.formatTime(end.getDate());
    const endTime = '235959';
    fetchPost('A08464102', {
      thpyadthmsStmUsrId: '12345678',
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
    if (resp.BK_STATUS == "00") {
      const acts = this.state.activities.concat(resp.list)
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
    }
  };

  _failure(error) {
    alert(error);
  };



  fetchMore = () => {
    if(this.state.pager || this.listPageEnd){
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


  _renderActivityItem = ({ item }) => (
    <FC item={item} nav={this.props.navigation.navigate} />
    // <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { info: item })}>
    //   <Card style={{ backgroundColor: 'red' }}>
    //     <CardItem header style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    //       <View style={{ flexDirection: 'row' }}>
    //         <Image source={require('../../img/activity/party.png')} />
    //         <Text style={{ marginLeft: 10, fontWeight: '200' }}>{item.theme}</Text>
    //       </View>

    //       <Text style={{ color: 'gray', fontSize: 12 }}>{item.status}</Text>
    //     </CardItem>
    //     <CardItem>
    //       <Body>
    //         <Text style={{ fontSize: 12, fontWeight: '100' }}>
    //           {item.content}
    //         </Text>
    //       </Body>
    //     </CardItem>
    //     {
    //       // <View style={{ height: 1, backgroundColor: 'lightgray' }} />
    //     }
    //     <CardItem footer style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    //       <Text style={{ fontSize: 12 }}>{item.starttime}</Text>
    //       <Text style={{ fontSize: 12 }}>{item.org}</Text>
    //     </CardItem>
    //   </Card>
    // </TouchableOpacity>
  );

  _renderButtonItem = ({ item }) => {
    return (
      <Button light rounded style={styles.butt} onPress={() => this._filterActivities(item.type)}>
        <Text>{item.name}</Text>
      </Button>
    );
  }


  _filterActivities = async type =>{
    this.setState({
      ready:false,
      activities: []
    }, () => this.fetchData(1, 10,type, '00')); 
    this.setState({ type: type });
  }


  _dropdown_onSelect = () => {

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
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    borderStyle: 'solid',
    borderColor: 'aliceblue',
    borderBottomWidth: 1
  },
  butt: {
    // width: 80,
    height: 28,
    marginHorizontal:5
  },
  activityList: {
    paddingHorizontal: 10,
    flex: 1
  }
});


