import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import RNRestart from 'react-native-restart';
import i18n from 'i18n-js';
import { styles } from './styles';
import { ChangeLangHeader } from '../../components';
import { LocalStorage } from '../../utils';

class ChangeLanguageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ['English', 'Български'],
      activeIndex: -1,
      isActiveButton: false,
      currentLangIndex: -1
    }
  }

  componentDidMount() {
    this.onInitial();
  }

  onInitial = async () => {
    const currentLang = await LocalStorage.getCurrentLang();
    if (currentLang === 'en') {
      this.setState({ activeIndex: 0, currentLangIndex: 0 });
    } else {
      this.setState({ activeIndex: 1, currentLangIndex: 1 });
    }
  };

  onPress = (index) => {
    const { currentLangIndex } = this.state;

    if (currentLangIndex !== index) {
      this.setState({ activeIndex: index, isActiveButton: true });
    } else {
      this.setState({ activeIndex: index, isActiveButton: false });
    }
  };

  onDone = async () => {
    const { activeIndex } = this.state;
    if (activeIndex === 0) {
      await LocalStorage.setLanguage('en');
      i18n.locale = 'en';
    } else {
      await LocalStorage.setLanguage('bg');
      i18n.locale = 'bg';
    }
    RNRestart.Restart();
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  renderItem = ({ item, index }) => {
    const { activeIndex } = this.state;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.itemTouchContainer} onPress={() => this.onPress(index)}>
          <Text style={styles.itemText}>
            {item}
          </Text>
          {activeIndex === index && <Image source={require('../../assets/icon_tick.png')} style={styles.iconRight} />}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { item, isActiveButton } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ChangeLangHeader
          label={i18n.t('accountSettings.chooseLang', { language: i18n.currentLocale() }).toUpperCase()}
          onBack={this.onBack}
          onDone={this.onDone}
          isActive={isActiveButton}
        />
        <FlatList
          data={item}
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

export default ChangeLanguageScreen;
