<template>
<div>
    <h1>msg</h1>
</div>
</template>
<script>
const translate = require('../../utils/translate.js');

export default {
  name: 'CustomAlert',
  props: ['Messge'],
  data(){
      return{
        msg: Message,
      }
  },
  methods: {
    get_text: function(json_name){
      console.log(`on get_text lang is ${this.languge}`);
      return translate.translate_get_string_js(json_name, this.languge);
    },
  }
}
</script>