/*
 * @Author: zhaozheng1.zh 
 * @Date: 2017-10-16 10:51:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-18 14:44:52
 */

import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, DeviceEventEmitter, Keyboard ,TextInput} from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Spinner, Label, Toast, Root } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import common from '../common'
import { fetchPost } from '../utils/fetchAPI';
import { anyofficeCodeUtil } from '../utils/AnyOfficeCodeUtil'
import { NativeModules } from 'react-native';
import LoadingView from '../components/LoadingView';


var anyOfficeLogin = NativeModules.AnyOfficeLogin;
var waitingLogin = false;

const validate = values => {
    const error = {};
    error.name = '';
    error.password = '';
    var nm = values.name;
    var pw = values.password;
    if (values.name === undefined) {
        nm = '';
    }
    if (values.password === undefined) {
        pw = '';
    }
    // if (nm.length < 8 && nm !== '') {
    //     error.name = 'too short';
    // }
    // if (!ema.includes('@') && ema !== '') {
    //     error.email = '@ not included';
    // }
    // if (pw.length > 8) {
    //     error.password = 'max 8 characters';
    // }
    return error;
};

// waitingLogin = false;

// let success = resp => {
//     if (resp.BK_STATUS == "00") {
//         // alert(JSON.stringify(resp))
//         storage.save({
//             key: 'user',
//             data: JSON.stringify(resp),
//             // expires: 1000 * 3600 
//         }).then(() => navigate('Home'))
//     } else {
//         Toast.show({
//             text: resp.BK_DESC,
//             position: 'bottom',
//             buttonText: 'OK',
//             type: 'danger',
//             duration: 4000
//         })
//     }
// };

// let failure = error => {
//     Toast.show({
//         text: error,
//         position: 'bottom',
//         buttonText: 'OK',
//         type: 'danger',
//         duration: 4000
//     })
// };


// DeviceEventEmitter.addListener("onNetConnected", (msg) => {
//     if (waitingLogin) {
//         waitingLogin = false;
//         fetchPost('A08461101', {
//             empeIdLandNm: name,
//             usrPswd: pswd,
//             cstCtcTel: '',
//             usrIpAdr: ''
//         }, success, failure);
//     }

//     // availabe for all requests
// });

// DeviceEventEmitter.addListener("onNetConnecting", (isConnecting) => {
//     //isConnecting == true 
//     //show loading 
//     //else hideloading
// });
// DeviceEventEmitter.addListener("onNetError", (errorCode) => {
//     alert(anyofficeCodeUtil(errorCode));
// });
// DeviceEventEmitter.addListener("onLoginError", (errorCode) => {
//     alert(anyofficeCodeUtil(errorCode));
//     //only triggered by auto relogin  
//     // this can be the same as login method's callback
// });


// const submit = (values) => {
//     name = values.name;
//     pswd = values.password;
//     waitingLogin = true;
//     //"bktest2.vu","ccb123456"
//     anyOfficeLogin.login(values.name, values.password, () => {
//         //waitingLogin = true;
//     }, rs => {
//         alert('Anyoffice连接失败');
//         waitingLogin = false;
//     });


// const json = await this.fetchUser();
// if (json.results[0].login.username == values.name
//     && json.results[0].login.password == values.password) {
//     navigate('Home');
// } else {
//     Toast.show({
//         text: '登录失败!',
//         position: 'bottom',
//         buttonText: 'OK',
//         type:'danger',
//         duration:2000
//     })
// }

// const testdata = [{
//     title: '北京开发中心运动会',
//     address: '晓月楼412',
//     type: '党员活动',
//     // secondtype: '',
//     content: '党员活动内容',
//     tip: '带好防暑装备',
//     isreg: false,
//     starttime: '2017-09-20 00:00',
//     endtime: '2017-09-20 12:00',
//     regstarttime: '',
//     regendtime: '',
//     host: '张三',
//     phone: '88888888'
// },
// {
//     title: '团员植树节',
//     address: '致真大厦1010',
//     type: '团员活动',
//     // secondtype: '',
//     content: '植树造林，减少碳排放',
//     tip: '带好防暑装备',
//     isreg: false,
//     starttime: '2017-08-10 11:00',
//     endtime: '2017-08-10 17:00',
//     regstarttime: '',
//     regendtime: '',
//     host: '李四',
//     phone: '18569547212'
// }

