import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import { styles } from './styles';
import { SubHeader } from '../../components';

class ReminderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingItems: [
        i18n.t('reminder.morningRoutine', { language: i18n.currentLocale() }),
        i18n.t('reminder.eveningRoutine', { language: i18n.currentLocale() })
      ]
    }
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onPress = (index) => {
    switch (index) {
      case 0:
        this.props.navigation.navigate('ReminderDetailScreen', { index });
        break;
      case 1:
        this.props.navigation.navigate('ReminderDetailScreen', { index });
        break;
      default:
        break;
    }
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.itemTouchContainer} onPress={() => this.onPress(index)}>
          <Text style={styles.itemText}>
            {item}
          </Text>
          <Image source={require('../../assets/icon_arrow_right.png')} style={styles.iconRight} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { settingItems } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <SubHeader
          onBack={this.onBack}
          label={i18n.t('reminder.myReminder', { language: i18n.currentLocale() }).toUpperCase()}
        />
        <FlatList
          data={settingItems}
          renderItem={this.renderItem}
          extraData={this.state}
          keyExtractor={(item, i) => `key - ${i}`}
          style={styles.listContainer}
          scrollEnabled={false}
        />
      </SafeAreaView>
    );
  }
}

export default ReminderScreen;
