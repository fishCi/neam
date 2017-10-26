import React, { Component } from 'react';
import { Image, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import common from '../../common';

export default class Cell extends Component {

    _transferST(dt, tm) {
        return dt.substring(0, 4) + '-' + dt.substring(4, 6) + '-' + dt.substring(6, 8) + ' ' + tm.substring(0, 2) + ':' + tm.substring(2, 4)
    }
    _transferType(){
        switch (this.props.item.thpyadthmsAvyClcd) {
            case '01':
                return {name:'党',color:'red'};
            case '02':
                return {name:'团',color:'red'};
            case '03':
                return {name:'工会',color:'greenyellow'};
            case '04':
                return {name:'协会',color:'lightseagreen'};
            default:
               return {name:'其他',color:'violet'};
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigate('Detail', { actId: this.props.item.thpyadthmsAvyId })}>
                <View style={[{ flexDirection: 'row', width: common.width, height: common.width / 3, paddingLeft: 10, paddingRight: 10 }, { backgroundColor: 'white' }]}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: common.width / 5, height: common.width / 5, resizeMode: 'cover' }} source={require('../../img/activity/actlist.jpg')} />
                    </View>
                    <View style={{flex:1, paddingLeft: 15, paddingVertical: 15}}>
                        <View style={{ flex: 1, flexDirection: 'row',justifyContent:'space-between'}}>
                            <Text style={{flex:1, fontFamily: 'Georgia', fontSize: 14, fontWeight: 'bold' }} numberOfLines={2}>{this.props.item.thpyadthmsAvyNm}</Text>
                            <View style={{ backgroundColor: this._transferType().color, borderRadius: 2,marginRight:10,height:18}}>
                                <Text style={{fontSize: 12, color: 'white',padding:2}}>{this._transferType().name}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={{ fontSize: 12 }}><Text style={{ fontSize: 12, color: 'blue' }}>活动简介：</Text>{this.props.item.thpyadthmsAvyCntdsc === undefined?'无':this.props.item.thpyadthmsAvyCntdsc}</Text>
                        </View>
                        <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="ios-flag" color='red' size={16} />
                                <Text style={{ paddingLeft: 10, fontSize: 10 }}>地点: {this.props.item.thpyadthmavyplccntdsc}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="md-person" color='lime' size={16} />
                                <Text style={{ paddingLeft: 10, fontSize: 10 }}>发起人: {this.props.item.usrNm}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

});
