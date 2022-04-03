<template>
  <div class="todoApp">
    <header>
      <h1>todos</h1>
      <input class="newTodo" autofocus v-model="newTodo" @keyup.enter.prevent="addTodo(newTodo); newTodo = ''" placeholder="What needs to be done?" />
    </header>
    <TodoList />
    <TodoFooter />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import TodoFooter from './components/TodoFooter.vue'
import TodoList from './views/TodoList.vue'

export default defineComponent({
  name: 'app',
  components: {
    TodoFooter,
    TodoList
  },
  data () {
    return {
      newTodo: ''
    }
  },
  methods: mapMutations([
    'addTodo'
  ])
})
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

body {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}

:focus {
  outline: 0;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  appearance: none;
  -webkit-appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hidden {
  display: none;
}
</style>

<style lang="scss" scoped>
.todoApp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  & input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  & h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    text-rendering: optimizeLegibility;
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
  }
}

.newTodo {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 16px 16px 16px 60px;
  background: rgba(0, 0, 0, 0.03);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscaled;
}
</style>
