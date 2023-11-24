<template>
    <div>
      <h2>Login Page</h2>
      <div>
        <InputField label="Username" name="username" v-model="username"/>
        <InputField label="Password" name="password" type="password" v-model="password" />
        <button @click="login">Log in</button>
      </div>
      <router-link to="/signup">Go to Signuph</router-link><br />
    </div>
  </template>
  
  <script>
  
  import InputField from '../components/viewTools/InputFields.vue';
  export default {
    name: 'Login',
    components: {
      InputField,
    },
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Here, you can add the logic to handle the login
        // For example, make an API request, validate credentials, etc.
        // For simplicity, let's just log the input values for now.
        console.log('Logging in with:', this.username, this.password);
  
        // Assuming successful login, navigate to the dashboard
        this.$router.push('/dashboard');
      },
    },
  };
  </script>
  