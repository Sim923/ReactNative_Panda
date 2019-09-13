import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: Metrics.marginHorizontal
  },
  inputContainer: {
    marginTop: Metrics.height / 20
  },
  checkContainer: {
    marginBottom: Metrics.height / 20,
    alignSelf: 'center'
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: Metrics.height / 10
  },
  headerContainer: {
    height: 60,
    marginTop: 10,
    flexDirection: 'row'
  },
  headerSubContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitleText: {
    fontFamily: Fonts.family.semiBold,
    fontSize: Fonts.size.regular,
    color: Colors.black
  },
  headerCountText: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.large,
    color: Colors.white
  },
  streakImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  }
});
