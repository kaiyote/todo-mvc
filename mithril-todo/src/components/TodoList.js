import { css } from 'emotion'
import { toggleAll } from '../actions'
import store from '../store'

const section = css`
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
`

const toggle = css`
  width: 1px;
  height: 1px;
  border: none;
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;

  & + label {
    width: 60px;
    height: 34px;
    font-size: 0;
    position: absolute;
    top: -52px;
    left: -13px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);

    &:before {
      content: '❯';
      font-size: 22px;
      color: #e6e6e6;
      padding: 10px 27px 10px 27px;
    }
  }

  &:checked + label:before {
    color: #737373;
  }
`

const todos = css`
  margin: 0;
  padding: 0;
  list-style: none;
`

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

const TodoList = {
  view: ({ attrs: { todos, editing, visibilityFilter }}) => {
    const visibleTodos = getVisibleTodos(todos, visibilityFilter)
    const activeTodos = todos.filter(x => !x.completed).length

    return visibleTodos.length === 0
      ? null
      : m(`section.${section}`,
          m(`input#toggle-all.${toggle}`, {
            type: 'checkbox',
            checked: activeTodos === 0,
            onchange: e => store.dispatch(toggleAll(e.target.checked))
          }),
          m('label', {for: 'toggle-all'}),
          m(`ul.${todos}`)
        )
  }
}

export default TodoList
