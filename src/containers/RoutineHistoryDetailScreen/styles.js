import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  itemContainer: {
    height: 100,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    paddingHorizontal: Metrics.marginHorizontal,
    alignItems: 'center',
    marginTop: Metrics.marginHorizontal
  },
  itemBlackText: {
    color: Colors.dark,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.h6
  },
  itemGreyText: {
    color: '#9695a4',
    fontFamily: Fonts.family.medium,
    fontSize: Fonts.size.medium,
    marginTop: 5
  },
  itemGreyText1: {
    color: '#9695a4',
    fontFamily: Fonts.family.medium,
    fontSize: Fonts.size.medium,
    marginTop: 5
  },
  itemTimeText: {
    color: Colors.lightGray,
    fontFamily: Fonts.family.medium,
    fontSize: Fonts.size.medium,
  },
  itemTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  timeIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginRight: 10,
    marginTop: 4
  },
  itemMainContainer: {

  },
  mainContainer: {
    paddingHorizontal: Metrics.marginHorizontal
  },
  mainItemContainer: {
    paddingHorizontal: Metrics.marginHorizontal,
    paddingVertical: Metrics.marginHorizontal,
    shadowColor: Colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    backgroundColor: Colors.lightWhite,
    elevation: 2,
    marginBottom: Metrics.marginHorizontal * 1.5
  },
  mainDarkText: {
    color: Colors.dark,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.family.semiBold
  }
});
