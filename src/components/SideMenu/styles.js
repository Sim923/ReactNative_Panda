import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center'
  },
  logoIcon: {
    width: 180,
    height: 150,
    resizeMode: 'contain',
    marginTop: Metrics.height / 10
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    height: 30,
    marginHorizontal: Metrics.marginHorizontal * 1.5
  },
  menuIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: Metrics.marginHorizontal
  },
  whiteText: {
    color: Colors.white,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.family.semiBold
  }
});

