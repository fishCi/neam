import React,{Component} from 'react';
import {View} from 'react-native';

export default class EmptyView extends Component {

    render() {
        return (
            <View  style={{height:this.props.h, width:this.props.w,backgroundColor:this.props.bc}}/>
        );
    }
}