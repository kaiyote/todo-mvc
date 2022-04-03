import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { classMap } from 'lit/directives/class-map.js'
import { cancel, deleteTodo, edit, save, toggleTodo } from '../actions'
import { store } from '../store'

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
}

type HTMLElementKeyboardEvent<T extends HTMLElement> = KeyboardEvent & {
  target: T
}

@customElement('todo-item')
export class TodoItem extends LitElement {
  @property({ type: Number }) index!: number

  @property({ type: Boolean }) completed!: boolean

  @property() text!: string

  @property({ type: Boolean }) editing!: boolean

  render () {
    return html`
      <li class=${classMap({ completed: this.completed, editing: this.editing })}>
        ${when(
          this.editing,
          () => html`<input class='edit' value=${this.text} @blur=${this.save} @keydown=${this.editKeyDown} />`,
          () => html`
            <div>
              <input class='toggle' type='checkbox' .checked=${this.completed} @change=${this.toggle} />
              <label @dblclick=${this.edit}>${this.text}</label>
              <button @click=${this.destroy}></button>
            </div>
          `
        )}
      </li>
    `
  }

  private save (e: HTMLElementEvent<HTMLInputElement>) {
    const val = e.target.value.trim()
    if (val.length === 0) {
      store.dispatch(cancel())
      this.destroy()
    } else {
      store.dispatch(save(this.index, val))
    }
  }

  private editKeyDown (e: HTMLElementKeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      store.dispatch(cancel())
    } else if (e.key === 'Enter') {
      this.save(e)
    }
  }

  private toggle () {
    store.dispatch(toggleTodo(this.index))
  }

  private edit () {
    store.dispatch(edit(this.index))
  }

  private destroy () {
    store.dispatch(deleteTodo(this.index))
  }

  static styles = css`
    :host {
      display: block;
    }

    li {
      position: relative;
      font-size: 24px;
      border-bottom: 1px solid #ededed;
    }

    li:last-child {
      border-bottom: none;
    }

    li.editing {
      border-bottom: none;
      padding: 0;
    }

    li.editing:last-child {
      margin-bottom: -1px;
    }

    li.completed label {
      color: #d9d9d9;
      text-decoration: line-through;
    }

    label {
      word-break: break-all;
      padding: 15px 15px 15px 60px;
      display: block;
      line-height: 1.2;
      transition: color 0.4s;
    }

    input.edit {
      display: block;
      width: 506px;
      padding: 12px 16px;
      margin: 0 0 0 43px;
    }

    input.toggle {
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
    }

    input.toggle + label {
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
      background-repeat: no-repeat;
      background-position: center left;
    }

    input.toggle:checked + label {
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
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
    }

    button:hover {
      color: #af5b5e;
    }

    button:after {
      content: '×';
    }

    li:hover button {
      display: block;
    }
  `
}
