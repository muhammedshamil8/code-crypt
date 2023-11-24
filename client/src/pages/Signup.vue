<template>
  <div class="container">
     <form @submit.prevent="signup">
       <div class="box">
         <h2>Signup for free</h2>
         <p class="signup-message">{{message}}</p>
         <div class="details">
           <InputField label="Name" name="Name" type="text" v-model="username" />
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
 import axios from 'axios';
 import InputField from '../components/viewTools/InputFields.vue';
 export default {
  name: 'Signup',
  components: {
     InputField,
  },
  data() {
     return {
       username: '',
       email: '',
       password: '',
       confirm_passoword: '',
       message: '',
     };
  },
  methods: {
  async signup() {
    // Add validation to check if required fields are not empty
    if (!this.username || !this.email || !this.password || !this.confirm_passoword) {
      this.message = 'Fill all the fields';
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/api/register', {
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_passoword: this.confirm_passoword,
      });
      console.log('Signing up with:', this.name, this.email, this.password);
      if (response.data.status === 1) {
        // Registration successful, perform necessary actions (e.g., redirect)
        console.log('Registered Successfully', response.data.userId);
        this.$router.push('/login');
      } else {
        // Display error message to the user
        this.message = 'Signup failed: ' + response.data.message;
        console.error('Signup failed:', response.data.message);
      }
    } catch (error) {
      this.message = 'Signup failed: ' + error.message;
      console.error('Error:', error);
      // Handle other errors (e.g., network error)
    }

    console.log('Signing up with:', this.username, this.email, this.password);
  },
},

}
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

 .signup-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
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