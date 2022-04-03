import {
  AddAction, ADD_TODO, CANCEL, CancelAction, ClearAction, CLEAR_COMPLETED,
  DeleteAction, DELETE_TODO, EDIT, EditAction, SAVE, SaveAction, SET_VISIBILITY_FILTER,
  ToggleAction, ToggleAllAction, TOGGLE_ALL, TOGGLE_TODO, VisibilityAction,
  VisibilityFilter
} from './types'

export function addTodo (text: string): AddAction {
  return { type: ADD_TODO, text }
}

export function toggleTodo (index: number): ToggleAction {
  return { type: TOGGLE_TODO, index }
}

export function toggleAll (setting: boolean): ToggleAllAction {
  return { type: TOGGLE_ALL, setting }
}

export function deleteTodo (index: number): DeleteAction {
  return { type: DELETE_TODO, index }
}

export function setVisibilityFilter (filter: VisibilityFilter): VisibilityAction {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function edit (index: number): EditAction {
  return { type: EDIT, index }
}

export function save (index: number, text: string): SaveAction {
  return { type: SAVE, index, text }
}

export function cancel (): CancelAction {
  return { type: CANCEL }
}

export function clearCompleted (): ClearAction {
  return { type: CLEAR_COMPLETED }
}

export * from './types'
