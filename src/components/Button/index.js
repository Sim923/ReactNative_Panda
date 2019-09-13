import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';

export const GradientButton = ({
  onPress,
  label,
  style
}) => (
  <LinearGradient
    colors={['#81319a', '#6253e1']}
    style={[style, styles.container ]}
    locations={[0, 1]}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
  >
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.whiteBoldText}>
        {label}
      </Text>
    </TouchableOpacity>
  </LinearGradient>
);


export const MGradientButton = ({
  onPress,
  label,
  style,
  icon
}) => (
  <LinearGradient
    colors={['#7a39aa', '#6c49cb']}
    style={[style, styles.container1 ]}
    locations={[0, 1]}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
  >
    <TouchableOpacity style={styles.container1} onPress={onPress}>
      <Image source={icon} style={styles.icon2} />
      <Text style={styles.whiteSmallBoldText}>
        {label}
      </Text>
    </TouchableOpacity>
  </LinearGradient>
);

export const CircleButton = ({
  onPress,
  label,
  style,
  icon
}) => (
  <LinearGradient
    colors={['#7a39aa', '#6c49cb']}
    style={[style, styles.circleContainer ]}
    locations={[0, 1]}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
  >
    <TouchableOpacity onPress={onPress} style={styles.circleContainer}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  </LinearGradient>
);

export const CheckButton = ({
  onPress,
  label,
  style,
  icon
}) => (
  <LinearGradient
    colors={['#40e396', '#25abe0']}
    style={[styles.circleContainer1, style]}
    locations={[0, 1]}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
  >
    <TouchableOpacity onPress={onPress} style={styles.circleContainer1}>
      <Image source={icon} style={styles.icon1} />
    </TouchableOpacity>
  </LinearGradient>
);

export const BlueCheckButton = ({
  onPress,
  label,
  style,
  icon
}) => (
  <LinearGradient
    colors={['#1602ee', '#3905cd']}
    style={[styles.circleContainer1, style]}
    locations={[0, 1]}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
  >
    <TouchableOpacity onPress={onPress} style={styles.circleContainer1}>
      <Image source={icon} style={styles.icon1} />
    </TouchableOpacity>
  </LinearGradient>
);
