<template>
  <section class="section">
    <input class="toggle" id='toggle-all' type='checkbox' @change="event => toggleAll(event.target.checked)" :checked="isToggled" />
    <label for='toggle-all' />
    <ul class="todos">
      <TodoItem v-for="todo in todosToShow" :key="todo.id" :todo="todo" />
    </ul>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
import TodoItem from '../components/TodoItem.vue'
import { State } from '../store/types'

export default defineComponent({
  name: 'todoList',
  components: {
    TodoItem
  },
  computed: mapState<State>({
    isToggled (state: State) {
      return state.todos.filter(x => !x.completed).length === 0
    },
    todosToShow (state: State) {
      return state.visibilityFilter === 'SHOW_COMPLETED'
        ? state.todos.filter(x => x.completed)
        : state.visibilityFilter === 'SHOW_ACTIVE'
          ? state.todos.filter(x => !x.completed)
          : state.todos
    }
  }),
  methods: mapMutations([
    'toggleAll'
  ])
})
</script>

<style lang="scss" scoped>
.section {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.toggle {
  width: 1px;
  height: 1px;
  border: none;
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;

  & + label {
    width: 60px;
    height: 34px;
    font-size: 0;
    position: absolute;
    top: -52px;
    left: -13px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);

    &:before {
      content: '❯';
      font-size: 22px;
      color: #e6e6e6;
      padding: 10px 27px 10px 27px;
    }
  }

  &:checked + label:before {
    color: #737373;
  }
}

.todos {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
