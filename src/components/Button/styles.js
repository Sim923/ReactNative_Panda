import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    height: Metrics.buttonHeight,
    borderRadius: Metrics.buttonHeight / 2,
    width: Metrics.width / 1.8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container1: {
    height: 45,
    borderRadius: 6,
    width: (Metrics.width - (Metrics.marginHorizontal * 2.5)) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgBackground: {
    borderRadius: Metrics.buttonHeight / 2,
    resizeMode: 'stretch',
    position: 'absolute',
    backgroundColor: 'orange'
  },
  whiteBoldText: {
    color: Colors.white,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    textAlign: 'center'
  },
  whiteSmallBoldText: {
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
    textAlign: 'center',
    alignSelf: 'center'
  },
  icon: {
    width: 25,
    height: 10,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  icon1: {
    width: 35,
    height: 15,
    resizeMode: 'contain'
  },
  icon2: {
    width: 35,
    height: 20,
    resizeMode: 'contain'
  },
  circleContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleContainer1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
