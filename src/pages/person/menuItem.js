/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */

//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import common from '../../common'

// create a component
class MenuItem extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                onPress={this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon} />
                <Text style={{ color: 'white', marginTop: 4, fontSize: 13,color: '#777777'}}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: common.width / 4,
        height: common.width / 5,
    },
    icon: {
        width: 30,
        height: 30,
        margin: 5,
    }
});

//make this component available to the app
export default MenuItem;
