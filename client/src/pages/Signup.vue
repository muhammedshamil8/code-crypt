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
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa; /* Lighter gray background */
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
  color: #343a40; /* Dark gray text */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-top: 10px;
  color: #495057; /* Dark gray text */
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ced4da; /* Light gray border */
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff; /* Blue button color */
  color: #ffffff; /* White text */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.error-message {
  color: #dc3545; /* Red error text */
  margin-top: 10px;
  text-align: center;
}
</style>
