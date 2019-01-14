import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const Section = styled.section`
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
`

const Toggle = styled.input`
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

const Todos = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const TodoList = ({ todos, editing, toggleAll, show, toggle, destroy, edit, save, cancel }) => {
  const activeTodoCount = todos.filter(x => !x.completed).length
  const shownTodos = show === '/completed'
    ? todos.filter(x => x.completed)
    : show === '/active'
      ? todos.filter(x => !x.completed)
      : todos

  return todos.length === 0
    ? null
    : <Section>
      <Toggle id='toggle-all' type='checkbox' checked={activeTodoCount === 0} onChange={e => toggleAll(e, todos)} />
      <label htmlFor='toggle-all' />
      <Todos>
        {shownTodos.map(t => <TodoItem key={t.id} todo={t} editing={editing === t.id} onToggle={toggle} onDestroy={destroy} onEdit={edit} onSave={save} onCancel={cancel} />)}
      </Todos>
    </Section>
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  editing: PropTypes.number,
  toggleAll: PropTypes.func.isRequired,
  show: PropTypes.oneOf(['/', '/active', '/completed']),
  toggle: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}

export default TodoList
