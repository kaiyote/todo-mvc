<template>
  <section class="section">
    <input class="toggle" id='toggle-all' type='checkbox' @change="toggleAll" :checked="isToggled" />
    <label for='toggle-all' />
    <ul class="todos">
      <TodoItem v-for="todo in todosToShow" :key="todo.id" :todo="todo" :editing="editing === todo.id" :edit="edit" :destroy="destroy" :toggle="toggle" :save="save" :cancel="cancel" />
    </ul>
  </section>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'

export default {
  name: 'todoList',
  components: {
    TodoItem
  },
  props: {
    toggleAll: {
      type: Function,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    },
    editing: {
      type: Number,
      required: false
    },
    edit: {
      type: Function,
      required: true
    },
    destroy: {
      type: Function,
      required: true
    },
    toggle: {
      type: Function,
      required: true
    },
    save: {
      type: Function,
      required: true
    },
    cancel: {
      type: Function,
      required: true
    }
  },
  computed: {
    isToggled () {
      return this.todos.filter(x => !x.completed).length === 0
    },
    todosToShow () {
      return this.location === '/completed'
        ? this.todos.filter(x => x.completed)
        : this.location === '/active'
          ? this.todos.filter(x => !x.completed)
          : this.todos
    }
  }
}
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
