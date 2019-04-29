import { ADD_TODO, CLEAR_COMPLETED, DELETE_TODO, EDIT, SAVE, SET_VISIBILITY_FILTER, TOGGLE_ALL, TOGGLE_TODO, VisibilityFilters, CANCEL } from '../actions'
const { SHOW_ALL } = VisibilityFilters

export function visibilityFilter (state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER: return action.filter
    default: return state
  }
}

export function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: Math.max(...state.map(x => x.id), 0) + 1,
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map(todo => todo.id === action.index ? { ...todo, completed: !todo.completed } : todo)
    case TOGGLE_ALL:
      return state.map(todo => { todo.completed = action.setting; return todo })
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.index)
    case SAVE:
      return state.map(todo => todo.id === action.index ? { ...todo, text: action.text } : todo)
    case CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed)
    default:
      return state
  }
}

export function editing (state = null, action) {
  switch (action.type) {
    case EDIT:
      return action.index
    case SAVE:
    case CANCEL:
      return null
    default:
      return state
  }
}
