import { css } from 'emotion'
import store from '../store'
import { addTodo } from '../actions'

const newTodo = css`
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

const submit = event => {
  if (event.which === 13) {
    event.preventDefault()
    if (!event.target.value.trim()) return
    store.dispatch(addTodo(event.target.value))
    event.target.value = ''
  }
}

const Header = {
  view: () => m('header',
    m('h1', 'todos'),
    m(`input.${newTodo}`, {
      autoFocus: true,
      placeholder: 'What needs to be done?',
      onkeyup: submit
    })
  )
}

export default Header
