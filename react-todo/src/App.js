import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import TodoList from './TodoList'
import Footer from './Footer'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
  }

  :focus {
    outline: 0;
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    appearance: none;
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .hidden {
    display: none;
  }
`

const TodoApp = styled.div`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  & input::-webkit-input-placeholder,
  & input::-moz-placeholder,
  & input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  & h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    text-rendering: optimizeLegibility;
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
  }
`

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

const toggleAll = setTodos => (e, todos) => {
  setTodos(todos.map(x => { x.completed = e.target.checked; return x }))
}

const clearCompleted = (todos, setTodos) => () => {
  setTodos(todos.filter(x => !x.completed))
}

const toggle = (todos, setTodos) => id => {
  setTodos(todos.map(t => { t.completed = t.id === id ? !t.completed : t.completed; return t }))
}

const destroy = (todos, setTodos) => id => {
  setTodos(todos.filter(x => x.id !== id))
}

const edit = (setEditing) => id => {
  setEditing(id)
}

const cancel = (setEditing) => () => {
  setEditing(null)
}

const save = (todos, setTodos, setEditing) => (id, text) => {
  setTodos(todos.map(x => { x.title = x.id === id ? text : x.text; return x }))
  setEditing(null)
}

const createTodo = (todos, setTodos, setNewTodo) => (event, text) => {
  if (event.which !== 13) return // enter

  event.preventDefault()

  const newTodoText = text.trim()
  if (newTodoText) {
    setNewTodo('')
    const newTodos = Array.from(todos)
    newTodos.push({
      id: Math.max(...todos.map(x => x.id), 0) + 1,
      completed: false,
      title: newTodoText
    })
    setTodos(newTodos)
  }
}

const App = () => {
  const [todos, setTodos] = useState([])
  const [editing, setEditing] = useState(null)
  const [newTodo, setNewTodo] = useState('')
  const active = todos.filter(x => !x.completed).length
  const completed = todos.filter(x => x.completed).length
  const makeNewTodo = createTodo(todos, setTodos, setNewTodo)

  return <Fragment>
    <GlobalStyle />
    <Router>
      <TodoApp>
        <header>
          <h1>todos</h1>
          <NewTodo placeholder='What needs to be done?' autoFocus value={newTodo} onChange={e => setNewTodo(e.target.value)} onKeyDown={e => makeNewTodo(e, newTodo)} />
        </header>
        <Route path='/' render={({ location }) => <TodoList
          todos={todos}
          editing={editing}
          toggleAll={toggleAll(setTodos)}
          show={location.pathname}
          toggle={toggle(todos, setTodos)}
          destroy={destroy(todos, setTodos)}
          edit={edit(setEditing)}
          save={save(todos, setTodos, setEditing)}
          cancel={cancel(setEditing)} />} />
        <Footer count={active} completedCount={completed} clear={clearCompleted(todos, setTodos)} />
      </TodoApp>
    </Router>
  </Fragment>
}

export default App
