import React, { Component } from 'react';
import { Image, View } from 'react-native';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import _, { isEqual } from 'lodash';
import get from 'lodash/get';
import {Colors, Metrics} from '../../themes';
import { styles } from './styles';
import { FPImage } from '../../components';
import { sortImages, isArrayEqual } from '../../utils';

export class VisionBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError:[false, false, false, false]
    }
  }

  componentDidUpdate(prevProps) {
    if(!isArrayEqual(this.props.board.boardImages, prevProps.board.boardImages)) {
      this.setState({ isError: [false, false, false, false] })
    }
  }

  onImageLoadError = (err, imageIndex) => {
    const { isError } = this.state;
    const updatedError = [...isError];

    updatedError[imageIndex] = true;
    this.setState({ isError: updatedError });
  };

  render() {
    const { board } = this.props;
    const { isError } = this.state;
    const sortedImages = sortImages(get(board, 'boardImages', []));
    const margin = Metrics.marginHorizontal / 2;
    return _.map(_.range(0, 4), (value, index) => {
      let marginLeft = margin;
      let marginRight = margin / 2;
      const marginBottom = margin;
      if (index % 2 === 0) {
        marginLeft = 0;
        marginRight = margin / 2;
      } else {
        marginLeft = margin / 2;
        marginRight = 0;
      }
      const imageUrl = get(sortedImages, `[${index}].image`, null);
      if (!imageUrl || isError[index]) {
        return (
          <Image
            source={require('../../assets/icon_avatar_placeholder.png')}
            style={[
              styles.visionImg, {
                marginLeft, marginRight, marginBottom,
                width: (Metrics.width - margin - Metrics.marginHorizontal * 2) / 2
              }]}
            key={`key-${index}`}
          />
        );
      }
      return (
        <FPImage
          style={[
            styles.visionImg, {
              marginLeft, marginRight, marginBottom,
              width: (Metrics.width - margin - Metrics.marginHorizontal * 2) / 2
            }]}
          source={{
            uri: board.boardImages[index].image,
            priority: FastImage.priority.high
          }}
          onError={(err) => this.onImageLoadError(err, index)}
          resizeMode={FastImage.resizeMode.cover}
          key={`key-${index}`}
          indicator={Progress.Circle}
          indicatorProps={{
            size: 20,
            color: Colors.lightBlue,
            unfilledColor: 'rgba(200, 200, 200, 0.3)',
            borderWidth: 0
          }}
        />
      );
    });
  }
}
