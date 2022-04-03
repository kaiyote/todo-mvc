import { State } from "./types"

export function addTodo (state: State, text: string) {
  const val = text.trim()
    if (!val) return

    state.todos = [...state.todos, {
      id: Math.max(...state.todos.map(x => x.id), 0) + 1,
      text: val,
      completed: false
    }]
    state.editing = undefined
}

export function toggleTodo (state: State, index: number) {
  state.todos = state.todos.map(todo => todo.id === index ? { ...todo, completed: !todo.completed } : todo)
}

export function toggleAll (state: State, setting: boolean) {
  state.todos = state.todos.map(todo => { todo.completed = setting; return todo })
}

export function deleteTodo (state: State, index: number) {
  state.todos = state.todos.filter(todo => todo.id !== index)
  state.editing = undefined
}

export function saveTodo (state: State, { index, text }: { index: number, text: string }) {
  state.todos = state.todos.map(todo => todo.id === index ? { ...todo, text: text } : todo)
  state.editing = undefined
}

export function clearCompleted (state: State) {
  state.todos = state.todos.filter(todo => !todo.completed)
}
