

import React, { Component } from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';
import { setBackRoute } from '../../actions/member';
import styles from './styles';
import theme from '../../themes/base-theme';
import HeaderContent from '../headerContent';
import { setNextPageForMembers,setNextPageForNewMember,goToPage } from '../../actions/nextPage';
import { newLesion } from '../../actions/request';

import {bg,logo} from '../../libs/images';
const {
  reset,
  pushRoute,
} = actions;

class SignUp extends Component {


  static propTypes = {
    newRequest: React.PropTypes.func,
    member: React.PropTypes.object,
    reset: React.PropTypes.func,
    setBackRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.addMember = this.addMember.bind(this);
    this.goToIntro = this.goToIntro.bind(this);
  }

  resetRoute(route) {
    this.props.resetRoute(route);
  }
  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  addMember() {
    this.props.setNextPageForMembers();
    this.props.setNextPageForNewMember();
    this.props.goToPage('members');
  }

  goToIntro(){
    const { personId,patientId, gender } = this.props.member;
    this.props.newRequest(personId, patientId,gender).then(this.pushRoute.bind(this, 'introduction'))
  }


  render() {
    const { firstName, lastName } = this.props.member;
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <HeaderContent />

          <View style={styles.container}>
            <View style={styles.wrapheader}>
              <Text style={styles.header}>REQUEST ADVICE</Text>
              <Text style={styles.user}>
                {`${firstName} ${lastName}`}</Text>
            </View>
            <View style={styles.wrapbutton}>
              <Button
                rounded bordered block
                onPress={this.addMember}
                style={styles.addBtn}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}> Change / Add Member
              </Text>
                <Icon name="arrow-dropdown-circle" style={{ marginLeft: 10, fontSize: 20, marginTop: 5, color: '#fff' }} />
              </Button>

              <Button
                rounded bordered block
                onPress={this.goToIntro}
                style={styles.nextBtn}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Next</Text>
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
    newRequest: (personId,patientId, gender) => dispatch(newLesion(personId, patientId,gender)),
    setNextPageForMembers: () => dispatch(setNextPageForMembers('requestadvice')),
    setNextPageForNewMember: () => dispatch(setNextPageForNewMember('requestadvice')),
    goToPage: (page) => dispatch(goToPage(page)),
    setBackRoute: route => dispatch(setBackRoute(route)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  member: state.member.item,
});

export default connect(mapStateToProps, bindAction)(SignUp);
