/*
 * @Author: zhaozheng1.zh 
 * @Date: 2017-09-29 10:47:42 
 * @Last Modified by: zhaozheng1.zh
 * @Last Modified time: 2017-10-25 10:07:42
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
            showloading: false,

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
        this.setState({ showloading: true })
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
        this.setState({
            showloading: false,
        });
        if (resp.BK_STATUS == "00") {
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
            this.setState({
                showloading: false,
            });
            ToastAndroid.show(resp.BK_DESC, ToastAndroid.SHORT);
        }
    };

    _failure(error) {
        this.setState({
            showloading: false,
        });
        ToastAndroid.show(error, ToastAndroid.SHORT);
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header style={styles.header}>
                    <Left>
                        <Text style={{ color: 'white' }}>活动详情</Text>
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Create', { form: this._getFormProps() })}>
                            <Icon name='ios-create-outline' size={30} color='white' />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <ScrollView>
                    <View>
                        <Image style={{ height: common.width * 2 / 3, width: common.width }} source={require('../../img/activity/adv.jpg')} />
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
                            <Text style={{ fontSize: 12 }}>{this.state.title}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动时间: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 12 }}>{this.state.starttime + '   至   ' + this.state.endtime}</Text>
                        </View>
                        {this.state.isreg == '1' && <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动报名时间: </Text>
                        </View>
                        }
                        {this.state.isreg == '1' && <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 12 }}>{this.state.regstarttime + '   至   ' + this.state.regendtime}</Text>
                        </View>
                        }
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动地点: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 12 }}>{this.state.address === undefined ? '待定' : this.state.address}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动详情: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 12 }}>{this.state.detail}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>温馨提示: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 12 }}>{this.state.tip}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>活动联系人: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 12 }}>{this.state.host}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'cornflowerblue' }}>联系人电话: </Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontSize: 12 }}>{this.state.phone}</Text>
                        </View>
                        {(this.state.hasReg == '01' ? <Button block disabled onPress={this._registe} style={{ flex: 1, height: 50 }}><Text>已报名</Text></Button>
                            : <Button block success onPress={this._registe} style={{ flex: 1, height: 50 }}><Text>报名</Text></Button>)}
                        <EmptyView h={10} />
                    </View>
                </ScrollView>
                {this.state.showLoading && <LoadingView showLoading={true} backgroundColor='#323233' opacity={0.8} />}
            </View>
        )
    }

    _registe = () => {
        fetchPost('A08464105', {
            thpyadthmsAvyId: this.props.actId,
            thpyadthmsStmUsrId: this.u.thpyadthmsStmUsrId
        },
            (resp) => {
                if (resp.BK_STATUS == "00" && resp.scsInd == "0") {
                    this.setState({ hasReg: '01' })
                } else {
                    alert(resp.BK_DESC)
                }
            },
            (error) => {
                alert(error)
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
    header: {
        height: 40,
        backgroundColor: 'blue'
    },
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
