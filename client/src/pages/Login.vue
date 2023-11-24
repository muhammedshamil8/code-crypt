<template>
  <div class="full-frame">
    <div class="login-page">
      <h2>Login into your account</h2>
      <p class="message">{{message}}</p>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group-button">
          <button type="submit">Log in</button>
        </div>
      </form>
      <div class="forgot-password">
        <a href="#">Forgot Password?</a>
      </div>
      <div class="create-account">
        <p>Need an account?
          <router-link to="/signup">Sign up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:9000/api/login', {
          email: this.email,
          password: this.password,
          message:''
        });
        if (response.data.status === 1) {
          // Login successful, perform necessary actions (e.g., redirect)
          console.log('Login successful', response.data.userId);
          this.$router.push('/dashboard');
        } else {
          // Display error message to the user
          this.message = 'Login failed, wrong credentials' ;
          console.error('Login failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle other errors (e.g., network error)
      }
    },
  },
};
</script>

<style>
/* Global styles */
body {
  background-color: black;
  height: 100vh;
  margin: 0;
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
}

/* Styling for the login-page container */
.login-page {
  padding: 50px;
  flex-direction: column;
  border-radius: 15px;
  background-color: white;
  width: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Styling for form groups */
.form-group {
  margin-bottom: 15px;
}

.message{
  color: red;
}

/* Styling for form-group-button */
.form-group-button {
  display: flex;
  width: 100%;
}

/* Styling for input fields */
.form-group input {
  border-radius: 3px;
  width: 92.5%;
  height: 25px;
  border-color: black;
  padding-left: 5px;
  padding-right: 20px;
}

/* Styling for the login button */
button {
  width: 100%;
  padding: 10px;
  margin: auto;
  background-color: orange;
  border-radius: 10px;
  color: white;
  border: none;
  cursor: pointer;
}
/* Styling for input fields */
.form-group input {
  border-radius: 5px; /* Adjust the border radius as needed */
  border: 2px solid #ccc; /* Thin border with color #ccc */
}
/* Styling for the h2 element */
.login-page h2 {
  text-align: center; /* Center the text horizontally */
  font-size: 20px; /* Adjust the font size as needed */
}


button:hover {
  background-color: rgb(255, 0, 0);
}

/* Styling for forgot-password and create-account sections */
.forgot-password,
.create-account {
  margin-top: 15px;
  text-align: center;
}

.forgot-password a,
.create-account a {
  color: rgb(0, 140, 255);
  text-decoration: none;
}

.forgot-password a:hover,
.create-account a:hover {
  text-decoration: underline;
}
</style>
