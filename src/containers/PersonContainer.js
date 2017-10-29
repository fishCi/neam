

  import React, { Component } from 'react';
  import {
    StyleSheet,
    Image,
    View
  } from 'react-native';

  import Person from '../pages/person'
  import Icon from 'react-native-vector-icons/Ionicons';
  
  class PersonContainer extends Component {
    static navigationOptions = {
      // title: 'Welcome',
      header:null,
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor}) => (
        <Icon name='ios-contact-outline' size={30} color={tintColor}/>        
        ),
    };
    render() {
      return (<Person navigation={this.props.navigation}/>);
    }
  }

  export default PersonContainer;