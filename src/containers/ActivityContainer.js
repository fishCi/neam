/*
 * @Author: zhaozheng1.zh 
 * @Date: 2017-09-09 22:10:22 
 * @Last Modified by: zhaozheng1.zh
 * @Last Modified time: 2017-10-27 11:31:08
 */
import React, { Component } from 'react';
import Activity from '../pages/activity'
import Icon from 'react-native-vector-icons/Ionicons';

export default class ActivityContainer extends Component {
  
  static navigationOptions = {
    header: null,
    tabBarLabel: '活动',
    tabBarIcon: () => (
      <Icon name='ios-home-outline' size={30}/>              
    ),
  };
  render() {
    return (
       <Activity {...this.props}/>
    );
  }
}


