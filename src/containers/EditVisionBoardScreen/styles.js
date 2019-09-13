import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  subContainer: {
    flex: 1,
    marginHorizontal: Metrics.marginHorizontal,
    marginTop: Metrics.height / 20
  },
  visionContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 320,
  },
  visionImg: {
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5
  },
  cameraIconContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '`rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
  checkBtnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: Metrics.height / 20,
  }
});
