import { combineReducers } from 'redux'
import { VisibilityFilter } from '../actions'
import * as reducers from './reducers'
import { Todo } from './types'

const rootReducer = combineReducers(reducers)

export default rootReducer

export interface State {
  visibilityFilter: VisibilityFilter
  todos: Todo[]
  editing: number
}
