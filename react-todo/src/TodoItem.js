import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TodoLi = styled.li`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;

  &:last-child {
    border-bottom: none;
  }

  &.editing {
    border-bottom: none;
    padding: 0;

    &:last-child {
      margin-bottom: -1px;
    }
  }

  & label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }

  &.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }
`

const TodoEdit = styled.input`
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
`

const DestroyTodo = styled.button`
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;

  &:hover {
    color: #af5b5e;
  }

  &:after {
    content: '×';
  }

  li:hover & {
    display: block;
  }
`

const Toggle = styled.input`
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
  opacity: 0;

  & + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center left;
  }

  &:checked + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
  }
`

const handleSubmit = (onSave, onDestroy, setState) => (id, editText) => {
  const val = editText.trim()
  if (val) {
    onSave(id, val)
    setState(val)
  } else {
    onDestroy()
  }
}

const handleChange = setState => (editing, event) => {
  if (editing) setState(event.target.value)
}

const handleKeyDown = (setState, onCancel, originalTitle, doSubmit) => (editText, id, event) => {
  if (event.which === 27) { // escape
    setState(originalTitle)
    onCancel(event)
  } else if (event.which === 13) { // enter
    doSubmit(id, editText)
  }
}

const handleEdit = (onEdit, setState, todo) => () => {
  onEdit(todo.id)
  setState(todo.title)
}

const TodoItem = ({ todo, editing, onToggle, onDestroy, onSave, onEdit, onCancel }) => {
  const [editText, setEditText] = useState(todo.title)
  const doSubmit = handleSubmit(onSave, onDestroy, setEditText)
  const doChange = handleChange(setEditText)
  const doKeyDown = handleKeyDown(setEditText, onCancel, todo.title, doSubmit)
  const doEdit = handleEdit(onEdit, setEditText, todo)

  return (
    <TodoLi className={`${(todo.completed ? 'completed' : null)}`}>
      {
        editing
          ? <TodoEdit value={editText} onBlur={e => doSubmit(todo.id, editText)} onChange={e => doChange(editing, e)} onKeyDown={e => doKeyDown(editText, todo.id, e)} />
          : <div>
            <Toggle type='checkbox' checked={todo.completed} onChange={_ => onToggle(todo.id)} />
            <label onDoubleClick={doEdit}>{todo.title}</label>
            <DestroyTodo onClick={_ => onDestroy(todo.id)} />
          </div>
      }
    </TodoLi>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  editing: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default TodoItem
