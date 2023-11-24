<template>
  <div class="container">
     <form @submit.prevent="signup">
       <div class="box">
         <h2>Signup for free</h2>
         
         <div class="details">
           <InputField label="Name" name="Name" type="text" v-model="name" />
           <InputField label="Email" name="Email" type="text" v-model="email" />
           <InputField label="Password" name="Password" type="password" v-model="password" />
           <InputField label="Confirm Password" name="ConfirmPassword" type="password" v-model="confirm_passoword" />
         </div>
 
         <button type="submit" class="signup-btn">Sign up</button>
         <router-link to="/login" class="login-link">Don't you have an account? Login</router-link>
       </div>
     </form>
  </div>
 </template>
 
 <script>
 import InputField from '../components/viewTools/InputFields.vue';
 export default {
  name: 'Signup',
  components: {
     InputField,
  },
  data() {
     return {
       name: '',
       email: '',
       password: '',
       confirm_passoword: '',
     };
  },
  methods: {
     signup() {
       // Here, you can add the logic to handle the signup
       // For example, make an API request, validate input, etc.
       // For simplicity, let's just log the input values for now.
       console.log('Signing up with:', this.name, this.email, this.password);
 
       // Assuming successful signup, navigate to the dashboard
       this.$router.push('/dashboard');
     },
  },
 };
 </script>
 
 <style scoped>
 .box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  width: 50vw;
  background-color: #fffedd;
  border-radius: 52px;
 }
 .container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000000;
 }

 .signup-btn{
  background-color: orange;
  color: white;
  width: 64%;
  height: 40px;
  margin-bottom: 20px;
  margin-top: 40px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  padding: 6px;
 }

 .login-link {
  color: #000000;
  text-decoration: none;
  font-size: 14px;
  margin-top: 10px;
 }
 </style>