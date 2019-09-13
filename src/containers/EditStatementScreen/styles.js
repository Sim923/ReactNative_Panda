import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  headerText: {
    color: Colors.gray,
    fontFamily: Fonts.family.semiBold,
    fontSize: Fonts.size.large,
    marginHorizontal: Metrics.marginHorizontal * 1.5,
    marginVertical: Metrics.height / 20
  },
  inputContainer: {
    minHeight: Metrics.height / 2,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    marginHorizontal: Metrics.marginHorizontal,
    paddingVertical: 5,
    paddingHorizontal: Metrics.marginHorizontal / 2,
    shadowColor: Colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    backgroundColor: Colors.white,
    elevation: 2
  },
  input: {
    color: Colors.darkBlack,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.regular,
    textAlignVertical: 'top',
    padding: 0,
    lineHeight: Fonts.size.h5
  },
  btnContainer: {
    marginVertical: Metrics.height / 20,
    alignSelf: 'center',
    marginBottom: Metrics.height / 10
  },
  multilineInput: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.regular,
    lineHeight: Fonts.size.h5
  }
});
