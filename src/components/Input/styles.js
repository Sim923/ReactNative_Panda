import { StyleSheet, Platform } from 'react-native';
import { Colors, Metrics, Fonts } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    height: Metrics.inputFormHeight,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    width: Metrics.width - (Metrics.marginHorizontal * 2) - 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: Colors.gray
  },
  icon: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
    marginRight: 10
  },
  loginInput: {
    fontFamily: Fonts.family.medium,
    fontSize: Fonts.size.input,
    color: Colors.dark,
    marginRight: 10,
    flex: 1,
    textAlignVertical: 'center',
    paddingHorizontal: 0,
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
    paddingTop: Platform.OS === 'ios' ? 6 : 5
  },
  routineInputContianer: {

  },
  routineInputSubContainer: {
    // height: Metrics.inputFormHeight,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    marginTop: 10,
    borderRadius: 5,
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
  routineLabel: {
    color: Colors.gray,
    fontFamily: Fonts.family.semiBold,
    fontSize: Fonts.size.large
  },
  routineInput: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.input,
    color: Colors.black,
    marginHorizontal: 10,
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
    paddingTop: Platform.OS === 'ios' ? 6 : 5,
    textAlignVertical: 'top',
    marginVertical: 5
  }
});
