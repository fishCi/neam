import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Content, Left, Body, Right, List, ListItem, Separator, Text, Button, Thumbnail } from 'native-base';
import common from '../../common';
import EmptyView from '../../components/EmptyView';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PersonInfo extends Component {

    render() {
        return (
            <View>
                <List>
                    <ListItem>
                        <Thumbnail square size={80} source={require('../../img/person/hongjun.png')} />
                        <Body>
                            <Text>张三</Text>
                            <Text note>北京开发中心 开发三处</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.left}>籍贯: 北京市</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.left}>政治面貌: 党员</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.left}>参加工作时间: 2010年8月</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.left}>来建行时间: 2014年7月</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.left}>机构名称: 北京开发中心</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.left}>部门名称: 开发四处</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.left}>职务等级：一职等</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.left}>现任职务: 业务经理</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.left}>专业技术资格：高级工程师</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.left}>任职时间: 2014年12月</Text>
                            </View>
                        </View>
                    </ListItem>

                    <ListItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <View style={{ alignSelf: 'flex-start', paddingBottom: 5, flexDirection: 'row' }}>
                            <Icon.Button name='md-bookmarks' size={25} color='green' backgroundColor='lightgrey' style={{ height: 25 }}>
                                <Text style={[styles.left, { color: 'green' }]}> 履历</Text>
                            </Icon.Button>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={styles.left}>2000.9~2004.7:清华大学 计算机专业 大学本科毕业</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.left}>2004.9~2007.7:清华大学 计算机专业 硕士研究生毕业</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.left}>2007.8~2010.2:中国建设银行北京开发中心 功能集成测试处 干部</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.left}>2010.3~2014.2:中国建设银行北京开发中心 开发一处 业务副经理</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.left}>2014.2~今:中国建设银行北京开发中心 开发一处 业务经理</Text>
                            </View>
                        </View>
                    </ListItem>

                    <ListItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <View style={{ alignSelf: 'flex-start', paddingBottom: 5, flexDirection: 'row' }}>
                            <Icon.Button name='ios-bowtie' size={25} color='red' backgroundColor='lightgrey' style={{ height: 20 }}>
                                <Text style={[styles.left, { color: 'red' }]}>荣誉 </Text>
                            </Icon.Button>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.left}>2000.9: 三八红旗手</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.left}>2007.7: 全国十佳青年</Text>
                            </View>
                        </View>
                    </ListItem>
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    left: {
        fontSize: 12,
    },
    right: {
        fontSize: 12,

    },
});