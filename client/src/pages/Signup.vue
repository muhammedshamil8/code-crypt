<!-- Signup.vue -->
<template>
<<<<<<< HEAD
  <div class="container">
    <form @submit.prevent="registerUser">
      <div class="box">
        <h2>Signup for free</h2>
        <p v-if="registrationMessage" :class="{ 'error-message': isError }">{{ registrationMessage }}</p>


        <div class="details">
          <InputField label="Name" name="username" id="username" type="text" v-model="formData.username" required />
          <InputField label="Email" type="email" id="email" name="email" v-model="formData.email" required />
          <InputField label="Password" v-model="formData.password" type="password" id="password" name="password"
            required />
          <InputField label="Confirm Password" v-model="formData.passwordConfirm" type="password" id="passwordConfirm"
            name="passwordConfirm" required />
        </div>

        <button type="submit" class="signup-btn" :class="{ 'loading': isLoading }" :disabled="isLoading">
          {{ isLoading ? 'Signing up...' : 'Sign up' }}
        </button>

        <router-link to="/login" class="login-link">Don't you have an account? Login</router-link>
      </div>
=======
  <div class="signup-container">
    <form @submit.prevent="registerUser" class="signup-form">
      <h2>Sign Up for Free</h2>

      <label for="username">Username:</label>
      <input type="text" id="username" v-model="formData.username" required />
      
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="formData.email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="formData.password" required />

      <label for="passwordConfirm">Confirm Password:</label>
      <input type="password" id="passwordConfirm" v-model="formData.passwordConfirm" required />

      <button type="submit">Sign Up</button>
      <p>Need an account? <router-link to="/login">Login</router-link></p>
      <p v-if="error" class="error-message">{{ error }}</p>
>>>>>>> af7971d671e8025b91f96c616b184f4c9ffee008
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      error: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        this.error = ''; // Clear previous errors

        const response = await fetch('http://localhost:9000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        const data = await response.json();

        if (data.status === 1) {
          console.log('Registration successful!');
          this.clearForm(); 
          alert('Registration successful!')// Clear form fields on successful registration
          this.$router.push('/dashboard'); // Navigate to the dashboard page
        } else {
          this.error = data.message;
        }
      } catch (error) {
        console.error('Error:', error);
        this.error = 'An error occurred during registration. Please try again.';
      }
    },
    clearForm() {
      this.formData.username = '';
      this.formData.email = '';
      this.formData.password = '';
      this.formData.passwordConfirm = '';
    },
  },
};
</script>


<style scoped>
<<<<<<< HEAD
.signup-btn.loading {
  background-color: gray;
  cursor: not-allowed;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
}

/* Styling for the full-frame container */
.full-frame {
  width: 100%;
=======
.signup-container {
>>>>>>> af7971d671e8025b91f96c616b184f4c9ffee008
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
<<<<<<< HEAD
  background-color: #000000;
 }

 .signup-btn{
  background-color: orange;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  padding: 6px;
 }

 .login-link {
  color: #000000;
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
=======
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

button {
  width: 100%;
  padding: 10px;
  background-color: #3498db; /* Blue button color */
  color: #ffffff; /* White text */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: #e74c3c; /* Red error text */
  margin-top: 10px;
  text-align: center;
>>>>>>> af7971d671e8025b91f96c616b184f4c9ffee008
}
</style>
