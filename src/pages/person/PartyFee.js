/*
* @Author: caixin1.zh
* @Date:   2017-10-19 06:06:10
 * @Last Modified by: fishci
 * @Last Modified time: 2017-10-31 14:27:07
*/
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  ScrollView,
  FlatList,Toast,Root, ToastAndroid,Dimensions
} from 'react-native';
import { Button, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import EmptyView from '../../components/EmptyView';
import { getUser } from '../../utils/StorageUtil'
import { fetchPost } from '../../utils/fetchAPI';
import LoadingView from '../../components/LoadingView';
import W from '../../common/index';

class PartyFee extends React.Component {

  constructor(props) {
    super(props);
    this.data = [];
    this.now = new Date()
    this.totalAmount = 0
    this.payAmount = 0
    this.state = {
      ready: false,
      year: this.now.getFullYear(),
      showLoading: true 
    }
  }

  async componentDidMount() {
    u = await getUser();
    fetchPost('A08463104', {
      thpyadthmsStmUsrId: u.thpyadthmsStmUsrId,
      yrYyyy: this.state.year + ""
    }, this._success.bind(this), this._failure.bind(this));
  }



  _success(resp) {
      if (resp.BK_STATUS == "00") {
        this.data =[];
        this.totalAmount = 0
        this.payAmount = 0
        for (let i = 0; resp.list != undefined && i < resp.list.length; i++) {
          let item = {
            month:'',
            money:'',
            status:'00'
          };
          if(resp.list[i].thpyadthmsPyfStcd == '01') {
            this.payAmount += resp.list[i].thpyadthmsactPyfAmt;
          } else if(resp.list[i].thpyadthmsPyfStcd == '02') {
            this.totalAmount += resp.list[i].thpyadthmsactPyfAmt;
          }
          item.month = resp.list[i].moMo;
          item.money = resp.list[i].thpyadthmsactPyfAmt;
          item.status = resp.list[i].thpyadthmsPyfStcd;
          this.data.push(item);
        }
        
        this.setState({showLoading:false});
        //this.setState({year: resp.yrYyyy});
      } else {
        this.setState({showLoading:false},()=>
        ToastAndroid.show(error, ToastAndroid.SHORT));
      }
  }

  _failure(error) {
    console.log(error);
    
    this.setState({showLoading:false},()=>
    ToastAndroid.show("网络连接失败，请稍后再试！", ToastAndroid.LONG)
    );
  };

  _onClick = year => {
    if(year == this.state.year) return;
    this.setState({showLoading:true, year:year});
    fetchPost('A08463104', {
      thpyadthmsStmUsrId: u.thpyadthmsStmUsrId,
      yrYyyy: year + ""
    }, this._success.bind(this), this._failure.bind(this))
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
      <View style={{ flexDirection: 'row', width: (Dimensions.get('window').width - 40) /3, margin:5 }}>
        <Card>
          <CardItem style={{ backgroundColor: color, justifyContent: 'center' }}>
            <Text>{item.month}月</Text>
          </CardItem>
          <CardItem style={{ justifyContent: 'center' }}>
            <Text>{item.money}元</Text>
          </CardItem>
        </Card>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, margin: 5 }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ flex: 1 }}>本次应缴党费：</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='rmb' size={18} color='gold' />
              <Text> {this.payAmount}元</Text>
            </View>
          </View>
          <EmptyView h={10} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ flex: 1 }}>历史已缴党费：</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='rmb' size={18} color='gold' />
              <Text> {this.totalAmount}元</Text>
            </View>
          </View>
          <EmptyView h={10} />
          <View style={{ height: 1, backgroundColor: 'grey' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
          {
            this.state.year == this.now.getFullYear() ?
              <Button info style={styles.butt}  onPress={() => this._onClick(parseInt(this.now.getFullYear()))}>
                <Text style={{ textAlign: 'center' }}>{this.now.getFullYear()}年</Text>
              </Button>
              : <Button bordered style={styles.butt}  onPress={() => this._onClick(parseInt(this.now.getFullYear()))}>
                <Text style={{ textAlign: 'center' }}>{this.now.getFullYear()}年</Text>
              </Button>
          }
          {
            this.state.year == this.now.getFullYear() - 1 ?
              <Button info style={styles.butt}  onPress={() => this._onClick(parseInt(this.now.getFullYear()) - 1)}>
                <Text style={{ textAlign: 'center' }}>{"" + (parseInt(this.now.getFullYear() - 1))}年</Text>
              </Button>
              : <Button bordered style={styles.butt}  onPress={() => this._onClick(parseInt(this.now.getFullYear()) - 1)}>
                <Text style={{ textAlign: 'center' }}>{"" + (parseInt(this.now.getFullYear() - 1))}年</Text>
              </Button>
          }
          {
            this.state.year == this.now.getFullYear() - 2 ?
              <Button info style={styles.butt}  onPress={() => this._onClick(parseInt(this.now.getFullYear()) - 2)}>
                <Text style={{ textAlign: 'center' }}>{"" + (parseInt(this.now.getFullYear() - 2))}年</Text>
              </Button>
              : <Button bordered style={styles.butt}  onPress={() => this._onClick(parseInt(this.now.getFullYear()) - 2)}>
                <Text style={{ textAlign: 'center' }}>{"" + (parseInt(this.now.getFullYear() - 2))}年</Text>
              </Button>
          }
          </View>
          <EmptyView h={10} />
          {this.data.length > 0?
          <FlatList
            data={this.data}
            horizontal={false}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            keyExtractor={(item, index) => item}
            renderItem={this._renderItemComponent}
          />:<Text style={{fontSize:16}}> 无数据 </Text>}
        </ScrollView> 
        <LoadingView showLoading={this.state.showLoading} backgroundColor='#323233' opacity={0.8} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  butt: {
    width: W.width / 3 - 30,
    height: 28,
    marginHorizontal: 5,
    justifyContent: 'center'
  }
});

export default PartyFee;