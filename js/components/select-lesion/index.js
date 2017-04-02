

import React, { Component } from 'react';
import { Image, TouchableOpacity, Platform, ImagePickerIOS } from 'react-native';
import { connect } from 'react-redux';
import { takeSnapshot, dirs } from 'react-native-view-shot';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Left, Right, Body } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import HeaderContent from '../headerContent';
import Camera from 'react-native-camera';
import { setLesion } from '../../actions/request';
const SignaturePad = require('react-native-signature-pad');
const { CacheDir } = dirs;
const {
  popRoute,
  pushRoute,
} = actions;
class TakePicture extends Component {
  static defaultProps = {
    item: {
      isFront: true,
      gender: false,
    },
  }
  static propTypes = {
    setValue: React.PropTypes.func,
    item: React.PropTypes.object,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.switchImage = this.switchImage.bind(this);
    this.clear = this.clear.bind(this);
    this.saveImage = this.saveImage.bind(this);
  }
  state = {
    lesionImage: null,
    isReset: false,
  }
  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  switchImage() {
    this.clear();
    this.props.setValue({ isFront: !this.props.item.isFront });
  }
  saveImage() {
    takeSnapshot(this.refs['imageView'], { path: `${CacheDir}/lesion_${new Date().getTime()}.png` })
      .then(
      (uri) => {
        this.props.setValue({ lesion: uri });
        this.pushRoute('questionaire');
      },
      error => console.error('Oops, snapshot failed', error)
      );
  }
  clear() {
    this.setState({
      ...this.state,
      isReset: true,
    });
    setTimeout(() => {
      this.setState({
        ...this.state,
        isReset: false,
      });
    }, 0);
  }
  render() {
    const { item } = this.props;
    const { isFront, gender } = item;
    const Content = Image;
    const props = {
      source: isFront ? (gender ? require('../../../images/body-front.jpg') : require('../../../images/boy_body-front.jpg')) : (gender ? require('../../../images/body-back.jpg') : require('../../../images/boy_body-back.jpg')),
      style: styles.preview,
    };
    return (
      <Container>
        <View style={styles.container}>
          <Header style={styles.header}>
            <Left style={{ flex: 0.2 }}>
              <Button transparent onPress={() => this.popRoute()}>
                <Icon active name="arrow-back" />
              </Button>
            </Left>
            <Body style={styles.headertext}>
              <Text>Draw the cross to show us where the lesion is</Text>
            </Body>
            <Right style={{ flex: 0.2 }}>
              <Button transparent onPress={this.saveImage} >
                <Icon active name="arrow-forward" />
              </Button>
            </Right>
          </Header>
          <View collapsable={false} ref='imageView' >
            <Content {...props}>
              {!this.state.isReset &&
              <SignaturePad
                penColor="red"
                style={styles.sketch}
              />}
            </Content>
            <View style={styles.buttonBar}>
              <Button transparent onPress={this.clear} >
                <Icon name="remove-circle" style={styles.icon} />
              </Button>
            </View>
          </View>
          <Button
            rounded block large
            style={styles.switchView}
            onPress={this.switchImage}
          >
            <Icon name="refresh" style={{ color: '#000' }} />
            <Text style={styles.switchText}>Back / Front View</Text>
          </Button>

        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setValue: value => dispatch(setLesion(value)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  item: state.request.item,
});

export default connect(mapStateToProps, bindAction)(TakePicture);
