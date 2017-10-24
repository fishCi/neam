/*
 * @Author: zhaozheng1.zh 
 * @Date: 2017-10-16 10:51:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-24 18:02:15
 */

import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, DeviceEventEmitter, Keyboard, TextInput,ToastAndroid,Dimensions,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Spinner, Label, Toast, Root } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import common from '../common'
import { fetchPost } from '../utils/fetchAPI';
import { anyofficeCodeUtil } from '../utils/AnyOfficeCodeUtil'
import { NativeModules } from 'react-native';
import LoadingView from '../components/LoadingView';
import { NetworkInfo } from 'react-native-network-info';


var anyOfficeLogin = NativeModules.AnyOfficeLogin;
var waitingLogin = false;
const { width, height } = Dimensions.get('window')


export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.onNetConnected = DeviceEventEmitter.addListener("onNetConnected", (msg) => {
            console.log("onNetConnected");
            if (waitingLogin) {
                waitingLogin = false;
                NetworkInfo.getIPV4Address(ipv4=>{
                    fetchPost('A08461101', {
                    empeIdLandNm: this.state.name,
                    usrPswd: this.state.pswd,
                    cstCtcTel: '',
                    usrIpAdr: ''
                }, this._success, this._failure)});
            }

            // availabe for all requests
        });
        
        this.onNetConnecting = DeviceEventEmitter.addListener("onNetConnecting", (isConnecting) => {

            //isConnecting == true 
            //show loading 
            //else hideloading
            console.log("onNetConnecting");
        });

        this.onNetError = DeviceEventEmitter.addListener("onNetError", (errorCode) => {
            console.log("onNetError");
            ToastAndroid.show(anyofficeCodeUtil(parseInt(errorCode)),ToastAndroid.SHORT);
            this.setState({
                showLoading: false,
            });
        });


        this.onLoginError = DeviceEventEmitter.addListener("onLoginError", (errorCode) => {
            console.log("onLoginError" + errorCode);
            this.setState({
                name: '',
                pswd: '',
                showLoading: false,
            });
            //ToastAndroid.show(anyofficeCodeUtil(parseInt(errorCode)),ToastAndroid.SHORT);
            // this.props.navigation.navigate('Home');
            //only triggered by auto relogin  
            // this can be the same as login method's callback
        });

        this.state = {
            showLoading: false,
        }
        console.log("construct");
    }

    componentWillMount() {
        console.log("mount");
        console.log(JSON.stringify(this.props.navigation.state));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentDidMount() {
        console.log("didmount");
    }

    componentWillUnmount() {
        console.log("unmount");
        this.timer && clearTimeout(this.timer);
        this.keyboardDidHideListener.remove();
        this.onNetConnected.remove();
        this.onNetConnecting.remove();
        this.onNetError.remove();
        this.onLoginError.remove();
    }

    _keyboardDidHide = () => {
        this.refs.textInput1.blur();
        this.refs.textInput2.blur();
    }

    render() {
        console.log("render" + this.state.showLoading);
        const { handleSubmit, navigation: { navigate } } = this.props;
        return (
                <ImageBackground style={styles.backgroundImage} source={require('../img/login.png')} resizeMode='cover'>
                    <Container style={styles.userform}>
                        <Content padder>
                            <Image source={require('../img/CCB.png')} style={{ alignSelf: 'center' }} />

                            <Item inlineLabel style={{ width: common.width * 4 / 5 }}>
                                <Label>用户名: </Label>
                                <TextInput
                                    style={{ flex: 1, fontSize: 16 }}
                                    onChangeText={(name) => this.setState({ name })}
                                    value={this.state.name}
                                    underlineColorAndroid="transparent"
                                    ref="textInput1"
                                />
                            </Item>
                            <Item inlineLabel style={{ width: common.width * 4 / 5 }}>
                                <Label>密码: </Label>
                                <TextInput
                                    secureTextEntry={true}
                                    style={{ flex: 1, fontSize: 16 }}
                                    onChangeText={(pswd) => this.setState({ pswd })}
                                    underlineColorAndroid="transparent"
                                    value={this.state.pswd}
                                    ref="textInput2"
                                />
                            </Item>
                            <Button rounded primary small style={styles.loginbtn} onPress={this._submit}>
                                <Text>登陆</Text>
                            </Button>
                        </Content>
                    </Container>
                    <LoadingView showLoading={this.state.showLoading} backgroundColor='#323233' opacity={0.8} />
                </ImageBackground>
        )
    }

    _close(){
        console.log("onRequestClose ---- ")
    }

    _submit = () => {
        waitingLogin = true;
        this.setState({
            showLoading: true,
        });
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(
            () => anyOfficeLogin.login(this.state.name, this.state.pswd, () => {
            }, rs => {
                console.log("failed");
                // this.setState({
                //     showLoading: false,
                // });
                // ToastAndroid.show(anyofficeCodeUtil(parseInt(rs)),ToastAndroid.SHORT);
                // console.log("errohandle");
                // waitingLogin = false;
            }), 1
        );
        // }
    }

    _success = resp => {
        console.log(JSON.stringify(resp));
        if (resp.BK_STATUS == "00") {
            alert(JSON.stringify(resp))
            storage.save({
                key: 'user',
                data: JSON.stringify(resp),
                // expires: 1000 * 3600 
            }).then(this.props.navigation.navigate('Home'))
            .then(this.setState({
                showLoading: false,
            }))
        } else {
            ToastAndroid.show(resp.BK_DESC,ToastAndroid.SHORT);
            this.setState({
                showLoading: false,
            });
        }
    };

    _failure = error => {
        console.log(JSON.stringify(error));
        this.setState({
            showLoading: false,
        });
       // ToastAndroid.show(error,ToastAndroid.SHORT);
    };

}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    userform: {
        marginTop: common.height / 3
    },
    loginbtn: {
        width: common.width / 3,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
});



