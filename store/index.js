import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import axios from 'axios'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const urlApi = 'https://5f07df0c9c5c2500163073e9.mockapi.io/messages'

const store = () =>
  new Vuex.Store({
    plugins: [
      createPersistedState({
        paths: ['userName', 'isLogin'],
        storage: {
          getItem: (key) => Cookies.get(key),
          setItem: (key, value) => Cookies.set(key, value),
          removeItem: (key) => Cookies.remove(key),
        },
      }),
    ],
    state: {
      messages: [],
      userName: '',
      isLogin: '',
      error: false,
    },
    mutations: {
      setLogin: (state, userName) => {
        state.userName = userName
        state.isLogin = true
      },

      setError: (state, bool) => (state.error = bool),

      setLogout: (state) => {
        state.userName = ''
        state.error = false
        state.isLogin = false
      },
      setMessages: (state, data) => (state.messages = data),
    },
    actions: {
      async getMessages({ commit }) {
        try {
          let { data } = await axios.get(urlApi)
          commit('setMessages', data)
        } catch (e) {
          console.log(e)
        }
      },
      async postMessage({ state, commit }, text) {
        const { userName } = state
        try {
          if (text.length > 0) {
            await axios.post(urlApi, { userName, text })
            commit('setError', false)
          } else {
            commit('setError', true)
          }
        } catch (e) {
          console.log(e)
        }
      },
    },
    getters: {
      isLogin: (state) => state.isLogin,
      error: (state) => state.error,
    },
  })

export default store
