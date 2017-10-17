import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl, Dimensions ,ActivityIndicator } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Separator, Left, Right} from 'native-base';
import common from '../../common'
import EmptyView from '../../components/EmptyView'
import Icon from 'react-native-vector-icons/Ionicons';

import { getUser } from '../../utils/StorageUtil'
import { fetchPost } from '../../utils/fetchAPI';

export default class TEST extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        {this.state.ready ? this._page() : <ActivityIndicator size="large" />}
      </Container>
    );
  }
}