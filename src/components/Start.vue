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
          <b-dropdown-item-button @click="go_profile()">{{this.get_text('txt_profile_h')}}</b-dropdown-item-button>
          <b-dropdown-item-button @click="sign_out()">{{this.get_text('txt_signOut_h')}}</b-dropdown-item-button>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- Page content -->
  <template>
    <b-card
      overlay
      img-src="../assets/SiteBar.png"
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

export default {
  name: 'Start',
  components: {
    Welcome,
    Profile
  },
  data(){
      let last_user = localStorage.getItem('last_user');
      return{
        msg: "start!",
        selectComponent: Welcome,
        user:{
          login: last_user,
          password:"",
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

      }
    }
  },
  methods: {
    lang_set: function(lang) {
      if(lang==='en'){
        console.log("choose lang 1");
      }else if(lang==='ru'){
        console.log("choose lang 2");
      }
      this.$store.dispatch("CHANGE_LANGUAGE", lang);
    },
    get_text: function(json_name){
      console.log(`on get_text lang is ${this.languge}`);
      return translate.translate_get_string_js(json_name, this.languge);
    },
    go_main: function(){
      this.selectComponent = Welcome
    },
    go_profile: function(){
      this.selectComponent = Profile
    },
    sign_out: function(){

    },
  }
}
</script>
