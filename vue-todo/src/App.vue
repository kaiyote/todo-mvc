<template>
  <div class="todoApp">
    <header>
      <h1>todos</h1>
      <input class="newTodo" autofocus v-model="newTodo" @keyup.enter.prevent="makeNewTodo" placeholder="What needs to be done?" />
    </header>
    <router-view :todos="todos" :toggle-all="toggleAll" :toggle="toggle" :edit="edit" :destroy="destroy" :editing="editing" :save="save" :cancel="cancel" />
    <TodoFooter :count="activeCount" :completed-count="completedCount" :clear="clearCompleted" />
  </div>
</template>

<script>
import TodoFooter from '@/components/TodoFooter.vue'

export default {
  name: 'app',
  components: {
    TodoFooter
  },
  data () {
    return {
      todos: [],
      editing: null,
      newTodo: ''
    }
  },
  computed: {
    activeCount () {
      return this.todos.filter(x => !x.completed).length
    },
    completedCount () {
      return this.todos.filter(x => x.completed).length
    }
  },
  methods: {
    makeNewTodo () {
      const newTodoText = this.newTodo.trim()
      if (newTodoText) {
        this.newTodo = ''

        this.todos.push({
          id: Math.max(...this.todos.map(x => x.id), 0) + 1,
          completed: false,
          title: newTodoText
        })
      }
    },
    clearCompleted () {
      this.todos = this.todos.filter(x => !x.completed)
    },
    toggleAll (event) {
      this.todos = this.todos.map(x => { x.completed = event.target.checked; return x })
    },
    toggle (id) {
      this.todos = this.todos.map(x => { x.completed = x.id === id ? !x.completed : x.completed; return x })
    },
    edit (id) {
      this.editing = id
    },
    destroy (id) {
      this.todos = this.todos.filter(x => x.id !== id)
      this.cancel()
    },
    save (id, text) {
      this.todos = this.todos.map(x => { x.title = x.id === id ? text : x.title; return x })
      this.cancel()
    },
    cancel () {
      this.editing = null
    }
  }
}
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
