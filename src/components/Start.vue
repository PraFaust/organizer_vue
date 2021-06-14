<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info" :sticky="true">
    <b-navbar-brand href="#" @click="go_main()">Organizer</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/about">{{this.get_text('txt_about_h')}}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="get_text('txt_lang_h')" right>
          <b-dropdown-item-button @click="lang_set('en')">EN</b-dropdown-item-button>
          <b-dropdown-item-button @click="lang_set('ru')">RU</b-dropdown-item-button>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown :text="get_text('txt_user_h')" right>
          <b-dropdown-item-button v-if="check_user.valid" @click="go_profile()">{{this.get_text('txt_profile_h')}}</b-dropdown-item-button>
          <b-dropdown-item-button v-if="check_user.valid" @click="sign_out()">{{this.get_text('txt_signOut_h')}}</b-dropdown-item-button>
          <b-dropdown-item-button v-if="!check_user.valid" @click="sign_in()">{{this.get_text('txt_signIn_h')}}</b-dropdown-item-button>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- Page content -->
  <template>
    <b-card
      overlay
      img-src="../assets/SiteBar.jpg"
      img-alt="Card Image"
      img-width="1000"
      >
        <!-- selectComponent вернёт строку с нужным названием компонента -->
        <component v-bind:is="selectComponent"></component>
    </b-card>
  </template>
</div>
</template>

<script>
const translate = require('../utils/translate.js');
const authenticator = require('../utils/authenticator.js');

import Profile from '@/components/Profile.vue'
import Welcome from '@/components/Welcome.vue'
import Autoriz from '@/components/Autorization.vue'

import {bus} from '../main.js'

export default {
  name: 'Start',
  components: {
    Welcome,
    Profile,
    Autoriz,
  },
  data(){
      let last_user = localStorage.getItem('last_user');
      return{
        msg: "start!",
        selectComponent: Welcome,
        user:{
          login: last_user,
          valid: authenticator.auth_user_check(),
        }
      }
  },
  computed: {
    languge: {
      get: function(){
        return this.$store.getters.LANGUAGE;
      },
    },
    check_user:{
      get: function(){
       return this.$store.getters.USER;
      }
    }
  },
  mounted: function () {
      bus.$on('login_done', this.login_done);
  },
  methods: {
    lang_set: function(lang) {
      localStorage.setItem('lang', lang)
      this.$store.dispatch("CHANGE_LANGUAGE", lang);
    },
    get_text: function(json_name){
      return translate.translate_get_string_js(json_name, this.languge);
    },
    go_main: function(){
      this.selectComponent = Welcome
    },
    go_profile: function(){
      console.dir(this.user.login);
      this.selectComponent = Profile
    },
    sign_out: function(){
      this.user.valid = authenticator.auth_user_logout();
      var UO = new Object();
      UO.name = "";
      UO.valid = false;
      this.$store.dispatch("ADD_USER", UO);
      this.selectComponent = Welcome;
    },
    sign_in: function(){
      this.selectComponent = Autoriz;
    },
    login_done: function(){
      this.selectComponent = Profile;
    }
  }
}
</script>
