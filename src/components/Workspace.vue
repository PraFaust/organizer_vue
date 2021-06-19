<template>
<div>
    <h1>{{user}} Workspace</h1>
    <b-container fluid class="mt--7">
        <b-row class="justify-content-center">
            <b-col lg = 3>
              <b-card title="Widgets">
                <l-container @drop="onDrop" group-name="wg">
                  <l-draggable v-for="widget in listComponent" :key="widget.name">
                    <div class="draggable-item" @click="add_w(widget)">
                      <component v-bind:is="widget" destination="mini"></component>
                    </div>
                  </l-draggable>
                </l-container>
              </b-card>
            </b-col>
            <b-col lg = 9>
                <b-card title="Drop here or click on <Widgets>...">
                  <l-container group-name="wg">
                   <transition-group name="slide-fade" mode="out-in" tag="div">
                    <div v-for="(widget, i) in workComponent" :key="widget + i">
                        <component v-bind:is="widget" destination="normal"></component>
                    </div>
                  </transition-group>
                  </l-container>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
const translate = require('../utils/translate.js');

import {Container, Draggable} from "vue-smooth-dnd";

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
  'l-container': Container,
  'l-draggable': Draggable,
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
      if(comp.indexOf('w-') === 0){
        this.listComponent.push(comp);
      }
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
    add_w: function(widjet){
      this.workComponent.push(widjet);
      console.log(`CLCK on ${widjet}`);
    },
    onDrop(dropResult) {
      console.log(`drop END`);
      this.applyDrag(this.items, dropResult);
    },
    applyDrag(arr, dragResult){
      const { removedIndex, addedIndex, payload } = dragResult;

      console.log(`removedIndex ${removedIndex}, addedIndex ${addedIndex}`);
      console.log(this.listComponent[removedIndex]);

      if(removedIndex != null){
        this.workComponent.push(this.listComponent[removedIndex]);
      }
      console.log("arr:");
      console.dir(arr);
      //return result;
    },
  }
}
</script>
