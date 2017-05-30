

import React, { Component } from 'react';
import { Image, TouchableOpacity, Platform, ImagePickerIOS } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { setPhoto } from '../../actions/request';
import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Left, Right, Body } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import HeaderContent from '../headerContent';
import Camera from 'react-native-camera';
const bg = require('../../../images/BG.png');
const headerLogo = require('../../../images/header-logo.png');

const {
  popRoute,
  pushRoute,
} = actions;
class TakePicture extends Component {

  static propTypes = {
    resource: React.PropTypes.array,
    setValue: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  state = {
    image: null,
  }
  constructor(props) {
    super(props);
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
    this.takePicture = this.takePicture.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.finishImage = this.finishImage.bind(this);
  }
  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  takePicture() {
    this.camera.capture()
      .then(data => this.setState({ image: data }))
      .catch(err => console.error(err));
  }
  selectImage() {
    this.props.setValue({ resource: [...this.props.resource, this.state.image.path] });
    this.setState({ image: null })
  }
  finishImage() {
    this.props.setValue({ resource: [...this.props.resource, this.state.image.path] });
    this.setState({ image: null });
    this.pushRoute('selectlesion');
  }
  render() {
    const Content = this.state.image ? Image : Camera;
    const props = this.state.image ? {
      source: { uri: this.state.image.path },
      style: styles.preview,
    } : {
      ref: (cam) => {
          this.camera = cam;
        },
      style: styles.preview,
      aspect: Camera.constants.Aspect.fill,
      captureQuality: Camera.constants.CaptureQuality.high,
      captureTarget: Camera.constants.CaptureTarget.disk,
    };
    return (
      <Container>
        <View style={styles.container}>
          <Content {...props} >
            <HeaderContent />
            <View style={styles.control}>
              <Left>
                {this.state.image &&
                  <Button transparent onPress={() => this.setState({ image: null })} >
                    <Icon name="refresh" style={styles.icon} />
                  </Button>
                }
              </Left>
              <Body>
                {
                  !this.state.image &&
                      <Button transparent style={{ alignSelf: 'center' }} onPress={this.takePicture} >
                        <Icon name="camera" style={styles.icon} />
                      </Button>
                }
                {
                  this.state.image &&
                      <Button transparent style={{ alignSelf: 'center' }} onPress={this.finishImage} >
                        <Icon name="checkmark" style={styles.icon} />
                      </Button>
                }
              </Body>
              <Right>
                {this.state.image &&
                  <Button transparent onPress={this.selectImage} >
                    <Icon name="add" style={styles.icon} />
                  </Button>
                }
              </Right>
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setValue: value => dispatch(setPhoto(value)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  resource: state.request.item.resource,
});

export default connect(mapStateToProps, bindAction)(TakePicture);
