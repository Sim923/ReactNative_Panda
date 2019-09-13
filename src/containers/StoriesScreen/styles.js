import { StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Metrics } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  stories_header_image: {
    flex: 1,
    resizeMode: 'contain',
  },
  container1: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        paddingTop: 70,
      },
      android: {
        paddingTop: 50,
      },
    }),
  },
  headerText: {
    fontFamily: Fonts.family.montBold,
    fontSize: Fonts.size.large,
    textAlign: 'center',
    color: Colors.white,
  },
  descriptionText: {
    fontFamily: Fonts.family.montRegular,
    fontSize: Fonts.size.regular,
    textAlign: 'center',
    color: Colors.white,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20
  },
  linerGradient: {
    paddingTop: Fonts.size.large/3,
    paddingBottom: Fonts.size.large/3,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteBoldText: {
    fontFamily: Fonts.family.montBold,
    fontSize: Fonts.size.large,
    textAlign: 'center',
    color: Colors.white,
    backgroundColor: 'transparent'
  },
  btnGroup: {
    flexDirection: 'row',
    marginBottom: Fonts.size.large * 0.8,
  },
  visionContainer: {
    backgroundColor: Colors.white
  },
  visionList: {
    height: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  visionItem: {
    width: (Metrics.width - Metrics.marginHorizontal *2) / 2,
    height: 150,
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 20
  },
  visionImage: {
    borderRadius: 8,
    width: '100%',
    height: '100%'
  },
  visionContent: {
    position: 'absolute',
    bottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textCnt: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignSelf: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  titleCnt: {
    marginBottom: 0,
  },
  timeTxt: {
    color: Colors.white,
    padding: 1,
    alignSelf: 'flex-start',
    fontFamily: Fonts.family.montBold,
    fontSize: Fonts.size.tiny,
  },
  titleTxt: {
    color: Colors.white,
    padding: 1,
    fontFamily: Fonts.family.montBold,
    fontSize: Fonts.size.medium,
  },
  activityContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  }
});
