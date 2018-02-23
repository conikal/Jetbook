import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import flight from './modules/flight'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    flight
  },
  strict: process.env.NODE_ENV !== 'production'
})
