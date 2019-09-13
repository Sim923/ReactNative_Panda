import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  dialogContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  buttonText: {
    fontFamily: Fonts.family.medium,
    color: Colors.white,
    fontSize: Fonts.size.large
  },
  iconLogo: {
    height: Metrics.height / 5,
    width: Metrics.width / 1.5,
    resizeMode: 'contain',
    marginTop: Metrics.height / 8
  },
  inputFormsContainer: {
    marginTop: Metrics.height / 15,
    marginHorizontal: Metrics.marginHorizontal,
    height: (Metrics.inputFormHeight * 2) + 20,
    justifyContent: 'space-between'
  },
  grayText: {
    color: Colors.gray,
    fontFamily: Fonts.family.semiBold,
    fontSize: Fonts.size.regular,
    marginTop: Metrics.height / 30
  },
  grayBoldText: {
    color: Colors.grey,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.regular,
  },
  buttonContainer: {
    marginTop: Metrics.height / 25
  },
  langContainer: {
    position: 'absolute',
    right: Metrics.marginHorizontal * 2,
    top: Metrics.height / 30
  },
  actionSheetText: {
    color: Colors.dark,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.regular,
  }
});
