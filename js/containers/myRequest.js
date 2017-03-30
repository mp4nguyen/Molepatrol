import { connect } from 'react-redux';
import { getList, getItem } from '../actions/request';
import MyRequest from '../components/my-requests';

const mapDispatchToProps = (dispatch, ownProps) => ({
  getList: () => {
      dispatch(getList());
    },
  getItem: (id) => dispatch(getItem(id)),
});

const mapStateToProps = state => ({
  list: state.request.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRequest);
