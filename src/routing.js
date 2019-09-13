import React from 'react';
import i18n from 'i18n-js';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import {
  LoginScreen,
  HomeScreen,
  RoutineScreen,
  StatementScreen,
  StoriesScreen,
  PlayStoryScreen,
  EditStatementScreen,
  EditVisionBoardScreen,
  RoutineHistoryScreen,
  RoutineHistoryDetailScreen,
  SettingScreen,
  ChangeLanguageScreen,
  ReminderScreen,
  ReminderDetailScreen
} from './containers';
import { SideMenu } from './components';
import { Fonts, Metrics, Colors } from './themes';

const AuthStack = createStackNavigator({
  LoginScreen: LoginScreen
}, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none'
});

const HomeTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation, navigationOptions }) => ({
      tabBarLabel: i18n.t('tabBar.home', { language: i18n.currentLocale() })
    })
  },
  StoriesScreen: {
    screen: StoriesScreen,
    navigationOptions: ({ navigation, navigationOptions }) => ({
      tabBarLabel: i18n.t('tabBar.stories', { language: i18n.currentLocale() })
    })
  },
  StatementScreen: {
    screen: StatementScreen,
    navigationOptions: ({ navigation, navigationOptions }) => ({
      tabBarLabel: i18n.t('tabBar.journal', { language: i18n.currentLocale() })
    })
  },
}, {
  tabBarOptions: {
    activeTintColor: '#793aad',
    inactiveTintColor: '#a2aeb8',
    activeBackgroundColor: '#f5f5f5',
    inactiveBackgroundColor: '#f5f5f5', 
    showIcon: true,
    allowFontScaling: false,
    style: {
      height: Metrics.tabBar.height,
      borderTopWidth: 1,
      borderTopColor: Colors.border,
      backgroundColor: '#f5f5f5',
    },
    tabStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 5
    },
    labelStyle: {
      fontSize: Fonts.size.tiny,
      fontFamily: Fonts.family.regular,
      marginBottom: Metrics.tabBar.tabLabelMarginBottom,
      textAlign: 'center',
    }
  }
});

const DrawerMenu = createDrawerNavigator({
  HomeTabNavigator: { screen: HomeTabNavigator },
  RoutineHistoryScreen: { screen: RoutineHistoryScreen },
  SettingScreen: { screen: SettingScreen },
  ReminderScreen: { screen: ReminderScreen }
}, {
  contentComponent: (props) => <SideMenu {...props} />,
  initialRouteName: 'HomeTabNavigator',
  drawerWidth: Math.min(Metrics.height, Metrics.width) * 0.82
});

const MainStack = createStackNavigator({
  DrawerMenu: { screen: DrawerMenu },
  RoutineScreen: { screen: RoutineScreen },
  EditStatementScreen: { screen: EditStatementScreen },
  PlayStoryScreen: { screen: PlayStoryScreen },
  EditVisionBoardScreen: { screen: EditVisionBoardScreen },
  RoutineHistoryDetailScreen: { screen: RoutineHistoryDetailScreen },
  ChangeLanguageScreen: { screen: ChangeLanguageScreen },
  ReminderDetailScreen: { screen: ReminderDetailScreen }
}, {
  initialRouteName: 'DrawerMenu',
  headerMode: 'none'
});

const routing = createSwitchNavigator({
  AuthStack: AuthStack,
  MainStack: MainStack
}, {
  initialRouteName: 'AuthStack',
  headerMode: 'none'
});

export default createAppContainer(routing);
