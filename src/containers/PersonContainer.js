

  import React, { Component } from 'react';
  import {
    StyleSheet,
    Image,
    View
  } from 'react-native';

  import {Icon} from 'native-base';
  import Person from '../pages/person'

  class PersonContainer extends Component {
    static navigationOptions = {
      // title: 'Welcome',
      header:null,
      tabBarLabel: '我的',
      tabBarIcon: () => (
        <Image
        source={require('../img/person/psn.png')}
        /> 
        ),
    };
    render() {
      return (<Person navigation={this.props.navigation}/>);
    }
  }

  export default PersonContainer;