const todos = {
  addTodo (state, text) {
    const val = text.trim()
    if (!val) return

    state.todos = [...state.todos, {
      id: Math.max(...state.todos.map(x => x.id), 0) + 1,
      text: val,
      completed: false
    }]
    state.editing = null
  },

  toggleTodo (state, index) {
    state.todos = state.todos.map(todo => todo.id === index ? { ...todo, completed: !todo.completed } : todo)
  },

  toggleAll (state, setting) {
    state.todos = state.todos.map(todo => { todo.completed = setting; return todo })
  },

  deleteTodo (state, index) {
    state.todos = state.todos.filter(todo => todo.id !== index)
    state.editing = null
  },

  saveTodo (state, { index, text }) {
    state.todos = state.todos.map(todo => todo.id === index ? { ...todo, text: text } : todo)
    state.editing = null
  },

  clearCompleted (state) {
    state.todos = state.todos.filter(todo => !todo.completed)
  }
}

export default todos
