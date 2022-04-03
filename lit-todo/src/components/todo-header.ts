import { html, css, LitElement } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import { connect } from 'pwa-helpers'
import { addTodo } from '../actions'
import { store } from '../store'

@customElement('todo-header')
export class TodoHeader extends connect(store)(LitElement) {
  @query('input', true) input!: HTMLInputElement

  render () {
    return html`
      <header>
        <h1>todos</h1>
        <input autofocus placeholder='What needs to be done?' @keyup=${this.submit} />
      </header>
    `
  }

  private submit (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (this.input.value.trim().length === 0) return
      store.dispatch(addTodo(this.input.value))
      this.input.value = ''
    }
  }

  static styles = css`
    :host {
      display: block;
    }

    input {
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

    input:focus { outline: none; }

    input::-webkit-input-placeholder,
    input::-moz-placeholder,
    input::input-placeholder {
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;
    }

    h1 {
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
  `
}
