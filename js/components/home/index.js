
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

import { newLesion } from '../../actions/request';
import {resetSetPage} from '../../actions/nextPage';
import {setQuestionareProps,setSelectLesionProps,setTakePictureProps} from '../../actions/pageControl';

const {
  reset,
  pushRoute,
} = actions;

const deviceWidth = Dimensions.get('window').width;
import {bg,headerLogo} from '../../libs/images';


class Home extends Component {

  static propTypes = {
    member: React.PropTypes.object,
    newRequest: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    reset: React.PropTypes.func,
    addNewMember: React.PropTypes.func,
    setBackRoute: React.PropTypes.func,
    resetSetPage: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props){
    super(props);
    this.addNewMember = this.addNewMember.bind(this);
    this.addRequest = this.addRequest.bind(this);
    this.trackRequests = this.trackRequests.bind(this);
    this.logout = this.logout.bind(this);
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  addNewMember() {
    this.props.addNewMember();
    this.props.resetToHome(this.props.navigation.key)
    this.pushRoute('baseinfo');
  }
  addRequest() {
    //requestadvice
    this.props.resetToHome(this.props.navigation.key)
    this.props.setQuestionareProps('isBack',true);
    this.props.setSelectLesionProps('isBack',true);
    this.props.setTakePictureProps('isCancel',false);    
    const { personId,patientId, gender } = this.props.member;
    this.props.resetSetPage();
    this.props.newRequest(personId, patientId,gender).then(this.pushRoute.bind(this, 'requestadvice'))
  }
  trackRequests(){
    this.props.resetToHome(this.props.navigation.key)
    this.pushRoute('myrequest');
  }

  logout(){
    this.props.reset(this.props.navigation.key)
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
                onPress={this.logout }
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
                onPress={this.trackRequests}
              >
                <Icon name="document" style={styles.mainIcon} />
                <Text style={styles.mainText}>
                  TRACK MY REQUEST</Text>
              </Button>
              <Button
                onPress={this.addNewMember}
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
    newRequest: (personId,patientId, gender) => dispatch(newLesion(personId, patientId,gender)),
    setBackRoute: (route) => dispatch(setBackRoute(route)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    openDrawer: () => dispatch(openDrawer()),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    resetToHome: key => dispatch(reset([{ key: 'home' }], key, 0)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    addNewMember: () => dispatch(createMember()),
    resetSetPage: () => dispatch(resetSetPage()),
    setQuestionareProps: (propName,propValue) => dispatch(setQuestionareProps({propName,propValue})),
    setSelectLesionProps: (propName,propValue) => dispatch(setSelectLesionProps({propName,propValue})),
    setTakePictureProps: (propName,propValue) => dispatch(setTakePictureProps({propName,propValue})),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  member: state.member.item,
});

export default connect(mapStateToProps, bindAction)(Home);
