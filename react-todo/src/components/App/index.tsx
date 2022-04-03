import Header from '../Header'
import TodoList from '../TodoList'
import Footer from '../Footer'
import { GlobalStyle, TodoApp } from './App.styles'

const App = () =>
  <>
    <GlobalStyle />
    <TodoApp>
      <Header />
      <TodoList />
      <Footer />
    </TodoApp>
  </>

export default App
