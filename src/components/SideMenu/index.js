import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Image, FlatList, TouchableOpacity, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import get from 'lodash/get';
import {
  Freshchat,
  ConversationOptions,
  FreshchatUser
} from 'react-native-freshchat-sdk';
import i18n from 'i18n-js';
import { styles } from './styles';
import { Colors } from '../../themes';
import { LocalStorage } from '../../utils';
import { userSelector } from '../../redux/selector';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [
        { icon: require('../../assets/icon_menu_feedback.png'), name: i18n.t('settings.feedback', { language: i18n.currentLocale() }) },
        { icon: require('../../assets/icon_menu_support.png'), name: i18n.t('settings.chatSupport', { language: i18n.currentLocale() }) },
        { icon: require('../../assets/icon_bell.png'), name: i18n.t('settings.reminders', { language: i18n.currentLocale() }) },
        { icon: require('../../assets/icon_menu_history.png'), name: i18n.t('settings.routineHistory', { language: i18n.currentLocale() }) },
        { icon: require('../../assets/icon_menu_settings.png'), name: i18n.t('settings.accountSettings', { language: i18n.currentLocale() }) },
      ]
    }
  }

  onMenuItem = (index) => {
    const { user } = this.props;
    switch (index) {
      case 0:
        Linking.openURL('mailto:hello@successpanda.app');
        break;
      case 1:
        const freshchatUser = new FreshchatUser();
        freshchatUser.firstName = get(user, 'userInformation.firstName', '');
        freshchatUser.lastName = get(user, 'userInformation.lastName', '');
        freshchatUser.email = get(user, 'userInformation.email', '');
        Freshchat.setUser(freshchatUser, (error) => {
          console.log('err FreshChat.setUser', error);
        });
        const conversationOptions = new ConversationOptions();
        conversationOptions.tags = ["premium"];
        conversationOptions.filteredViewTitle = "Premium Support";
        Freshchat.showConversations(conversationOptions);
        this.props.navigation.closeDrawer();
        break;
      case 2:
        this.props.navigation.navigate('ReminderScreen');
        break;
      case 3:
        this.props.navigation.navigate('RoutineHistoryScreen');
        break;
      case 4:
        this.props.navigation.navigate('SettingScreen');
        break;
      default:
        break;
    }
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => this.onMenuItem(index)}>
        <Image source={item.icon} style={styles.menuIcon} />
        <Text style={styles.whiteText}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  };

  render() {
    const { item } = this.state;

    return (
      <LinearGradient
        colors={[Colors.orange, Colors.pink]}
        style={styles.container}
        locations={[0, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/icon_logo_white.png')} style={styles.logoIcon} />
        </View>
        <FlatList
          data={item}
          renderItem={this.renderItem}
          keyExtractor={(item, i) => `key - ${i}`}
        />
      </LinearGradient>
    );
  }
}
const mapStateToProps = state => ({
  ...userSelector(state),
});

export default connect(mapStateToProps, null)(SideMenu);
