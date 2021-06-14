<template>
    <div id="autorization">
        <h1>{{msg}}</h1>
        <b-container fluid class="mt--7">
          <b-row class="justify-content-center">
            <b-col lg = 6>
              <b-card no-body>
                <b-tabs card card-header tabs fill>
                  <!-- Login tab -->
                  <b-tab title="Login" active body-class="text-center" header-tag="nav" align="center" :title-link-class="'tab-title-class'">
                    <h2>Enter your login and password:</h2>
                    <b-card-text>
                      <b-alert :show="loginWarnings.showLoginAlert" variant="danger">Please, enter login</b-alert>
                      <b-form-input v-model="loginData.login" :state="loginData.loginValid" id="input-login" size="lg" placeholder="Login" :disabled="readonlyInput"></b-form-input>
                    </b-card-text>
                    <b-card-text>
                      <b-alert :show="loginWarnings.showPasswordAlert" variant="danger">Please, enter password</b-alert>
                      <b-form-input v-model="loginData.pass" :state="loginData.passValid" id="input-pass" size="lg" placeholder="Password" type="password" :disabled="readonlyInput"></b-form-input>
                    </b-card-text>
                    <b-card-text v-if="loginWarnings.showPasswordAlert==false && loginWarnings.showLoginAlert==false">
                      <b-alert :show="loginWarnings.userNotRegistered" variant="danger">User with this login or password not found. Please try again or register.</b-alert>
                    </b-card-text>
                    <b-button v-if="!showLoader" class="btn-lg btn-block" variant="info" @click="checkLogin()">Login!</b-button>
                    <b-button v-if="showLoader" :disabled="true" class="btn-lg btn-block" style="padding: 1.25rem 1rem;" variant="info"> 
                      <div class="loader"></div>
                    </b-button>
                  </b-tab>
                  <!-- Registration tab -->
                  <b-tab title="Register" body-class="text-center" header-tag="nav" align="center" :title-link-class="'tab-title-class'">
                    <h2>Enter registration data below:</h2>
                    <b-card-text>
                      <b-form-input v-model="registerData.firstname" id="input-name" :state="firstnameSubmitted" :disabled="readonlyInput" aria-describedby="input-firstname-feedback input-firstname-allowed" size="lg" placeholder="First name"></b-form-input>
                      <b-form-invalid-feedback id="input-firstname-feedback">
                        Enter your firstname
                      </b-form-invalid-feedback>
                    </b-card-text>
                    <b-card-text>
                      <b-form-input v-model="registerData.username" id="input-username" :state="usernameSubmitted" :disabled="readonlyInput" aria-describedby="input-username-feedback" size="lg" placeholder="Username"></b-form-input>
                      <b-form-invalid-feedback id="input-username-feedback">
                        Username not allowed, change please
                      </b-form-invalid-feedback>
                    </b-card-text>
                    <b-card-text>
                      <b-form-input v-model="registerData.email" id="input-email" :state="validEmail" :disabled="readonlyInput" aria-describedby="input-email-feedback" size="lg" placeholder="Email"></b-form-input>
                      <b-form-invalid-feedback id="input-email-feedback">
                        Enter correct email adress
                      </b-form-invalid-feedback>
                    </b-card-text>
                    <b-card-text>
                      <b-form-input v-model="registerData.pass" id="input-userpass" :state="passLength" :disabled="readonlyInput" aria-describedby="input-length-feedback" size="lg" placeholder="Password" type='password'></b-form-input>
                      <b-form-invalid-feedback id="input-length-feedback">
                        Enter at least 7 letters
                      </b-form-invalid-feedback>
                    </b-card-text>
                    <b-card-text>
                      <b-form-input v-model="registerData.rePass" id="input-userRePass" :state="passMatch" :disabled="readonlyInput" aria-describedby="input-unmatch-pass" size="lg" placeholder="Password check" type='password'></b-form-input>
                      <b-form-invalid-feedback id="input-unmatch-pass">
                        Passwords do not match
                      </b-form-invalid-feedback>
                    </b-card-text>
                    <b-card-text>
                      <b-row>
                        <b-col>
                          <h4 size="lg" align="left">Sex:</h4>
                        </b-col>
                        <b-col>
                          <b-form-radio-group align="right" size="lg" v-model="registerData.sex" :disabled="readonlyInput">
                            <b-form-radio size="lg" name="some-radios" value="male">Male</b-form-radio>
                            <b-form-radio size="lg" name="some-radios" value="female">Female</b-form-radio>
                          </b-form-radio-group>
                        </b-col>
                      </b-row>
                    </b-card-text>
                    <b-card-text>
                      <b-form-group>
                          <b-form-checkbox id="checkbox-1"
                           :disabled="readonlyInput"
                            v-model="registerData.newsletter"
                            name="newsletter-check"
                            value="news_accept"
                            unchecked-value="news_notaccept">Send me newsletter on my email
                          </b-form-checkbox>
                      </b-form-group>
                    </b-card-text>
                    <b-card-text>
                      <b-alert :show="loginWarnings.userRegistrationWarning" variant="danger">Please check all fields</b-alert>
                    </b-card-text>
                    <b-button v-if="!showLoader" class="btn-lg btn-block" variant="info" @click="registerUser()">Register!</b-button>
                    <b-button v-if="showLoader" :disabled="true" class="btn-lg btn-block" style="padding: 1.25rem 1rem;" variant="info"> 
                      <div class="loader"></div>
                    </b-button>
                  </b-tab>
                </b-tabs>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
    </div>
