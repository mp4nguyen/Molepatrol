import { connect } from 'react-redux';
import Summary from '../components/summary';
import { createRequest } from '../actions/request';

const mapDispatchToProps = (dispatch, ownProps) => ({
  createRequest: (item) => {
    return dispatch(createRequest(item));
  },
});

export default connect(null, mapDispatchToProps)(Summary);
