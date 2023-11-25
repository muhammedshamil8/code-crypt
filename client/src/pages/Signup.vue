<template>
  <div class="signup-container">
    <form @submit.prevent="registerUser" class="signup-form">
      <h2>Sign Up for Free</h2>

      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="formData.username" required />
      </div>
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="formData.password" required />
      </div>

      <div class="form-group">
        <label for="passwordConfirm">Confirm Password:</label>
        <input type="password" id="passwordConfirm" v-model="formData.passwordConfirm" required />
      </div>

      <button type="submit">Sign Up</button>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import InputField from '../components/viewTools/InputFields.vue';
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      isLoading: false,
      registrationMessage: '',
    };
  },
  methods: {
  async registerUser() {
    try {
      this.isLoading = true;
      const response = await fetch('http://localhost:9000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.formData.username,
          email: this.formData.email,
          password: this.formData.password,
          passwordConfirm: this.formData.passwordConfirm,
        }),
      });

      const data = await response.json();

      if (data.status === 1) {
        this.registrationMessage = 'Registration successful!';
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
      } else {
        this.registrationMessage = `${data.message}`;
      }
    } catch (error) {
      // Change 'this.message' to 'this.registrationMessage'
      this.registrationMessage = 'Signup failed: ' + error.message;
      console.error('Error:', error);
      this.registrationMessage = 'An error occurred during registration. Please try again.';
    } finally {
      this.isLoading = false;
    }
  },
},

};
</script>

<style>
/* Global styles */
.body {
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
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1; /* Light gray background */
}

.signup-form {
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff; /* White background */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333; /* Dark gray text */
}

label {
  display: block;
  margin-top: 10px;
  color: #555; /* Medium gray text */
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

/* Styling for the login button */
button {
  width: 100%;
  padding: 10px;
  background-color: #3498db; /* Blue button color */
  color: #ffffff; /* White text */
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.error-message {
  color: #e74c3c; /* Red error text */
  margin-top: 10px;
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
  .signup-page {
    padding: 10px; /* Adjust padding for smaller screens */
    width: 90%; /* Adjust width for smaller screens */
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
