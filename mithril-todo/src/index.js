import store from './store'
import App from './components/App'

var redraw = () => {
  m.render(document.body, m(App, store.getState()))
  return redraw
}

store.subscribe(redraw())
