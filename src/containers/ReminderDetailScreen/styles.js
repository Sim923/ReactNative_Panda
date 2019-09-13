import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  listContainer: {
    marginTop: Metrics.marginHorizontal,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  itemContainer: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  itemTouchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.marginHorizontal,
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border
  },
  iconRight: {
    width: 15,
    height: 15,
    resizeMode: 'contain'
  },
  itemText: {
    fontFamily: Fonts.family.semiBold,
    fontSize: Fonts.size.input,
    color: Colors.gray
  },
  confirmTimePickerText: {
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.input,
    color: Colors.darkBlack
  },
  cancelTimePickerText: {
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.input,
    color: Colors.gray
  }
});
