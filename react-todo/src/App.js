import React, { Component, Fragment } from 'react'
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

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: [],
      editing: null,
      newTodo: ''
    }
  }

  get activeCount () {
    return this.state.todos.filter(x => !x.completed).length
  }

  get completedCount () {
    return this.state.todos.filter(x => x.completed).length
  }

  render () {
    const { todos, editing, newTodo } = this.state
    return <Fragment>
      <GlobalStyle />
      <Router>
        <TodoApp>
          <header>
            <h1>todos</h1>
            <NewTodo placeholder='What needs to be done?' autoFocus value={newTodo} onChange={e => this.setState({ newTodo: e.target.value })} onKeyDown={e => this.makeNewTodo(e)} />
          </header>
          <Route path='/' render={({ location }) => <TodoList
            todos={todos}
            editing={editing}
            toggleAll={e => this.toggleAll(e)}
            show={location.pathname}
            toggle={this.toggle}
            destroy={this.destroy}
            edit={this.edit}
            save={this.save}
            cancel={_ => this.cancel()} />} />
          <Footer count={this.activeCount} completedCount={this.completedCount} clear={_ => this.clearCompleted()} />
        </TodoApp>
      </Router>
    </Fragment>
  }

  makeNewTodo (event) {
    if (event.which !== 13) return // enter
    event.preventDefault()

    const oldTodos = Array.from(this.state.todos)
    const newTodoText = this.state.newTodo.trim()

    if (newTodoText) {
      this.setState({
        newTodo: '',
        todos: oldTodos.concat({
          id: Math.max(...oldTodos.map(x => x.id), 0) + 1,
          completed: false,
          title: newTodoText
        })
      })
    }
  }

  clearCompleted () {
    this.setState({ todos: this.state.todos.filter(x => !x.completed) })
  }

  toggleAll (event) {
    this.setState({ todos: this.state.todos.map(x => { x.completed = event.target.checked; return x }) })
  }
  get toggle () {
    return (id) => {
      this.setState({ todos: this.state.todos.map(x => { x.completed = x.id === id ? !x.completed : x.completed; return x }) })
    }
  }
  get edit () {
    return (id) => {
      this.setState({ editing: id })
    }
  }

  get destroy () {
    return (id) => {
      this.setState({ todos: this.state.todos.filter(x => x.id !== id) })
      this.cancel()
    }
  }

  get save () {
    return (id, text) => {
      this.setState({ todos: this.state.todos.map(x => { x.title = x.id === id ? text : x.title; return x }) })
      this.cancel()
    }
  }

  cancel () {
    this.setState({ editing: null })
  }
}
