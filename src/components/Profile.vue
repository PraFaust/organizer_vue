<template>
<div>
  <template>
      <h1>{{get_text('txt_profile_h')}} {{user.name}}</h1>
  </template>
</div>
</template>

<script>
const translate = require('../utils/translate.js');

export default {
  name: 'Profile',
  data(){
      return{
        msg: "PROFILE",
        user: this.$store.getters.USER,
      }
  },
  computed: {
    languge: {
      get: function(){
        return this.$store.getters.LANGUAGE;
      },
    },
  },
  methods: {
    get_text: function(json_name){
      console.log(`on get_text lang is ${this.languge}`);
      return translate.translate_get_string_js(json_name, this.languge);
    },
  }
}
</script>