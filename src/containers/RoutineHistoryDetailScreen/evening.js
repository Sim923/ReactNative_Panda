import React from 'react';
import {Text, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import get from 'lodash/get';
import i18n from 'i18n-js';
import { styles } from './styles';

export const Evening = ({
  answers
}) => {
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <View style={styles.mainItemContainer}>
        <Text style={styles.mainDarkText}>
          {get(answers, '[0].questionText', '')}
        </Text>
        <Text style={styles.itemGreyText1}>
          {get(answers, '[0].answer', '')}
        </Text>
      </View>
      <View style={styles.mainItemContainer}>
        <Text style={styles.mainDarkText}>
          {get(answers, '[1].questionText', '')}
        </Text>
        <Text style={styles.itemGreyText1}>
          {get(answers, '[1].answer', '')}
        </Text>
      </View>
      <View style={styles.mainItemContainer}>
        <Text style={styles.mainDarkText}>
          {get(answers, '[2].questionText', '')}
        </Text>
        <Text style={styles.itemGreyText1}>
          {get(answers, '[2].answer', '')}
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};
