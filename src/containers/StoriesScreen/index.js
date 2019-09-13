import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import {View, Text, Image, TouchableOpacity, ScrollView, TouchableHighlight, ActivityIndicator, ImageBackground} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import _, { isEqual } from 'lodash';
import get from 'lodash/get';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import { styles } from './styles';
import { Header } from '../../components';
import { statementSelector } from '../../redux/selector';
import { StatementActions } from '../../redux';
import { Colors, CommonStyles } from '../../themes';
import LinearGradient from 'react-native-linear-gradient';
import { getStoriesList,getDailyStorys } from '../../service/api';
import { LocalStorage } from '../../utils';
import story_background_1 from '../../assets/story_background_1.png';
import story_background_2 from '../../assets/story_background_2.png';
import story_background_3 from '../../assets/story_background_3.png';
import story_background_4 from '../../assets/story_background_4.png';
import story_background_5 from '../../assets/story_background_5.png';
import story_background_6 from '../../assets/story_background_6.png';
import story_background_7 from '../../assets/story_background_7.png';
import story_background_8 from '../../assets/story_background_8.png';
import story_background_9 from '../../assets/story_background_9.png';
import story_background_10 from '../../assets/story_background_10.png';
import story_background_11 from '../../assets/story_background_11.png';
import story_background_12 from '../../assets/story_background_12.png';

class StoriesScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor, focused }) => {
      if (focused) {
        return <Image source={require('./../../assets/icon_headphones_active.png')} style={CommonStyles.tabIcon} />
      }
      return <Image source={require('./../../assets/icon_headphones.png')} style={CommonStyles.tabIcon} />
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {
      storiesLanguage: 'EN',
      storiesType: 0,
      storiesList: [],
      isLoading: true
    }
  }
  
  selectStoriesType = (storiesType) => {
    this.setState({storiesType});
  }

  async componentWillMount() {
    const lang = await LocalStorage.getCurrentLang();
    if (lang === 'en') {
      this.setState({storiesLanguage: 'EN'});
    } else {
      this.setState({storiesLanguage: 'BG'});
    }
  }

  componentDidMount() {
    this.onInitial();
  }

  onInitial = async () => {
    const res = await getStoriesList();
    if(res.error !== undefined && res.error === true) {
      await LocalStorage.clearToken();
      this.props.navigation.navigate('LoginScreen');
    } else {
      this.setState({storiesList: res, isLoading: false});
    }
    
  }

  onVisionItem = (storyId) => {
    const { storiesList } = this.state;
    let result = storiesList.filter((item) => {
      return item.id === storyId;
    });
    if(result.length > 0) {
      this.props.navigation.navigate('PlayStoryScreen', {storyContent: result[0]});  
    }
  }

  render() {

    /* stories Type
       0 - All
       1 - Moral Stories
       2 - Inspirational
    */
    const { storiesType, storiesList, storiesLanguage, isLoading } = this.state;
    let renderStories = [];

    if(storiesList && storiesList.length > 0) {
      storiesList.map((story) => {
        if(storiesLanguage === story.lang) {
          if(storiesType === 0 || 
            (storiesType === 1 && story.type === "moral") || 
            (storiesType === 2 && story.type === "inspirational") ||
            (storiesType === 3 && story.type === "leadbyexample") ||
            (storiesType === 4 && story.type === "development")
            ) {
            let backgroundSrc = "";
            switch( story.id % 12) {
              case 0: default: backgroundSrc = story_background_1; break;
              case 1: backgroundSrc = story_background_2; break;
              case 2: backgroundSrc = story_background_3; break;
              case 3: backgroundSrc = story_background_4; break;
              case 4: backgroundSrc = story_background_5; break;
              case 5: backgroundSrc = story_background_6; break;
              case 6: backgroundSrc = story_background_7; break;
              case 7: backgroundSrc = story_background_8; break;
              case 8: backgroundSrc = story_background_9; break;
              case 9: backgroundSrc = story_background_10; break;
              case 10: backgroundSrc = story_background_11; break;
              case 11: backgroundSrc = story_background_12; break;
            }
            let min = 0, sec = 0;
            min = Math.floor(story.duration / 60);
            sec = story.duration % 60;
            if(sec > 30) {
              min += 1;
            }
            renderStories.push(
              <TouchableOpacity style={styles.visionItem} onPress={() => this.onVisionItem(story.id)} key={story.id}>
                <Image source = {backgroundSrc} style={styles.visionImage}/>
                <View style={styles.visionContent}>
                  {story.duration ? (
                    <View style={styles.textCnt}>
                      <Text style={styles.timeTxt}>{min > 0 ? min + "min": sec + "s" }</Text>
                    </View>
                  ) : null}
                  {story.title ? (
                    <View style={[styles.textCnt, styles.titleCnt]}>
                      <Text style={styles.titleTxt}>{story.title}</Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            )
          }
        }
      })
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./../../assets/stories_header.png')} style={styles.stories_header_image}></ImageBackground>
        <View style={styles.container1}>
          <View>
          <Text style={styles.headerText}>
            {i18n.t('stories.title', { language: i18n.currentLocale() })}
          </Text>
          <Text style={styles.descriptionText}>
            {i18n.t('stories.description', { language: i18n.currentLocale() })}
          </Text>
          <ScrollView style={styles.btnGroup} horizontal={true} showsHorizontalScrollIndicator={false}>
            <LinearGradient
              colors={storiesType === 0 ? ['#9caee4', '#79ead8'] : ['#ffffff00', '#ffffff00']}
              style={styles.linerGradient}
              locations={[0, 1]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <TouchableOpacity style={styles.btnContainer} onPress={() => this.selectStoriesType(0)}>
                <Text style={styles.whiteBoldText}>
                  {i18n.t('stories.all', { language: i18n.currentLocale() })}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={storiesType === 1 ? ['#9caee4', '#79ead8'] : ['#ffffff00', '#ffffff00']}
              style={styles.linerGradient}
              locations={[0, 1]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <TouchableOpacity style={styles.btnContainer} onPress={() => this.selectStoriesType(1)}>
                <Text style={styles.whiteBoldText}>
                  {i18n.t('stories.moralStories', { language: i18n.currentLocale() })}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={storiesType === 2 ? ['#9caee4', '#79ead8'] : ['#ffffff00', '#ffffff00']}
              style={styles.linerGradient}
              locations={[0, 1]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <TouchableOpacity style={styles.btnContainer} onPress={() => this.selectStoriesType(2)}>
                <Text style={styles.whiteBoldText}>
                  {i18n.t('stories.inspirational', { language: i18n.currentLocale() })}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={storiesType === 3 ? ['#9caee4', '#79ead8'] : ['#ffffff00', '#ffffff00']}
              style={styles.linerGradient}
              locations={[0, 1]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <TouchableOpacity style={styles.btnContainer} onPress={() => this.selectStoriesType(3)}>
                <Text style={styles.whiteBoldText}>
                  {i18n.t('stories.leadbyexample', { language: i18n.currentLocale() })}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={storiesType === 4 ? ['#9caee4', '#79ead8'] : ['#ffffff00', '#ffffff00']}
              style={styles.linerGradient}
              locations={[0, 1]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <TouchableOpacity style={styles.btnContainer} onPress={() => this.selectStoriesType(4)}>
                <Text style={styles.whiteBoldText}>
                  {i18n.t('stories.development', { language: i18n.currentLocale() })}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </ScrollView>
          </View>
          <ScrollView style={styles.visionContainer}>
            <View style={styles.visionList}>
              {isLoading ? (
                <View style={styles.activityContainer}>
                  <ActivityIndicator color={Colors.lightBlue} />
                </View>
              ) : (renderStories)}
            </View>
          </ScrollView>
        </View>
        
      </View>
    );
  }
}
const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  
});
export default connect(mapStateToProps, mapDispatchToProps)(StoriesScreen);
