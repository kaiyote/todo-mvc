import { connect } from 'react-redux'
import { toggleTodo, edit, cancel, toggleAll, save, deleteTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      return todos
  }
}

const mapStateToProps = state => {
  return {
    editing: state.editing,
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
    activeTodos: state.todos.filter(x => !x.completed).length
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoToggle: id => dispatch(toggleTodo(id)),
    onTodoEdit: id => dispatch(edit(id)),
    onTodoCancel: () => dispatch(cancel()),
    onToggleAll: checked => dispatch(toggleAll(checked)),
    onTodoSave: id => text => dispatch(save(id, text)),
    onTodoDestroy: id => dispatch(deleteTodo(id))
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
