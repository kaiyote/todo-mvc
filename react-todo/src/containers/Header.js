import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import styled from 'styled-components'

const NewTodo = styled.input`
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 16px 16px 16px 60px;
  background: rgba(0, 0, 0, 0.03);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscaled;
`

const submit = dispatch => event => {
  if (event.which === 13) {
    event.preventDefault()
    if (!event.target.value.trim()) return
    dispatch(addTodo(event.target.value))
    event.target.value = ''
  }
}

const Header = ({ dispatch }) =>
  <header>
    <h1>todos</h1>
    <NewTodo autoFocus placeholder='What needs to be done?' onKeyUp={submit(dispatch)} />
  </header>

const ConnectedHeader = connect()(Header)

export default ConnectedHeader
