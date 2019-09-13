import React from 'react';
import { TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Colors } from '../../themes';

export const LoginInput = ({
  placeholder,
  icon,
  onChangeText,
  color,
  secureTextEntry,
  autoCorrect,
  autoCapitalize,
  keyboardType,
  onFocus,
  value,
  onSubmitEditing,
  returnKeyType,
  textRef
}) => (
  <View style={styles.container}>
    <Image source={icon} style={styles.icon} />
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderTextColor={Colors.gray}
      style={[styles.loginInput, { color }]}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      underlineColorAndroid="transparent"
      onFocus={onFocus}
      onChangeText={onChangeText}
      value={value}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      ref={ref => textRef(ref)}
    />
  </View>
);

LoginInput.defaultProps = {
  keyboardType: 'default',
  textRef: () => null
};

export const RoutineInput = ({
  placeholder,
  onChangeText,
  label,
  containerStyle,
  defaultValue,
  onFocus,
  onContentSizeChange,
  innerRef,
  onPress,
  pointerEvents,
  onBlur
}) => (
  <View style={[styles.routineInputContianer, containerStyle]}>
    <Text style={styles.routineLabel}>
      {label}
    </Text>
    <TouchableOpacity style={styles.routineInputSubContainer} activeOpacity={1} onPress={onPress}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.lightGray}
        style={styles.routineInput}
        underlineColorAndroid="transparent"
        onChangeText={onChangeText}
        multiline={true}
        defaultValue={defaultValue}
        onFocus={onFocus}
        onContentSizeChange={onContentSizeChange}
        pointerEvents={pointerEvents}
        ref={ref => innerRef(ref)}
        onBlur={onBlur}
      />
    </TouchableOpacity>
  </View>
);
