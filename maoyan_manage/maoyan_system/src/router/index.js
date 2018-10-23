import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'


import user from '@/components/user/user.vue'
import cinema from '@/components/cinema/cinema.vue'
import match from '@/components/match/match.vue'
import matchcinema from '@/components/match/match_cinema.vue'
import movies from '@/components/movies/movies.vue'
import order from '@/components/order/order.vue'
import playing from '@/components/playing/playing.vue'
import wait from '@/components/wait/wait.vue'

import login from '@/components/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [{
        path: 'user',
        name: 'user',
        component: user,
      }, {
        path: 'cinema',
        name: 'cinema',
        component: cinema,
      }, {
        path: 'match',
        name: 'match',
        component: match,
      }, {
        path: 'matchcinema',
        component: matchcinema
      }, {
        path: 'movies',
        name: 'movies',
        component: movies,
      }, {
        path: 'order',
        name: 'order',
        component: order,
      }, {
        path: 'playing',
        name: 'playing',
        component: playing,
      }, {
        path: 'wait',
        name: 'wait',
        component: wait,
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
