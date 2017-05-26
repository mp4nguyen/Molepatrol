import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Icon, Body } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import Lightbox from 'react-native-lightbox';
import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-swiper';
import { openDrawer } from '../../actions/drawer';

import theme from '../../themes/base-theme';
import styles from './styles';
import HeaderContent from '../headerContent';
import { setMember, createMember, getMember } from '../../actions/member';

const bg = require('../../../images/BG.png');
const {
  popRoute,
  pushRoute,
} = actions;

class Member extends Component {

  static propTypes = {
    list: React.PropTypes.array,
    editMember: React.PropTypes.bool,
    setMember: React.PropTypes.func,
    getMember: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    addNewMember: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.addMember = this.addMember.bind(this);
    this.select = this.select.bind(this);
  }
  componentWillMount() {

  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  select(member) {
    const { editMember } = this.props;
    this.props.setMember(member).then(() => {
      console.log('setmember has done..........');
      this.pushRoute('baseinfo')
      // if (editMember) {
      //   this.props.getMember(member.id).then(this.pushRoute.bind(this, 'baseinfo'));
      // } else {
      //   this.popRoute();
      // }
    });
  }
  addMember() {
    const { navigation } = this.props;
    this.props.addNewMember();
    this.props.pushRoute({ key: 'baseinfo', index: 1 }, navigation.key);
  }
  render() {
    const items = this.props.list.map(x => (
      <View key={x.personId}>
        <TouchableOpacity onPress={() => this.select(x)}>
          <View style={styles.item}>
            <Text numberOfLines={2} style={styles.name}>
              {`${x.firstName} ${x.lastName}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ));
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <HeaderContent />
          <Content style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }} >
              {items}
            </View>
          </Content>
          <Button
            rounded dark block large
            onPress={this.addMember}
            style={styles.addBtn}
          >
            <Text style={styles.mainText}>
              Add member</Text>
          </Button>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    getMember: (id) => dispatch(getMember(id)),
    setMember: member => dispatch(setMember(member)),
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    addNewMember: (member) => dispatch(createMember()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  list: state.member.list,
});

export default connect(mapStateToProps, bindAction)(Member);
