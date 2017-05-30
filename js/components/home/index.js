
import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Icon, Card, Left, Body, Right } from 'native-base';
import { setBackRoute, createMember } from '../../actions/member';
import { Grid, Col } from 'react-native-easy-grid';
import Swiper from 'react-native-swiper';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import navigateTo from '../../actions/sideBarNav';
const bg = require('../../../images/BG.png');
import { newLesion } from '../../actions/request';
const {
  reset,
  pushRoute,
} = actions;

const deviceWidth = Dimensions.get('window').width;
const headerLogo = require('../../../images/header-logo.png');


class Home extends Component {

  static propTypes = {
    member: React.PropTypes.object,
    newRequest: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    reset: React.PropTypes.func,
    addNewMember: React.PropTypes.func,
    setBackRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props){
    super(props);
    this.addRequest = this.addRequest.bind(this);
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  addNewMember() {
    this.props.addNewMember();
    this.props.setBackRoute('home');
    this.pushRoute('baseinfo');
  }
  addRequest() {
    //requestadvice
    const { personId, gender } = this.props.member;
    this.props.newRequest(personId, gender).then(this.pushRoute.bind(this, 'takepicture'))
  }
  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Header style={styles.header}>
            <Left>
              <Button
                transparent
                style={styles.btnHeader}
                onPress={() => this.props.reset(this.props.navigation.key)}
              >
                <Icon active name="power" />
              </Button>
            </Left>
            <Body>
              <Image source={headerLogo} style={styles.imageHeader} />
            </Body>
            <Right>
              <Button transparent style={styles.btnHeader} onPress={this.props.openDrawer} >
                <Icon active name="menu" />
              </Button>
            </Right>
          </Header>

          <View style={styles.content}>
            <View style={styles.viewContainer}>
              <Button
                rounded dark block large
                onPress={this.addRequest}
                style={styles.mainBtn}
              >
                <Icon name="document" style={styles.mainIcon} />
                <Text style={styles.mainText}>
                  REQUEST ADVICE</Text>
              </Button>

              <Button
                rounded dark block large
                style={styles.mainBtn}
                onPress={() => this.pushRoute('myrequest')}
              >
                <Icon name="document" style={styles.mainIcon} />
                <Text style={styles.mainText}>
                  TRACK MY REQUEST</Text>
              </Button>
              <Button
                onPress={() => this.addNewMember()}
                rounded dark block large
                style={styles.mainBtn}
              >
                <Icon name="document" style={styles.mainIcon} />
                <Text style={styles.mainText}>
                  NEW MEMBER</Text>
              </Button>
            </View>
            <View style={styles.otherContainer}>
              <Left style={{ marginRight: 5 }}>
                <Button
                  rounded dark block large
                  onPress={() => this.pushRoute('aboutus')}
                  style={styles.otherBtn}
                >
                  <Text style={styles.otherText}>
                    ABOUT US</Text>
                </Button>
              </Left>
              <Right style={{ marginLeft: 5 }}>
                <Button
                  rounded dark block large
                  style={styles.otherBtn}
                >
                  <Text style={styles.otherText}>
                    CALL US</Text>
                </Button>
              </Right>
            </View>
          </View>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    newRequest: (id, gender) => dispatch(newLesion(id, gender)),
    setBackRoute: (route) => dispatch(setBackRoute(route)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    openDrawer: () => dispatch(openDrawer()),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    addNewMember: () => dispatch(createMember()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  member: state.member.item,
});

export default connect(mapStateToProps, bindAction)(Home);