// ]
// await storage.save({
//     key: 'Activity',
//     id: testdata[0].title,
//     data: JSON.stringify(testdata[0]),
//     // expires: 1000 * 3600 
// })
// await storage.save({
//     key: 'Activity',
//     id: testdata[1].title,
//     data: JSON.stringify(testdata[1]),
//     // expires: 1000 * 3600 
// })

// if ('test' == values.name
//     && 'test' == values.password) {
//     navigate('Home');
// } else {
//     Toast.show({
//         text: '登录失败!',
//         position: 'bottom',
//         buttonText: 'OK',
//         type: 'danger',
//         duration: 2000
//     })
// }
// }



export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        DeviceEventEmitter.addListener("onNetConnected", (msg) => {
            if (waitingLogin) {
                waitingLogin = false;
                fetchPost('A08461101', {
                    empeIdLandNm: this.state.name,
                    usrPswd: this.state.pswd,
                    cstCtcTel: '',
                    usrIpAdr: ''
                }, this._success, this._failure);
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
                name:'',
                pswd:'',
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

    // renderInput({ input, meta: { touched, error, warning } }) {
    //     var hasError = false;
    //     if (error !== undefined) {
    //         hasError = true;
    //     }
    //     return (
    //         <Item error={hasError} inlineLabel style={{ width: common.width * 4 / 5 }}>
    //             <Label>{input.name == 'name' ? '用户名:' : '密码:'}</Label>
    //             {input.name == 'name' ? <Input {...input} /> : <Input {...input} secureTextEntry/>}
    //             {hasError ? <Text style={{ color: 'red' }}>{error}</Text> : <Text />}
    //         </Item>
    //     )
    // }
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
                                  style={{flex:1,fontSize: 16}}
                                  onChangeText={(name) => this.setState({ name})}
                                  value={this.state.name}
                                  underlineColorAndroid="transparent"
                                  ref="textInput1"
                                />
                            </Item>
                            <Item inlineLabel style={{ width: common.width * 4 / 5 }}>
                                <Label>密码: </Label>
                                <TextInput
                                  secureTextEntry = {true}
                                  style={{flex:1,fontSize: 16}}
                                  onChangeText={(pswd) => this.setState({ pswd})}
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

        // fetchPost('A08461101', {
        //     empeIdLandNm: this.state.name,
        //     usrPswd: this.state.pswd,
        //     cstCtcTel: '',
        //     usrIpAdr: ''
        // }, this._success, this._failure);
        setTimeout(
            ()=>anyOfficeLogin.login(this.state.name, this.state.password, () => {
            //waitingLogin = true;
                }, rs => {
                this.setState({
                    showLoading: false,
                });
                Toast.show({
                    text: "AnyOffice连接失败！",
                    position: 'bottom',
                    buttonText: 'OK',
                    duration: 2000
                });
                waitingLogin = false;
            }), 1
        );
    }

    _success = resp => {
        this.setState({
            showLoading: false,
        });
        if (resp.BK_STATUS == "00") {
            // alert(JSON.stringify(resp))
            storage.save({
                key: 'user',
                data: JSON.stringify(resp),
                // expires: 1000 * 3600 
            }).then(() => this.props.navigation.navigate('Home'))
        } else {
            Toast.show({
                text: resp.BK_DESC,
                position: 'bottom',
                buttonText: 'OK',
                duration: 2000
            })
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

// export default reduxForm({
//     form: 'loginform',
//     validate
// })(LoginForm)


