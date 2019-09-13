import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../themes';

export const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#f6f6f6'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  subContainer: {
    marginHorizontal: Metrics.marginHorizontal
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Metrics.height / 40
  },
  visionImg: {
    height: 150,
    resizeMode: 'cover',
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    borderRadius: 5
  },
  visionContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cameraIcon: {
    width: 23,
    height: 30,
    resizeMode: 'contain'
  },
  cameraTouchContainer: {
    position: 'absolute',
    right: -2,
    top: 0,
    width: 45,
    height: 40,
    alignItems: 'flex-end'
  },
  cameraContainer: {
    width: 35,
    height: 35,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  affirmationContainer: {
    marginHorizontal: Metrics.marginHorizontal,
    marginVertical: Metrics.height / 30,
  },
  eyeContainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
  },
  affirmationRegularText: {
    color: Colors.dark,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.regular,
    textAlign: 'center',
    marginBottom: 10
  },
  affirmationBoldText: {
    color: Colors.dark,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    textAlign: 'center'
  },
  addVisionDescriptionContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  blackText: {
    color: Colors.darkBlack,
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.family.semiBold,
    backgroundColor: Colors.yellow,
    paddingHorizontal: 10,
    marginBottom: 15,
    paddingVertical: 3
  },
  arrowIcon: {
    position: 'absolute',
    right: 0,
    top: 35,
    width: Metrics.width / 4,
    height: 120,
    resizeMode: 'contain',
  },
  dailyStoryContainer: {
    margin: 20,
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    paddingRight: 20,
    borderRadius: 6,
    elevation: 10,
    // borderWidth: 1,
    // borderColor: '#ddd',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8.30,
    backgroundColor: '#f8f7f7'
  },
  storyTopic: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.montSemiBold,
    color: '#282451',
    marginBottom: 5
  },
  storyPlayerView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  storyTitleCnt: {
    padding: 10,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: '#000000',
    borderRadius: 6,
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  storyTitle: {
    color: '#ffffff',
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.montSemiBold,
  },
  storyPlayBtn: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  playIcon: {
    width: 60,
    resizeMode: 'contain',
  },
  stories_header_image: {
    width: '100%',
    resizeMode: 'cover',
  }
});
