import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, ScrollView, Text, ActivityIndicator, ImageBackground, StatusBar, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import _, { isEqual } from 'lodash';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import get from 'lodash/get';
import i18n from 'i18n-js';
import { styles } from './styles';
import { MainHeader, MGradientButton, CircleButton, FPImage } from '../../components';
import { Colors, CommonStyles, Metrics } from '../../themes';
import { LocalStorage } from '../../utils';
import { statementSelector, boardSelector } from '../../redux/selector';
import { StatementActions, BoardActions } from '../../redux';
import { VisionBoard } from './VisionBoard';
import { getDailyStorys } from '../../service/api';

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor, focused }) => {
      if (focused) {
        return <Image source={require('./../../assets/icon_tab_home_active.png')} style={CommonStyles.tabIcon} />
      }
      return <Image source={require('./../../assets/icon_tab_home.png')} style={CommonStyles.tabIcon} />
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      isHideVisionBoard: false,
      showStatementIndicator: false,
      showBoardIndicator: false,
      activeStatement: null,
      storagePath: "",
      dailyStoryTitle: "",
      storyContent: ""
    };
  }

  componentDidMount() {
    this.onInitial();
    SplashScreen.hide();
  }

  async componentDidUpdate(prevProps) {
    if(this.props.statement.fetchStatementError.error !== undefined && this.props.statement.fetchStatementError.error) {
      await LocalStorage.clearToken();
      this.props.navigation.navigate('LoginScreen');
    }

    if(this.props.board.fetchBoardError.error !== undefined && this.props.board.fetchBoardError.error) {
      await LocalStorage.clearToken();
      this.props.navigation.navigate('LoginScreen');
    }

    if (!this.props.statement.fetchStatement && prevProps.statement.fetchStatement) {
      this.setState({ showStatementIndicator: false });
    }
    if (!this.props.board.fetchBoard && prevProps.board.fetchBoard) {
      this.setState({ showBoardIndicator: false });
    }
  }

  onInitial = async () => {
    const isHideVisionBoard = await LocalStorage.isHideVisionBoardDescription();
    this.setState({ isHideVisionBoard });
    const res = await getDailyStorys(i18n.currentLocale().toUpperCase());
    if(res && res.storagePath) {
      this.setState({ storagePath: res.storagePath });
      this.setState({ dailyStoryTitle: res.title });
      this.setState({ storyContent: res });
    } else {
      if(res.error !== undefined && res.error) {
        await LocalStorage.clearToken();
        this.props.navigation.navigate('LoginScreen');
      }
    }
  };

  hideVisionBoardDescription = () => {
    this.setState({ isHideVisionBoard: true });
  };

  onShowMenu = () => {
    this.props.navigation.openDrawer();
  };

  onRoutine = (index) => {
    if (index === 0) {
      this.props.navigation.navigate('RoutineScreen', { routineIndex: 0 });
    } else {
      this.props.navigation.navigate('RoutineScreen', { routineIndex: 1 });
    }
  };

  onCamera = () => {
    this.props.navigation.navigate('EditVisionBoardScreen', { hide: this.hideVisionBoardDescription });
  };

  onAffirmation = () => {
    this.props.navigation.navigate('StatementScreen');
  };

  onPlayDailyStory = () => {
    const { storyContent } = this.state;
    this.props.navigation.navigate('PlayStoryScreen', {storyContent: storyContent});  
  }

  renderVisionBoard = () => {
    return (
      <VisionBoard {...this.props} />
    )
  };

  renderAffirmation = () => {
    const { statement } = this.props;
    const { showStatementIndicator } = this.state;
    const descr = get(statement, 'activeStatement.text', '');
    if (showStatementIndicator) {
      return (
        <View style={styles.affirmationContainer}>
          {this.renderActivity()}
        </View>
      );
    }
    return (
      <View style={styles.affirmationContainer}>
        {descr === '' && <Text style={styles.affirmationRegularText}>
          {i18n.t('home.affirmationDescription1', { language: i18n.currentLocale() })}
        </Text>}
        {descr === '' && <Text style={styles.affirmationBoldText}>
          {i18n.t('home.affirmationDescription2', { language: i18n.currentLocale() })}
        </Text>}
        {descr !== '' && <Text style={styles.affirmationBoldText}>
          {descr}
        </Text>}
      </View>
    );
  };

  renderActivity = () => (
    <View style={CommonStyles.activityContainer}>
      <ActivityIndicator color={Colors.lightBlue} />
    </View>
  );

  render() {
    const { isHideVisionBoard, dailyStoryTitle } = this.state;

    return (
      <SafeAreaView style={styles.container1}>
        <MainHeader
          label="Panda"
          onMenu={this.onShowMenu}
        />
        <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <View style={styles.buttonsContainer}>
              <MGradientButton
                icon={require('../../assets/icon_morning_routine.png')}
                label={i18n.t('home.morningRoutine', { language: i18n.currentLocale() })}
                onPress={() => this.onRoutine(0)}
              />
              <MGradientButton
                icon={require('../../assets/icon_evening_routine.png')}
                label={i18n.t('home.eveningRoutine', { language: i18n.currentLocale() })}
                onPress={() => this.onRoutine(1)}
              />
            </View>
            <View style={styles.visionContainer}>
              {this.renderVisionBoard()}
              {!isHideVisionBoard && <View style={styles.addVisionDescriptionContainer}>
                <Text style={styles.blackText}>
                  {i18n.t('visionBoard.text1', { language: i18n.currentLocale() })}
                </Text>
                <Text style={styles.blackText}>
                  {i18n.t('visionBoard.text2', { language: i18n.currentLocale() })}
                </Text>
                <Image source={require('../../assets/icon_arrow.png')} style={styles.arrowIcon} />
              </View>}
              <TouchableOpacity style={styles.cameraTouchContainer} onPress={this.onCamera} activeOpacity={1}>
                <View style={styles.cameraContainer}>
                  <Image source={require('../../assets/icon_camera.png')} style={styles.cameraIcon} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          { dailyStoryTitle ? (
            <ImageBackground source={require('../../assets/daily_story_background.png')} style={styles.stories_header_image}>
              <TouchableOpacity style={styles.dailyStoryContainer} onPress={this.onPlayDailyStory}>
                <Text style={styles.storyTopic}>{i18n.t('home.dailyStoryTitle', { language: i18n.currentLocale() })}</Text>
                <View style={styles.storyPlayerView}>
                  <View style={styles.storyTitleCnt}>
                    <Text style={styles.storyTitle}>{dailyStoryTitle}</Text>
                  </View>
                  <View style={styles.storyPlayBtn}>
                    <Image style={styles.playIcon} source={require('../../assets/icon_daily_story_play.png')}/>
                  </View>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          ) : null }
          {this.renderAffirmation()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  ...statementSelector(state),
  ...boardSelector(state)
});

const mapDispatchToProps = dispatch => ({
  getActiveStatement: () => dispatch(StatementActions.getActiveStatement()),
  getBoardImages: () => dispatch(BoardActions.getBoard())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
