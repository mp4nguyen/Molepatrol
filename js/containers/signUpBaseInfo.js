import { connect } from 'react-redux';
import BaseInfo from '../components/base-info';

const mapStateToProps = state => ({
  canBack: false,
});

export default connect(mapStateToProps)(BaseInfo);
