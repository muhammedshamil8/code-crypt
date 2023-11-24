<template>
  <div class="login-page">
     <h2>Login into your account</h2>
     <form @submit.prevent="login">
       <div class="form-group">
         <label for="email">Email</label>
         <input type="email" id="email" v-model="email" required />
       </div>
       <div class="form-group">
         <label for="password">Password</label>
         <input type="password" id="password" v-model="password" required />
       </div>
       <div class="form-group">
         <button type="submit">Log in</button>
       </div>
     </form>
     <div class="forgot-password">
       <a href="#">Forgot Password?</a>
     </div>
     <div class="create-account">
       <p>Need an account?</p>
       <router-link to="/signup">Sign up</router-link>
     </div>
  </div>
 </template>
 
 <script>
 export default {
  data() {
     return {
       email: '',
       password: '',
     };
  },
  methods: {
     login() {
       // implement login logic here
     },
  },
 };
 </script>
 
 <style src="../styles/login.css"></style>