import Footer from '../components/Footer'
import { connect } from 'react-redux'
import { clearCompleted } from '../actions'

const mapStateToProps = state => {
  return {
    count: state.todos.filter(x => !x.completed).length,
    completed: state.todos.filter(x => x.completed).length
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClearCompleted: () => dispatch(clearCompleted())
  }
}

const ConnectedFooter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)

export default ConnectedFooter
