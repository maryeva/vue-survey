import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import Personalise from '@/components/Personalise/index.js'

import DefaultLayout from '@/layout/DefaultLayout'
import NotFound from '@/layout/NotFound'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'personalise',
      component: Personalise.views.Personalise,
      meta: {
        layout: DefaultLayout
      },
      children: [
        {
          name: 'build',
          path: 'personalise',
          component: Personalise.connectors.Build,
          meta: {
            layout: DefaultLayout
          }
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      meta: {
        layout: NotFound
      }
    }
  ]
})

export default router
