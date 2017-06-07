
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Item, Input, Button, Icon, View, Left, Right,InputGroup } from 'native-base';
import { login } from '../../actions/user';
import {resetMemberToZeroForCreate} from '../../actions/member';
import {setNextPageForNewMember}  from '../../actions/nextPage';
import styles from './styles';
import theme from '../../themes/base-theme';
const {
  replaceAtIndex,
  pushRoute,
} = actions;

import {bg,logo} from '../../libs/images';


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
      username: 'phuong_thql',
      password: '1234',
      errors: {}
    };

    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
    this.login = this.login.bind(this);

    this.validator = {
      username: value => !value || _.isEmpty(value),
      password: value => !value || _.isEmpty(value)
    };
    this.validate = this.validate.bind(this)
  }

  validate() {
    const errors = {};
    let count = 0;
    _.each(_.keys(this.validator), (key) => {
      if (this.validator[key](this.state[key])) {
        count += 1;
        errors[key] = { error: true };
      }
    });

    this.setState({...this.state,errors,});

    if (count > 0) {
      return Promise.reject('Please enter all required fields !');
    }
    return Promise.resolve();
  }

  replaceRoute(route) {
    const navigation = this.props.navigation;
    this.props.replaceAtIndex(navigation.index, { key: route }, navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  login() {
      this.props.resetMemberToZeroForCreate();
      this.validate().then(() => {
          this.props.login(this.state).then(() => {
              this.replaceRoute('home');
          },(err)=>{
              alert(err);
          }).catch(alert);
      }).catch(e => alert(e));
  }
  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <View style={styles.logo}>
            <Image source={logo} style={styles.iosShadow} />
          </View>
          <View style={styles.signinContainer}>

            <InputGroup {...this.state.errors.username} rounded style={styles.inputGrp}>
              <Icon name="person" />
              <Input
                placeholder="Username"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                placeholderTextColor="#FFF"
                style={styles.input}
              />
            </InputGroup>

            <InputGroup {...this.state.errors.password} rounded style={styles.inputGrp}>
              <Icon name="unlock" />
              <Input
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#FFF"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                style={styles.input}
              />
            </InputGroup>

            <Button
              rounded dark block large
              style={styles.loginBtn}
              onPress={this.login}
            >
              <Text style={Platform.OS === 'android' ? { fontSize: 16, textAlign: 'center', top: -5 } : { fontSize: 16, fontWeight: '900' }}>Get Started</Text>
            </Button>

            <View style={styles.otherLinksContainer}>
              <Button transparent style={{ alignSelf: 'flex-start' }} onPress={() => {this.props.setNextPageForNewMember();this.props.resetMemberToZeroForCreate();this.pushRoute('signUp');}}>
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
    addToast: (message) => dispatch(addToast(message)),
    login: user => dispatch(login(user)),
    replaceAtIndex: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    resetMemberToZeroForCreate: () => dispatch(resetMemberToZeroForCreate()),
    setNextPageForNewMember: () => dispatch(setNextPageForNewMember('home')),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
