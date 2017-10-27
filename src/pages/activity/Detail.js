/*
 * @Author: zhaozheng1.zh 
 * @Date: 2017-09-29 10:47:42 
 * @Last Modified by: fishci
 * @Last Modified time: 2017-10-27 15:40:16
 */

import React, { Component } from 'react';
import { LayoutAnimation, UIManager, View, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import common from '../../common'
import { fetchPost } from '../../utils/fetchAPI';
import { getUser } from '../../utils/StorageUtil';
import EmptyView from '../../components/EmptyView';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            address: '',
            description: '',
            type: '',
            // secondtype: '',
            detail: '',
            tip: '',
            isreg: '',
            starttime: '',
            endtime: '',
            regstarttime: '',
            regendtime: '',
            host: '',
            phone: '',

            hasReg: ''
        }
    }

    u = {};

    async componentDidMount() {
        this.u = await getUser();
        fetchPost('A08464103', {
            thpyadthmsAvyId: this.props.navigation.state.params.actId,
            thpyadthmsStmUsrId: this.u.thpyadthmsStmUsrId
        }, this._success.bind(this), this._failure.bind(this))
    }


    _transferST(dt, tm) {
        return dt.substring(0, 4) + '-' + dt.substring(4, 6) + '-' + dt.substring(6, 8) + ' ' + tm.substring(0, 2) + ':' + tm.substring(2, 4)
    }

    _success(resp) {
        console.log(resp);
        this.setState({
            refreshing: false,
        });
        if (resp.BK_STATUS == "00") {
            console.log("detail + act" + resp.thpyadthmsAvyClcd);
            this.setState({
                title: resp.thpyadthmsAvyNm,
                address: resp.thpyadthmavyplccntdsc,
                description: resp.thpyadthmsAvyCntdsc,
                type: resp.thpyadthmsAvyClcd,
                // secondtype: '',
                detail: resp.thpyadthmavydtlcntdsc,
                tip: resp.thpyadthmayancmcntdsc,
                isreg: resp.thpyadthmsavyrgstInd,
                starttime: this._transferST(resp.thpyadthmsAvyStdt, resp.thpyadthmsAvySttm),
                endtime: this._transferST(resp.thpyadthmsAvyEddt, resp.thpyadthmsAvyEdtm),
                regstarttime: this._transferST(resp.thpyadthmsavyrgststdt, resp.thpyadthmsavyrgststtm),
                regendtime: this._transferST(resp.thpyadthmsavyrgstcodt, resp.thpyadthmsargstctoftm),
                host: resp.thpyadthmsavyctcpsnnm,
                phone: resp.thpyadthmactcpsntelno,

                hasReg: resp.pcpthpyadthmsavyTpcd
            });
        } else {
            ToastAndroid.show(resp.BK_DESC, ToastAndroid.SHORT);
        }
    };

    _failure(error) {
        console.log(error);
        ToastAndroid.show("网络连接失败，请稍后再试！", ToastAndroid.LONG);
        //ToastAndroid.show(JSON.stringify(error), ToastAndroid.SHORT);
    };

    render() {
        let now = new Date();
        let current = now.getFullYear() + "-" + this._formatTime(now.getMonth() + 1) + "-" + this._formatTime(now.getDate()) + " " + this._formatTime(now.getHours()) + ":" + this._formatTime(now.getMinutes());    
        console.log(current);
        return (
            <View style={{ flex: 1 }}>
                <Header style={styles.header}>
                    <Left>
                        <Text style={{ color: 'white' }}>活动详情</Text>
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Create', { form: this._getFormProps(), title: '修改活动' })}>
                            <Icon name='ios-create-outline' size={30} color='white' />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <ScrollView>
                    <View>
                        <Image style={{ height: common.width / 2, width: common.width }} source={require('../../img/activity/detail.png')} />
                    </View>
                    <EmptyView h={20} bc='lightgrey' />
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 20, }}>
                            <Text style={{ fontWeight: 'bold', color: 'deepskyblue', fontSize: 20 }}>活动详情: </Text>
                        </View>
                        <EmptyView h={1} bc='lightgrey' />
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动名称: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 14 }}>{this.state.title}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动时间: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 14 }}>{this.state.starttime + '   至   ' + this.state.endtime}</Text>
                        </View>
                        {this.state.isreg == '1' && <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动报名时间: </Text>
                        </View>
                        }
                        {this.state.isreg == '1' && <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 14 }}>{this.state.regstarttime + '   至   ' + this.state.regendtime}</Text>
                        </View>
                        }
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动地点: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 14 }} >{this.state.address === undefined ? '待定' : this.state.address}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动详情: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 14 }}>{this.state.detail}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>温馨提示: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 14 }}>{this.state.tip}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动联系人: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 14 }}>{this.state.host}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>联系人电话: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 14 }}>{this.state.phone}</Text>
                        </View>
                        {this.state.isreg == '1' && (this.state.hasReg == '01' || current > this.state.regendtime ? <Button block disabled onPress={this._registe} style={{ flex: 1, height: 50 }}><Text>{this.state.hasReg == '01'?'已报名':'报名截止'}</Text></Button>
                            : <Button block success onPress={this._registe} style={{ flex: 1, height: 50 }}><Text>报名</Text></Button>)}
                        <EmptyView h={10} />
                    </View>
                </ScrollView>
            </View>
        )
    }

    
  _formatTime = i => {
    if (i < 10) {
      return "0" + i;
    } else {
      return i;
    }
  }

    _registe = () => {

        fetchPost('A08464105', {
            thpyadthmsAvyId: this.props.navigation.state.params.actId,
            thpyadthmsStmUsrId: this.u.thpyadthmsStmUsrId
        },
            (resp) => {
                if (resp.BK_STATUS == "00" && resp.scsInd == "0") {
                    this.setState({ hasReg: '01' })
                    ToastAndroid.show("报名活动成功！", ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(resp.BK_DESC, ToastAndroid.SHORT);
                }
            },
            (error) => {
                console.log(error);
                ToastAndroid.show("网络连接失败，请稍后再试！", ToastAndroid.LONG);
            }
        )
    }

    _getFormProps = () => {
        let res = {
            actId: this.props.navigation.state.params.actId,
            title: this.state.title,
            address: this.state.address,
            description: this.state.description,
            type: this.state.type,
            // secondtype: this.state.secondtype,
            detail: this.state.detail,
            tip: this.state.tip,
            isreg: this.state.isreg == '1' ? true : false,
            starttime: this.state.starttime,
            endtime: this.state.endtime,
            regstarttime: this.state.regstarttime,
            regendtime: this.state.regendtime,
            host: this.state.host,
            phone: this.state.phone,

            hasReg: this.state.hasReg
        };
        return res;
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
