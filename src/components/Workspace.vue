<template>
<div>
    <h1>{{user}} Workspace</h1>
    <b-container fluid class="mt--7">
        <b-row class="justify-content-center">
            <b-col lg = 3>
              <b-card title="Widgets">
                <div v-for="widget in listComponent" :key="widget.name" @click="add_w(widget)">
                  <component v-bind:is="widget" destination="mini"></component>
                </div>
              </b-card>
            </b-col>
            <b-col lg = 9>
                <b-card title="Drop here...">
                  <div v-for="widget in workComponent" :key="widget.name">
                    <component v-bind:is="widget" destination="normal"></component>
                  </div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
const translate = require('../utils/translate.js');

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
  name: 'Workspace',
  components: included_components,
  data(){
      return{
        msg: "Workspace!",
        listComponent: [],
        workComponent: [],
      }
  },
  created:function(){
    for(var comp in included_components){
      this.listComponent.push(comp);
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
    },
  },
  methods: {
    get_text: function(json_name){
      return translate.translate_get_string_js(json_name, this.languge);
    },
    add_w: function(w){
      this.workComponent.push(w);
    }
  }
}
</script>