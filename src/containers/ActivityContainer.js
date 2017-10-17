/*
 * @Author: zhaozheng1.zh 
 * @Date: 2017-09-09 22:10:22 
 * @Last Modified by: zhaozheng1.zh
 * @Last Modified time: 2017-09-14 10:40:23
 */
import React, { Component } from 'react';
import { Image} from 'react-native';
import Activity from '../pages/activity'

export default class ActivityContainer extends Component {
  
  static navigationOptions = {
    header: null,
    tabBarLabel: '活动',
    tabBarIcon: () => (
      <Image
        source={require('../img/activity/act.png')}
      />
    ),
  };
  render() {
    return (
       <Activity {...this.props}/>
    );
  }
}


