import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Text, TextInput, View, Alert, Platform, ActivityIndicator, findNodeHandle, TouchableOpacity } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputScrollView from 'react-native-input-scroll-view';
import ConfettiCannon from 'react-native-confetti-cannon';
import get from 'lodash/get';
import i18n from 'i18n-js';
import { styles } from './styles';
import { SubHeader, BlueCheckButton } from '../../components';
import { Colors, CommonStyles } from '../../themes';
import { logFlurryEvent, showAlert, showPromptWithCancel, LocalStorage } from '../../utils';
import { statementSelector } from '../../redux/selector';
import { StatementActions } from '../../redux';
import { getStatementById, updateStatement } from '../../service/api';

class EditStatementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statementName: '',
      isShowDialog: false,
      showIndicator: false,
      statementText: '',
      textareaHeight: null,
      showConfetti: false
    }
  }

  componentDidMount() {
    this.onInitial();
  }

  async componentDidUpdate(prevProps) {
    if (!this.props.statement.fetchStatement && prevProps.statement.fetchStatement) {
      this.setState({ showIndicator: false });
      if (this.props.statement.fetchStatementError) {
        if(this.props.statement.fetchStatementError.error !== undefined && this.props.statement.fetchStatementError.error) {
          await LocalStorage.clearToken();
          this.props.navigation.navigate('LoginScreen');
        } else {
          showAlert('SuccessPanda', this.props.statement.fetchStatementError, this.onBack);
        }
      } else {
        this.setState({ showConfetti: true }, this.onTimeOut);
      }
    }
  }

  onTimeOut = () => {
    this.timeOut = setTimeout(() => {
      clearTimeout(this.timeOut);
      this.onBack();
    }, 1000 * 3.5);
  };

  onInitial = async () => {
    const { navigation } = this.props;
    const index = get(navigation, 'state.params.index', 0);
    const statementId = get(navigation, 'state.params.statementId', 0);
    if (index === 0) {
      this.setState({ showIndicator: true });
      const res = await getStatementById(statementId, i18n.currentLocale().toUpperCase() );
      this.setState({ showIndicator: false });
      if (res && res.id) {
        this.setState({ statementText: res.text });
      } else {
        if(res.error !== undefined && res.error) {
          await LocalStorage.clearToken();
          this.props.navigation.navigate('LoginScreen');
        } else {
          showAlert('SuccessPanda', 'Failure to get the existing statement');
        }
      }
    }
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onCreateStatement = (statementName) => {
    const { statementText } = this.state;

    this.setState({ showIndicator: true, isShowDialog: false });
    logFlurryEvent('CreateNewStatement');
    this.props.createNewStatement(statementName, statementText, i18n.currentLocale().toUpperCase());
  };

  onUpdateTemplate = async () => {
    const { statementText } = this.state;
    const { navigation } = this.props;

    const statementId = get(navigation, 'state.params.statementId', 0);
    const title = get(navigation, 'state.params.title', 0);
    this.setState({ showIndicator: true });
    const res = await updateStatement(statementId, title, statementText);
    logFlurryEvent('UpdateStatement');
    if (res && res.id) {
      if (res.chosen) {
        this.props.getActiveStatement();
      } else {
        this.setState({ showConfetti: true, showIndicator: false }, this.onTimeOut);
      }
    } else {
      this.setState({ showIndicator: false });
      if(res.error !== undefined && res.error) {
        await LocalStorage.clearToken();
        this.props.navigation.navigate('LoginScreen');
      } else {
        showAlert('SuccessPanda', 'Failure to update the statement. Please try again later.', this.onBack);
      }
    }
  };

  hideDialog = () => {
    this.setState({ statementName: '', isShowDialog: false });
  };

  onCheck = () => {
    const { navigation } = this.props;
    const index = get(navigation, 'state.params.index', 0);
    if (index === 0) {
      return this.onUpdateTemplate();
    }
    if (Platform.OS === 'ios') {
      showPromptWithCancel(
        i18n.t('statements.nameInputTitle', { language: i18n.currentLocale() }),
        '',
        i18n.t('statements.done', { language: i18n.currentLocale() }),
        this.onCreateStatement
      );
    } else {
      this.setState({ statementName: '', isShowDialog: true });
    }
  };

  onChangeStatement = (statementText) => {
    this.setState({ statementText });
  };

  _onContentSizeChange = ({ nativeEvent: event }) => {
    this.setState({ textareaHeight: event.contentSize.height });
  };

  renderActivity = () => (
    <View style={CommonStyles.activityContainer}>
      <ActivityIndicator color={Colors.lightBlue} />
    </View>
  );

  render() {
    const { isShowDialog, showIndicator, statementText, textareaHeight, showConfetti } = this.state;
    const { navigation } = this.props;
    const index = get(navigation, 'state.params.index', 0);
    let title = get(navigation, 'state.params.title', 0);
    const isDefault = get(navigation, 'state.params.isDefault', false);
    let description = i18n.t('statements.scratchDescription', { language: i18n.currentLocale() });
    if (index === 0) {
      if (!isDefault) {
        description = title;
        title = i18n.t('statements.userTemplateTitle', { language: i18n.currentLocale() });
      } else {
        description = i18n.t('statements.templateDescription', { language: i18n.currentLocale() });
      }
    }
    let descriptionStyle = styles.headerText;
    if (index === 0 && !isDefault) {
      descriptionStyle = [descriptionStyle, { textAlign: 'center' }]
    }
    return (
      <SafeAreaView style={styles.container}>
        <SubHeader onBack={this.onBack} label={title.toUpperCase()} />
        <InputScrollView style={styles.container} multilineInputStyle={styles.multilineInput}>
          <Text style={descriptionStyle}>
            {description}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { height: textareaHeight }]}
              placeholder={i18n.t('statements.placeholder', { language: i18n.currentLocale() })}
              placeholderTextColor={Colors.lightGray}
              multiline={true}
              value={statementText}
              onChangeText={this.onChangeStatement}
              onContentSizeChange={this._onContentSizeChange}
            />
          </View>
          <BlueCheckButton
            style={styles.btnContainer}
            icon={require('../../assets/icon_check.png')}
            onPress={this.onCheck}
          />
        </InputScrollView>
        <DialogInput
          isDialogVisible={isShowDialog}
          title={i18n.t('statements.nameInputTitle', { language: i18n.currentLocale() })}
          message=""
          hintInput ={i18n.t('statements.placeholderInput', { language: i18n.currentLocale() })}
          submitInput={this.onCreateStatement}
          closeDialog={this.hideDialog}
          textInputProps={{ autoCorrect: false }}
          modalStyle={{ backgroundColor: 'transparent' }}
          cancelText={i18n.t('forgotPassword.cancel', { language: i18n.currentLocale() })}
          submitText={i18n.t('statements.done', { language: i18n.currentLocale() })}
        />
        {showIndicator && this.renderActivity()}
        {showConfetti &&
        <ConfettiCannon
          count={Platform.OS === 'ios' ? 150 : 100}
          origin={{x: -10, y: 0}}
          explosionSpeed={50}
          fadeOut
          fallSpeed={3000}
        />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  ...statementSelector(state),
});

const mapDispatchToProps = dispatch => ({
  createNewStatement: (title, text, lang) =>
    dispatch(StatementActions.createNewStatement(title, text, lang)),
  getActiveStatement: () => dispatch(StatementActions.getActiveStatement())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStatementScreen);
