import { html, css, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { repeat } from 'lit/directives/repeat.js'
import { connect } from 'pwa-helpers'
import { toggleAll } from '../actions'
import { State } from '../reducers'
import { Todo } from '../reducers/types'
import { store } from '../store'
import './todo-item'

@customElement('todo-list')
export class TodoList extends connect(store)(LitElement) {
  @state() editing!: number
  @state() todos!: Todo[]
  @state() activeTodos!: number

  stateChanged(state: State): void {
    this.editing = state.editing
    this.todos = this.visibleTodos(state)
    this.activeTodos = state.todos.filter(x => !x.completed).length
  }

  render () {
    return when(this.todos.length > 0, () => html`
      <section>
        <input id='toggle-all' type='checkbox' .checked=${this.activeTodos === 0} @change=${this.toggleAll} />
        <label for='toggle-all'></label>
        <ul>
          ${repeat(this.todos, t => t.id, t => html`<todo-item index=${t.id} text=${t.text} ?completed=${t.completed} ?editing=${t.id === this.editing}></todo-item>`)}
        </ul>
      </section>
    `)
  }

  private visibleTodos (state: State) {
    switch (state.visibilityFilter) {
      case 'SHOW_COMPLETED':
        return state.todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return state.todos.filter(t => !t.completed)
      default:
        return state.todos
    }
  }

  private toggleAll (e: any) {
    store.dispatch(toggleAll(e.target.checked))
  }

  static styles = css`
    :host {
      display: block;
    }

    section {
      position: relative;
      z-index: 2;
      border-top: 1px solid #e6e6e6;
    }

    input {
      width: 1px;
      height: 1px;
      border: none;
      opacity: 0;
      position: absolute;
      right: 100%;
      bottom: 100%;
    }

    input + label {
      width: 60px;
      height: 34px;
      font-size: 0;
      position: absolute;
      top: -52px;
      left: -13px;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }

    input + label:before {
      content: '❯';
      font-size: 22px;
      color: #e6e6e6;
      padding: 10px 27px 10px 27px;
    }

    input:checked + label:before {
      color: #737373;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `
}
