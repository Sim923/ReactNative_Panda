import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import moment from 'moment';
import 'moment/locale/bg';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { styles } from './styles';
import { SubHeader } from '../../components';
import {
  Colors,
  CommonStyles
} from '../../themes';
import { getRoutinesForUser } from '../../service/api';
import { showAlert, LocalStorage } from '../../utils';
import { routineSelector } from '../../redux/selector';
import { RoutineActions } from '../../redux';

class RoutineHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      activeIndex: -1,
      showIndicator: false
    }
  }

  componentDidMount() {
    this.onInitial();
  }

  async componentDidUpdate(prevProps) {
    if (!this.props.routine.fetchRoutine && prevProps.routine.fetchRoutine) {
      this.setState({ showIndicator: false });
      if (this.props.routine.fetchRoutineError) {
        if(this.props.routine.fetchRoutineError.error !== undefined && this.props.routine.fetchRoutineError.error === true) {
          await LocalStorage.clearToken();
          this.props.navigation.navigate('LoginScreen');
        }
      } else {
        this.setState({ history: this.props.routine.allRoutines });
      }
    }
  }

  onInitial = async () => {
    this.setState({ showIndicator: true });
    this.props.getRoutinesForUser();
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onPress = (activeIndex) => {
    const { history } = this.state;
    this.props.navigation.navigate('RoutineHistoryDetailScreen',
      { routine: history[activeIndex] });
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight
        style={styles.itemContainer}
        onPress={() => this.onPress(index)}
        activeOpacity={1}
        underlayColor={Colors.lightPurple}
      >
        <View style={styles.itemSubContainer}>
          <View style={styles.itemMainContainer}>
            <Text style={styles.itemBlackText}>
              {item.type === 'morning' ?
                i18n.t('morningRoutine.title', { language: i18n.currentLocale() }) :
                i18n.t('eveningRoutine.title', { language: i18n.currentLocale() })}
            </Text>
            <Text style={styles.itemGreyText}>
              {moment(item.createdAt).locale(i18n.currentLocale()).format('MMMM Do, gg-dddd')}
            </Text>
          </View>
          <View style={styles.itemTimeContainer}>
            <Image source={require('../../assets/icon_time.png')} style={styles.timeIcon} />
            <Text style={styles.itemTimeText}>
              {(moment(item.createdAt).locale(i18n.currentLocale())).format('hh:mm A')}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  };

  renderActivity = () => (
    <View style={CommonStyles.activityContainer}>
      <ActivityIndicator color={Colors.lightBlue} />
    </View>
  );

  render() {
    const { history, showIndicator } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <SubHeader
          onBack={this.onBack}
          label={i18n.t('routineHistory.title', { language: i18n.currentLocale() })}
        />
        <FlatList
          data={history}
          renderItem={this.renderItem}
          extraData={this.state}
          keyExtractor={(item, i) => `key - ${i}`}
          style={styles.listContainer}
        />
        {showIndicator && this.renderActivity()}
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


export default connect(mapStateToProps, mapDispatchToProps)(RoutineHistoryScreen);
