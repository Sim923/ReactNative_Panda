import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  buttonHeight: 50,
  width,
  height,
  marginHorizontal: 20,
  inputFormHeight: 55,
  headerHeight: 50,
  tabBar: {
    height: 55,
    tabLabelMarginBottom: 0
  }
}
