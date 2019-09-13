import React, { Component } from 'react';
import { StatusBar, I18nManager, Text, Platform, AppState, DeviceEventEmitter } from 'react-native';
import { Provider } from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import {
  Freshchat,
  FreshchatConfig,
  FreshchatNotificationConfig
} from 'react-native-freshchat-sdk';
import NetInfo from '@react-native-community/netinfo';
import memoize from 'lodash.memoize';
import i18n from 'i18n-js';
import RNUxcam from 'react-native-ux-cam';
import FlurryAnalytics from 'react-native-flurry-analytics';
import firebase from 'react-native-firebase';
import Routing from './routing';
import { en, bg, AppInfo } from './constants';
import { LocalStorage, showAlert } from './utils';
import createStore from './redux';
import Config from './config';
if (__DEV__) {

} else {
  if (Platform.OS !== 'ios') {
    RNUxcam.startWithKey(Config.UxcamKey);
  }
  FlurryAnalytics.setAppVersion('1.0.0');
  FlurryAnalytics.setDebugLogEnabled(false);
  FlurryAnalytics.setSessionContinueSeconds(10);
  FlurryAnalytics.setCrashReportingEnabled(true);
  FlurryAnalytics.startSession(Platform.OS === 'ios' ?
    Config.FLURRY_IOS_API_KEY : Config.FLURRY_ANDROID_API_KEY);

}
const store = createStore();

StatusBar.setHidden(false);
export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);
export const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false };
  i18n.translations = { en, bg };
  const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback;

  I18nManager.forceRTL(isRTL);
  // clear translation cache
  translate.cache.clear();
  i18n.locale = languageTag;
};

Text.defaultProps = {
  allowFontScaling: false
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      appState: AppState.currentState,
    };
    this.onInitial();
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
    NetInfo.isConnected.addEventListener('connectionChange', this.dispatchConnected);
    AppState.addEventListener('change', this.handleAppStateChange);
    this.checkCurrentNetworkStatus();
    this.onInitialFCM();
    
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
    NetInfo.isConnected.removeEventListener('connectionChange', this.dispatchConnected);
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
    this.removeNotificationOpenedListener();
  }

  onInitialFCM = async () => {

    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
    } else {
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
      } catch (error) {
        // User has rejected permissions
      }
    }
    const fcmToken = await firebase.messaging().getToken();
    console.info('fcmToken', fcmToken);
    if (fcmToken) {
      // user has a device token
      AppInfo.fcmToken = fcmToken;
      Freshchat.setPushRegistrationToken(fcmToken);
      console.log("freshchat set push registration token");
    } else {
      // user doesn't have a device token yet
    }

    const channel = new firebase.notifications.Android.Channel('default-channel', 'Default Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps Default channel');

    firebase.notifications().android.createChannel(channel);

    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      // Freshchat.isFreshchatNotification(notification, (freshchatNotification) => {
      //   if (freshchatNotification) {
      //       Freshchat.handlePushNotification(notification);
      //   } else {
      //       // handle your app notification
      //   }
      // })
    }

    this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.info('onNotificationDisplayed', notification);
      // Freshchat.isFreshchatNotification(notification, (freshchatNotification) => {
      //   if (freshchatNotification) {
      //       Freshchat.handlePushNotification(notification);
      //   } else {
      //       // handle your app notification
      //   }
      // })
    });
    this.removeNotificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      console.info('onNotification', notification);
      // Freshchat.isFreshchatNotification(notification, (freshchatNotification) => {
      //   if (freshchatNotification) {
      //       Freshchat.handlePushNotification(notification);
      //   } else {
      //       // handle your app notification
      //   }
      // })
      if (this.state.appState === 'active') {
        // modify your notification if required e.g. for this issue:
        // then display it by calling displayNotification
        notification.setSound('default');
        notification.android.setChannelId('default-channel');
        notification.android.setPriority(firebase.notifications.Android.Priority.Max);
        firebase.notifications().displayNotification(notification);
      }
    });
    this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      console.info('onNotificationOpened', notificationOpen);
    });
  };

  onInitial = async () => {

    const freshchatConfig = new FreshchatConfig('ac910493-5a24-411d-8891-85dd483c6077', '1f86a6f3-fcc2-42ee-a7e2-9114fa77dc03');
    Freshchat.init(freshchatConfig);

    i18n.translations = { en, bg };
    translate.cache.clear();
    const lang = await LocalStorage.getCurrentLang();
    if (lang === 'en') {
      i18n.locale = 'en';
    } else {
      i18n.locale = 'bg';
    }

    var freshchatNotificationConfig = new FreshchatNotificationConfig();
    freshchatNotificationConfig.priority = FreshchatNotificationConfig.NotificationPriority.PRIORITY_HIGH;
    freshchatNotificationConfig.notificationSoundEnabled = false;
    Freshchat.setNotificationConfig(freshchatNotificationConfig);
    
    // const fromPushNotifications = (pushPayload) => {
    //   console.log("--------------");
    //   console.log(pushPayload);
    //   Freshchat.isFreshchatNotification(pushPayload, (fromFreshchat) => {
    //         console.log('isFreshchatNotification:', fromFreshchat);
    //         if (fromFreshchat) {
    //             console.log('handlePushNotification triggered');
    //             Freshchat.handlePushNotification(pushPayload);
    //         } else {
    //             // handle your app notification
    //         }
    //     })
    // };
  
    // DeviceEventEmitter.addListener('notification_payload', fromPushNotifications);

    // Freshchat.isFreshchatNotification(notification, (freshchatNotification) => {
    //   if (freshchatNotification) {
    //     console.log("*************** fresh chat notificaiton ***************");
    //     Freshchat.handlePushNotification(notification);
    //   } else {
    //       // handle your app notification
    //       console.log("*************** handle your app notification ***************");
    //   }
    // })

    this.setState({ isReady: true });
  };

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.checkCurrentNetworkStatus();
    }
    this.setState({ appState: nextAppState });
  };

  checkCurrentNetworkStatus = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.dispatchConnected(isConnected);
    });
  };

  handleLocalizationChange = (e) => {
    // setI18nConfig();
    // this.forceUpdate();
  };

  dispatchConnected = (isConnected) => {
    if (!isConnected) {
      showAlert(
        'SuccessPanda',
        i18n.t('app.offline', { language: i18n.currentLocale() })
      );
    }
    AppInfo.isConnected = isConnected;
  };

  render() {
    const { isReady } = this.state;
    if (!isReady) return null;
    return (
      <Provider store={store}>
        <Routing />
      </Provider>
    );
  }
}

export default App;
