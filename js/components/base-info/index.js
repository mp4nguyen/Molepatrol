

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Platform, Switch } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import { Container, Content, Text, Icon, Thumbnail, Item, Input, Left, Right, Button, Header, Body } from 'native-base';
import { setInfo } from '../../actions/member';
import HeaderContent from './../headerContent/';
import StepInfo from '../step-info';
import theme from '../../themes/base-theme';
import styles from './styles';

const bg = require('../../../images/BG.png');
const headerLogo = require('../../../images/header-logo.png');

const {
  pushRoute,
  popRoute,
} = actions;
class BaseInfo extends Component {
  static defaultProps = {
    canBack: true,
    basic: {
      title: '',
      firstName: '',
      lastName: '',
      dob: null,
      gender: false,
      occupation: '',
      email: '',
    },
  }
  static propTypes = {
    submitBaseInfo: React.PropTypes.func,
    canBack: React.PropTypes.bool,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    basic: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { basic: { ...props.basic }};
    this.changeValue = this.changeValue.bind(this);
    this.submitBaseInfo = this.submitBaseInfo.bind(this);
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'signup');
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  changeValue(field, value) {
    this.setState({
      basic: {
        ...this.state.basic,
        [field]: value,
      },
    });
  }
  submitBaseInfo() {
    const { submitBaseInfo } = this.props;

    if (submitBaseInfo) {
      submitBaseInfo({ basic: this.state.basic })
        .then(this.pushRoute.bind(this, 'contactinfo'));
    } else {
      this.pushRoute('contactinfo');
    }
  }
  render() {
    const { basic } = this.state;
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Header style={styles.header} >
            <Left>
              {this.props.canBack && <Button transparent onPress={() => this.popRoute()}>
                <Icon active name="arrow-back" />
              </Button>}
            </Left>
            <Body>
              <Image source={headerLogo} style={styles.imageHeader} />
            </Body>
            <Right>
              <Button transparent onPress={this.submitBaseInfo} >
                <Icon active name="arrow-forward" />
              </Button>
            </Right>
          </Header>
          <Content scrollEnabled={false}>
            <View style={styles.content}>
              <Text style={styles.title}>
                BASIC INFO
              </Text>

              <Item rounded style={styles.inputGrp}>
                <Icon name="document" />
                <Input
                  placeholder="Title"
                  value={basic.title}
                  onChange={target => this.changeValue('title', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Firstname"
                  value={basic.firstName}
                  onChange={target => this.changeValue('firstName', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Lastname"
                  value={basic.lastName}
                  onChange={target => this.changeValue('lastName', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="calendar" />
                <Input
                  placeholder="Date Of Birth *"
                  value={basic.dob}
                  onChange={target => this.changeValue('dob', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Grid style={styles.switchGrid}>
                  <Col style={styles.textContainer}>
                    <Icon name="male" style={styles.switchIcon} />
                    <Text style={styles.switchText}>Gender</Text>
                  </Col>
                  <Col style={styles.switchContainer}>
                    <Grid>
                      <Col>
                        <Text style={styles.switchOptionText} >MALE </Text>
                      </Col>
                      <Col>
                        <Switch
                          onValueChange={value => this.changeValue('gender', value)}
                          style={styles.switch}
                          thumbTintColor="#ccc"
                          tintColor="#aaa"
                          value={basic.gender}
                        />
                      </Col>
                      <Col>
                        <Text style={styles.switchOptionText}>FEMALE</Text>
                      </Col>
                    </Grid>
                  </Col>
                </Grid>
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="star" />
                <Input
                  placeholder="Occupation"
                  value={basic.occupation}
                  onChange={target => this.changeValue('occupation', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="mail" />
                <Input
                  placeholder="Email *"
                  value={basic.email}
                  onChange={target => this.changeValue('email', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
            </View>
          </Content>
          <StepInfo text="BASIC INFO" active="1" />
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    submitBaseInfo: info => dispatch(setInfo(info)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    navigateTo: (route, signupRoute) => dispatch(navigateTo(route, signupRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  basic: state.member.member.basic,
});

export default connect(mapStateToProps, bindAction)(BaseInfo);
