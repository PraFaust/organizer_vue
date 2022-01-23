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
                              :get-child-payload="getChildPayload"
                              @drag-start="onDragStart"
                              @drag-end="onDragEnd">
                  <l-draggable v-for="widget in listComponent" :key="widget.name"  class="scale-el-sm">
                    <div class="draggable-item" @click="add_w(widget)">
                      <component v-bind:is="widget" destination="mini"></component>
                    </div>
                  </l-draggable>
                </l-container>
              </b-card>
            </b-col>
            <b-col cols="9">
              <b-card title="Drop here or click on <Widgets>...">
                <l-container  group-name="wg" 
                              @drop="onDrop"
                              @drag-enter="onDragEnter"
                              @drag-leave="onDragLeave">
                  <transition-group name="slide-fade" mode="out-in" tag="div">
                    <div v-for="(widget, i) in workComponent" :key="i">
                      <div v-if="widget!=undefined">
                        <component v-bind:is="container_w" :widgetIn="widget" :widgetId="i" class="shadow2"></component>
                      </div>
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

// add drag and drop funcionality
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
        container_w: WContainer,
        listComponent: [],
        dragProc: false,
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
    workComponent:{
      get: function(){
        return this.$store.getters.WIDGET;
      },
      set:function(w_name){
        this.$store.dispatch("ADD_WIDGET", w_name);
      }

    }
  },
  methods: {
    get_text: function(json_name){
      return translate.translate_get_string_js(json_name, this.languge);
    },
    add_w: function(widget){
      if(!this.dragProc){
        this.workComponent = widget;
        console.log(`CLICK on ${widget}`);
      }
    },
    getChildPayload: function (index) {
      console.log(`index is ${index}, comp is ${this.listComponent[index]}`);
      return this.listComponent[index];
    },
    onDragEnter(){
      this.msg = "enter";
    },
    onDragLeave(){
      this.msg = "leave";
    },
    onDragStart(){
      console.log(`onDragStart`);
      this.dragProc = true;
    },
    onDragEnd(){
      console.log(`onDragEnd`);
      this.dragProc = false;
    },
    onDrop(dropResult) {
      console.log(`drop END`);
      this.applyDrag(this.items, dropResult);
    },
    applyDrag(arr, dragResult){
      const { removedIndex, addedIndex, payload } = dragResult;

      console.log(`removedIndex ${removedIndex}, addedIndex ${addedIndex}, payload:`);
      console.dir(payload);

      if(payload != null){
        this.workComponent = payload
        console.log("PUSH OK");
      }
    },
    destroy_w: function(widget_id){
      let comp = this.workComponent[widget_id];
      console.log(`DESTROY! id = ${widget_id} comp is ${comp}`);
      let obj = new Object();
      obj.name = this.workComponent[widget_id];
      obj.id = widget_id;
      this.$store.dispatch("DEL_WIDGET", obj);
    },
  }
}
</script>
