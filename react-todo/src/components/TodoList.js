import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import styled from 'styled-components'

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

const TodoList = ({ activeTodos, todos, editing, onTodoToggle, onTodoEdit, onTodoCancel, onTodoSave, onTodoDestroy, onToggleAll }) =>
  todos.length === 0
    ? null
    : <Section>
      <Toggle id='toggle-all' type='checkbox' checked={activeTodos === 0} onChange={e => onToggleAll(e.target.checked)} />
      <label htmlFor='toggle-all' />
      <Todos>
        {todos.map(t => <Todo key={t.id} {...t} editing={editing === t.id}
          onTodoToggle={() => onTodoToggle(t.id)} onTodoEdit={() => onTodoEdit(t.id)} onTodoCancel={() => onTodoCancel()}
          onTodoSave={onTodoSave(t.id)} onTodoDestroy={() => onTodoDestroy(t.id)} />)}
      </Todos>
    </Section>

TodoList.propTypes = {
  activeTodos: PropTypes.number.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoToggle: PropTypes.func.isRequired,
  onTodoEdit: PropTypes.func.isRequired,
  onTodoCancel: PropTypes.func.isRequired,
  onTodoSave: PropTypes.func.isRequired,
  onTodoDestroy: PropTypes.func.isRequired,
  onToggleAll: PropTypes.func.isRequired
}

export default TodoList
