import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import {FlatList, View, Image, Text, TouchableOpacity, Switch, ActivityIndicator} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import i18n from 'i18n-js';
import { styles } from './styles';
import { SubHeader } from '../../components';
import { saveNotification, getNotification } from '../../service/api';
import { Colors, CommonStyles } from '../../themes';
import { AppInfo } from '../../constants';
import {showAlert, LocalStorage} from "../../utils";

class ReminderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingItems: [
        i18n.t('reminder.reminder', { language: i18n.currentLocale() }),
        i18n.t('reminder.reminderAt', { language: i18n.currentLocale() })
      ],
      isReminder: false,
      isDateTimePickerVisible: false,
      time: props.navigation.state.params.index === 0 ?
        new Date('2019/6/4/08:00') : new Date('2019/6/4/21:00'),
      showIndicator: false
    }
    this.isInitialReminder = true;
  }

  componentDidMount() {
    this.onInitial();
  }

  onInitial = async () => {
    const { navigation } = this.props;
    this.setState({ showIndicator: true });
    const res = await getNotification(navigation.state.params.index === 0 ? 'morning': 'evening');
    if (res.message || res.message === 'Resource not found') {

    } else {
      const time = new Date();
      time.setHours(res.hours, res.minutes);
      this.setState({ time, isReminder: res.enabled });
      this.isInitialReminder = false;
    }
    this.setState({ showIndicator: false });
  };

  onBack = async () => {
    const { isReminder } = this.state;
    if (!isReminder && this.isInitialReminder) {

    } else {
      await this.saveReminder();
    }
    this.props.navigation.goBack();
  };

  onPress = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  onEnableReminder = (isReminder) => {
    this.setState({ isReminder });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = async (time) => {
    this.setState({ time });
    this.hideDateTimePicker();
  };

  saveReminder = async () => {
    const { navigation } = this.props;
    const { isReminder, time } = this.state;

    this.setState({ showIndicator: true });
    const hours = moment(time).format('HH');
    const mins = moment(time).format('mm');
    const timezone = (new Date(time)).getTimezoneOffset() / -60;
    if (AppInfo.fcmToken) {
      const res = await saveNotification(
        hours,
        mins,
        timezone,
        AppInfo.fcmToken,
        i18n.currentLocale(),
        navigation.state.params.index === 0 ? 'morning': 'evening',
        isReminder
      );
      if(res.error !== undefined && res.error === true) {
        await LocalStorage.clearToken();
        this.props.navigation.navigate('LoginScreen');
      }
    } else {
      // showAlert('SuccessPanda', `This device doesn't support push notification`);
    }
    this.setState({ showIndicator: false });
  };

  renderItem = ({ item, index }) => {
    const { isReminder, time } = this.state;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.itemTouchContainer} onPress={() => this.onPress(index)} disabled={index === 0}>
          <Text style={styles.itemText}>
            {item}
          </Text>
          {index === 0 && <Switch
            onValueChange={this.onEnableReminder}
            value={isReminder}
            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
          />}
          {index === 1 &&<Text style={styles.itemText}>
            {moment(time).format('hh:mm a')}
          </Text>}
        </TouchableOpacity>
      </View>
    );
  };

  renderActivity = () => (
    <View style={CommonStyles.activityContainer}>
      <ActivityIndicator color={Colors.lightBlue} />
    </View>
  );

  render() {
    const { settingItems, isDateTimePickerVisible, time, showIndicator } = this.state;
    const { navigation } = this.props;
    const index = navigation.state.params.index;
    return (
      <SafeAreaView style={styles.container}>
        <SubHeader
          onBack={this.onBack}
          label={index === 0 ?
            i18n.t('reminder.morningRoutine', { language: i18n.currentLocale() }).toUpperCase():
            i18n.t('reminder.eveningRoutine', { language: i18n.currentLocale() }).toUpperCase()
          }
        />
        <FlatList
          data={settingItems}
          renderItem={this.renderItem}
          extraData={this.state}
          keyExtractor={(item, i) => `key - ${i}`}
          style={styles.listContainer}
          scrollEnabled={false}
        />
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="time"
          titleIOS={index === 0 ?
            i18n.t('reminder.morningRoutine', { language: i18n.currentLocale() }).toUpperCase():
            i18n.t('reminder.eveningRoutine', { language: i18n.currentLocale() }).toUpperCase()
          }
          cancelTextStyle={styles.cancelTimePickerText}
          confirmTextStyle={styles.confirmTimePickerText}
          date={time}
        />
        {showIndicator && this.renderActivity()}
      </SafeAreaView>
    );
  }
}

export default ReminderDetailScreen;
