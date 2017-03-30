

import React, { Component } from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Left, Right, Body } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import HeaderContent from '../headerContent';

const bg = require('../../../images/BG.png');
const headerLogo = require('../../../images/header-logo.png');

const {
  popRoute,
} = actions;
class NeedHelp extends Component {
  static defaultProps = {
    item: {
      urgent: '',
      nonUrgent: '',
    },
  }
  static propTypes = {
    item: React.PropTypes.object,
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    const { urgent, nonUrgent } = this.props.item;
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content scrollEnabled={false}>
            <HeaderContent />
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.textheader}>
                  TREATMENT ADVICE
                                </Text>
              </View>
              <View>
                <Text style={styles.bold}>URGENT</Text>
                <Text>
                  {urgent && urgent}
                </Text>
              </View>
              <View style={styles.mt20}>
                <Text style={styles.bold}>NON - URGENT</Text>
                <Text>
                  {nonUrgent && nonUrgent}
                </Text>
              </View>
            </View>
          </Content>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(NeedHelp);
