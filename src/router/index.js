import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home/Home'
import Songs from '@/views/Songs/Songs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/songs/:id',
      name: 'songs',
      component: Songs
    }
  ]
})
