import { html, css, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { connect } from 'pwa-helpers'
import { VisibilityFilter } from '../actions'
import { State } from '../reducers'
import { store } from '../store'
import './todo-filter'

const filterMap: Record<VisibilityFilter, string> = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
}

@customElement('todo-footer')
export class TodoFooter extends connect(store)(LitElement) {
  @state() count!: number
  @state() completed!: number
  @state() filter!: VisibilityFilter

  stateChanged (state: State) {
    this.count = state.todos.filter(x => !x.completed).length
    this.completed = state.todos.filter(x => x.completed).length
    this.filter = state.visibilityFilter
  }

  render () {
    return when(this.completed > 0 || this.count > 0,
      () => html`
        <footer>
          <span class='count'>
            <strong>${this.count}</strong> ${this.pluralize('item')} left
          </span>
          <ul>
            ${Object.entries(filterMap).map(([filter, label]) => html`
              <li>
                <todo-filter filter=${filter}>${label}</todo-filter>
              </li>
            `)}
          </ul>
          ${when(this.completed > 0, () => html`<button>Clear completed</button>`)}
        </footer>
      `
    )
  }

  private pluralize (word: string) {
    return this.count === 1 ? word : word + 's'
  }

  static styles = css`
    :host {
      display: block;
    }

    footer {
      color: #777;
      padding: 10px 15px;
      height: 20px;
      text-align: center;
      border-top: 1px solid #e6e6e6;
    }

    footer:before {
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

    .count {
      float: left;
      text-align: left;
    }

    .count > strong {
      font-weight: bold;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      position: absolute;
      right: 0;
      left: 0;
    }

    li {
      display: inline;
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
      float: right;
      position: relative;
      line-height: 20px;
      text-decoration: none;
      cursor: pointer;
    }

    button:hover {
      text-decoration: underline;
    }
  `
}
