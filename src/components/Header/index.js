import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import i18n from 'i18n-js';
import { styles } from './styles';

export const MainHeader = ({
  label,
  onMenu
}) => {
  return (
    <View style={[styles.container, styles.homeHeaderContainer]}>
      <TouchableOpacity style={styles.menuIconContainer} onPress={onMenu}>
        <Image source={require('../../assets/icon_menu.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <View style={styles.mainHeaderContainer}>
        <Image source={require('../../assets/icon_header_logo.png')} style={styles.mainHeaderIcon} />
        <Text style={[styles.titleText, styles.logoText]}>
          {label}
        </Text>
      </View>
    </View>
  )
};

export const SubHeader = ({
  label,
  onBack
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIconContainer} onPress={onBack}>
        <Image source={require('../../assets/icon_back.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <Text style={styles.titleText}>
        {label}
      </Text>
    </View>
  )
};

export const ChangeLangHeader = ({
  label,
  onBack,
  onDone,
  isActive
}) => {
  return (
    <View style={[styles.container, { height: 55 }]}>
      <TouchableOpacity style={styles.menuIconContainer1} onPress={onBack}>
        <Image source={require('../../assets/icon_back.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <Text style={styles.titleText}>
        {label}
      </Text>
      <TouchableOpacity
        style={[styles.touchRightContainer, { opacity: isActive ? 1 : 0.5 }]}
        onPress={onDone}
        disabled={!isActive}
      >
        <Text style={styles.whiteText}>
          {i18n.t('statements.done', { language: i18n.currentLocale() })}
        </Text>
      </TouchableOpacity>
    </View>
  )
};

export const Header = ({
  label
}) => (
  <View style={styles.container}>
    <Text style={styles.titleText}>
      {label}
    </Text>
  </View>
);
