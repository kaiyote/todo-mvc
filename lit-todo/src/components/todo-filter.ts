import { html, css, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { connect } from 'pwa-helpers'
import { setVisibilityFilter, VisibilityFilter } from '../actions'
import { State } from '../reducers'
import { store } from '../store'

@customElement('todo-filter')
export class TodoFilter extends connect(store)(LitElement) {
  @property() filter!: VisibilityFilter

  @state() activeFilter!: VisibilityFilter

  stateChanged(state: State) {
    this.activeFilter = state.visibilityFilter
  }

  render () {
    return when(
      this.activeFilter !== this.filter,
      () => html`
        <a href='_blank' @click=${this.filterClick}><slot></slot></a>
      `,
      () => html`<span><slot></slot></span>`
    )
  }

  private filterClick (e: MouseEvent) {
    e.preventDefault()
    store.dispatch(setVisibilityFilter(this.filter))
  }

  static styles = css`
    :host {
      display: inline-block;
    }

    a,
    span {
      color: inherit;
      margin: 3px;
      padding: 3px 7px;
      text-decoration: none;
      border: 1px solid transparent;
      border-radius: 3px;
      cursor: pointer;
    }

    a:hover,
    span:hover {
      border-color: rgba(175, 47, 47, 0.1);
    }

    span {
      border-color: rgba(175, 47, 47, 0.2);
    }
  `
}
