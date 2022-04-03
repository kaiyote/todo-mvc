import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import rootReducer from './reducers'

const store = createStore(rootReducer)
const root = createRoot(document.getElementById('root')!)

root.render(<Provider store={store}><App /></Provider>)
