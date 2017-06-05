import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Icon, Body, ListItem } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import Lightbox from 'react-native-lightbox';
import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-swiper';
import { openDrawer } from '../../actions/drawer';

import theme from '../../themes/base-theme';
import styles from './styles';
import HeaderContent from '../headerContent';
const deviceWidth = Dimensions.get('window').width;
const primary = require('../../themes/variable').brandPrimary;
const bg = require('../../../images/BG.png');
import { setNextPageForMembers,setNextPageForSummary,goToPage } from '../../actions/nextPage';
import { getList, getItem } from '../../actions/request';

const {
  popRoute,
  pushRoute,
} = actions;

class MyRequest extends Component {
  static defaultProps = {
    list: [],
  }
  static propTypes = {
    member: React.PropTypes.object,
    setNextPageForMembers: React.PropTypes.func,
    getList: React.PropTypes.func,
    getItem: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    list: React.PropTypes.array,
  }
  constructor(props) {
    super(props);
    this.state = {
      animationType: 'slideInDown',
      open: false,
      value: 0,
    };
    this.selectMember = this.selectMember.bind(this);
    this.requestSummary = this.requestSummary.bind(this);

  }
  componentWillMount() {
    const { getList, member } = this.props;
    getList({personId:member.personId});
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.member.personId != this.props.member.personId) {
      this.props.getList({personId:nextProps.member.personId});
    }
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  pushToRoute(route, id) {
    const { getItem, navigation } = this.props;
    if (getItem) {
      getItem(id).then(() => this.props.pushRoute({ key: route, index: 1 }, navigation.key));
    } else {
      pushRoute({ key: route, index: 1 }, navigation.key);
    }
  }
  selectMember() {
    const { navigation } = this.props;
    this.props.setNextPageForMembers();
    this.props.pushRoute({ key: 'members', index: 1 }, navigation.key);
  }
  requestSummary(apptId){
    console.log("will go to detail.....");
    this.props.getItem(apptId).then(()=>{
      this.props.setNextPageForSummary();
      this.props.goToPage('summary');
    });
  }
  render() {
    const types = ['ios-copy-outline', 'ios-chatboxes-outline', 'ios-archive-outline'];
    const texts = ['Request Sent', 'Reviewed By Dr', 'Treatment Advice'];
    const routes = ['summary', '', 'treatmentadvice'];
    const items = this.props.list.map((x, index) => (
      <View key={index}>
        <View style={styles.timelineView}>
          <View style={index === 0 ? styles.borderNone : styles.timelineContent}>
            <Text />
          </View>
        </View>
        <TouchableOpacity onPress={() => {this.requestSummary(x.apptId)}}>
          <View style={styles.contentContainer}>
            <Grid>
              <Col style={{ flexDirection: 'row' }} size={70}>
                <Icon name='ios-send-outline' style={{ marginLeft: 2 }} />
                <View style={{ paddingLeft: 15 }}>
                  <Text style={styles.timelineContentHeading}>{texts[x.type]}</Text>
                </View>
              </Col>
              <Col size={50}>
                <View style={styles.newsTypeView}>
                  <Text style={styles.status}>{x.isPending ? 'Pending' : moment.utc(x.apptDate).local().format('HH:mm DD/MM/YYYY') }</Text>
                </View>
              </Col>
            </Grid>
          </View>
        </TouchableOpacity>
      </View>
    ));
    const { firstName, lastName } = this.props.member;
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <HeaderContent />
          <Button
            dark block large
            onPress={() => this.selectMember()}
            style={styles.addBtn}
          >
            <Text style={styles.mainText}>
              {`${firstName} ${lastName}`}</Text>
              <Icon name='arrow-dropdown-circle' style={{ marginLeft: 10, fontSize: 20, marginTop: 5 }} />
          </Button>

          <Content showsVerticalScrollIndicator={false} >
            {items}
          </Content>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setNextPageForMembers: () => dispatch(setNextPageForMembers('myrequest')),
    setNextPageForSummary: () => dispatch(setNextPageForSummary('myrequest')),
    goToPage: (page) => dispatch(goToPage(page)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    getList: (member) => dispatch(getList(member)),
    getItem: (id) => dispatch(getItem(id)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  member: state.member.item,
  list: state.request.list,
});

export default connect(mapStateToProps, bindAction)(MyRequest);
