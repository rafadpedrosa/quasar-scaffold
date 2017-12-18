import {request} from '../actions'
import router from '../../router'

// initial state
const state = {
  permissions: [],
  isLoggedIn: false,
  persona: {}
}

// getters
const getters = {
}

// actions
const actions = {
  modell_all ({commit}) {
    return request().get('/modells')
  },
  modell_store ({commit}, data) {
    return request().post('/modell', {
      login: data.login,
      email: data.email
    })
  },
  modell_show ({commit}, id) {
    return request().get('/modell/' + id)
  },
  modell_edit ({commit}, modell) {
    return request().get('/modell/' + modell.id + '/edit')
  },
  modell_update ({commit}, data) {
    return request().put('/modell/' + data.id, {
      login: data.login,
      email: data.email
    })
  },
  modell_patch ({commit}, data) {
    return request().patch('/modell/' + data.id, {
      data
    })
  },
  modell_delete ({commit}, id) {
    return request().delete('/modell/' + id)
  }
}

// mutations
const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
