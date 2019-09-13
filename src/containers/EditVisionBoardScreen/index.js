import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import i18n from 'i18n-js';
import get from 'lodash/get';
import _, { isEqual } from 'lodash';
import { styles } from './styles';
import { BlueCheckButton, FPImage, SubHeader } from '../../components';
import { Colors, CommonStyles, Metrics } from '../../themes';
import { ImagePicker, LocalStorage, sortImages, getImagesToUpload, isArrayEqual, logFlurryEvent } from '../../utils';
import { boardSelector } from '../../redux/selector';
import * as Progress from 'react-native-progress';
import { BoardActions } from '../../redux';
import { uploadImages } from '../../service/api';

class EditVisionBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visions: _.cloneDeep(props.board.boardImages),
      isError:[false, false, false, false],
      showIndicator: false
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.board.fetchBoard && prevProps.board.fetchBoard) {
      this.setState({ showIndicator: false });
      this.onBack();
    }
  }

  onImageLoadError = (err, imageIndex) => {
    const { isError } = this.state;
    const updatedError = [...isError];

    updatedError[imageIndex] = true;
    this.setState({ isError: updatedError });
  };

  onBack = async () => {
    await LocalStorage.setInVisionBoardVisible();
    this.props.navigation.state.params.hide();
    this.props.navigation.goBack();
  };

  onPress = (index) => {
    const { visions, isError } = this.state;
    const settings = {
      title: `${i18n.t('editVisionBoard.title1', { language: i18n.currentLocale() })}`,
      cancelButtonTitle: `${i18n.t('editVisionBoard.cancel', { language: i18n.currentLocale() })}`,
      takePhotoButtonTitle: `${i18n.t('editVisionBoard.button1', { language: i18n.currentLocale() })}`,
      chooseFromLibraryButtonTitle: `${i18n.t('editVisionBoard.button2', { language: i18n.currentLocale() })}`,
    };
    ImagePicker.show(settings).then(({ source }) => {
      if (source) {
        const updatedVisions = [...visions];
        if (updatedVisions[index]) {
          updatedVisions[index].image = source.uri;
          updatedVisions[index].fileName = source.fileName;
        } else {
          const vision = {
            image: source.uri,
            fileName: source.fileName
          };
          updatedVisions.push(vision);
        }
        const newImageLoadingError = [...isError];
        newImageLoadingError[index] = false;
        this.setState({
          visions: updatedVisions,
          isError: newImageLoadingError
        });
      }
    });
  };

  onCheck = async () => {
    const { board } = this.props;
    const { visions } = this.state;
    const imagesToUpload = getImagesToUpload(visions, get(board, 'boardImages', []));
    this.setState({ showIndicator: true });
    const ret = await uploadImages(board.boardId, imagesToUpload);
    logFlurryEvent('EditVisionBoard');
    if (ret && ret.success) {
      this.props.getBoard();
    }
    // await this.onBack();
  };

  renderVisionBoard = () => {
    const { visions, isError } = this.state;
    const margin = Metrics.marginHorizontal / 2;
    const sortedImages = sortImages(visions);
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
      return (
        <View key={`key-${index}`}>
          {!(!imageUrl || isError[index]) &&
          <FPImage
            style={[
              styles.visionImg, {
                marginLeft, marginRight, marginBottom,
                width: (Metrics.width - margin - Metrics.marginHorizontal * 2) / 2
              }]}
            source={{
              uri: visions[index].image,
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
          />}
          {(!imageUrl || isError[index]) &&
          <Image
            source={require('../../assets/icon_avatar_placeholder.png')}
            style={[
              styles.visionImg, {
                marginLeft, marginRight, marginBottom,
                width: (Metrics.width - margin - Metrics.marginHorizontal * 2) / 2
              }]}
            key={`key-${index}`}
          />}
          <TouchableOpacity
            style={[styles.cameraIconContainer, {
              left: marginLeft,
              right: marginRight,
              bottom: marginBottom
            }]}
            activeOpacity={1}
            onPress={() => this.onPress(index)}
          >
            <Image source={require('../../assets/icon_camera_white.png')} style={styles.cameraIcon}/>
          </TouchableOpacity>
        </View>
      );
    });
  };

  renderActivity = () => (
    <View style={CommonStyles.activityContainer}>
      <ActivityIndicator color={Colors.lightBlue} />
    </View>
  );

  render() {
    const { showIndicator } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <SubHeader
          onBack={this.onBack}
          label={i18n.t('editVisionBoard.title', { language: i18n.currentLocale() })}
        />
        <View style={styles.subContainer}>
          <View style={{ height: 320 }}>
            <View style={styles.visionContainer}>
              {this.renderVisionBoard()}
            </View>
          </View>
          <View style={styles.checkBtnContainer}>
            <BlueCheckButton
              style={styles.btnContainer}
              icon={require('../../assets/icon_check.png')}
              onPress={this.onCheck}
            />
          </View>
        </View>
        {showIndicator && this.renderActivity()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  ...boardSelector(state)
});
const mapDispatchToProps = dispatch => ({
  getBoard: () => dispatch(BoardActions.getBoard())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditVisionBoardScreen);
