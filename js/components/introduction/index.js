

import React, { Component } from 'react';
import { Image, TouchableOpacity, Platform, ImagePickerIOS } from 'react-native';
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
  pushRoute,
} = actions;
class Introduction extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.state = {
      offset: {
        x: 0,
        y: 0,
      },
    };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
  }
  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  openCamera () {
    ImagePickerIOS.canUseCamera(()=> {
      console.log(arguments)
    });
  }
  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content scrollEnabled={false}>
            <HeaderContent />
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.textheader}>
                  INTRODUCTION
                                </Text>
              </View>
              <View>
                <Text style={styles.center}>
                  Be sure to upload photos that clearly show areas that you are interested in 
                  improving. It is best to take at least 2-3 photos for each area, each from different angles,
                  removing any clothing that obstructs the area.
                </Text>
              </View>
              <View style={styles.mt20}>
                <Text style={styles.center}>
                  Allowed formats:
                </Text>
                <Text style={styles.center}>png, gif and jpeg (or jpg, jpe) </Text>
              </View>
              <Button
                rounded bordered block
                onPress={() => this.pushRoute('takepicture')}
                style={styles.nextBtn}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Next</Text>
              </Button>
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
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Introduction);
