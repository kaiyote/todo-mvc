import Vue from 'vue'
import Router from 'vue-router'
import TodoList from './views/TodoList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoList,
      props: route => ({ location: route.path })
    },
    {
      path: '/active',
      name: 'active',
      component: TodoList,
      props: route => ({ location: route.path })
    },
    {
      path: '/completed',
      name: 'completed',
      component: TodoList,
      props: route => ({ location: route.path })
    }
  ]
})
