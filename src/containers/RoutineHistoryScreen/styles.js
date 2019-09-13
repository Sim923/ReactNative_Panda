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
    borderBottomWidth: 0.5,
    borderTopColor: Colors.border,
    borderBottomColor: Colors.border,
    paddingHorizontal: Metrics.marginHorizontal,
    backgroundColor: Colors.white
  },
  itemSubContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  itemMainContainer: {

  },
  itemBlackText: {
    color: Colors.dark,
    fontFamily: Fonts.family.semiBold,
    fontSize: Fonts.size.large
  },
  itemGreyText: {
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
  listContainer: {
    marginTop: Metrics.marginHorizontal
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
  }
});
