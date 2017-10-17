import React,{Component} from 'react';
import {Text,View} from 'react-native';
import {Button} from 'native-base';

export default class Detail extends Component {

    render() {
        return (
            <View>
            <Text>{this.props.navigation.state.params.info.theme}</Text>
            <Text>{this.props.navigation.state.params.info.type}</Text>
            <Text>{this.props.navigation.state.params.info.org}</Text>
            <Text>{this.props.navigation.state.params.info.starttime}</Text>
            <Text>{this.props.navigation.state.params.info.endtime}</Text>
            <Text>{this.props.navigation.state.params.info.registerDate}</Text>
            <Text>{this.props.navigation.state.params.info.content}</Text>
            <Button onPress={()=>this.props.navigation.navigate('Create',{form:this._getFormProps()})}>
                <Text>编辑</Text>
            </Button>
            <Button onPress={this._registe}>
            <Text>报名</Text>
            </Button>
            </View>
        );
    }

    _registe=()=>{
        alert('报名成功！')
    }

    _getFormProps=()=>{
        let res = {
            theme :this.props.navigation.state.params.info.theme,
            type :this.props.navigation.state.params.info.type,
            org :this.props.navigation.state.params.info.org,
            starttime :this.props.navigation.state.params.info.starttime,
            endtime :this.props.navigation.state.params.info.endtime,
            registerDate :this.props.navigation.state.params.info.registerDate,
            content :this.props.navigation.state.params.info.content
        };
        return res;
    }
}