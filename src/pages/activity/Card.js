import React, { Component } from 'react';
import { Image, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Card, CardItem, Root, Toast, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import common from '../../common';

export default class C extends Component {

  _transferST(dt, tm) {
    return dt.substring(0, 4) + '-' + dt.substring(4, 6) + '-' + dt.substring(6, 8) + ' ' + tm.substring(0, 2) + ':' + tm.substring(2, 4)
  }

  render() {
    return (
      <Card>
        <CardItem header bordered button style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => this.props.navigate('Detail', { actId: this.props.item.thpyadthmsAvyId })}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../img/activity/party.png')} />
            <Text style={{ marginLeft: 10, fontWeight: '600', fontSize: 18 }}>{this.props.item.thpyadthmsAvyNm}</Text>
          </View>
          <Icon name='ios-redo' size={16} color='red' style={{ right: 5 }} />
        </CardItem>
        <CardItem style={{ paddingVertical: 0 }}>
          <View style={{ paddingHorizontal: 10 }}>
            <Text note style={{ fontSize: 12 }}>活动简介</Text>
            <Text style={{ fontSize: 12, fontWeight: '100' }}>
              {this.props.item.thpyadthmsAvyCntdsc}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
            </View>
          </View>
        </CardItem>
        <CardItem footer style={{ flexDirection: 'row' }}>
        </CardItem>
      </Card>
    );
  }
}




