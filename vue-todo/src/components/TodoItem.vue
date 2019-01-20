<template>
  <li class="todo" :class="{completed: todo.completed}">
    <input v-if="editing" v-model="editText" class="todoEdit" @blur="preSave()" @keyup.escape="keyUp(true)" @keyup.enter="keyUp(false)" />
    <div v-else>
      <input type="checkbox" class="toggle" :checked="todo.completed" @change="toggleTodo(todo.id)">
      <label @dblclick="edit(todo.id)">{{todo.text}}</label>
      <button class="todoDestroy" @click="deleteTodo(todo.id)"></button>
    </div>
  </li>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'todoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editText: ''
    }
  },
  computed: mapState({
    editing (state) {
      return state.editing === this.todo.id
    }
  }),
  methods: {
    preSave () {
      const val = this.editText.trim()
      if (val) {
        this.saveTodo({ index: this.todo.id, text: val })
      } else {
        this.deleteTodo(this.todo.id)
      }
    },
    keyUp (isCancel) {
      if (isCancel) {
        this.editText = this.todo.text
        this.cancel()
      } else {
        this.preSave()
      }
    },
    ...mapMutations([
      'toggleTodo',
      'deleteTodo',
      'saveTodo',
      'edit',
      'cancel'
    ])
  },
  created () {
    this.editText = this.todo.text
  }
}
</script>

<style lang="scss" scoped>
.todo {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;

  &:last-child {
    border-bottom: none;
  }

  &.editing {
    border-bottom: none;
    padding: 0;

    &:last-child {
      margin-bottom: -1px;
    }
  }

  & label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }

  &.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }
}

.todoEdit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todoDestroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;

  &:hover {
    color: #af5b5e;
  }

  &:after {
    content: '×';
  }

  li:hover & {
    display: block;
  }
}

.toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
  opacity: 0;

  & + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center left;
  }

  &:checked + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
  }
}
</style>
