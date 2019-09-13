import React, { Component } from 'react';
import { findNodeHandle, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from 'i18n-js';
import get from 'lodash/get';
import { styles } from './styles';
import { CheckButton, RoutineInput } from '../../components';

export class EveningRoutine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointerEvents: ['none', 'none', 'none'],
      enableAutoScroll: false
    };
    this.textInputs = [null, null, null];
  }

  componentDidUpdate(prevProps) {
    if (this.props.enableAutoScroll !== prevProps.enableAutoScroll) {
      this.onInitial();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  onInitial = () => {
    this.timeOut = setTimeout(() => {
      this.setState({ enableAutoScroll: true });
    }, 1000 * 1);
  };

  scrollToInput = (event) => {
    const { enableAutoScroll } = this.state;
    if (enableAutoScroll) {
      this.scroll.props.scrollToFocusedInput(findNodeHandle(event.target), 180);
    }
  };

  onFocus = (index) => {
    const updatedPointerEvents = this.state.pointerEvents;
    updatedPointerEvents[index] = 'auto';
    this.setState({ pointerEvents: updatedPointerEvents });
    this.textInputs[index].focus();
  };

  onBlur = (index) => {
    const updatedPointerEvents = this.state.pointerEvents;
    updatedPointerEvents[index] = 'none';
    this.setState({ pointerEvents: updatedPointerEvents });
  };

  render() {
    const {
      onCheck,
      onChangeText,
      answers,
    } = this.props;
    const { pointerEvents } = this.state;

    return (
      <KeyboardAwareScrollView
        style={styles.subContainer}
        keyboardShouldPersistTaps="handled"
        innerRef={ref => this.scroll = ref}
        extraHeight={180}
      >
        <View style={styles.inputContainer}>
          <RoutineInput
            label={i18n.t('eveningRoutine.question1', { language: i18n.currentLocale() })}
            placeholder={i18n.t('eveningRoutine.placeholder1', { language: i18n.currentLocale() })}
            onChangeText={text => onChangeText(0, text)}
            defaultValue={answers[0]}
            onFocus={this.scrollToInput}
            onContentSizeChange={this.scrollToInput}
            innerRef={ref => this.textInputs[0] = ref}
            onPress={() => this.onFocus(0)}
            onBlur={() => this.onBlur(0)}
            pointerEvents={pointerEvents[0]}
          />
        </View>
        <View style={styles.inputContainer}>
          <RoutineInput
            label={i18n.t('eveningRoutine.question2', { language: i18n.currentLocale() })}
            placeholder={i18n.t('eveningRoutine.placeholder2', { language: i18n.currentLocale() })}
            onChangeText={text => onChangeText(1, text)}
            defaultValue={answers[1]}
            onFocus={this.scrollToInput}
            onContentSizeChange={this.scrollToInput}
            innerRef={ref => this.textInputs[1] = ref}
            onPress={() => this.onFocus(1)}
            onBlur={() => this.onBlur(1)}
            pointerEvents={pointerEvents[1]}
          />
        </View>
        <View style={styles.inputContainer}>
          <RoutineInput
            label={i18n.t('eveningRoutine.question3', { language: i18n.currentLocale() })}
            placeholder={i18n.t('eveningRoutine.placeholder3', { language: i18n.currentLocale() })}
            onChangeText={text => onChangeText(2, text)}
            defaultValue={answers[2]}
            onFocus={this.scrollToInput}
            onContentSizeChange={this.scrollToInput}
            innerRef={ref => this.textInputs[2] = ref}
            onPress={() => this.onFocus(2)}
            onBlur={() => this.onBlur(2)}
            pointerEvents={pointerEvents[2]}
          />
        </View>
        <View style={styles.bottomContainer}>
          <CheckButton
            style={styles.checkContainer}
            icon={require('../../assets/icon_check.png')}
            onPress={onCheck}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  };
}
