import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Text, View, Alert, Platform, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { styles } from './styles';

import Sound from 'react-native-sound';
import Slider from "react-native-slider";

class PlayStoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePath: "",
      storyTitle: "",
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0
    }
    this.sliderEditing = false;
  }

  async componentWillMount() {
    const { navigation } = this.props;
    const storyContent = get(navigation, 'state.params.storyContent', 0);
    if(storyContent && storyContent.storagePath) {
      this.setState({ storagePath: storyContent.storagePath });
      this.setState({ storyTitle: storyContent.title });
      
      // Enable playback in silence mode
      Sound.setCategory('Playback');

      this.sound = new Sound(storyContent.storagePath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({playState:'paused'});
        } else {
          if(this.sound) {
            this.setState({playState:'playing', duration:this.sound.getDuration()});
            this.sound.play(this.playComplete);
          }
        }
      });    
    }
  }

  componentDidMount() {
    // this.play();
        
    this.timeout = setInterval(() => {
      if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds:seconds});
        })
      }
    }, 100);
  }

  componentWillUnmount(){
    if(this.sound){
      this.sound.release();
      this.sound = null;
    }
    if(this.timeout){
      clearInterval(this.timeout);
    }
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  }
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  }
  onSliderEditing = value => {
    if(this.sound){
      this.sound.setCurrentTime(value);
      this.setState({playSeconds:value});
    }
  }

  play = async () => {
    if(this.sound){
      this.sound.play(this.playComplete);
      this.setState({playState:'playing'});
    } else {
      const filepath = this.state.storagePath;
      console.log('[Play]', filepath);

      if(this.sound) {
        this.setState({playState:'playing'});
        this.sound.play(this.playComplete);
      }
    }
  }

  playComplete = (success) => {
    if(this.sound){
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({playState:'paused', playSeconds:0});
      this.sound.setCurrentTime(0);
    }
  }

  pause = () => {
    if(this.sound){
      this.sound.pause();
    }
    this.setState({playState:'paused'});
  }

  jumpPrev15Seconds = () => {this.jumpSeconds(-15);}
  jumpNext15Seconds = () => {this.jumpSeconds(15);}
  jumpSeconds = (secsDelta) => {
    if(this.sound){
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if(nextSecs < 0) nextSecs = 0;
        else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
        this.sound.setCurrentTime(nextSecs);
        this.setState({playSeconds:nextSecs});
      })
    }
  }

  getAudioTimeString(seconds){
    const m = parseInt(seconds%(60*60)/60);
    const s = parseInt(seconds%60);

    return m + ':' + (s<10?'0'+s:s);
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { playState, storagePath, storyTitle } = this.state;
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);

    return (
      <View style={styles.container}>
        <ImageBackground source={require('./../../assets/story_player_screen.png')} style={styles.stories_header_image}/>
        <View style={styles.container1}>
          <TouchableOpacity style={styles.menuIconContainer} onPress={this.onBack}>
            <Image source={require('./../../assets/story_icon_back.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.titleTxt}>{storyTitle}</Text>
          </View>
          <View style={styles.audioContainer}>
            <View style={styles.playContainer}>
              <TouchableOpacity style={styles.prevContainer} onPress={this.jumpPrev15Seconds}>
                <Image style={styles.prevIcon} source={require('./../../assets/icon_backwards_play.png')}/>
              </TouchableOpacity>
              {playState === "playing" ? (
                <TouchableOpacity style={styles.playStateContainer} onPress={this.pause}>
                  <Image style={styles.playIcon} source={require('./../../assets/icon_story_pause.png')}/>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.playStateContainer} onPress={this.play}>
                  <Image style={styles.playIcon} source={require('./../../assets/icon_story_play.png')}/>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.prevContainer} onPress={this.jumpNext15Seconds}>
                <Image style={styles.nextIcon} source={require('./../../assets/icon_forward_play.png')}/>
              </TouchableOpacity>
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.timeState}>
                <Text style={styles.timeTxt}>{currentTimeString}</Text>
                <Text style={styles.timeTxt}>{durationString}</Text>
              </View>
              <Slider
                onTouchStart={this.onSliderEditStart}
                onTouchEnd={this.onSliderEditEnd}
                onValueChange={this.onSliderEditing}
                style={styles.slider}
                trackStyle={styles.trackStyle}
                value={this.state.playSeconds} 
                maximumValue={this.state.duration} 
                maximumTrackTintColor='#BDBEBE' 
                minimumTrackTintColor='#282451' 
                thumbTintColor='#282451'              
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayStoryScreen);
