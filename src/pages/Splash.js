/*
* @Author: zhaozheng1.zh
* @Date:   2017-08-30 21:08:30
 * @Last Modified by: zhaozheng1.zh
 * @Last Modified time: 2017-09-14 10:07:14
*/
import React from 'react';
import { Dimensions, Animated } from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../img/splash.png');

class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    Animated.timing(this.state.bounceValue, {
      toValue: 1.2,
      duration: 1000
    }).start();
    this.timer = setTimeout(() => {
        NavigationUtil.reset(this.props.navigation, 'Login');
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Animated.Image
        style={{
          width: maxWidth,
          height: maxHeight,
          transform: [{ scale: this.state.bounceValue }]
        }}
        source={splashImg}
      />
    );
  }
}

export default Splash;
