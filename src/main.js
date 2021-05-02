import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import translate from './utils/translate.js'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import $ from 'jquery'

global.jQuery = $
global.$ = $

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  translate,
  render: h => h(App)
}).$mount('#app')
