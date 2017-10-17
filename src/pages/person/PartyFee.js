/*
* @Author: miaoxinyu.zh
* @Date:   2017-08-22 06:06:10
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-13 14:48:14
*/
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  ScrollView,
  FlatList
} from 'react-native';
import { Button, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import EmptyView from '../../components/EmptyView';
import { getUser } from '../../utils/StorageUtil'
import { fetchPost } from '../../utils/fetchAPI';

class PartyFee extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      year: '2017',
    }
  }
  data = []

  async componentDidMount() {
    u = await getUser();    
    fetchPost('A08463104', {
      Pty_Grp_Stm_Usr_ID:  u.Pty_Grp_Stm_Usr_ID,
      Yr_YYYY: '2017'
    }, this._success.bind(this), this._failure.bind(this))
  }



  _success(resp) {
    if (resp.BK_STATUS == "00") {
      for (let i = 0; i < resp.LIST1.length; i++) {
        let item = {
          month:'',
          money :'',
          status :'00'
        };
        item.month = resp.LIST1[i].Mo_MO;
        item.money = resp.LIST1[i].Pbl_Pty_Fee_Amt;
        item.status = resp.LIST1[i].Py_StCd;
        this.data.push(item);
      }
      this.setState({ ready: true })
    } else {
      alert(resp.BK_DESC)
    }
  };

  _failure(error) {
    alert(error);
  };

  _onClick = year => {
    fetchPost('A08463104', {
      Pty_Grp_Stm_Usr_ID: '01000364',
      Yr_YYYY: year
    },
      (resp) => {
        if (resp.BK_STATUS == "00" && resp.ScsInd == "0") {
          this.data =[];
          for (let i = 0; i < resp.LIST1.length; i++) {
            let item = {
              month:'',
              money:'',
              status:'00'
            };
            item.month = resp.LIST1[i].Mo_MO;
            item.money = resp.LIST1[i].Pbl_Pty_Fee_Amt;
            item.status = resp.LIST1[i].Py_StCd;
            this.data.push(item);
          }
        } else {
          alert(resp.BK_DESC)
        }
      },
      (error) => {
        alert(error)
      }
    )
    this.setState({ year: year});
  }


  _renderItemComponent = ({ item }) => {
    let color = '';
    switch (item.status) {
      case '02':
        color = 'skyblue';
        break;
      case '01':
        color = 'red';
        break;
      default:
        color = 'grey';
    }
    return (
      <View style={{ flexDirection: 'row', width: 115 }}>
        <Card>
          <CardItem style={{ backgroundColor: color, justifyContent: 'center' }}>
            <Text>{item.month}</Text>
          </CardItem>
          <CardItem style={{ justifyContent: 'center' }}>
            <Text>{item.money}</Text>
          </CardItem>
        </Card>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ flex: 1 }}>本次应缴党费：</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='rmb' size={18} color='gold' />
              <Text>  143</Text>
            </View>
          </View>
          <EmptyView h={10} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ flex: 1 }}>历史已缴党费：</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='rmb' size={18} color='gold' />
              <Text>  10000</Text>
            </View>
          </View>
          <EmptyView h={10} />
          <View style={{ height: 1, backgroundColor: 'grey' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
            <Button bordered style={{ justifyContent: 'center', height: 20 }} onPress={() => this._onClick('2017')}><Text>2017年</Text></Button>
            <Button bordered style={{ justifyContent: 'center', height: 20 }} onPress={() => this._onClick('2016')}><Text>2016年</Text></Button>
            <Button bordered style={{ justifyContent: 'center', height: 20 }} onPress={() => this._onClick('2015')}><Text>2015年</Text></Button>
          </View>
          <EmptyView h={20} />
          <FlatList
            data={this.data}
            horizontal={false}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-around' }}
            renderItem={this._renderItemComponent}
          />
        </ScrollView>
      </View >
    );
  }
}

export default PartyFee;