/*
 * @Author: zhaozheng1.zh 
 * @Date: 2017-10-16 10:51:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-19 16:14:39
 */

import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, DeviceEventEmitter, Keyboard, TextInput } from 'react-native';
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


export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        DeviceEventEmitter.addListener("onNetConnected", (msg) => {
            if (waitingLogin) {
                waitingLogin = false;
                NetworkInfo.getIPV4Address(ipv4=>{
                    fetchPost('A08461101', {
                    empeIdLandNm: this.state.name,
                    usrPswd: this.state.pswd,
                    cstCtcTel: '',
                    usrIpAdr: ipv4
                }, this._success, this._failure)})
            }

            // availabe for all requests
        });

        DeviceEventEmitter.addListener("onNetConnecting", (isConnecting) => {

            //isConnecting == true 
            //show loading 
            //else hideloading
        });
        DeviceEventEmitter.addListener("onNetError", (errorCode) => {
            Toast.show({
                text: anyofficeCodeUtil(errorCode),
                position: 'bottom',
                buttonText: 'OK',
                duration: 2000
            })
            this.setState({
                showLoading: false,
            });
        });
        DeviceEventEmitter.addListener("onLoginError", (errorCode) => {
            Toast.show({
                text: anyofficeCodeUtil(errorCode),
                position: 'bottom',
                buttonText: 'OK',
                duration: 2000
            })
            this.setState({
                name: '',
                pswd: '',
                showLoading: false,
            });
            //only triggered by auto relogin  
            // this can be the same as login method's callback
        });

        this.state = {
            showLoading: false,
        }
    }

    componentWillMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide = () => {
        this.refs.textInput1.blur();
        this.refs.textInput2.blur();
    }

    render() {
        console.log("render" + this.state.showLoading);
        const { handleSubmit, navigation: { navigate } } = this.props;
        return (
            <Root>
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
                </ImageBackground>
                {this.state.showLoading && <LoadingView showLoading={true} backgroundColor='#323233' opacity={0.8} />}
            </Root>
        )
    }

    _submit = () => {
        waitingLogin = true;
        this.setState({
            showLoading: true,
        });

        if (this.props.navigation.state.params !== undefined) {
            NetworkInfo.getIPV4Address(ipv4=>{
                fetchPost('A08461101', {
                empeIdLandNm: this.state.name,
                usrPswd: this.state.pswd,
                cstCtcTel: '',
                usrIpAdr: ipv4
            }, this._success, this._failure)})
        } else {
            setTimeout(
                () => anyOfficeLogin.login(this.state.name, this.state.pswd, () => {
                    //waitingLogin = true;
                }, rs => {
                    this.setState({
                        showLoading: false,
                    });
                    Toast.show({
                        text: anyofficeCodeUtil(rs),
                        position: 'bottom',
                        buttonText: 'OK',
                        duration: 2000
                    });
                    waitingLogin = false;
                }), 1
            );
        }
    }

    _success = resp => {
        if (resp.BK_STATUS == "00") {
            // alert(JSON.stringify(resp))
            storage.save({
                key: 'user',
                data: JSON.stringify(resp),
                // expires: 1000 * 3600 
            }).then(() => this.props.navigation.navigate('Home'))
                .then(() => {
                    this.setState({
                        showLoading: false,
                    });
                })
        } else {
            Toast.show({
                text: resp.BK_DESC,
                position: 'bottom',
                buttonText: 'OK',
                duration: 2000
            })
            this.setState({
                showLoading: false,
            });
        }
    };

    _failure = error => {
        this.setState({
            showLoading: false,
        });
        Toast.show({
            text: error,
            position: 'bottom',
            buttonText: 'OK',
            duration: 2000
        });
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



