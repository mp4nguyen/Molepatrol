

import React, { Component } from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { createUser,checkAvailableAccount } from '../../actions/user';
import { changeValueMember } from '../../actions/member';

import { Container, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import { setBackRoute } from '../../actions/member';
import styles from './styles';
import _ from 'lodash';
const bg = require('../../../images/BG.png');
const logo = require('../../../images/header-logo.png');

const {
  reset,
  pushRoute,
  popRoute,
  replaceAtIndex,
} = actions;

class SignUp extends Component {


  static propTypes = {
    addToast: React.PropTypes.func,
    reset: React.PropTypes.func,
    setBackRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    createUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    changeValueMember: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      info: {
        username: '',
        password: '',
        email: '',
      },
      errors: {} };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
    this.validator = {
      username: value => !value || _.isEmpty(value),
      password: value => !value || _.isEmpty(value),
      repassword: value => !value || _.isEmpty(value),
      email: value => !value || _.isEmpty(value),
    };
    this.changeValue = this.changeValue.bind(this);
    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  resetRoute(route) {
    this.props.resetRoute(route);
  }
  signUpSuccess(route) {
    const { navigation, replaceAt, pushToRoute, setBackRoute } = this.props;
    //setBackRoute('home');
    //replaceAt(navigation.index, { key: 'home' }, navigation.key);
    pushToRoute({ key: route, index: 1 }, navigation.key);
  }
  changeValue(input) {
    const that = this;
    return (target) => {
      this.props.changeValueMember("signup",input,target.nativeEvent.text);
    };
  }
  validate() {
    const errors = {};
    let count = 0;
    _.each(_.keys(this.validator), (key) => {
      if (this.validator[key](this.props.signup[key])) {
        count += 1;
        errors[key] = { error: true };
      }
    });
    this.setState({
      ...this.state,
      errors,
    });
    if (count > 0) {
      return Promise.reject('Please enter all required fields !');
    }
    return Promise.resolve();
  }
  submit() {
    console.log("submit.........");

    //this.signUpSuccess('signupbaseinfo')
    this.validate().then(() => {    
        this.props.checkAvailableAccount(this.props.signup).then(res=>{this.signUpSuccess('signupbaseinfo')},err=>alert(err))
    }).catch(e => alert(e));

    // this.validate().then(() => {
    //   this.props.createUser(this.state.info)
    //     .then(this.signUpSuccess.bind(this, 'signupbaseinfo'))
    //     .catch((error) => {
    //       alert('Failed');
    //     });
    // }).catch(e => alert(e));
  }
  render() {

    //value={this.state.info.username}
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
              <InputGroup {...this.state.errors.username} rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  value={this.props.signup.username}
                  onChange={this.changeValue('username')}
                  placeholder="Username *" style={styles.input}
                  placeholderTextColor="#FFF"
                />
              </InputGroup>

              <InputGroup {...this.state.errors.email} rounded style={styles.inputGrp}>
                <Icon name="mail-open" />
                <Input
                  value={this.props.signup.email}
                  onChange={this.changeValue('email')}
                  placeholder="Email *" style={styles.input}
                  placeholderTextColor="#FFF"
                />
              </InputGroup>

              <InputGroup {...this.state.errors.password} rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  value={this.props.signup.password}
                  onChange={this.changeValue('password')}
                  placeholder="Password *" secureTextEntry style={styles.input}
                  placeholderTextColor="#FFF"
                />
              </InputGroup>
              <InputGroup {...this.state.errors.repassword} rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  value={this.props.signup.repassword}
                  onChange={this.changeValue('repassword')}
                  placeholder="Re-password *" secureTextEntry style={styles.input}
                  placeholderTextColor="#FFF"
                />
              </InputGroup>
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

              <TouchableOpacity onPress={() => this.popRoute()}>
                <Text style={styles.termsText}>Back To Login</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Image>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    addToast: message => dispatch(addToast(message)),
    setBackRoute: route => dispatch(setBackRoute(route)),
    replaceAt: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
    createUser: user => dispatch(createUser(user)),
    pushToRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    changeValueMember:(page,fieldName,value) => dispatch(changeValueMember(page,fieldName,value)),
    checkAvailableAccount:(accountInfo) => dispatch(checkAvailableAccount(accountInfo)),

  };
}


//

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  signup: state.member.member.signup
});

export default connect(mapStateToProps, bindAction)(SignUp);
