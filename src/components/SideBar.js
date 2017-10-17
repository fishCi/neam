import React, { Component } from 'react';
import global from '../utils/global.js';
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

var letters = [];
for (var i = 'A'; i <= 'Z'; i++) {
  letters.push(i);
}

export default class SideBar extends Component {
  render() {
    var letters = ['☆', '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var letterViewArr = [];
    for (var i = 0; i < letters.length; i++) {
      letterViewArr.push(
        <TouchableOpacity
          key={i}
          onPress={this.onLetterSelectedListener.bind(this, letters[i])}>
          <Text style={{color: '#999999', fontSize: 12, paddingLeft: 2, paddingRight: 2}} key={"letter" + i}>
            {letters[i]}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}>
        {letterViewArr}
      </View>
    );
  }

  onLetterSelectedListener = (letter)=>{
    ToastAndroid.show(letter, ToastAndroid.SHORT);
  }
}
