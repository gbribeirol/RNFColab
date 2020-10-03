import Vue from 'vue'
import Store from 'src/store'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)
const $store = new Store()

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const withoutAuthentication = '/auth/loginForm,/auth/newEmailAccount,/auth/recoverEmailPassword,/pages/versaoErrada,/formulas'

    if (to.path === '/') {
      next('/home')
      // next('/auth/loginForm')
    } else if ($store.state.auth.user || withoutAuthentication.includes(to.path)) {
      next()
    } else {
      next('/auth/loginForm')
    }
  })

  return Router
}
