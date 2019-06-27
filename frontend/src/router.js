import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import List from './components/List.vue'
import Category from './components/Category.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // Remove hashbang
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/category/:name',
      name: 'category',
      component: Category,
      canReuse: false
    }
  ]
})
