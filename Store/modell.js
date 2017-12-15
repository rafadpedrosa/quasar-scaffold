import axiosCreate from 'axios'
import * as constant from '../const'

const axios = axiosCreate.create({
  baseURL: constant.API_URL,
  header: generalActions.getToken(),
  timeout: 10000
})

// initial state
const state = {}

// getters
const getters = {
  // modellForm: state => state.modell
}

// actions
const actions = {
  modell_all ({commit}) {
    return axios.get('/modells')
  },
  modell_store ({commit}, data) {
    return axios.post('/modell', {
      name: data.name,
      alias: data.alias
    })
  },
  modell_show ({commit}, id) {
    return axios.get('/modell/' + id)
  },
  modell_edit ({commit}, modell) {
    return axios.get('/modell/' + modell.id + '/edit')
  },
  modell_update ({commit}, data) {

    return axios.put('/modell/' + data.id, {
      name: data.name,
      alias: data.alias
    })
  },
  modell_patch ({commit}, data) {
    return axios.patch('/modell/' + data.id, {
      data
    })
  },
  modell_delete ({commit}, id) {
    return axios.delete('/modell/' + id)
  }
}

// mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
