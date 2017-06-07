

import React, { Component } from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';

import {bg,logo} from '../../libs/images';


const {
  popRoute,
} = actions;
class NeedHelp extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
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

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content scrollEnabled={false} theme={theme}>
            <Image source={logo} style={Platform.OS === 'android' ? styles.aShadow : styles.iosShadow} />
            <Text style={styles.needHelpHeader}>
              FORGOT YOUR PASSWORD?
                                </Text>
            <View style={styles.needHelpContainer}>
              <Item rounded style={styles.inputGrp}>
                <Icon name="mail" />
                <Input
                  placeholder="Email" style={styles.input}
                  placeholderTextColor="#FFF"
                />
              </Item>

              <Button
                rounded block bordered
                onPress={() => this.popRoute()}
                style={styles.needHelpBtn}
              >
                <Text style={{ color: '#FFF' }}>Send Email</Text>
              </Button>

              <TouchableOpacity onPress={() => this.popRoute()}>
                <Text style={styles.termsText}>Back To Login</Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(NeedHelp);
