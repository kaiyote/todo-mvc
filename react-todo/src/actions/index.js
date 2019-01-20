export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const TOGGLE_ALL = 'TOGGLE_ALL'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT = 'EDIT'
export const SAVE = 'SAVE'
export const CANCEL = 'CANCEL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addTodo (text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo (index) {
  return { type: TOGGLE_TODO, index }
}

export function toggleAll (setting) {
  return { type: TOGGLE_ALL, setting }
}

export function deleteTodo (index) {
  return { type: DELETE_TODO, index }
}

export function setVisibilityFilter (filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function edit (index) {
  return { type: EDIT, index }
}

export function save (index, text) {
  return { type: SAVE, index, text }
}

export function cancel () {
  return { type: CANCEL }
}

export function clearCompleted () {
  return { type: CLEAR_COMPLETED }
}
