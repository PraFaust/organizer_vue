<template>
<div>
  <template v-if="destination=='mini'">
      <b-card>
        <h3>{{get_text('txt_todo_h')}} </h3>
      </b-card>
  </template>

  <template v-if="destination=='normal'">
      <b-card>
      <h1>{{get_text('txt_todo_h')}} </h1>
        <b-button>Press-me</b-button>
      <h2></h2>
      </b-card>
  </template>
</div>
</template>
<script>
const translate = require('../../utils/translate.js');

export default {
  name: 'Todo',
  props: ['destination'],
  data(){
      return{
        msg: "Todo",
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