<template>
  <footer class="footer" v-if="active || completed">
    <span class="todoCount"><strong>{{active}}</strong> {{pluralize(active, 'item')}} left</span>
    <ul class="filters">
      <li class="filter"><FilterLink :filterType='SHOW_ALL'>All</FilterLink></li>
      <li class="filter"><FilterLink :filterType='SHOW_ACTIVE'>Active</FilterLink></li>
      <li class="filter"><FilterLink :filterType='SHOW_COMPLETED'>Completed</FilterLink></li>
    </ul>
    <button v-if="completed > 0" class="clearButton" @click="clearCompleted">Clear Completed</button>
  </footer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapMutations, mapState } from 'vuex'
import { State } from '../store/types'
import FilterLink from './FilterLink.vue'

export default defineComponent({
  name: 'todoFooter',
  components: {
    FilterLink
  },
  computed: {
    SHOW_ALL: () => 'SHOW_ALL',
    SHOW_COMPLETED: () => 'SHOW_COMPLETED',
    SHOW_ACTIVE: () => 'SHOW_ACTIVE',
    ...mapState<State>({
      active: (state: State) => state.todos.filter(x => !x.completed).length,
      completed: (state: State) => state.todos.filter(x => x.completed).length
    })
  },
  methods: {
    pluralize (count: number, word: string) {
      return count === 1 ? word : word + 's'
    },
    ...mapMutations([
      'clearCompleted'
    ])
  }
})
</script>

<style lang="scss" scoped>
.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                0 8px 0 -3px #f6f6f6,
                0 9px 1px -3px rgba(0, 0, 0, 0.2),
                0 16px 0 -6px #f6f6f6,
                0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
}

.todoCount {
  float: left;
  text-align: left;

  & strong {
    font-weight: 300;
  }
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filter {
  display: inline;

  & a,
  & span {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      border-color: rgba(175, 47, 47, 0.1);
    }
  }

  & span {
    border-color: rgba(175, 47, 47, 0.2);
  }
}

.clearButton {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
