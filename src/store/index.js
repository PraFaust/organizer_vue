import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: "en",
  },
  getters: {
    LANGUAGE: state=>{
      return state.language;
    },
  },
  mutations: {
    SET_LANGUAGE: (state, payload) => {
      state.language = payload;
    },
  },
  actions: {
    CHANGE_LANGUAGE: (context, payload) => {
      context.commit('SET_LANGUAGE', payload);
    },
  },
  modules: {
  }
})
