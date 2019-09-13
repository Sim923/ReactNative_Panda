import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import {View, Text, Image, TouchableOpacity, ScrollView, TouchableHighlight, ActivityIndicator} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import _, { isEqual } from 'lodash';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import { styles } from './styles';
import { Header } from '../../components';
import { statementSelector } from '../../redux/selector';
import { StatementActions } from '../../redux';
import { Colors, CommonStyles } from '../../themes';
import { LocalStorage } from '../../utils';

class StatementScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor, focused }) => {
      if (focused) {
        return <Image source={require('./../../assets/icon_quill_active.png')} style={CommonStyles.tabIcon} />
      }
      return <Image source={require('./../../assets/icon_quill.png')} style={CommonStyles.tabIcon} />
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      defaultStatements: [],
      userStatements: [],
      showIndicator: false,
      statements: [{
        title: i18n.t('statements.startScratch', { language: i18n.currentLocale() }),
        disableRightSwipe: true
      }]
    };
    this.openRowRefs = [];
    this.swipeListView = null;
  }

  componentDidMount() {
    this.onInitial();
  }

  async componentDidUpdate(prevProps) {
    if (!this.props.statement.fetchStatement && prevProps.statement.fetchStatement) {
      this.setStatements(this.props.statement.allStatements);
      this.setState({ showIndicator: false });
    }
  }

  onInitial = () => {
    this.setState({ showIndicator: true });
    this.props.getAllStatements(i18n.currentLocale().toUpperCase());
  };

  setStatements = (allStatements) => {
    const statements = _.cloneDeep(allStatements);
    this.closeAllOpenRows();
    statements.push({
      title: i18n.t('statements.startScratch', { language: i18n.currentLocale() }),
      disableLeftSwipe: true
    });
    for (let index = 0; index < statements.length; index += 1) {
      if (statements[index].default) {
        statements[index].disableLeftSwipe = true;
      }
    }
    this.setState({ statements });
  };

  onActive = (item) => {
    if (!item.chosen) {
      this.setState({ showIndicator: true });
      this.props.selectStatement(item.id, i18n.currentLocale().toUpperCase());
    }
  };

  onDelete = (item) => {
    this.setState({ showIndicator: true });
    this.props.deleteStatement(item.id, item.chosen, i18n.currentLocale().toUpperCase());
  };

  onTemplate = (item, index) => {
    const { statements } = this.state;
    if (index === statements.length - 1) {
      return this.props.navigation.navigate('EditStatementScreen', {
        index: 1,
        title: i18n.t('statements.newStatement', { language: i18n.currentLocale() }),
        isDefault: false,
      });
    }
    this.props.navigation.navigate('EditStatementScreen', {
      index: 0,
      title: item.title,
      isDefault: item.default,
      statementId: item.id
    });
  };

  onRowDidOpen = (rowKey, rowMap) => {
    this.openRowRefs.push(rowMap[rowKey]);
  };

  closeAllOpenRows = () => {
    this.openRowRefs.forEach(ref => {
      ref.closeRow && ref.closeRow();
    });
  };

  renderItem = ({ item, index }) => {
    const { statements } = this.state;
    let icon = require('../../assets/icon_dreaming.png');
    if (!item.default) {
      icon = require('../../assets/icon_edit.png');
    }
    if (index === statements.length - 1) {
      icon = require('../../assets/icon_route.png');
    }
    let homeIcon = require('../../assets/icon_home_active.png');
    if (!item.chosen) {
      homeIcon = require('../../assets/icon_home_inactive.png');
    }
    return (
      <View style={styles.rowFront}>
        <View style={styles.rowMainContainer}>
          <TouchableOpacity
            style={styles.rowMainSubContainer}
            onPress={() => this.onTemplate(item, index)}
            activeOpacity={1}
          >
            <View style={styles.statementIconContainer}>
              <Image source={icon} style={styles.statementIcon} />
            </View>
            <Text style={styles.statementTitleText} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
          {index !== statements.length - 1 && <TouchableOpacity style={styles.iconContainer} onPress={() => this.onActive(item)}>
            <Image source={homeIcon} style={styles.homeIcon} />
          </TouchableOpacity>}
        </View>
      </View>
    );
  };

  renderTrashIcon = ({ item, index }) => {

    return (
      <View style={styles.rowBack}>
        <TouchableOpacity style={styles.mainTrashContainer} onPress={() => this.onDelete(item)}>
          <Image source={require('../../assets/icon_trash.png')} style={styles.trashIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  renderActivity = () => (
    <View style={CommonStyles.activityContainer}>
      <ActivityIndicator color={Colors.lightBlue} />
    </View>
  );

  render() {
    const { statements, showIndicator } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          label={i18n.t('statements.title', { language: i18n.currentLocale() })}
        />
        <Text style={styles.headerText}>
          {i18n.t('statements.description', { language: i18n.currentLocale() })}
        </Text>
        <View style={styles.mainContainer}>
          <SwipeListView
            useFlatList
            data={statements}
            renderItem={this.renderItem}
            renderHiddenItem={this.renderTrashIcon}
            rightOpenValue={-70}
            disableRightSwipe
            closeOnRowBeginSwipe
            closeOnRowOpen={true}
            closeOnRowPress
            closeOnScroll
            keyExtractor={(item, i) => `key - ${i}`}
            ref={ref => this.swipeListView = ref}
            onRowDidOpen={this.onRowDidOpen}
          />
        </View>
        {showIndicator && this.renderActivity()}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  ...statementSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getAllStatements: (lang) => dispatch(StatementActions.getAllStatements(lang)),
  selectStatement: (id, lang) => dispatch(StatementActions.selectStatement(id, lang)),
  deleteStatement: (id, isActive, lang) => dispatch(StatementActions.deleteStatement(id, isActive, lang))
});
export default connect(mapStateToProps, mapDispatchToProps)(StatementScreen);
