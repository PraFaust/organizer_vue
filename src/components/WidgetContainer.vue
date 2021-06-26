<template>
<div>
  <b-card no-body>
    <template #header>
      <b-row>
        <b-col class="text-left" cols="6">
          <h3 class="mb-0">{{name}}</h3>
        </b-col>
        <b-col class="text-right" cols="6">
          <p class="h3 mb-0">
            <b-icon class="scale-el" icon="plus-circle" variant="primary" rotate="45" @click="destroy()"></b-icon>
          </p>
        </b-col>
      </b-row>
    </template>
  </b-card>
  <component v-bind:is="child" destination="normal"></component>
</div>
</template>

<script>

const translate = require('../utils/translate.js');

import {bus} from '../main.js'

import WCalc from '@/components/widjets/calc.vue'
import WNotes from '@/components/widjets/notes.vue'
import WTimer from '@/components/widjets/timer.vue'
import Wtodo from '@/components/widjets/todo.vue'
import WWeather from '@/components/widjets/weather.vue'

const included_components = {
  'w-calc': WCalc,
  'w-notes': WNotes,
  'w-timer': WTimer,
  'w-todo': Wtodo,
  'w-weather': WWeather,
}

export default {
  name: 'widjetContainer',
  components: included_components,
  props: ['widjetIn'],
  data(){
      return{
        widjet_included: '',
      }
  },
  computed: {
    languge: {
      get: function(){
        return this.$store.getters.LANGUAGE;
      },
    },
    child:{
      get: function(){
        console.log(`In computed child input is ${this.widjetIn}`);
        this.widjet_included = this.widjetIn;
        return this.widjet_included;
      }
    },
    name:{
      get: function(){
        let name
        if(this.widjetIn.startsWith('w-')){
          name = this.widjetIn.slice(2);
          name = name[0].toUpperCase() + name.slice(1);
        }else{
          console.log(`ERR, name = ${this.widjetIn}`);
          name = 'undefined-widget';
        }
        return name;
      }
    }
  },
  methods: {
    get_text: function(json_name){
      console.log(`on get_text lang is ${this.languge}`);
      return translate.translate_get_string_js(json_name, this.languge);
    },

    destroy: function(){
      console.log(`Destroy component ${this.widjet_included}`);
      bus.$emit('destroy_w');
    }
  }
}
</script>
