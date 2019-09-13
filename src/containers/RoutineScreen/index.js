import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image, ImageBackground, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import get from 'lodash/get';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import ConfettiCannon from 'react-native-confetti-cannon';
import { styles } from './styles';
import { SubHeader } from '../../components';
import { MorningRoutine } from './morning';
import { EveningRoutine } from './evening';
import {
  getRoutineTemplate,
  getActiveRoutine,
  createRoutine,
  updateRoutine,
  getRoutineStatistics
} from '../../service/api';
import { Colors, CommonStyles } from '../../themes';
import { logFlurryEvent, showAlert, LocalStorage } from '../../utils';
import { routineSelector } from '../../redux/selector';
import { RoutineActions } from '../../redux';

class RoutineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texts: ['', '', ''],
      questionText: ['', '', ''],
      template: null,
      activeRoutine: null,
      showIndicator: false,
      enableAutoScroll: false,
      count: 0,
      streak: 0,
      showConfetti: false
    };
  }

  componentDidMount() {
    this.onInitial();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.routine.fetchRoutine && prevProps.routine.fetchRoutine) {
      this.setState({ showIndicator: false });
      if (this.props.routine.fetchRoutineError) {
        showAlert('SuccessPanda', 'Failure to get routine history');
      } else {
        this.onBack();
      }
    }
  }

  getRoutineType = () => {
    const { navigation } = this.props;
    return get(navigation, 'state.params.routineIndex', 0) === 0 ? 'morning' : 'evening';
  };

  onInitial = async () => {
    const routineType = this.getRoutineType();
    this.setState({ showIndicator: true });
    const statistics = await getRoutineStatistics(routineType);
    const template = await getRoutineTemplate(routineType);
    const activeRoutine = await getActiveRoutine(routineType, i18n.currentLocale().toUpperCase());
    if (get(template, 'answers', null)) {
      this.setState({ template });
    }
    this.setState({
      count: get(statistics, 'count', 0),
      streak: get(statistics, 'streak', 0),
    });
    if (activeRoutine.message !== 'Resource not found') {
      this.setState({
        activeRoutine,
        texts: [
          get(activeRoutine, 'answers[0].answer', ''),
          get(activeRoutine, 'answers[1].answer', ''),
          get(activeRoutine, 'answers[2].answer', '')]
      });
    }
    this.setState({ showIndicator: false, enableAutoScroll: true });
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onCheck = async () => {
    const { texts, activeRoutine } = this.state;
    const answers = [];
    const routineType = this.getRoutineType();
    for (let i = 0; i < texts.length; i+= 1) {
      const answer = {
        questionId: i + 1 + (routineType === 'morning' ? 0 : 3),
        answer: texts[i]
      };
      if (routineType === 'morning' && i === 2) {
        answer.questionId = 7;
      } else if (routineType !== 'morning') {
        if (i === 0) {
          answer.questionId = 8;
        } else if (i === 2) {
          answer.questionId = 9;
        }
      }
      answers.push(answer);
    }
    Keyboard.dismiss();
    this.setState({ showIndicator: true });
    if (!activeRoutine) {
      const ret = await createRoutine(answers, routineType);
      if (get(ret, 'success', false)) {
        await this.onCheckToShowConfetti(routineType);
        this.timeOut1 = setTimeout(() => {
          clearTimeout(this.timeOut1);
          this.props.getRoutinesForUser();
        }, 1000 * 3.5);
      } else {
        if(res.error !== undefined && res.error === true) {
          await LocalStorage.clearToken();
          this.props.navigation.navigate('LoginScreen');
        } else {
          showAlert('SuccessPanda', 'Failure to create the routine');
        }
      }
    } else {
      const answers = [{
        answerId: get(activeRoutine, 'answers[0].answerId', 1),
        answer: texts[0]
      }, {
        answerId: get(activeRoutine, 'answers[1].answerId', 1),
        answer: texts[1]
      }, {
        answerId: get(activeRoutine, 'answers[2].answerId', 1),
        answer: texts[2]
      }];
      const ret = await updateRoutine(activeRoutine.id, answers);
      if (ret && ret.id) {
        await this.onCheckToShowConfetti(routineType);
      } else {
        if(res.error !== undefined && res.error === true) {
          await LocalStorage.clearToken();
          this.props.navigation.navigate('LoginScreen');
        } else {
          showAlert('SuccessPanda', 'Failure to update the routine');
        }
      }
    }
    logFlurryEvent(routineType === 'morning' ? 'MorningRoutine' : 'EveningRoutine');
    this.setState({ showIndicator: false });
  };

  onCheckToShowConfetti = async (routineType) => {
    const routineSaveTime = await LocalStorage.getRoutinesSaveTime();
    const savedTime = get(routineSaveTime, `${routineType}`, null);
    if (savedTime) {
      const date = new Date(savedTime);
      const now = new Date();
      if (date.getDate() !== now.getDate()) {
        await LocalStorage.setRoutineSaveTime(routineType, now.toString());
        this.setState({ showConfetti: true }, this.onTimeOut);
      } else {
        this.onBack();
      }
    } else {
      const now = new Date();
      await LocalStorage.setRoutineSaveTime(routineType, now.toString());
      this.setState({ showConfetti: true }, this.onTimeOut);
    }
  };

  onTimeOut = () => {
    this.timeOut = setTimeout(() => {
      this.onBack();
    }, 1000 * 3.5);
  };

  onChangeText = (index, text) => {
    const updatedText = [...this.state.texts];
    updatedText[index] = text;
    this.setState({ texts: updatedText });
  };

  renderActivity = () => (
    <View style={CommonStyles.activityContainer}>
      <ActivityIndicator color={Colors.lightBlue} />
    </View>
  );

  render() {
    const {
      activeRoutine,
      template,
      showIndicator,
      texts,
      enableAutoScroll,
      count,
      streak,
      showConfetti
    } = this.state;
    const { navigation } = this.props;
    const routineIndex = get(navigation, 'state.params.routineIndex', 0);
    const headerTitle = routineIndex === 0 ?
      i18n.t('morningRoutine.title', { language: i18n.currentLocale() }) :
      i18n.t('eveningRoutine.title', { language: i18n.currentLocale() });
    return (
      <SafeAreaView style={styles.container}>
        <SubHeader onBack={this.onBack} label={headerTitle} />
        <ImageBackground
          source={require('../../assets/img_streak_background.png')}
          imageStyle={styles.streakImage}
          style={styles.headerContainer}
        >
          <View style={styles.headerSubContainer}>
            <Text style={styles.headerTitleText}>
              {i18n.t('routine.currentStreak', { language: i18n.currentLocale() })}
            </Text>
            <Text style={styles.headerCountText}>
              {streak}
            </Text>
          </View>
          <View style={styles.headerSubContainer}>
            <Text style={styles.headerTitleText}>
              {i18n.t('routine.totalCompleted', { language: i18n.currentLocale() })}
            </Text>
            <Text style={styles.headerCountText}>
              {count}
            </Text>
          </View>
        </ImageBackground>
        {routineIndex === 0 &&
        <MorningRoutine
          onChangeText={this.onChangeText}
          onCheck={this.onCheck}
          answers={texts}
          enableAutoScroll={enableAutoScroll}
        />}
        {routineIndex === 1 &&
        <EveningRoutine
          onChangeText={this.onChangeText}
          onCheck={this.onCheck}
          answers={texts}
          enableAutoScroll={enableAutoScroll}
        />}
        {showIndicator && this.renderActivity()}
        {showConfetti &&
        <ConfettiCannon
          count={150}
          origin={{x: -10, y: 0}}
          explosionSpeed={50}
          fadeOut
          fallSpeed={3000}
        />}
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => ({
  ...routineSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getRoutinesForUser: () => dispatch(RoutineActions.getRoutinesForUser())
});


export default connect(mapStateToProps, mapDispatchToProps)(RoutineScreen);
