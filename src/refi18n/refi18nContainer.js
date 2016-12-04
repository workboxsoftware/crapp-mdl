import Refi18nForm from './refi18nForm';
import { connect } from 'react-redux'


function mapStateToProps(state, ownProps) {
  return { 
    application: state.application
  };
}

export default connect(mapStateToProps)(Refi18nForm)
