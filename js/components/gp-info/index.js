

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Platform, Switch } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import { Container, Content, Text, Icon, Thumbnail, Item, Input, Left, Right, Button, Header, Body } from 'native-base';
import { createMember, setInfo } from '../../actions/member';
import HeaderContent from './../headerContent/';
import _ from 'lodash';
import theme from '../../themes/base-theme';
import styles from './styles';
import StepInfo from '../step-info';
const bg = require('../../../images/BG.png');
const headerLogo = require('../../../images/header-logo.png');

const {
  reset,
  replaceAtIndex,
  pushRoute,
  popRoute,
} = actions;
class GPInfo extends Component {
  static defaultProps = {
    gp: {
      firstName: '',
      lastName: '',
      clinic: '',
      contactNumber: '',
      state: '',
      country: '',
    },
  }
  static propTypes = {
    replaceAtIndex: React.PropTypes.func,
    backToRoute: React.PropTypes.string,
    member: React.PropTypes.object,
    createMember: React.PropTypes.func,
    setInfo: React.PropTypes.func,
    reset: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    gp: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      gp: props.gp,
    };
    this.changeValue = this.changeValue.bind(this);
    this.submitMember = this.submitMember.bind(this);
  }
  resetRoute() {
    this.props.reset(this.props.navigation.key);
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'signup');
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  changeValue(field, value) {
    this.setState({
      gp: {
        ...this.state.gp,
        [field]: value,
      },
    });
  }
  submitMember() {
    const { setInfo, createMember, replaceAtIndex, navigation, member, backToRoute } = this.props;
    if (setInfo) {
      const index = _.findIndex(navigation.routes, { key: backToRoute });
      createMember({ gp: this.state, ...member })
        .then(() => {
          for (let i = index; i < navigation.routes.length - 1; i++) {
            this.popRoute();
          }
        })
        .catch(err => window.alert(err));
    } else {
      reset(navigation.key);
    }
  }
  render() {
    const { gp } = this.state;
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Header style={styles.header} >
            <Left>
              <Button transparent onPress={() => this.popRoute()}>
                <Icon active name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Image source={headerLogo} style={styles.imageHeader} />
            </Body>
            <Right />
          </Header>
          <Content scrollEnabled={false}>
            <View style={styles.content}>
              <Text style={styles.title}>
                GP INFORMATION
            </Text>

              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="GP Firstname"
                  value={gp.firstName}
                  onChange={target => this.changeValue('firstName', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="GP Lastname"
                  value={gp.lastName}
                  onChange={target => this.changeValue('lastName', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Clinic Name/ Address"
                  value={gp.clinic}
                  onChange={target => this.changeValue('clinic', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="phone-portrait" />
                <Input
                  placeholder="Contact Number"
                  value={gp.contactNumber}
                  onChange={target => this.changeValue('contactNumber', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
              <Text style={styles.title}>
                MEDICARE INFORMATION
            </Text>
              <Item rounded style={styles.inputGrp}>
                <Icon name="star" />
                <Input
                  placeholder="State *"
                  value={gp.state}
                  onChange={target => this.changeValue('state', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="mail" />
                <Input
                  placeholder="Country *"
                  value={gp.country}
                  onChange={target => this.changeValue('country', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>

              <Button
                rounded dark block large
                style={styles.submitBtn}
                onPress={this.submitMember}
              >
                <Text style={Platform.OS === 'android' ? { fontSize: 16, textAlign: 'center', top: -5 } : { fontSize: 16, fontWeight: '900' }}>Submit</Text>
              </Button>
            </View>
          </Content>
          <StepInfo text="GP & MEDICARE INFORMATION" active="3" />
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAtIndex: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
    setInfo: info => dispatch(setInfo(info)),
    createMember: member => dispatch(createMember(member)),
    reset: (key, route) => dispatch(reset([{ key: route }], key, 0)),
    pushRoute: route => dispatch(pushRoute(route)),
    popRoute: key => dispatch(popRoute(key)),
    navigateTo: (route, signupRoute) => dispatch(navigateTo(route, signupRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  member: state.member.member,
  backToRoute: state.member.backToRoute,
  gp: state.member.member.gp,
});

export default connect(mapStateToProps, bindAction)(GPInfo);
