
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';

import Login from './components/login/';
import Home from './components/home/';
import SignUp from './components/sign-up/';
import SideBar from './components/sideBar';
import NeedHelp from './components/needhelp';
import BaseInfo from './components/base-info';
import SignUpBaseInfo from './containers/signUpBaseInfo';
import ContactInfo from './components/contact-info';
import GPInfo from './components/gp-info';
import ChangePassword from './components/change-password';
import RequestAdvice from './components/request-advice';
import AboutUs from './components/about-us';
import Introduction from './components/introduction';
import Members from './components/members';
import Profiles from './containers/profiles';
import MyRequest from './containers/myRequest';
import TreatmentAdvice from './containers/treatmentAdvice';
import FundInformation from './components/fund-information';
import Questionaire from './components/questionaire';
import SplashPage from './components/splashscreen/';
import ViewSummary from './components/summary';
import RequestSummary from './containers/requestSummary';
import TakePicture from './components/take-picture';
import SelectLesion from './components/select-lesion';
import Channel from './components/channel';
import Channels from './components/channels';
import { statusBarColor } from './themes/base-theme';
import SpinnerView from './components/spinner';
const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;


class AppNavigator extends Component {

  static propTypes = {
    toastMessage: React.PropTypes.object,
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      case 'signUp':
        return <SignUp />;
      case 'sideBar':
        return <SideBar />;
      case 'needhelp':
        return <NeedHelp />;
      case 'signupbaseinfo':
        return <SignUpBaseInfo />;
      case 'baseinfo':
        return <BaseInfo />;
      case 'contactinfo':
        return <ContactInfo />;
      case 'gpinfo':
        return <GPInfo />;
      case 'changepassword':
        return <ChangePassword />;
      case 'aboutus':
        return <AboutUs />;
      case 'requestadvice':
        return <RequestAdvice />;
      case 'introduction':
        return <Introduction />;
      case 'members':
        return <Members />;
      case 'myrequest':
        return <MyRequest />;
      case 'treatmentadvice':
        return <TreatmentAdvice />;
      case 'fundinformation':
        return <FundInformation />;
      case 'requestsummary':
        return <RequestSummary />;
      case 'summary':
        return <ViewSummary />;
      case 'takepicture':
        return <TakePicture />;
      case 'selectlesion':
        return <SelectLesion />;
      case 'questionaire':
        return <Questionaire />;
      case 'profiles':
        return <Profiles />;
      case 'channel':
        return <Channels />;
      default:
        return <SplashPage />;
    }
  }

  render() {  // eslint-disable-line class-methods-use-this
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="light-content"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
        <SpinnerView />
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
  toastMessage: state.toastMessage,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
