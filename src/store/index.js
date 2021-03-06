import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: localStorage.getItem('lang') || "en",
    token: localStorage.getItem('token') || '',
    user : {
      valid: localStorage.getItem('valid'),
      name: localStorage.getItem('last_user'),
      token: localStorage.getItem('token'),
    },
    widgetList: [],
  },
  getters: {
    LANGUAGE: state=>{
      return state.language;
    },
    USER: state=>{
      return state.user;
    },
    WIDGET: state =>{
      return state.widgetList;
    },
  },
  mutations: {
    SET_LANGUAGE: (state, payload) => {
      state.language = payload;
    },
    SET_USER: (state, payload) => {
      state.user = payload;
      localStorage.setItem('token', state.user.token);
    },
    SET_WIDGET:(state, payload)=>{
      state.widgetList.push(payload);
      localStorage.setItem('wl', state.widgetList);
    },
    DLT_WIDGET: (state, payload) => {
      Vue.set(state.widgetList, payload.id, undefined);
      localStorage.setItem('wl', state.widgetList);
    },

  },
  actions: {
    CHANGE_LANGUAGE: (context, payload) => {
      context.commit('SET_LANGUAGE', payload);
    },
    ADD_USER: (context, payload) => {
      context.commit('SET_USER', payload);
    },
    ADD_WIDGET: (context, payload) => {
      context.commit('SET_WIDGET', payload);
    },
    DEL_WIDGET: (context, payload) => {
      context.commit('DLT_WIDGET', payload);
    },

  },
  modules: {
  }
})
