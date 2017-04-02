

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Platform, Switch } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import { Container, Content, Text, Icon, Thumbnail, InputGroup, Input, Left, Right, Button, Header, Body } from 'native-base';

import HeaderContent from './../headerContent/';

import theme from '../../themes/base-theme';
import styles from './styles';
import { setInfo } from '../../actions/member'
const bg = require('../../../images/BG.png');
const headerLogo = require('../../../images/header-logo.png');
import StepInfo from '../step-info';
const {
  pushRoute,
  popRoute,
} = actions;
class ContactInfo extends Component {
  static defaultProps = {
    contact: {
      phone: '',
      address: '',
      suburb: '',
      postcode: '',
      state: '',
      country: '',
    },
  }
  static propTypes = {
    submitContactInfo: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    contact: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      contact: props.contact,
    };
    this.changeValue = this.changeValue.bind(this);
    this.submitContactInfo = this.submitContactInfo.bind(this);
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
      contact: {
        ...this.state.contact,
        [field]: value,
      },
    });
  }
  submitContactInfo() {
      
    const { submitContactInfo } = this.props;
    if (submitContactInfo) {
      submitContactInfo({ contact: this.state.contact }).then(this.pushRoute.bind(this, 'gpinfo'));
    } else {
      this.pushRoute('gpinfo');
    }
  
    
  }
  render() {
    const { contact } = this.state
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
            <Right>
              <Button transparent onPress={this.submitContactInfo} >
                <Icon active name="arrow-forward" />
              </Button>
            </Right>
          </Header>
          <Content scrollEnabled={false} style={{ marginBottom: 5 }}>
            <View style={styles.content}>
              <Text style={styles.title}>
                CONTACT INFO
            </Text>

              <InputGroup underline style={styles.inputGrp}>
                <Icon name="phone-portrait" />
                <Input
                  placeholder="Mobile *"
                  value={contact.phone}
                  onChange={target => this.changeValue('phone', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup underline style={styles.inputGrp}>
                <Icon name="pin" />
                <Input
                  placeholder="Address *"
                  value={contact.address}
                  onChange={target => this.changeValue('address', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup underline style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Suburb *"
                  value={contact.suburb}
                  onChange={target => this.changeValue('suburb', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup underline style={styles.inputGrp}>
                <Icon name="calendar" />
                <Input
                  placeholder="Postcode *"
                  value={contact.postcode}
                  onChange={target => this.changeValue('postcode', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup underline style={styles.inputGrp}>
                <Icon name="star" />
                <Input
                  placeholder="State *"
                  value={contact.state}
                  onChange={target => this.changeValue('state', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup underline style={styles.inputGrp}>
                <Icon name="mail" />
                <Input
                  placeholder="Country *"
                  value={contact.country}
                  onChange={target => this.changeValue('country', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
            </View>
          </Content>
          <StepInfo text="CONTACT INFO" active="2" />
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    submitContactInfo: (info) => dispatch(setInfo(info)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    navigateTo: (route, signupRoute) => dispatch(navigateTo(route, signupRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  contact: state.member.member.contact,
});

export default connect(mapStateToProps, bindAction)(ContactInfo);
