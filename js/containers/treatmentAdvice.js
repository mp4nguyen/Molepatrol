import { connect } from 'react-redux';
import { getList, getItem } from '../actions/request';
import TreatmentAdvice from '../components/treatment-advice';

const mapStateToProps = state => ({
  item: state.request.item,
});

export default connect(mapStateToProps)(TreatmentAdvice);
