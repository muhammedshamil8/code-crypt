
<template>
  <div class="container">
    <form @submit.prevent="signup">
      <div class="box">
        <h2>Signup for free</h2>
        <p class="signup-message">{{ message }}</p>
        <div class="details">
          <input label="Name" name="Name" type="text" v-model="username" />
          <input label="Email" name="Email" type="text" v-model="email" />
          <input label="Password" name="Password" type="password" v-model="password" />
          <input
            label="Confirm Password"
            name="ConfirmPassword"
            type="password"
            v-model="passwordConfirm"
          />
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
      passwordConfirm: '',
      message: '',
    };
  },
  methods: {
    async signup() {
      // Add validation to check if required fields are not empty
      if (!this.username || !this.email || !this.password || !this.passwordConfirm) {
        this.message = 'Fill all the fields';
        return;
      }

      try {
        const response = await axios.post('http://localhost:9000/api/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        });

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
};
</script>

<style scoped>
/* Your styles go here */
</style>
