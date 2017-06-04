
import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Icon, List, ListItem, Thumbnail, Item } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import { closeDrawer } from '../../actions/drawer';


import navigateTo from '../../actions/sideBarNav';
import styles from './style';
import { setNextPageForMembers } from '../../actions/nextPage';



const {
  reset,
} = actions;

class SideBar extends Component {

  static propTypes = {
    member: React.PropTypes.object,
    setNextPageForMembers: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }
  reset() {
    this.props.reset(this.props.navigation.key);
  }

  render() {
    const { firstName, lastName } = this.props.member || {};
    return (
      <Container>
        <Image source={require('../../../images/sid.png')} style={styles.background} >
          <Image source={require('../../../images/drawer.png')} style={styles.background} >
            <Content style={styles.drawerContent}>
              <View style={styles.viewWelCome}>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.username}> {`${firstName} ${lastName}`}</Text>
              </View>
              <ListItem button onPress={() => { this.navigateTo('home'); }} iconLeft style={styles.links} >
                <Icon name="ios-home-outline" />
                <Text style={styles.linkText}> HOME</Text>
              </ListItem>
              <ListItem button onPress={() => { this.props.setNextPageForMembers(); this.navigateTo('profiles'); }} iconLeft style={styles.links} >
                <Icon name="ios-person-outline" />
                <Text style={styles.linkText}> MEMBER PROFILE</Text>
              </ListItem>
              <ListItem button onPress={() => this.navigateTo('changepassword')} iconLeft style={styles.links} >
                <Icon name="ios-lock" />
                <Text style={styles.linkText}>CHANGE PASSWORD</Text>
              </ListItem>
              <ListItem button onPress={() => this.navigateTo('aboutus')} iconLeft style={styles.links}>
                <Icon name="ios-settings-outline" />
                <Text style={styles.linkText}>ABOUT REDIMED</Text>
              </ListItem>
              <ListItem button onPress={() => this.navigateTo('login')} iconLeft style={styles.links} >
                <Icon name="ios-power" />
                <Text style={styles.linkText}>LOGOUT</Text>
              </ListItem>
            </Content>
          </Image>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setNextPageForMembers: () => dispatch(setNextPageForMembers('baseinfo')),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    reset: key => dispatch(closeDrawer(), reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  member: state.user.user,
});

export default connect(mapStateToProps, bindAction)(SideBar);
