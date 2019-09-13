import { Platform, PixelRatio } from 'react-native';
import Metric from './metric';
const scale = Metric.width / 375;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
  }
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  // h5: 22,
  // h6: 19,
  // input: 16,
  // large: 18,
  // regular: 16,
  // medium: 14,
  // small: 12,
  // tiny: 8.5,

  // h6: Metric.width >= 375 ? 19 : 16,
  // input: Metric.width >= 375 ? 16 : 13,
  // large: Metric.width >= 375 ? 18 : 15,
  // regular: Metric.width >= 375 ? 16 : 13,
  // medium: Metric.width >= 375 ? 14 : 11,
  // small: Metric.width >= 375 ? 12 : 9,
  // tiny: Metric.width >= 375 ? 8.5 : 5.5,
  h5: normalize(22),
  h6: normalize(19),
  input: normalize(16),
  large: normalize(18),
  regular: normalize(16),
  medium: normalize(14),
  small: normalize(12),
  tiny: normalize(10),
};

const family = {
  regular: 'Poppins-Regular',
  bold: 'Poppins-Bold',
  semiBold: 'Poppins-SemiBold',
  light: 'Poppins-Light',
  extraBold: 'Poppins-ExtraBold',
  thin: 'Poppins-Thin',
  medium: 'Poppins-Medium',
  montSemiBold: 'Montserrat-SemiBold',
  montBold: 'Montserrat-Bold',
  montRegular: 'Montserrat-Regular',
  berlinRegularIos: 'BerlinSansFB-Reg',
  berlinRegularAndroid: 'Berlin-Sans-FB-Regular'
};
export default { size, family };
