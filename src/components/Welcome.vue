<template>
<div>
  <template>
      <h1 v-if="user!=''">{{get_text('txt_welcome_h')}} {{user}}!</h1>
      <h1 v-if="user==''">{{get_text('txt_welcome_h')}}!</h1>
  </template>
</div>
</template>

<script>
const translate = require('../utils/translate.js');

export default {
  name: 'Welcome',
  data(){
      return{
        msg: "Welcome!",
      }
  },
  computed: {
    languge: {
      get: function(){
        return this.$store.getters.LANGUAGE;
      },
    },
    user:{
      get: function(){
        return this.$store.getters.USER.name;
      }
    }
  },
  methods: {
    get_text: function(json_name){
      return translate.translate_get_string_js(json_name, this.languge);
    },
  }
}
</script>