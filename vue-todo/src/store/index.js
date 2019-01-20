import Vue from 'vue'
import Vuex from 'vuex'
import editing from './editing'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    visibilityFilter: 'SHOW_ALL',
    todos: [],
    editing: null
  },
  mutations: {
    ...editing,
    ...todos,
    ...visibilityFilter
  }
})

export default store
