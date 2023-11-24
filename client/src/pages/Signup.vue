<template>
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
  computed: {
    isError() {
      return this.registrationMessage.toLowerCase().includes('error');
    },
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
        console.error('Error:', error);
        this.registrationMessage = 'An error occurred during registration. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>


<style scoped>
.signup-btn.loading {
  background-color: gray;
  cursor: not-allowed;
}

.box {
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
}
</style>
