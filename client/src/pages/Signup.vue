<template>
  <div class="body">
  <div class="full-frame">
    <div class="signup-page">
      <div class="heading"><h2>Sign up for free</h2></div>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <div class="form-group-button">
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div class="create-account">
        <p>Already have an account?
          <router-link to="/login">Login</router-link>
        </p>
      </div>
    </div>
  </div>
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
}

/* Styling for the login-page container */
.signup-page {
  padding: 50px;
  flex-direction: column;
  border-radius: 40px;
  background-color: white;
  width: 380px;
  height: 420px;
  padding-top: 30px;
}

.heading{
  padding-bottom: 20px;
  font-size: 15px;
  text-align: center;
}
/* Styling for form groups */
.form-group {
  margin-bottom: 15px;
}

/* Styling for input fields */
.form-group input {
  border-radius: 3px;
  width: 100%;
  height: 25px;
  border-color: black;
  padding-left: 5px;
  padding-right: 20px;
  border-radius: 5px; /* Adjust the border radius as needed */
  border: 2px solid #ccc; /* Thin border with color #ccc */
}

/* Styling for the login button */
button {
  width: 100%;
  padding: 10px;
  margin: auto;
  background-color: #F36804;
  border-radius: 10px;
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
