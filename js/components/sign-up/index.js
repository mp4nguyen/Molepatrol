

import React, { Component } from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { createUser } from '../../actions/user'
import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';
import { setBackRoute } from '../../actions/member';
import styles from './styles';
const bg = require('../../../images/BG.png');
const logo = require('../../../images/logo.png');

const {
  reset,
  pushRoute,
  replaceAtIndex,
} = actions;

class SignUp extends Component {


  static propTypes = {
    addToast: React.PropTypes.func,
    reset: React.PropTypes.func,
    setBackRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    createUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
    this.changeValue = this.changeValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  resetRoute(route) {
    this.props.resetRoute(route);
  }
  signUpSuccess(route) {
    const { navigation, replaceAt, pushToRoute, setBackRoute } = this.props;
    setBackRoute('home');
    replaceAt(navigation.index, { key: 'home' }, navigation.key);
    pushToRoute({ key: route, index: 1 }, navigation.key);
  }
  changeValue(input) {
    const that = this;
    return (target) => {
      that.setState({
        ...that.state,
        [input]: target.nativeEvent.text,
      });
    };
  }
  submit () {
    this.props.createUser(this.state)
      .then(this.signUpSuccess.bind(this, 'signupbaseinfo'))
      .catch((error) => {
       
      });
  }
  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <View style={styles.logo}>
            <Image source={logo} style={styles.iosShadow} />
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupHeader}>
              CREATE ACCOUNT
                                </Text>
            <View >
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  value={this.state.username}
                  onChange={this.changeValue('username')}
                  placeholder="Username" style={styles.input}
                  placeholderTextColor="#FFF"
                />
              </Item>

              <Item rounded style={styles.inputGrp}>
                <Icon name="mail-open" />
                <Input
                  value={this.state.email}
                  onChange={this.changeValue('email')}
                  placeholder="Email" style={styles.input}
                  placeholderTextColor="#FFF"
                />
              </Item>

              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  value={this.state.password}
                  onChange={this.changeValue('password')}
                  placeholder="Password" secureTextEntry style={styles.input}
                  placeholderTextColor="#FFF"
                />
              </Item>
            </View>
            <View>
              <Button
                rounded bordered block
                onPress={this.submit}
                style={styles.signupBtn}
              >
                <Text style={{ color: '#FFF' }}>Continue</Text>
              </Button>

              <Button block transparent style={{ marginTop: 10 }}>
                <Text style={styles.termsText}>Terms & Conditions</Text>
              </Button>
            </View>
          </View>
        </Image>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    addToast: (message) => dispatch(addToast(message)),
    setBackRoute: (route) => dispatch(setBackRoute(route)),
    replaceAt: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
    createUser: (user) => dispatch(createUser(user)),
    pushToRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SignUp);
