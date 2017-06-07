

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Platform, Switch } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import { Container, Content, Text, Icon, Thumbnail, InputGroup, Input, Left, Right, Button, Header, Body } from 'native-base';
import _ from 'lodash';
import HeaderContent from './../headerContent/';

import theme from '../../themes/base-theme';
import styles from './styles';
import { setInfo ,changeValueMember} from '../../actions/member';

import {bg,headerLogo} from '../../libs/images';


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
      errors: {
      },
    };
    this.changeValue = this.changeValue.bind(this);
    this.validate = this.validate.bind(this);
    this.validator = {
      phone: value => !value || _.isEmpty(value),
      address: value => !value || _.isEmpty(value),
      suburb: value => !value || _.isEmpty(value),
      postcode: value => !value ||  _.isEmpty(value),
      state: value => !value || _.isEmpty(value),
      country: value => !value || _.isEmpty(value),
    };
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
    this.props.changeValueMember("contact",field,value);

    // this.setState({
    //   ...this.state,
    //   contact: {
    //     ...this.state.contact,
    //     [field]: value,
    //   },
    // });
  }
  validate() {
    const errors = {};
    let count = 0;
    _.each(_.keys(this.validator), (key) => {
      if (this.validator[key](this.props.contact[key])) {
        count += 1;
        errors[key] = { error: true };
      }
    });
    this.setState({
      ...this.state,
      errors,
    });
    if (count > 0) {
      return Promise.reject('Error!');
    }
    return Promise.resolve();
  }
  submitContactInfo() {
    this.pushRoute('gpinfo');

    // const { submitContactInfo } = this.props;
    // if (submitContactInfo) {
    //   this.validate().then(() => {
    //     this.pushRoute('gpinfo');
    //     //submitContactInfo({ contact: this.state.contact }).then(this.pushRoute.bind(this, 'gpinfo'));
    //   }).catch(e=> alert(e))
    // } else {
    //   this.pushRoute('gpinfo');
    // }
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

              <InputGroup {...this.state.errors.phone} underline style={styles.inputGrp}>
                <Icon name="phone-portrait" />
                <Input
                  placeholder="Mobile *"
                  keyboardType = 'numeric'
                  value={this.props.contact.phone}
                  onChange={target => this.changeValue('phone', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup {...this.state.errors.address} underline style={styles.inputGrp}>
                <Icon name="pin" />
                <Input
                  placeholder="Address *"
                  value={this.props.contact.address}
                  onChange={target => this.changeValue('address', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup {...this.state.errors.suburb} underline style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Suburb *"
                  keyboardType = 'numeric'
                  value={this.props.contact.suburb}
                  onChange={target => this.changeValue('suburb', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup {...this.state.errors.postcode} underline style={styles.inputGrp}>
                <Icon name="calendar" />
                <Input
                  placeholder="Postcode *"
                  value={this.props.contact.postcode}
                  onChange={target => this.changeValue('postcode', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup {...this.state.errors.state} underline style={styles.inputGrp}>
                <Icon name="star" />
                <Input
                  placeholder="State *"
                  value={this.props.contact.state}
                  onChange={target => this.changeValue('state', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup {...this.state.errors.country} underline style={styles.inputGrp}>
                <Icon name="mail" />
                <Input
                  placeholder="Country *"
                  value={this.props.contact.country}
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
    changeValueMember:(page,fieldName,value) => dispatch(changeValueMember(page,fieldName,value)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  contact: state.member.member.contact,
});

export default connect(mapStateToProps, bindAction)(ContactInfo);
