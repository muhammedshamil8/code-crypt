<template>
  <div class="body">
    <div class="full-frame">
      <div class="login-page">
        <h2>Login into your account</h2>
        <p class="message" :class="{ 'success-message': isSuccess, 'error-message': !isSuccess }">
          {{ message }}
        </p>

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
           
            <button type="submit" :disabled="isLoading" class="button">
              {{ isLoading ? 'Logging in...' : 'Log in' }}
            </button>
          </div>
          <div class="forgot-password">
              <a href="#">Forgot Password?</a>
            </div><br />
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
        const response = await axios.post('http://localhost:9000/api/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.status === 1) {
          this.isSuccess = true;
          this.message = 'Login successful. Redirecting...';

          localStorage.setItem('user_id', response.data.userId);
          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 1500);
        } else {
          this.message = 'Login failed. Wrong credentials.';
          this.isSuccess = false;
        }
      } catch (error) {
        console.error('Error:', error);
        this.message = 'An error occurred. Please try again.';
        this.isSuccess = false;
      } finally {
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

<style scoped>
.body {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-page {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.message {
  font-size: 14px;
  margin: 10px 0;
}

.success-message {
  color: #4caf50;
}

.error-message {
  color: #f44336;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

input {
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  font-size: 14px;
}

.form-group-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password a {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

.create-account {
  margin-top: 15px;
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
</style>
