import kiwi from './../api/kiwi'
import axios from 'axios';

const flight = {
  state: {
    params: {},
    places: [],
    results: []
  },
  actions: {
    setParams ({ commit }, payload) {
      commit('SET_PARAMS', payload)
    },
    addParams ({ commit }, payload) {
      commit('ADD_PARAMS', payload)
    },
    delParams ({ commit }, payload) {
      commit('DEL_PARAMS', payload)
    },
    getPlaces ({ commit }, payload) {
      kiwi.places(payload)
        .then((response) => {
          let places = {}
          places = response.data
          commit('FETCH_PLACES', places)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getFlights ({ commit }, payload) {
      if (payload.filter === false) {
        commit('FETCH_FLIGHTS', '')
      }

      kiwi.search(payload.params)
        .then((response) => {
          let results = {}
          results = response.data
          console.log(response)
          commit('FETCH_FLIGHTS', results)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mutations: {
    'SET_PARAMS' (state, params) {
      state.params = params
    },
    'ADD_PARAMS' (state, params) {
      Object.assign(state.params, params)
    },
    'DEL_PARAMS' (state, params) {
      delete state.params[params]
    },
    'FETCH_PLACES' (state, places) {
      state.places = places
    },
    'FETCH_FLIGHTS' (state, results) {
      state.results = results
    }
  }
}

export default flight
