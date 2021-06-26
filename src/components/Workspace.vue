<template>
<div class="non-adaptive">
    <h1>{{user}} Workspace</h1>
    <b-container fluid class="mt--7">
        <b-row class="justify-content-center">
            <b-col cols="3">
              <b-card title="Widgets">
                <l-container  group-name="wg"
                              behaviour="copy"
                              drag-class="drag-style"
                              :get-child-payload="getChildPayload">
                  <l-draggable v-for="widget in listComponent" :key="widget.name">
                    <div class="draggable-item" @click="add_w(widget)">
                    <!-- <div class="draggable-item"> -->
                      <component v-bind:is="widget" destination="mini"></component>
                    </div>
                  </l-draggable>
                </l-container>
              </b-card>
            </b-col>
            <b-col cols="9">
                <b-card title="Drop here or click on <Widgets>...">
                  <l-container group-name="wg" @drop="onDrop('workComponent', $event)">
                    <transition-group name="slide-fade" mode="out-in" tag="div">
                      <div v-for="(widget, i) in workComponent" :key="widget + i">
                        <l-wcontainer :widjetIn="widget" class="shadow2"></l-wcontainer>
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

import {bus} from '../main.js'

import WCalc from '@/components/widjets/calc.vue'
import WNotes from '@/components/widjets/notes.vue'
import WTimer from '@/components/widjets/timer.vue'
import Wtodo from '@/components/widjets/todo.vue'
import WWeather from '@/components/widjets/weather.vue'
import WContainer from '@/components/WidgetContainer.vue'

const included_components = {
  'w-calc': WCalc,
  'w-notes': WNotes,
  'w-timer': WTimer,
  'w-todo': Wtodo,
  'w-weather': WWeather,
  'l-container': Container,
  'l-draggable': Draggable,
  'l-wcontainer': WContainer,
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
  mounted: function () {
      bus.$on('destroy_w', this.destroy_w);
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
    onDrop: function (collection, dropResult) {
      console.log(`drop END`);
      console.log("collection:");
      console.dir(collection);
      this[collection] = this.applyDrag(this[collection], dropResult)
    },
    getChildPayload: function (index) {
      console.log(`index is ${index}, comp is ${this.listComponent[index]}`);
      return this.listComponent[index];
    },
    applyDrag: function(arr, dragResult){
      const { removedIndex, addedIndex, payload } = dragResult;

      console.log(`removedIndex ${removedIndex}, addedIndex ${addedIndex}, payload:`);
      console.dir(payload);

      if(payload != null){
        arr.push(payload);
        console.log("PUSH OK");
      }
      console.log("arr:");
      console.dir(arr);

      const result = arr;
      return result;
    },
    destroy_w: function(){
      console.log(`DESTROY!`);
    }
  }
}
</script>