</template>

<script>

const authenticator = require('../utils/authenticator.js');

import {bus} from '../main.js'

export default {
  name: 'Autorization',
  data () {
    return {
      msg: 'Welcome to Autorization form!',
      loginWarnings: {
        showLoginAlert: false,
        showPasswordAlert: false,
        userNotRegistered: false,
        userRegistrationWarning: false
      },
      loginData: {
        login: '',
        pass: '',
        loginValid: null,
        passValid: null
      },
      registerData: {
        firstname: '',
        username: '',
        email: '',
        pass: '',
        rePass: '',
        sex: 'male',
        newsletter: ''
      },
      firstnameSubmitted: null,
      usernameSubmitted: null,
      userAllowed: null,
      passLength: null,
      passMatch: null,
      validEmail: null,
      readonlyInput: false,
      showLoader: false,
    }
  },
  computed:{
    languge: {
      get: function(){
        return this.$store.getters.LANGUAGE;
      },
    },
  },
  methods: {
    checkLogin: function () {
      console.log(`LOGIN! login = ${this.loginData.login}, pass = ${this.loginData.pass}`)
      if (this.loginData.login === '') {
        this.loginWarnings.showLoginAlert = true
        this.loginData.loginValid = false
      } else {
        this.loginWarnings.showLoginAlert = false
        this.loginData.loginValid = true
      }

      if (this.loginData.pass === '') {
        this.loginWarnings.showPasswordAlert = true
        this.loginData.passValid = false
      } else {
        this.loginWarnings.showPasswordAlert = false
        this.loginData.passValid = true
      }
      this.showLoader = true;
      this.readonlyInput = true;
      let jsonLogin = JSON.stringify(this.loginData)
      console.log(jsonLogin)
      authenticator.loginSend(jsonLogin, this.loginResp)
    },

    registerUser: function () {
      console.log(`Register request...`)
      console.log(`check value is ${this.registerData.newsletter}...`)
      this.userRegistrationWarning = false

      // check firstname
      if (this.registerData.firstname.length > 0) {
        this.firstnameSubmitted = true
      } else {
        this.firstnameSubmitted = false
        this.userRegistrationWarning = true
      }
      // check username
      if (this.registerData.username.length > 0) {
        this.usernameSubmitted = true
      } else {
        this.usernameSubmitted = false
        this.userRegistrationWarning = true
      }
      // check valid email
      if (authenticator.validateEmail(this.registerData.email)) {
        this.validEmail = true
      } else {
        this.validEmail = false
        this.userRegistrationWarning = true
      }
      // check input password matched
      if (this.registerData.pass === this.registerData.rePass) {
        this.passMatch = true
      } else {
        this.passMatch = false
        this.userRegistrationWarning = true
      }
      // check password length
      if (this.registerData.pass.length >= 8) {
        this.passLength = true
      } else {
        this.passLength = false
        this.userRegistrationWarning = true
        this.passMatch = null
      }

      if(this.passMatch === true && !this.userRegistrationWarning){
        this.showLoader = true;
        this.readonlyInput = true;
        let jsonRegistration = JSON.stringify(this.registerData)
        console.log(jsonRegistration)
        authenticator.registerSend(jsonRegistration, this.registerResp)
      }
    },

    loginResp: function  (data, textStatus, jqXHR) {
      console.log(`loginResp input data: ${data}`)
      let response = new Object()
      response = JSON.parse(data)
      console.log(`login is ${response.login}, password is ${response.password}`)
      //this.showLoader = false;
      if(!response.login || !response.password){
        this.loginWarnings.userNotRegistered = true;
        this.readonlyInput = false;
        this.showLoader = false;
      }
      if(response.login & response.password){
        this.showLoader = false;
        this.loginWarnings.userNotRegistered = false;
        this.msg = `Hello, ${this.loginData.login}!`;
        localStorage.setItem('last_user', this.loginData.login);
        localStorage.setItem('valid', true);
        var UO = new Object();
        UO.name = this.loginData.login;
        UO.valid = true;
        this.$store.dispatch("ADD_USER", UO);
        bus.$emit('login_done');
      }
    },

    registerResp: function (data, textStatus, jqXHR) {
      console.log(`registerResp input data: ${data}`)
      this.showLoader = false;
      let response = new Object();
      response = JSON.parse(data)
      console.log(`login is ${response.login}`) //true - login free and assigned, false - login not available
      this.usernameSubmitted = response.login;
      if(response.login){
        this.msg = `Hello, ${this.registerData.username}! Registration success!`;

        localStorage.setItem('last_user', this.registerData.username);
        localStorage.setItem('valid', true);
        var UO = new Object();
        UO.name = this.registerData.username;
        UO.valid = true;
        this.$store.dispatch("ADD_USER", UO);
        authenticator.auth_user_check();
        bus.$emit('login_done');
      }else{
        this.readonlyInput = false;
        this.showLoader = false;
      }
    },
    get_text: function(json_name){
      return translate.translate_get_string_js(json_name, this.languge);
    },
  }

}
</script>

<style>
/* h1, h2{
 color: black;
} */
</style>
