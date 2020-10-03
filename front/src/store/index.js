import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import { stores as moduleStores } from '../modules'
import { vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state,
    getters,
    // mutations,
    mutations: {
      ...vuexfireMutations,
      ...mutations
    },
    actions,
    modules: {
      ...moduleStores
    }
  })

  return Store
}
