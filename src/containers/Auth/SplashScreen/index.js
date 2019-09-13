import React, { Component } from 'react';
import { Image } from 'react-native';
import { styles } from './styles';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Image source={require('../../../assets/launch_screen.png')} style={styles.container} />
    );
  }
}
