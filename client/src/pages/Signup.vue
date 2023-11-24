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
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
}

/* Styling for the full-frame container */
.full-frame {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000000;
 }

 .signup-btn{
  background-color: orange;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #CC5500;
}

/* Styling for the h2 element */
.login-page h2 {
  text-align: center;
  font-size: 24px;
}

/* Styling for create-account section */
.create-account {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
}

.create-account a {
  color: rgb(0, 140, 255);
  text-decoration: none;
  font-size: 12px;
}

.create-account a:hover {
  text-decoration: underline;
}

/* Mobile responsiveness */
@media screen and (max-width: 600px) {
  .login-page {
    width: 90%;
    height: auto;
    padding: 20px;
    border-radius: 20px;
  }

  .form-group input {
    width: calc(100% - 30px);
    max-width: calc(100% - 30px);
    margin: 0;
  }

  .forgot-password,
  .create-account {
    margin-top: 10px;
  }
}
</style>
