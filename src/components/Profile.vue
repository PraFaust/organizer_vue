<template>
<div>
  <template>
      <b-button variant="secondary">PROFILE</b-button>
  </template>
</div>
</template>

<script>
const translate = require('../utils/translate.js');

export default {
  name: 'Profile',
  data(){
      return{
        msg: "Profile!",
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
  }
}
</script>