import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import {View, Text, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import get from 'lodash/get';
import moment from 'moment';
import i18n from 'i18n-js';
import { styles } from './styles';
import { SubHeader } from '../../components/Header';
import { Morning } from './morning';
import { Evening } from './evening';
import { getRoutineById } from '../../service/api';
import { showAlert, LocalStorage } from '../../utils';
import { Colors, CommonStyles } from '../../themes';


class RoutineHistoryDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routine: {},
      showIndicator: false
    }
  }

  componentDidMount() {
    this.onInitial();
  }

  onInitial = async () => {
    const { navigation } = this.props;
    const routine = get(navigation, 'state.params.routine', {});
    this.setState({ showIndicator: true });
    const ret = await getRoutineById(routine.id, i18n.currentLocale().toUpperCase());
    this.setState({ showIndicator: false });
    if (ret && ret.id) {
      this.setState({ routine: ret });
    } else {
      if(res.error !== undefined && res.error === true) {
        await LocalStorage.clearToken();
        this.props.navigation.navigate('LoginScreen');
      } else {
        showAlert('SuccessPanda', 'Failure to get the detail of Routine');
      }
    }
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  renderRoutineInfo = () => {
    const { navigation } = this.props;
    const routine = get(navigation, 'state.params.routine', {});
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemMainContainer}>
          <Text style={styles.itemBlackText}>
            {routine.type === 'morning' ?
              i18n.t('morningRoutine.title', { language: i18n.currentLocale() }) :
              i18n.t('eveningRoutine.title', { language: i18n.currentLocale() })}
          </Text>
          <Text style={styles.itemGreyText}>
            {moment(routine.createdAt).locale(i18n.currentLocale()).format('MMMM Do, gg-dddd')}
          </Text>
        </View>
        <View style={styles.itemTimeContainer}>
          <Image source={require('../../assets/icon_time.png')} style={styles.timeIcon} />
          <Text style={styles.itemTimeText}>
            {moment(routine.createdAt).locale(i18n.currentLocale()).format('hh:mm A')}
          </Text>
        </View>
      </View>
    )
  };

  renderActivity = () => (
    <View style={CommonStyles.activityContainer}>
      <ActivityIndicator color={Colors.lightBlue} />
    </View>
  );

  renderRoutineMainContent = () => {
    console.info('this.state.routine', this.state.routine);
    const { navigation } = this.props;
    const routine = get(navigation, 'state.params.routine', {});
    if (routine.type === 'morning') {
      return <Morning answers={get(this.state.routine, 'answers', [])} />;
    }
    return <Evening answers={get(this.state.routine, 'answers', [])} />;
  };

  render() {
    const { showIndicator } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <SubHeader
          onBack={this.onBack}
          label={i18n.t('routineHistory.title', { language: i18n.currentLocale() })}
        />
        {this.renderRoutineInfo()}
        {!showIndicator && this.renderRoutineMainContent()}
        {showIndicator && this.renderActivity()}
      </SafeAreaView>
    );
  }
}

export default RoutineHistoryDetailScreen;
