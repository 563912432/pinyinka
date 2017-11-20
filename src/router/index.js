import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import list from '@/components/list'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/list/:cid',
      name: 'list',
      component: list
    },
    {
      path: '/d/:id/:cid',
      name: 'd',
      component: detail
    }
  ]
})