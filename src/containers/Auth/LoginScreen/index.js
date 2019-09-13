import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DialogInput from 'react-native-dialog-input';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  findNodeHandle
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import RNRestart from 'react-native-restart';
import i18n from 'i18n-js';
import { styles } from './styles';
import { LoginInput, GradientButton } from '../../../components';
import { Colors, CommonStyles } from '../../../themes';
import {
  showAlert,
  checkEmail,
  showPrompt,
  checkPass,
  LocalStorage
} from '../../../utils';
import { AuthActions } from '../../../redux';
import { authSelector, userSelector } from '../../../redux/selector';
import Splash from '../SplashScreen';
import { forgotPassword } from '../../../service/api';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // email: 'b@gmail.com',
      // password: 'Asdf!234',
      forgotEmail: '',
      isShowForgotDialog: false,
      activeIndex: -1,
      showIndicator: false,
      showSplash: true,
      language: 'ENGLISH'
    };
    this.passwordRef = null;
    this.actionSheetRef = null;
    this.timeOut = null;
  }

  componentDidMount() {
    this.onInitial();
  }

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.auth.fetchAuth && prevProps.auth.fetchAuth) {
      this.setState({ showIndicator: false });
      if (this.props.auth.signInError && !prevProps.auth.signInError) {
        showAlert('SuccessPanda', this.props.auth.signInError);
        SplashScreen.hide();
      } else {
        this.props.navigation.navigate('MainStack');
      }
    }
  }

  showActionSheet = () => {
    this.actionSheetRef.show()
  };

  onInitial = async () => {
    const token = await LocalStorage.getToken();
    const language = await LocalStorage.getCurrentLang();
    if (language === 'en') {
      this.setState({ language: 'ENGLISH' });
    } else {
      this.setState({ language: 'БЪЛГАРСКИ' });
    }
    if (token) {
      this.props.getMe(token, true);
    } else {
      this.timeOut = setTimeout(() => {
        this.setState({ showSplash: false }, () => {
          SplashScreen.hide();
        });
      }, 1000 * 1.5);
    }
  };

  onChangeInput = (index, text) => {
    if (index === 0) {
      this.setState({ email: text });
    } else {
      this.setState({ password: text });
    }
  };

  onLogin = () => {
    const { email, password } = this.state;
    const ret = this.checkValid();
    // this.props.navigation.navigate('MainStack');
    if (ret.error) {
      showAlert('SuccessPanda', ret.msg);
    } else {
      this.setState({ showIndicator: true });
      this.props.login(email, password);
    }
  };

  onSubmitEdit = () => {
    const { email, password } = this.state;
    if (!checkEmail(email)) {
      if (!email.length) {
        return showAlert('SuccessPanda', 'Please input email.');
      }
      return showAlert('SuccessPanda', 'Email is not valid.');
    }
    this.passwordRef.focus();
  };

  checkValid = () => {
    const { email, password } = this.state;
    if (!checkEmail(email)) {
      if (!email.length) {
        return { error: true, msg: 'Please input email.' };
      }
      return { error: true, msg: 'Email is not valid.' };
    } else if (!checkPass(password)) {
      return { error: true, msg: i18n.t('login.invalidEmail', { language: i18n.currentLocale() }) };
    }
    return { error: false };
  };

  onFocus = (activeIndex, event) => {
    this.setState({ activeIndex });
    if (activeIndex === 1) {
      this.scroll.props.scrollToFocusedInput(findNodeHandle(event.target));
    }
  };

  forgotPassword = (forgotEmail) => {
    if(forgotEmail !== undefined) {
      this.setState({ forgotEmail, isShowForgotDialog: false }, async () => {
        this.setState({ showIndicator: true });
        if (checkEmail(this.state.forgotEmail)) {
          const res = await forgotPassword(forgotEmail, i18n.currentLocale().toUpperCase());
          this.setState({ showIndicator: false });
          if (res.success) {
            showAlert(
              i18n.t('forgotPassword.success', { language: i18n.currentLocale() }),
              i18n.t('forgotPassword.successDescription', { language: i18n.currentLocale() }),
            );
          } else {
            showAlert('',
              i18n.t('forgotPassword.invalidDescription', { language: i18n.currentLocale() })
            );
          }
        } else {
          showAlert('',
            i18n.t('forgotPassword.invalidDescription', { language: i18n.currentLocale() })
          );
        }
      });
    } else {
      showAlert('',
        i18n.t('forgotPassword.invalidDescription', { language: i18n.currentLocale() })
      );
    }
  };

  hideForgotDialog = () => {
    this.setState({ isShowForgotDialog: false });
  };

  showForgotDialog = () => {
    if (Platform.OS === 'ios') {
      showPrompt(
        i18n.t('forgotPassword.forgotPassword', { language: i18n.currentLocale() }),
        i18n.t('forgotPassword.description', { language: i18n.currentLocale() }),
        i18n.t('forgotPassword.cancel', { language: i18n.currentLocale() }),
        i18n.t('forgotPassword.send', { language: i18n.currentLocale() }),
        this.forgotPassword
      )
    } else {
      this.setState({ forgotEmail: '', isShowForgotDialog: true });
    }
  };

  onChangeLanguage = async (index) => {
    switch (index) {
      case 0:
        await LocalStorage.setLanguage('en');
        i18n.locale = 'en';
        break;
      case 1:
        await LocalStorage.setLanguage('bg');
        i18n.locale = 'bg';
        break;
      default:
        break;
    }
    RNRestart.Restart();
  };

  renderActivity = () => (
    <View style={CommonStyles.activityContainer}>
      <ActivityIndicator color={Colors.lightBlue} />
    </View>
  );

  render() {
    const { isShowForgotDialog, activeIndex, email, password, showIndicator, language, showSplash } = this.state;
    if (showSplash) {
      return <Splash />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          innerRef={ref => this.scroll = ref}
        >
          <View style={styles.subContainer}>
            <TouchableOpacity style={styles.langContainer} onPress={this.showActionSheet}>
              <Text style={styles.grayBoldText}>
                {language}
              </Text>
            </TouchableOpacity>
            <Image source={require('../../../assets/icon_logo.png')} style={styles.iconLogo} />
            <View style={styles.inputFormsContainer}>
              <LoginInput
                placeholder={i18n.t('login.email', { language: i18n.currentLocale() })}
                color={Colors.darkBlack}
                onChangeText={(text) => this.onChangeInput(0, text)}
                icon={require('../../../assets/icon_user.png')}
                keyboardType="email-address"
                onFocus={(event) => this.onFocus(0, event)}
                value={email}
                onSubmitEditing={this.onSubmitEdit}
                returnKeyType="go"
                autoCapitalize="none"
              />
              <LoginInput
                placeholder={i18n.t('login.password', { language: i18n.currentLocale() })}
                color={Colors.darkBlack}
                onChangeText={(text) => this.onChangeInput(1, text)}
                icon={require('../../../assets/icon_password.png')}
                autoCapitalize="none"
                secureTextEntry={true}
                onFocus={(event) => this.onFocus(1, event)}
                value={password}
                onSubmitEditing={this.onLogin}
                returnKeyType="done"
                textRef={ref => this.passwordRef = ref}
              />
            </View>
            <TouchableOpacity onPress={this.showForgotDialog}>
              <Text style={styles.grayText}>
                {i18n.t('login.forgotPassword', { language: i18n.currentLocale() })}
              </Text>
            </TouchableOpacity>
            <GradientButton
              label={i18n.t('login.login', { language: i18n.currentLocale() })}
              onPress={this.onLogin}
              style={styles.buttonContainer}
            />
          </View>
        </KeyboardAwareScrollView>
        <DialogInput
          isDialogVisible={isShowForgotDialog}
          title={i18n.t('forgotPassword.forgotPassword', { language: i18n.currentLocale() })}
          message={i18n.t('forgotPassword.description', { language: i18n.currentLocale() })}
          hintInput ={i18n.t('forgotPassword.email', { language: i18n.currentLocale() })}
          submitInput={this.forgotPassword}
          closeDialog={this.hideForgotDialog}
          textInputProps={{ autoCorrect: false }}
          modalStyle={{ backgroundColor: 'transparent' }}
          cancelText={i18n.t('forgotPassword.cancel', { language: i18n.currentLocale() })}
          submitText={i18n.t('forgotPassword.send', { language: i18n.currentLocale() })}
        />
        {showIndicator && this.renderActivity()}
        <ActionSheet
          ref={ref => this.actionSheetRef = ref}
          title={i18n.t('accountSettings.chooseLang', { language: i18n.currentLocale() })}
          options={['ENGLISH', 'БЪЛГАРСКИ', 'Cancel']}
          cancelButtonIndex={2}
          onPress={this.onChangeLanguage}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  ...authSelector(state),
  ...userSelector(state),
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(AuthActions.signIn(email, password)),
  getMe: (token, directCall) => dispatch(AuthActions.getMe(token, directCall))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
