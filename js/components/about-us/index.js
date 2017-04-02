

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

const {
  popRoute,
} = actions;
class NeedHelp extends Component {

  static propTypes = {
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
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <HeaderContent />
          <Content scrollEnabled={false}>
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.textheader}>
                  ABOUT US
                                </Text>
              </View>
              <View>
                <Text style={styles.center}>
                  <Text style={styles.bold}>REDIMED </Text>
                  Total Health Solutions is an independent, privately owned,
                  West Australian based provider of specialised Injury Management and Health Services,
                  offering tailored solutions to assess, treat and manage health.
                </Text>
              </View>
              <View style={styles.mt10}>
                <Text style={styles.center}>
                  <Text style={styles.bold}>REDIMED </Text>
                  has a large team of Medical and Health Practitioners, including some of the best Plastic and Recontructive
                 Surgeons in Australia. This allow us Australia.
                </Text>
              </View>
              <View style={styles.findMore}>
                <View>
                  <Text>To find out more, visit</Text>
                  <Text style={styles.bold}>www.redimed.com.au</Text>
                </View>
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
