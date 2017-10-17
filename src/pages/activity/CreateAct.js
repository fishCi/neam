// /*
//  * @Author: zhaozheng1.zh 
//  * @Date: 2017-09-11 14:57:49 
//  * @Last Modified by: zhaozheng1.zh
//  * @Last Modified time: 2017-09-15 16:14:55
//  */
// import React, { Component } from 'react';
// import { View } from 'react-native';
// import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Spinner, Label, Picker } from 'native-base';
// import { Field, reduxForm } from 'redux-form';

// import ModalDropdown from 'react-native-modal-dropdown';


// const validate = values => {
//     // const error = {};
//     // error.email = '';
//     // error.name = '';
//     // var ema = values.email;
//     // var nm = values.name;
//     // if (values.email === undefined) {
//     //     ema = '';
//     // }
//     // if (values.name === undefined) {
//     //     nm = '';
//     // }
//     // if (ema.length < 8 && ema !== '') {
//     //     error.email = 'too short';
//     // }
//     // if (!ema.includes('@') && ema !== '') {
//     //     error.email = '@ not included';
//     // }
//     // if (nm.length > 8) {
//     //     error.name = 'max 8 characters';
//     // }
//     // return error;
// };

// const submit = async (values, navigate) => {
//     alert(JSON.stringify(values));
//     // const json = await this.fetchUser();
//     // console.log(JSON.stringify(json));
//     // if (json.results[0].login.username == values.email
//     //     && json.results[0].login.password == values.name) {
//     //     navigate('Home');
//     // } else {
//     //     alert('登陆失败');
//     // }
// }


// const api = 'https://randomuser.me/api/?seed=${seed}&page=${page}&results=20';

// fetchUser = () => {
//     return fetch(`${api}`)
//         .then((response) => response.text())
//         .then((responseText) => {
//             const json = JSON.parse(responseText);
//             return json;
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// };

// class CreateActivity extends Component {
//     constructor(props) {
//         super(props);
//         this._renderDropDown = this._renderDropDown.bind(this);
//     }

//     render() {
//         const { handleSubmit, navigation: { navigate } } = this.props;
//         return (
//             <Container>
//                 <Content padder>
//                     <Field name="title" label='标题:' component={this._renderInput} />
//                     <Field name="content" label='内容:' component={this._renderInput} />
//                     <Field name="beginTime" label='开始时间:' component={this._renderInput} />
//                     <Field name="endTime" label='结束时间:' component={this._renderInput} />
//                     <Field name="sendStyle" label='发送方式:' mode='dialog' placeholder='请选择'component={this._renderDropDown}>
//                         <Item label="Bus" value="Bus" />
//                         <Item label="Bajaji" value="Bajaji" />
//                         <Item label="Motorbike" value="Motobike" />
//                         <Item label="Camel" value="Camel" />
//                     </Field>
//                     <Field name="plan" label='活动方案:' component={this._renderInput} />
//                     <Field name="participant" label='参与人:' component={this._renderInput} />
//                     <Button block primary onPress={handleSubmit(submit)}>
//                         <Text>Submit</Text>
//                     </Button>
//                 </Content>
//             </Container>
//         )
//     }

//     _renderInput = ({ input, label, meta: { error } }) => {
//         var hasError = false;
//         if (error !== undefined) {
//             hasError = true;
//         }
//         return (
//             <Item inlineLabel error={hasError}>
//                 <Label>{label}</Label>
//                 <Input {...input} />
//                 {hasError ? <Text>{error}</Text> : <Text />}
//             </Item>
//         )
//     }


//     _renderDropDown = ({ input, label, children, ...custom }) => {
//         return (
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Text>{label}</Text>
//                 <Picker style={{ width: 100 }}
//                     selectedValue={''}
//                     onValueChange={value => input.onChange(value)}
//                     children={children}
//                     {...custom}
//                 />
//             </View>
//         )
//     }
// }

// export default reduxForm({
//     form: 'createactivity',
//     validate
// })(CreateActivity)
