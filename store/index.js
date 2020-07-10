import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const urlApi = 'https://5f07df0c9c5c2500163073e9.mockapi.io/'

const store = () =>
  new Vuex.Store({
    state: {
      userName: '',
      messages: [],
      error: false,
      isLogin: false,
    },
    mutations: {
      setMessages(state, data) {
        state.messages = data
      },
      setLogin(state, userName) {
        state.userName = userName
        state.isLogin = true
      },
      setError(state, bool) {
        state.error = bool
      },
      setLogout(state) {
        state.userName = ''
        state.error = false
        state.messages = []
        state.isLogin = false
      },
    },
    actions: {
      async getMessages({ commit }) {
        try {
          let { data } = await axios.get(urlApi + '/messages')
          commit('setMessages', data)
        } catch (e) {
          console.log(e)
        }
      },
      async postMessage({ state, commit }, text) {
        const { userName } = state.userName
        try {
          if (text.length > 0) {
            await axios.post(urlApi + '/messages', { userName, text })
            commit('setError', false)
          } else {
            commit('setError', true)
          }
        } catch (e) {
          console.log(e)
        }
      },
    },
  })

export default store
