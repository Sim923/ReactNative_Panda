import { StyleSheet,Platform } from 'react-native';
import { Colors, Fonts, Metrics } from '../../themes';
import { ifIphoneX,getStatusBarHeight  } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    color: Colors.gray,
    fontFamily: Fonts.family.semiBold,
    fontSize: Fonts.size.large,
    marginHorizontal: Metrics.marginHorizontal * 1.5,
    marginVertical: Metrics.height / 20
  },
  menuIconContainer: {
    position: 'absolute',
    left: 20,
    
    bottom: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    color: '#282451',
    ...ifIphoneX({
      top: 30 + getStatusBarHeight(),
    }, {
      top: 30,
    }),
  },
  menuIcon: {
    resizeMode: 'contain',
    width: 40,
  },
  stories_header_image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    paddingTop: Metrics.height*0.2,
    paddingBottom: Metrics.height*0.1,
  },
  title: {
    alignItems: 'center'
  },
  titleTxt: {
    width: '60%',
    paddingLeft: 10,
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        fontFamily: Fonts.family.berlinRegularIos,
      },
      android: {
        fontFamily: Fonts.family.berlinRegularAndroid,
      },
    }),
    fontSize: Fonts.size.h1,
    color: '#282451',
    textAlign: 'center'
  },
  audioContainer: {

  },
  playContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  prevContainer: {
    alignSelf: 'flex-end',
  },
  prevIcon: {
    width: Metrics.width*0.15,
    height: Metrics.width*0.15,
    resizeMode: 'contain'
  },
  nextIcon: {
    width: Metrics.width*0.15,
    height: Metrics.width*0.15,
    resizeMode: 'contain'
  },
  playIcon: {
    width: Metrics.width * 0.3,
    height: Metrics.width * 0.3,
    resizeMode: 'contain'
  },
  playStateContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  sliderContainer: {
    
  },
  slider: {
    marginLeft: 10,
    marginRight: 10
  },
  trackStyle: {
    height: 8,
    borderRadius: 20
  },
  timeState: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },
  timeTxt: {
    color: '#282451',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.bold
  }
});
