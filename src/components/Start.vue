<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Organizer</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">About</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="get_text('txt_lang_h')" right>
          <b-dropdown-item-button @click="lang_set('en')">EN</b-dropdown-item-button>
          <b-dropdown-item-button @click="lang_set('ru')">RU</b-dropdown-item-button>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <b-card>
      <b-button variant="secondary">Button</b-button>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'Start',
  data(){
      return{
        msg: "start!"
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
      //this.translate.translate_get_string(json_name, this.languge);
    }
  }
}
</script>
