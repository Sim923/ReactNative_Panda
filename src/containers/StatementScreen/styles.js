import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  mainContainer: {
    flex: 1,
    paddingRight: Metrics.marginHorizontal * 1.5,
  },
  headerText: {
    color: Colors.lightGrey,
    fontFamily: Fonts.family.semiBold,
    fontSize: Fonts.size.large,
    marginHorizontal: Metrics.marginHorizontal * 1.5,
    marginVertical: Metrics.height / 20
  },
  rowFront: {
    height: 70,
    marginVertical: 5,
    alignItems: 'flex-end'
  },
  rowMainContainer: {
    width: Metrics.width - (Metrics.marginHorizontal * 3),
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.border,
    backgroundColor: '#f6f6f6',
    paddingLeft: Metrics.marginHorizontal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scratchContainer: {
    width: Metrics.width - (Metrics.marginHorizontal * 3),
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.border,
    backgroundColor: '#f6f6f6',
    paddingHorizontal: Metrics.marginHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.marginHorizontal * 1.5,
    marginTop: 5
  },
  rowBack: {
    flex: 1,
    height: 70,
    marginVertical: 5,
    alignItems: 'flex-end',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginLeft: Metrics.marginHorizontal * 1.5
  },
  mainTrashContainer: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopColor: Colors.border,
    borderRightColor: Colors.border,
    borderBottomColor: Colors.border
  },
  trashIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  statementIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  statementIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  statementTitleText: {
    marginLeft: Metrics.marginHorizontal,
    fontFamily: Fonts.family.medium,
    fontSize: Fonts.size.large,
    color: Colors.darkBlack,
    flex: 1,
  },
  rowMainSubContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain'
  }
});
