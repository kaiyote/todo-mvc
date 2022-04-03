import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import './components/todo-header'
import './components/todo-list'
import './components/todo-footer'

@customElement('todo-app')
export class TodoApp extends LitElement {
  render () {
    return html`
      <todo-header></todo-header>
      <todo-list></todo-list>
      <todo-footer></todo-footer>
    `
  }

  static styles = css`
    :host {
      background: #fff;
      margin: 130px 0 40px 0;
      position: relative;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
      display: block;
    }
  `
}
