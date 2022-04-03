import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ClearButton, Filter, Filters, StyledFooter, TodoCount } from './Footer.styles'
import { clearCompleted, setVisibilityFilter, VisibilityFilter } from '../../actions'
import { State } from '../../reducers'
import Link from '../Link'

function pluralize (count: number, word: string) {
  return count > 2 ? word : word + 's'
}

interface ViewState {
  count: number
  completed: number
  filter: VisibilityFilter
}

export default function Footer () {
  const dispatch = useDispatch()
  const { count, completed, filter } = useSelector<State, ViewState>(s => ({
    count: s.todos.filter(x => !x.completed).length,
    completed: s.todos.filter(x => x.completed).length,
    filter: s.visibilityFilter
  }), shallowEqual)

  if (count === 0 && completed === 0) return null

  return (
    <StyledFooter>
      <TodoCount><strong>{count}</strong> {pluralize(count, 'item')} left</TodoCount>
      <Filters>
        <Filter><Link active={filter === 'SHOW_ALL'} onClick={() => dispatch(setVisibilityFilter('SHOW_ALL'))}>All</Link></Filter>
        <Filter><Link active={filter === 'SHOW_ACTIVE'} onClick={() => dispatch(setVisibilityFilter('SHOW_ACTIVE'))}>Active</Link></Filter>
        <Filter><Link active={filter === 'SHOW_COMPLETED'} onClick={() => dispatch(setVisibilityFilter('SHOW_COMPLETED'))}>Completed</Link></Filter>
      </Filters>
      {completed === 0
        ? null
        : <ClearButton onClick={() => dispatch(clearCompleted())}>Clear completed</ClearButton>
      }
    </StyledFooter>
  )
}
