import { connect } from 'react-redux';
import Members from '../components/members';

const mapStateToProps = state => ({
  editMember: true,
});

export default connect(mapStateToProps)(Members);
