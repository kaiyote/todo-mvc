import { useDispatch } from 'react-redux'
import { addTodo } from '../../actions'
import { NewTodo } from './Header.styles'

function submit (dispatch: (...args: any[]) => void) {
  return function (event: any) {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (!event.target?.value.trim()) return
      dispatch(addTodo(event.target.value))
      event.target.value = ''
    }
  }
}

export default function Header () {
  const dispatch = useDispatch()

  return (
    <header>
      <h1>todos</h1>
      <NewTodo autoFocus placeholder='What needs to be done?' onKeyUp={submit(dispatch)} />
    </header>
  )
}
