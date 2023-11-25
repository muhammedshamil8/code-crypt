<template>
  <div class="body">
   <div class="full-frame">
    <div class="login-page">
      <h2>Login into your account</h2>
      <p class="message" :class="{ 'success-message': isSuccess, 'error-message': !isSuccess, 'temp-success': isSuccess }">{{ message }}</p>

      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required :disabled="isLoading" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required :disabled="isLoading" />
        </div>
        <div class="form-group-button">
          <div class="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" :disabled="isLoading">{{ isLoading ? 'Logging in...' : 'Log in' }}</button>
        </div>
      </form>
      <div class="create-account">
        <p>Need an account? <router-link to="/signup">Sign up</router-link></p>
      </div>
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
      message: '',
      isSuccess: false,
      isLoading: false,
    };
  },
  methods: {
    async login() {
      try {
        this.isLoading = true;
        console.log('Login Data:', { email: this.email, password: this.password });
        const response = await axios.post('http://localhost:9000/api/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.status === 1) {
          // Login successful, perform necessary actions (e.g., redirect)
          console.log('Login successful', response.data.userId);
          this.$router.push('/dashboard');
        } else {
          // Login failed
          this.message = 'Login failed. Wrong credentials.';
          this.isSuccess = false;
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle other errors (e.g., network error)
        this.message = 'An error occurred. Please try again.';
        this.isSuccess = false;
      } finally {
        // Reset form fields and loading state
        this.email = '';
        this.password = '';
        this.isLoading = false;
        setTimeout(() => {
          this.message = '';
        }, 5000);
      }
    },
  },
};
</script>

<style>
/* ... Existing styles ... */
.temp-success {
  color: green;
}

.success-message {
  color: green;
  
}

.error-message {
  color: red;
}

/* Global styles */

*{
  font-family: 'Inter', sans-serif;
}

/* Styling for the full-frame container */
.full-frame {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Styling for the login-page container */
.login-page {
  padding: 30px;
  flex-direction: column;
  border-radius: 40px;
  background-color: white;
  width: 300px;
  height: 270px;
  padding-top: 35px;
}
.heading{
  text-align: center;
  padding-bottom: 9px;
  font-size: 15px;
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
  flex-direction: column;
  align-items: center;
}

/* Styling for input fields */
.form-group input {
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

/* Styling for the login button */
button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

/* Styling for the h2 element */
.login-page h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
}

/* Styling for the forgot-password link */
.forgot-password {
  text-align: right;
}

.forgot-password a {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password a:hover {
  text-decoration: underline;
}

/* Styling for create-account section */
.create-account {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: #555;
}

.create-account a {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.create-account a:hover {
  text-decoration: underline;
}

/* Mobile responsiveness */
@media screen and (max-width: 600px) {
  .login-page {
    width: 90%;
    padding: 20px;
    border-radius: 10px;
  }

  .form-group input {
    width: calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
}
</style>