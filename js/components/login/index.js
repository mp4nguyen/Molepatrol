
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Item, Input, Button, Icon, View, Left, Right } from 'native-base';
import { login } from '../../actions/user';
import styles from './styles';
import theme from '../../themes/base-theme';
const {
  replaceAtIndex,
  pushRoute,
} = actions;

const bg = require('../../../images/BG.png');
const logo = require('../../../images/logo.png');

class Login extends Component {

  static propTypes = {
    replaceAtIndex: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    login: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '1',
      password: '1',
    };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
    this.login = this.login.bind(this);
  }

  replaceRoute(route) {
    const navigation = this.props.navigation;
    this.props.replaceAtIndex(navigation.index, { key: route }, navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  login() {
    this.props.login(this.state).then(() => {
      this.replaceRoute('home');
    }).catch((e) => {
      console.log(e);
    });
  }
  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <View style={styles.logo}>
            <Image source={logo} style={styles.iosShadow} />
          </View>
          <View style={styles.signinContainer}>
            <Item rounded style={styles.inputGrp}>
              <Icon name="person" />
              <Input
                placeholder="Username"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                placeholderTextColor="#FFF"
                style={styles.input}
              />
            </Item>

            <Item rounded style={styles.inputGrp}>
              <Icon name="unlock" />
              <Input
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#FFF"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                style={styles.input}
              />
            </Item>

            <Button
              rounded dark block large
              style={styles.loginBtn}
              onPress={this.login}
            >
              <Text style={Platform.OS === 'android' ? { fontSize: 16, textAlign: 'center', top: -5 } : { fontSize: 16, fontWeight: '900' }}>Get Started</Text>
            </Button>

            <View style={styles.otherLinksContainer}>
              <Button transparent style={{ alignSelf: 'flex-start' }} onPress={() => this.pushRoute('signUp')}>
                <Text style={styles.helpBtns}>
                  Create Account
                      </Text>
              </Button>
              <Button transparent style={{ alignSelf: 'flex-end' }} onPress={() => this.pushRoute('needhelp')}>
                <Text style={styles.helpBtns}>
                  Forget Password?
                      </Text>
              </Button>
            </View>
          </View>
        </Image>
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    login: user => dispatch(login(user)),
    replaceAtIndex: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
