import { createStore } from 'vuex'
import { State } from './types'
import * as editing from './editing'
import * as todos from './todos'
import * as visibilityFilter from './visibilityFilter'

console.log(todos)

export default createStore<State>({
  state: {
    visibilityFilter: 'SHOW_ALL',
    todos: [],
    editing: undefined
  },
  mutations: {
    ...editing,
    ...todos,
    ...visibilityFilter
  }
})
