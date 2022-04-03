export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const TOGGLE_ALL = 'TOGGLE_ALL'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT = 'EDIT'
export const SAVE = 'SAVE'
export const CANCEL = 'CANCEL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export type VisibilityFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE'

export interface AddAction {
  type: typeof ADD_TODO
  text: string
}

export interface ToggleAction {
  type: typeof TOGGLE_TODO
  index: number
}

export interface ToggleAllAction {
  type: typeof TOGGLE_ALL
  setting: boolean
}

export interface DeleteAction {
  type: typeof DELETE_TODO
  index: number
}

export interface VisibilityAction {
  type: typeof SET_VISIBILITY_FILTER
  filter: VisibilityFilter
}

export interface EditAction {
  type: typeof EDIT
  index: number
}

export interface SaveAction {
  type: typeof SAVE
  index: number
  text: string
}

export interface CancelAction {
  type: typeof CANCEL
}

export interface ClearAction {
  type: typeof CLEAR_COMPLETED
}

export type Actions
  = AddAction
  | ToggleAction
  | ToggleAllAction
  | DeleteAction
  | VisibilityAction
  | EditAction
  | SaveAction
  | CancelAction
  | ClearAction

export type TodoActions
  = AddAction
  | ToggleAction
  | ToggleAllAction
  | DeleteAction
  | ClearAction
  | SaveAction

export type OtherActions
  = EditAction
  | SaveAction
  | CancelAction
