import React, { Component } from 'react';
import { LayoutAnimation, UIManager, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Card, CardItem } from 'native-base';
import FlipCard from "react-native-flip-card-view"
import Icon from 'react-native-vector-icons/Ionicons';
import common from '../../common';
import BackPage from './BackPage'


export default class FC extends Component {

  _transferST(dt, tm) {
    return dt.substring(0, 4) + '-' + dt.substring(4, 6) + '-' + dt.substring(6, 8) + ' ' + tm.substring(0, 2) + ':' + tm.substring(2, 4)
  }

  _renderFront = () => {
    return (
      <Card style={{ borderRadius: 10 }}>
        <CardItem header style={[styles.cardheader, { backgroundColor: this.props.item.thpyadthmsAvyClcd === '02' ? 'red' : 'skyblue' }]}>
          <Text style={{ fontWeight: '200', color: 'white' }}>{this.props.item.thpyadthmsAvyNm}</Text>
        </CardItem>
        <CardItem style={styles.cardbody}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name='ios-move' color='blue' style={{ right: 5 }} size={16} />
              <Text style={{ fontSize: 14, fontWeight: '100' }}>
                地点: {this.props.item.thpyadthmavyplccntdsc === undefined?'待定':this.props.item.thpyadthmavyplccntdsc}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name='ios-person' size={16} color='skyblue' style={{ right: 5 }} />
              <Text style={{ fontSize: 14, fontWeight: '100' }}>
                活动发起人: {this.props.item.usrNm}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='ios-time-outline' size={16} color='blue' style={{ right: 5 }} />
            <Text style={{ fontSize: 14, fontWeight: '100' }}>
              活动开始时间: {this._transferST(this.props.item.thpyadthmsAvyStdt,this.props.item.thpyadthmsAvySttm)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='ios-time-outline' size={16} color='blue' style={{ right: 5 }} />
            <Text style={{ fontSize: 14, fontWeight: '100' }}>
              活动结束时间: {this._transferST(this.props.item.thpyadthmsAvyEddt,this.props.item.thpyadthmsAvyEdtm)}
            </Text>
          </View>
        </CardItem>
        <View style={{ height: 1, backgroundColor: 'lightgray' }} />
        <CardItem footer style={styles.cardfooter}>
          <Icon name='ios-redo' size={16} color='red' style={{ right: 5 }} />
        </CardItem>
      </Card>
    );
  }
  //Desired screen view method in back page
  _renderBack = () => {
    return <BackPage nav={this.props.nav} actId={this.props.item.thpyadthmsAvyId} />
  }

  render() {
    return (
      <FlipCard
        velocity={2} // Velocity makes it move
        tension={5} // Slow
        friction={2} // Oscillate a lot
        renderFront={this._renderFront()}
        renderBack={this._renderBack()} />
    );
  }
}



const styles = StyleSheet.create({
  cardheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 30
  },
  cardbody: {
    alignItems: 'stretch',
    flexDirection: 'column',
    padding: 10,
  },
  cardfooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 30
  },
  left: {
    fontSize: 12,
  },
  right: {
    fontSize: 12,
    color: 'grey'
  },
});


