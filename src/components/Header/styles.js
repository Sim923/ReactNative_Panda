import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    height: Metrics.headerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  homeHeaderContainer: {
    backgroundColor: '#f6f6f6'
  },
  menuIcon: {
    resizeMode: 'contain',
    width: 25,
    height: 30,
  },
  mainHeaderContainer: {
    flexDirection: 'row',
  },
  mainHeaderIcon: {
    resizeMode: 'contain',
    width: 25,
    height: 30,
    marginTop: 10,
    marginRight: 10
  },
  menuIconContainer: {
    position: 'absolute',
    left: 20,
    top: 10,
    bottom: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  menuIconContainer1: {
    position: 'absolute',
    left: 20,
    top: 15,
    bottom: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  titleText: {
    marginTop: 15,
    color: Colors.dark,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.regular,
    letterSpacing: 2
  },
  logoText: {
    marginTop: 12,
    // alignSelf: 'center',
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.family.montBold,
    color: 'rgb(40,36,81)'
  },
  whiteText: {
    fontSize: Fonts.size.medium,
    color: Colors.white,
    fontFamily: Fonts.family.semiBold
  },
  touchRightContainer: {
    width: 65,
    height: 40,
    backgroundColor: Colors.green,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 15
  }
});
