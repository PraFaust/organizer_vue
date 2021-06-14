import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: "en",
    token: localStorage.getItem('token') || '',
    user : {
      valid: localStorage.getItem('valid'),
      name: localStorage.getItem('last_user'),
    },
  },
  getters: {
    LANGUAGE: state=>{
      return state.language;
    },
    USER: state=>{
      return state.user;
    }
  },
  mutations: {
    SET_LANGUAGE: (state, payload) => {
      state.language = payload;
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    },
  },
  actions: {
    CHANGE_LANGUAGE: (context, payload) => {
      context.commit('SET_LANGUAGE', payload);
    },
    ADD_USER: (context, payload) => {
      context.commit('SET_USER', payload);
    },
  },
  modules: {
  }
})
