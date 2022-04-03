export interface Todo {
  id: number
  text: string
  completed: boolean
}

export type VisibilityFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE'

export interface State {
  editing?: number
  todos: Todo[]
  visibilityFilter: VisibilityFilter
}
