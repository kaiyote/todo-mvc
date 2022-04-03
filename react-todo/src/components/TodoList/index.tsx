import { useSelector, useDispatch } from 'react-redux'
import { cancel, deleteTodo, edit, save, toggleAll, toggleTodo, VisibilityFilter } from '../../actions'
import { State } from '../../reducers'
import { Todo as TTodo } from '../../reducers/types'
import Todo from '../Todo'
import { Section, Todos, Toggle } from './TodoList.styles'

function getVisibleTodos (todos: TTodo[], filter: VisibilityFilter) {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      return todos
  }
}

interface ViewState {
  editing: number
  todos: TTodo[]
  activeTodos: number
}

export default function TodoList () {
  const dispatch = useDispatch()
  const { editing, todos, activeTodos } = useSelector<State, ViewState>(s => ({
    editing: s.editing,
    todos: getVisibleTodos(s.todos, s.visibilityFilter),
    activeTodos: s.todos.filter(x => !x.completed).length
  }))

  if (todos.length === 0) return null

  return (
    <Section>
      <Toggle id='toggle-all' type='checkbox' checked={activeTodos === 0} onChange={e => dispatch(toggleAll(e.target.checked))} />
      <label htmlFor='toggle-all' />
      <Todos>
        {todos.map(t => <Todo key={t.id} {...t} editing={editing === t.id}
          onTodoToggle={() => dispatch(toggleTodo(t.id))} onTodoEdit={() => dispatch(edit(t.id))} onTodoCancel={() => dispatch(cancel())}
          onTodoSave={text => dispatch(save(t.id, text))} onTodoDestroy={() => dispatch(deleteTodo(t.id))} />)}
      </Todos>
    </Section>
  )
}
